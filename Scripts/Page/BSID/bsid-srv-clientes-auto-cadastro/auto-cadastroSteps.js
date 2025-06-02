import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config();

const { Given, When, Then } = createBdd();

let response;

// Função para obter headers da API
const getApiHeaders = () => {
    const idToken = process.env.ID_TOKEN; 
    if (!idToken) {
        throw new Error("ERRO: ID_TOKEN não está configurado no .env.");
    }
    return {
        'accept': '*/*',
        'idToken': idToken,
        'Content-Type': 'application/json'
    };
};

Given('que esteja autenticado', () => {
    if (!process.env.ID_TOKEN) {
        throw new Error("ERRO: ID_TOKEN não encontrado.");
    }
    console.log("Autenticado com sucesso.");
});

// Modificado para aceitar CPF como parâmetro
Then('eu valido o CPF {string}', async ({ request }, cpf) => {
    // Criar o objeto CPF diretamente
    const requestCpf = {
        cpf: cpf
    };

    // Log do CPF para verificação
    console.log(`Validação do CPF: ${requestCpf.cpf}`);

    // Enviar a requisição POST como string JSON
    response = await request.post(`${process.env.BASE_API_URL}/valida-cpf`, {
        headers: getApiHeaders(),
        data: JSON.stringify(requestCpf) // Enviando o objeto como string JSON
    });    

    // Log da resposta
    const responseBody = await response.json(); // Obter a resposta como JSON
    console.log(`Resposta: ${JSON.stringify(responseBody, null, 2)}`); // Usando JSON.stringify para formatar a saída
});

Then('o sistema deve retornar o código {string}', async ({},expectedCode) => {
    const body = await response.json();
    expect(body.codigoCpf).toBe(expectedCode);
    console.log(`Código CPF: ${body.codigoCpf}`);
});

Then('a mensagem {string}', async ({},expectedMessage) => {
    const body = await response.json();
    expect(body.message).toBe(expectedMessage);
    console.log(`Mensagem: ${body.message}`);
});

Then('o sistema deve retornar o código de status {int}', async ({},expectedStatus) => {
    expect(response.status(), `Status da resposta esperado: ${expectedStatus}, recebido: ${response.status()}`).toBe(expectedStatus);
    console.log(`Status da resposta: ${response.status()}`);
});

When('eu processo a chancela do CPF com os seguintes dados:', async ({ request }, dataTable) => {
    // Extrair os cabeçalhos e os dados do dataTable
    const headers = dataTable.rawTable[0];
    const values = dataTable.rawTable[1];

    // Criar um objeto a partir dos cabeçalhos e valores
    const requestBody = headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
    }, {});

    // Log dos dados para verificação
    console.log(`Processando chancela do CPF com os dados: ${JSON.stringify(requestBody, null, 2)}`);

    // Enviar a requisição POST como string JSON
    response = await request.post(`${process.env.BASE_API_URL}/processa-chancela`, {
        headers: getApiHeaders(), // Certifique-se que getApiHeaders() está definida e retorna os cabeçalhos corretos
        data: JSON.stringify(requestBody)
    });

    // Log da resposta
    const responseBody = await response.json(); // Obter a resposta como JSON
    console.log(`Resposta: ${JSON.stringify(responseBody, null, 2)}`); // Usando JSON.stringify para formatar a saída
});
























//uso de arquivo json para validação
// import { expect } from '@playwright/test';
// import { createBdd } from 'playwright-bdd';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';

// dotenv.config();

// const { Given, When } = createBdd();
// const BASE_URL = 'https://bsid.appsti.bradseg.com.br/bsid-srv-clientes-auto-cadastro/v1/valida-cpf';

// let response;

// // Função para obter headers da API
// const getApiHeaders = () => {
//     const idToken = process.env.ID_TOKEN; 
//     if (!idToken) {
//         throw new Error("ERRO: ID_TOKEN não está configurado no .env.");
//     }
//     return {
//         'accept': '*/*',
//         'idToken': idToken,
//         'Content-Type': 'application/json'
//     };
// };

// Given('que esteja autenticado', () => {
//     if (!process.env.ID_TOKEN) {
//         throw new Error("ERRO: ID_TOKEN não encontrado.");
//     }
// });

// When('eu valido o CPF', async ({ request }) => {
//     // Caminho do arquivo JSON
//     const filePath = path.join(__dirname, 'requestCpf.json');

//     // Ler os dados do arquivo JSON
//     const requestCpf = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

//     // Log do CPF para verificação
//     console.log(`Validação do CPF: ${requestCpf.cpf}`);

//     // Enviar a requisição POST como string JSON
//     response = await request.post(BASE_URL, {
//         headers: getApiHeaders(),
//         data: JSON.stringify(requestCpf) // Enviando o objeto como string JSON
//     });

//     // Log da resposta
//     const responseBody = await response.json(); // Obter a resposta como JSON
//     console.log(`Resposta: ${JSON.stringify(responseBody, null, 2)}`); // Usando JSON.stringify para formatar a saída
    
//     // Verifique se a resposta é bem-sucedida
//     expect(response.status()).toBe(200); // Ajuste o código de status conforme necessário
// });