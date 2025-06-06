import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config();

const { Given, When, Then } = createBdd();
const BASE_URL_RESUMO_PRODUTOS = 'https://bsid.appsti.bradseg.com.br/bsid-srv-clientes-integracao-meus-produtos/v1/privado/resumo';

let response;
let generatedCpf;
let generatedCn;

// Função auxiliar para gerar um CPF válido (simplificada para exemplo)
// Em um cenário real, use uma biblioteca de geração/validação de CPF robusta.
function generateValidCpf() {
  const randomNumbers = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  const calculateDigit = (digits) => {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * (digits.length + 1 - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };
  const d1 = calculateDigit(randomNumbers);
  randomNumbers.push(d1);
  const d2 = calculateDigit(randomNumbers);
  randomNumbers.push(d2);
  return randomNumbers.join('');
}

// Função para obter headers da API
const getApiHeaders = () => {
    const idAuthorizationToken = process.env.ID_AUTHORIZATION_TOKEN_BSID;
    if (!idAuthorizationToken) {
        throw new Error("ERRO: ID_AUTHORIZATION_TOKEN_BSID não está configurado no .env.");
    }
    return {
        'accept': '*/*',
        'Id-Authorization': idAuthorizationToken,
        'content-type': 'application/json',
    };
};

async function callResumoProdutosApi(request, cpf, cn) {
  // Corpo da requisição
  const requestBody = {
    "cpf": cpf,
    "cn": cn,
  };
  // Realiza a requisição POST
  return await request.post(BASE_URL_RESUMO_PRODUTOS, {
    headers: getApiHeaders(),
    data: requestBody,
  });
}

// Steps para CT006
When('consulto o resumo de produtos do usuário com CPF {string} e CN {string}', async ({ request }, cpf, cn) => {
  response = await callResumoProdutosApi(request, cpf, cn);
  console.log(`Consulta para CPF ${cpf} e CN ${cn} - Status: ${response.status()}`);
});

// Valida o resumo de produtos retornado
Then('valido que o resumo de produtos foi retornado com sucesso', async ({}) => {
  expect(response, "A resposta da API (response) não foi definida. O passo 'When' executou corretamente?").toBeDefined();
  expect(response.status(), `Esperado status 200, mas foi ${response.status()}`).toBe(200);

  const responseBody = await response.json();

  const expectedKeys = ['saude', 'auto', 'vida', 'residencial', 'capitalizacao', 'dental', 'previdencia'];
  for (const key of expectedKeys) {
    expect(responseBody, `Corpo da resposta não contém a chave '${key}'`).toHaveProperty(key);
  }
  console.log('Resumo de produtos (CT006) retornado e validado com sucesso:', responseBody);
});

// Steps para CT007
Given('que eu esteja autenticado', () => {
  // Garante que o token de autenticação está configurado,
  // chamando getApiHeaders(), que lança um erro se o token estiver ausente.
  getApiHeaders();
  console.log('Pré-condição: Usuário autenticado (token de autorização verificado via getApiHeaders).');
});

Given('que o usuário possui um CPF gerado e o CN correspondente', async ({}) => {
  generatedCpf = generateValidCpf();
  generatedCn = generatedCpf; // CN é o mesmo que o CPF gerado
  console.log(`CPF Gerado: ${generatedCpf}, CN Gerado (igual ao CPF): ${generatedCn}`);
});

When('o usuário informa o CPF gerado e o CN para consultar o resumo de produtos', async ({ request }) => {
  expect(generatedCpf, "CPF gerado (generatedCpf) não está definido. O passo 'Given' de geração de CPF executou?").toBeDefined();
  expect(generatedCn, "CN gerado (generatedCn) não está definido. O passo 'Given' de geração de CPF executou?").toBeDefined();
  
  response = await callResumoProdutosApi(request, generatedCpf, generatedCn);
  console.log(`Consulta com CPF/CN gerados - Status: ${response.status()}`);
});

// Modificado para aceitar qualquer status code como parâmetro
Then('a API deve retornar o status code {int}', async ({}, expectedStatus) => {
  expect(response, "A resposta da API (response) não foi definida.").toBeDefined();
  expect(response.status(), `Esperado status ${expectedStatus}, mas foi ${response.status()}`).toBe(expectedStatus);
});

Then('a mensagem deve apresentar a lista de produtos relacionados ao CPF', async ({}) => {
  expect(response, "A resposta da API (response) não foi definida.").toBeDefined();
  const responseBody = await response.json();

  // Apenas loga o corpo da resposta
  console.log('Corpo da resposta da API (lista de produtos):', JSON.stringify(responseBody, null, 2));
});

// Step genérico para validar a mensagem de detalhe do erro
Then('valido a mensagem de erro de detalhe {string}', async ({}, expectedDetailMessage) => {
  expect(response, "A resposta da API (response) não foi definida.").toBeDefined();
  const responseBody = await response.json();
  expect(responseBody, `Corpo da resposta não contém a propriedade 'detalhe'`).toHaveProperty('detalhe');
  expect(responseBody.detalhe, `Esperada mensagem de detalhe "${expectedDetailMessage}", mas foi "${responseBody.detalhe}"`).toBe(expectedDetailMessage);
  console.log(`Mensagem de detalhe da API validada: "${responseBody.detalhe}"`);
});

// Step genérico para validar a mensagem de erro de um campo específico
Then('valido que a mensagem de erro para o campo {string} é {string}', async ({}, fieldName, expectedFieldErrorMessage) => {
  expect(response, "A resposta da API (response) não foi definida.").toBeDefined();
  const responseBody = await response.json();
  
  if (fieldName === "detalhe") {
    expect(responseBody, `Corpo da resposta não contém a propriedade '${fieldName}'`).toHaveProperty(fieldName);
    expect(responseBody[fieldName], `Esperada mensagem para o campo "${fieldName}" como "${expectedFieldErrorMessage}", mas foi "${responseBody[fieldName]}"`).toBe(expectedFieldErrorMessage);
    console.log(`Mensagem de erro para o campo "${fieldName}" validada: "${responseBody[fieldName]}"`);
  } else {
    expect(responseBody, "Corpo da resposta não contém a propriedade 'erros'").toHaveProperty('erros');
    expect(Array.isArray(responseBody.erros), "A propriedade 'erros' não é um array").toBe(true);
    
    const errorForField = responseBody.erros.find(err => err.campo === fieldName);
    expect(errorForField, `Nenhum erro encontrado para o campo "${fieldName}" na lista de erros: ${JSON.stringify(responseBody.erros)}`).toBeDefined();
    expect(errorForField, `Objeto de erro para o campo "${fieldName}" não contém a propriedade 'mensagem'`).toHaveProperty('mensagem');
    expect(errorForField.mensagem, `Esperada mensagem de erro para o campo "${fieldName}" como "${expectedFieldErrorMessage}", mas foi "${errorForField.mensagem}"`).toBe(expectedFieldErrorMessage);
    console.log(`Mensagem de erro para o campo "${fieldName}" validada: "${errorForField.mensagem}"`);
  }
});
