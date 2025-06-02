// Generated from: Scenarios\BVPNEXT\Nome Social\NomeSocial.feature
import { test } from "playwright-bdd";

test.describe('Projeto Nome Social - BVPNEXT', () => {

  test('CT004 - Emitir uma proposta individual incluindo Nome Social e Identidade de Gênero com Aceite Digital', { tag: ['@NomeSocial_CT004', '@BVPNEXT'] }, async ({ Given, page, When, And }) => { 
    await Given('que estou na página "https://bvpnext.dsv.bradseg.com.br/oAuth/GeraLink"', null, { page }); 
    await When('preencho o campo \'ID\' com \'18440595000161\' no formulário BVPNEXT', null, { page }); 
    await And('preencho o campo \'Nome\' com \'CORRETOR\' no formulário BVPNEXT', null, { page }); 
    await And('seleciono a opção "2"', null, { page }); 
    await And('clico no botão "Gerar Link"', null, { page }); 
    await And('clico no link "https://bvpnext.dsv.bradseg.com.br"', null, { page }); 
    await And('resto', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('Scenarios\\BVPNEXT\\Nome Social\\NomeSocial.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@NomeSocial_CT004","@BVPNEXT"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Dado que estou na página \"https://bvpnext.dsv.bradseg.com.br/oAuth/GeraLink\"","stepMatchArguments":[{"group":{"start":20,"value":"\"https://bvpnext.dsv.bradseg.com.br/oAuth/GeraLink\"","children":[{"start":21,"value":"https://bvpnext.dsv.bradseg.com.br/oAuth/GeraLink","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"Quando preencho o campo 'ID' com '18440595000161' no formulário BVPNEXT","stepMatchArguments":[{"group":{"start":17,"value":"'ID'","children":[{"children":[{"children":[]}]},{"start":18,"value":"ID","children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":26,"value":"'18440595000161'","children":[{"children":[{"children":[]}]},{"start":27,"value":"18440595000161","children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"E preencho o campo 'Nome' com 'CORRETOR' no formulário BVPNEXT","stepMatchArguments":[{"group":{"start":17,"value":"'Nome'","children":[{"children":[{"children":[]}]},{"start":18,"value":"Nome","children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":28,"value":"'CORRETOR'","children":[{"children":[{"children":[]}]},{"start":29,"value":"CORRETOR","children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"E seleciono a opção \"2\"","stepMatchArguments":[{"group":{"start":18,"value":"\"2\"","children":[{"start":19,"value":"2","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"E clico no botão \"Gerar Link\"","stepMatchArguments":[{"group":{"start":15,"value":"\"Gerar Link\"","children":[{"start":16,"value":"Gerar Link","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"E clico no link \"https://bvpnext.dsv.bradseg.com.br\"","stepMatchArguments":[{"group":{"start":14,"value":"\"https://bvpnext.dsv.bradseg.com.br\"","children":[{"start":15,"value":"https://bvpnext.dsv.bradseg.com.br","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"E resto","stepMatchArguments":[]}]},
]; // bdd-data-end