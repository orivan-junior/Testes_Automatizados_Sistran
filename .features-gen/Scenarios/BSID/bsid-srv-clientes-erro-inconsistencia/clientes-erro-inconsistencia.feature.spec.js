// Generated from: Scenarios\BSID\bsid-srv-clientes-erro-inconsistencia\clientes-erro-inconsistencia.feature
import { test } from "playwright-bdd";

test.describe('Projeto - BSID', () => {

  test('CT005 - Incluir mensagem de erro com descrição "Erro de teste" na API BSID', { tag: ['@bsidgetcep'] }, async ({ Given, request, When }) => { 
    await Given('valido a resposta da API Privado', null, { request }); 
    await When('incluo e valido a inclusão de uma nova mensagem de erro com a descrição "Erro de teste"', null, { request }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('Scenarios\\BSID\\bsid-srv-clientes-erro-inconsistencia\\clientes-erro-inconsistencia.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@bsidgetcep"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Dado valido a resposta da API Privado","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"Quando incluo e valido a inclusão de uma nova mensagem de erro com a descrição \"Erro de teste\"","stepMatchArguments":[{"group":{"start":72,"value":"\"Erro de teste\"","children":[{"start":73,"value":"Erro de teste","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end