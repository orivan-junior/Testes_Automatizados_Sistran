// Generated from: Scenarios\BSID\bsid-srv-clientes-auto-cadastro\auto-cadastro.feature
import { test } from "playwright-bdd";

test.describe('BSID-SRV-CLIENTES-AUTO-CADASTRO', () => {

  test('Validar CPF que já possui usuário e senha cadastrados', { tag: ['@validacpf'] }, async ({ Given, Then, request, And }) => { 
    await Given('que esteja autenticado'); 
    await Then('eu valido o CPF "16442228096"', null, { request }); 
    await And('o sistema deve retornar o código de status 200'); 
    await And('o sistema deve retornar o código "1"'); 
    await And('a mensagem "CPF com usuário e senha já cadastrados"'); 
  });

  test('Validar CPF que não possui usuário chancelado', { tag: ['@validacpf'] }, async ({ Given, Then, request, And }) => { 
    await Given('que esteja autenticado'); 
    await Then('eu valido o CPF "75559122017"', null, { request }); 
    await And('o sistema deve retornar o código de status 200'); 
    await And('o sistema deve retornar o código "3"'); 
    await And('a mensagem "CPF não possui cadastro chancelado"'); 
  });

  test('Validar CPF que já possui usuário chancelado', { tag: ['@validacpf'] }, async ({ Given, Then, request, And }) => { 
    await Given('que esteja autenticado'); 
    await Then('eu valido o CPF "00701423005"', null, { request }); 
    await And('o sistema deve retornar o código de status 200'); 
    await And('o sistema deve retornar o código "4"'); 
    await And('a mensagem "CPF possui cadastro com chancela"'); 
  });

  test('Validar CPF Inválido', { tag: ['@validacpf'] }, async ({ Given, Then, request, And }) => { 
    await Given('que esteja autenticado'); 
    await Then('eu valido o CPF "855591220175"', null, { request }); 
    await And('o sistema deve retornar o código de status 400'); 
  });

  test('Validação de Cadastro - Processo Chancela', { tag: ['@processachancela'] }, async ({ Given, When, request, And }) => { 
    await Given('que esteja autenticado'); 
    await When('eu processo a chancela do CPF com os seguintes dados:', {"dataTable":{"rows":[{"cells":[{"value":"cpf"},{"value":"codigoCpf"},{"value":"nome"},{"value":"dataNasc"},{"value":"nomeMae"},{"value":"sexo"}]},{"cells":[{"value":"35665044083"},{"value":"3"},{"value":"MR NOME"},{"value":"30/10/1986"},{"value":"MRS MAE"},{"value":"MASCULINO"}]}]}}, { request }); 
    await And('o sistema deve retornar o código de status 200'); 
    await And('a mensagem "Dados de validação de cadastro foram verificados com sucesso."'); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('Scenarios\\BSID\\bsid-srv-clientes-auto-cadastro\\auto-cadastro.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@validacpf"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Dado que esteja autenticado","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Então eu valido o CPF \"16442228096\"","stepMatchArguments":[{"group":{"start":16,"value":"\"16442228096\"","children":[{"start":17,"value":"16442228096","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"E o sistema deve retornar o código de status 200","stepMatchArguments":[{"group":{"start":43,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"E o sistema deve retornar o código \"1\"","stepMatchArguments":[{"group":{"start":33,"value":"\"1\"","children":[{"start":34,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"E a mensagem \"CPF com usuário e senha já cadastrados\"","stepMatchArguments":[{"group":{"start":11,"value":"\"CPF com usuário e senha já cadastrados\"","children":[{"start":12,"value":"CPF com usuário e senha já cadastrados","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":13,"tags":["@validacpf"],"steps":[{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Dado que esteja autenticado","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Então eu valido o CPF \"75559122017\"","stepMatchArguments":[{"group":{"start":16,"value":"\"75559122017\"","children":[{"start":17,"value":"75559122017","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"E o sistema deve retornar o código de status 200","stepMatchArguments":[{"group":{"start":43,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"E o sistema deve retornar o código \"3\"","stepMatchArguments":[{"group":{"start":33,"value":"\"3\"","children":[{"start":34,"value":"3","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"E a mensagem \"CPF não possui cadastro chancelado\"","stepMatchArguments":[{"group":{"start":11,"value":"\"CPF não possui cadastro chancelado\"","children":[{"start":12,"value":"CPF não possui cadastro chancelado","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":21,"tags":["@validacpf"],"steps":[{"pwStepLine":23,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Dado que esteja autenticado","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Então eu valido o CPF \"00701423005\"","stepMatchArguments":[{"group":{"start":16,"value":"\"00701423005\"","children":[{"start":17,"value":"00701423005","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"E o sistema deve retornar o código de status 200","stepMatchArguments":[{"group":{"start":43,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":26,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"E o sistema deve retornar o código \"4\"","stepMatchArguments":[{"group":{"start":33,"value":"\"4\"","children":[{"start":34,"value":"4","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"E a mensagem \"CPF possui cadastro com chancela\"","stepMatchArguments":[{"group":{"start":11,"value":"\"CPF possui cadastro com chancela\"","children":[{"start":12,"value":"CPF possui cadastro com chancela","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":30,"pickleLine":29,"tags":["@validacpf"],"steps":[{"pwStepLine":31,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Dado que esteja autenticado","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Então eu valido o CPF \"855591220175\"","stepMatchArguments":[{"group":{"start":16,"value":"\"855591220175\"","children":[{"start":17,"value":"855591220175","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"E o sistema deve retornar o código de status 400","stepMatchArguments":[{"group":{"start":43,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":36,"pickleLine":35,"tags":["@processachancela"],"steps":[{"pwStepLine":37,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"Dado que esteja autenticado","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"Quando eu processo a chancela do CPF com os seguintes dados:","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"E o sistema deve retornar o código de status 200","stepMatchArguments":[{"group":{"start":43,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":40,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"E a mensagem \"Dados de validação de cadastro foram verificados com sucesso.\"","stepMatchArguments":[{"group":{"start":11,"value":"\"Dados de validação de cadastro foram verificados com sucesso.\"","children":[{"start":12,"value":"Dados de validação de cadastro foram verificados com sucesso.","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end