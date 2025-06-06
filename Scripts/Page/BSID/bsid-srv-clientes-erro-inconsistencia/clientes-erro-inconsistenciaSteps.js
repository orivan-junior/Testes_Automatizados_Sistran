import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Desestruturando Given e Then. Playwright-bdd trata Given, When, Then, And, But
// de forma similar para a definição de steps. A palavra-chave exata usada aqui
// (ex: Given, Then) não precisa corresponder à do Gherkin, desde que a string do step corresponda.
const { Given, When, Then } = createBdd();

// Novo Step: Dado que existe um id-token valido
Given('que existe um id-token valido', async () => {
  // Este step serve como uma precondição.
  // Valida se o token de autorização está definido e não está vazio.
  expect(process.env.ID_AUTHORIZATION_TOKEN_BSID, 'A variável de ambiente ID_AUTHORIZATION_TOKEN_BSID não está definida ou está vazia. Verifique seu arquivo .env').toBeTruthy();
  // Valida também se a URL base está definida.
  expect(process.env.BASE_URL_ERRO_INCONSISTENCIA_PRIVADO, 'A variável de ambiente BASE_URL_ERRO_INCONSISTENCIA_PRIVADO não está definida ou está vazia. Verifique seu arquivo .env').toBeTruthy();
  console.log('Pré-condição: ID-Token de autorização está configurado e disponível.');
});

Then('consulto as ultimas mensagens de erro cadastradas com sucesso', async ({ request }) => {
  const response = await request.get(String(process.env.BASE_URL_ERRO_INCONSISTENCIA_PRIVADO), {
    headers: {
      'accept': '*/*',
      'Id-Authorization': process.env.ID_AUTHORIZATION_TOKEN_BSID,
    },
  });

  const responseBody = await response.json(); // Parsear o JSON uma vez

  console.log('Status da consulta de mensagens de erro:', response.status());

  // Valida o status da resposta
  expect(response.status()).toBe(200);
  expect(Array.isArray(responseBody), 'O corpo da resposta da consulta de erros deveria ser um array.').toBe(true);

  console.log(`Encontrados ${responseBody.length} erros na API » bsid-srv-clientes-erro-inconsistencia.`);

  // Opcional: Logar o primeiro e o último erro para amostragem, se houver erros
  if (responseBody.length > 0) {
    const primeiroErro = responseBody[0];
    console.log(`Primeiro erro na lista: Código - ${primeiroErro['codigo-erro']}, Descrição - "${primeiroErro['descricao-erro']}"`);
    if (responseBody.length > 1) {
      const ultimoErro = responseBody[responseBody.length - 1];
      console.log(`Último erro da Lista: Código - ${ultimoErro['codigo-erro']}, Descrição - "${ultimoErro['descricao-erro']}"`);
    }
  } else {
    console.log('Nenhuma mensagem de erro foi encontrada na consulta.');
  }

  console.log('Consulta de mensagens de erro validada com sucesso.');
});

Then('incluo uma nova mensagem de erro com a descrição gerada', async ({ request }) => {
  const descricaoErroBase = "Erro gerado automaticamente"; // Definindo a base para a descrição
  const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase(); // Gera 8 caracteres hexadecimais
  const generatedDescricaoErro = `${descricaoErroBase} - ${randomHex}`; // Gerando a descrição única

  // Corpo da requisição
  const requestBody = {
    "descricao-erro": generatedDescricaoErro,
  };

  // Realiza a requisição POST
  const response = await request.post(String(process.env.BASE_URL_ERRO_INCONSISTENCIA_PRIVADO), {
    headers: {
      'accept': '*/*',
      'Id-Authorization': process.env.ID_AUTHORIZATION_TOKEN_BSID,
      'Content-Type': 'application/json',
    },
    data: requestBody, // Envia o corpo da requisição
  });

  // Valida o status da resposta da requisição POST.
  // APIs RESTful geralmente retornam 201 (Created) para um POST bem-sucedido que cria um recurso.
  expect(response.status(), `Falha ao incluir nova mensagem de erro. Status esperado 201 ou 200, recebido: ${response.status()}`).toBe(201); // Ou .toBe(200)

  // Valida o corpo da resposta e armazena para uso
  const responseBody = await response.json();

  // Valida as propriedades esperadas no corpo da resposta
  expect(responseBody).toHaveProperty('codigo-erro');
  // Adicionando uma verificação de tipo para maior robustez
  expect(typeof responseBody['codigo-erro'], `O tipo de 'codigo-erro' deveria ser numérico. Recebido: ${typeof responseBody['codigo-erro']}`).toBe('number');
  expect(responseBody['descricao-erro']).toBe(generatedDescricaoErro);

  // Exibe apenas a mensagem de erro cadastrada
  console.log(`Nova mensagem de erro incluída com sucesso: Status ${response.status()}, Código - ${responseBody['codigo-erro']}, Descrição - "${generatedDescricaoErro}"`);
});