// Generated from: Scenarios\BSID\bsid-srv-clientes-integracao-meus-produtos\clientes-integracao-meus-produtos.feature
import { test } from "playwright-bdd";

test.describe('Consulta Resumo de Produtos', () => {

  test('CT006 - Consulta resumo de produtos do usuário', { tag: ['@bsidresumo'] }, async ({ When, request, Then }) => { 
    await When('consulto o resumo de produtos do usuário com CPF "06445988911" e CN "cn-teste"', null, { request }); 
    await Then('valido que o resumo de produtos foi retornado com sucesso'); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('Scenarios\\BSID\\bsid-srv-clientes-integracao-meus-produtos\\clientes-integracao-meus-produtos.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@bsidresumo"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"Quando consulto o resumo de produtos do usuário com CPF \"06445988911\" e CN \"cn-teste\"","stepMatchArguments":[{"group":{"start":49,"value":"\"06445988911\"","children":[{"start":50,"value":"06445988911","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":68,"value":"\"cn-teste\"","children":[{"start":69,"value":"cn-teste","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Então valido que o resumo de produtos foi retornado com sucesso","stepMatchArguments":[]}]},
]; // bdd-data-end