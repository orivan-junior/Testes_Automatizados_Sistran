import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

// Consulta o resumo de produtos do usuário
//POST
When('consulto o resumo de produtos do usuário com CPF {string} e CN {string}', async ({ request }, cpf, cn) => {
  // URL da API
  const url = 'https://bsid.appsti.bradseg.com.br/bsid-srv-clientes-integracao-meus-produtos/v1/privado/resumo';

  // Corpo da requisição
  const requestBody = {
    "cpf": cpf,
    "cn": cn,
  };

  // Realiza a requisição POST
  const response = await request.post(url, {
    headers: {
      'accept': '*/*',
      'Id-Authorization': 'a0bd26b7-426b-4286-a01a-66b127c25d3f', // Adicionando o cabeçalho de autorização
      'content-type': 'application/json',
    },
    data: requestBody,
  });

  // Exibe os detalhes da resposta no console
  console.log('Status da resposta do POST:', response.status());
  console.log('Corpo da resposta do POST:', await response.text());

  // Valida o status da resposta
  expect(response.status()).toBe(200);

  // Valida o corpo da resposta
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('saude');
  expect(responseBody).toHaveProperty('auto');
  expect(responseBody).toHaveProperty('vida');
  expect(responseBody).toHaveProperty('residencial');
  expect(responseBody).toHaveProperty('capitalizacao');
  expect(responseBody).toHaveProperty('dental');
  expect(responseBody).toHaveProperty('previdencia');

  console.log('Resumo de produtos retornado com sucesso:', responseBody);
});

// Valida o resumo de produtos retornado
Then('valido que o resumo de produtos foi retornado com sucesso', async () => {
  console.log('Validação adicional pode ser implementada aqui, se necessário.');
});
