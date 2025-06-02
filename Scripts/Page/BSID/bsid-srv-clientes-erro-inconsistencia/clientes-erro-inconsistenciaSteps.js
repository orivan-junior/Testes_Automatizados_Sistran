import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

//GET
Given('valido a resposta da API Privado', async ({ request }) => {
  const url = 'https://bsid.appsti.bradseg.com.br/bsid-srv-clientes-erro-inconsistencia/v1/privado';

  const response = await request.get(url, {
    headers: {
      'accept': '*/*',
      'Id-Authorization': 'a0bd26b7-426b-4286-a01a-66b127c25d3f', // Adiciona o cabeçalho de autorização
    },
  });

  console.log('Status da resposta da API Privado:', response.status());
  console.log('Cabeçalhos da resposta da API Privado:', response.headers());
  console.log('Corpo da resposta da API Privado:', await response.text());

  // Valida o status da resposta
  expect(response.status()).toBe(200);

  // Valida o corpo da resposta
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);

  responseBody.forEach((erro, index) => {
    expect(erro).toHaveProperty('codigo-erro');
    expect(erro).toHaveProperty('descricao-erro');
    console.log(`Erro ${index + 1}: Código - ${erro['codigo-erro']}, Descrição - ${erro['descricao-erro']}`);
  });

  console.log('Resposta da API Privado validada com sucesso.');
});
//POST
When('incluo e valido a inclusão de uma nova mensagem de erro com a descrição {string}', async ({ request }, descricaoErro) => {
  const url = 'https://bsid.appsti.bradseg.com.br/bsid-srv-clientes-erro-inconsistencia/v1/privado';

  // Corpo da requisição
  const requestBody = {
    "descricao-erro": descricaoErro,
  };

  // Realiza a requisição POST
  const response = await request.post(url, {
    headers: {
      'accept': '*/*',
      'Id-Authorization': 'a0bd26b7-426b-4286-a01a-66b127c25d3f', // Adiciona o cabeçalho de autorização
      'Content-Type': 'application/json', // Define o tipo de conteúdo
    },
    data: requestBody, // Envia o corpo da requisição
  });

  // Exibe os detalhes da resposta no console
  console.log('Status da resposta do POST:', response.status());
  console.log('Cabeçalhos da resposta do POST:', response.headers());
  console.log('Corpo da resposta do POST:', await response.text());

  // Valida o status da resposta
  expect(response.status()).toBe(200);

  // Valida o corpo da resposta
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('codigo-erro');
  expect(responseBody['descricao-erro']).toBe(descricaoErro);

  console.log('Nova mensagem de erro incluída com sucesso:', responseBody);
});