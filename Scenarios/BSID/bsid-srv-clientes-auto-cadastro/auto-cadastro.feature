# language: pt
Funcionalidade: SISTRAN » Projeto - BSID-SRV-CLIENTES-AUTO-CADASTRO

  @validacpf @bsid
  Cenário: CT001 - Endpoint [Valida CPF] - CPF que já possui usuário e senha cadastrados | Responsável: Orivan Junior
    Dado que esteja autenticado
    Então eu valido o CPF "16442228096"
    E o sistema deve retornar o código de status 200
    E o sistema deve retornar o código "1"
    E a mensagem "CPF com usuário e senha já cadastrados"

  @validacpf @bsid
  Cenário: CT002 - Endpoint [Valida CPF] - CPF que não possui usuário chancelado | Responsável: Orivan Junior
    Dado que esteja autenticado
    Então eu valido o CPF "75559122017"
    E o sistema deve retornar o código de status 200
    E o sistema deve retornar o código "3"
    E a mensagem "CPF não possui cadastro chancelado"

  @validacpf @bsid
  Cenário: CT003 - Endpoint [Valida CPF] - CPF que já possui usuário chancelado | Responsável: Orivan Junior
    Dado que esteja autenticado
    Então eu valido o CPF "00701423005"
    E o sistema deve retornar o código de status 200
    E o sistema deve retornar o código "4"
    E a mensagem "CPF possui cadastro com chancela"

  @validacpf @bsid
  Cenário: CT004 - Endpoint [Valida CPF] - CPF Inválido | Responsável: Orivan Junior
    Dado que esteja autenticado
    Então eu valido o CPF "855591220175"
    E o sistema deve retornar o código de status 400

  @processachancela @bsid
  Cenário: CT005 - Endpoint [processa chancela] - Validação de Cadastro | Responsável: Orivan Junior
    Dado que esteja autenticado
    E eu valido o CPF "35665044083"
    Quando eu processo a chancela do CPF com os seguintes dados:
      | cpf         | codigoCpf | nome    | dataNasc   | nomeMae | sexo      |
      | 35665044083 |         3 | MR NOME | 30/10/1986 | MRS MAE | MASCULINO |
    E o sistema deve retornar o código de status 200
    E a mensagem "Dados de validação de cadastro foram verificados com sucesso."

  @entradacontatos @bsid
  Cenário: CT006 - Endpoint [Entrada Contatos] - CPF Inválido | Responsável: Orivan Junior
    Dado que esteja autenticado
    Quando eu atribuo um contato ao CPF com os seguintes dados:
      | cpf        | email                   |
      | 9226143200 | i914544@prebanco.com.br |
    Então o sistema deve retornar o código de status 400

  @solicitatoken @bsid
  Cenário: CT007 - Endpoint [solicita token] - CPF inválido | Responsável: Orivan Junior
    Dado que esteja autenticado
    Quando eu solicito um token com os seguintes dados:
      | cpf        | contato                 |
      | 9226143200 | i914544@prebanco.com.br |
    Então o sistema deve retornar o código de status 400

  @validatoken @bsid
  Cenário: CT008 -  Endpoint [valida token] - CPF inválido | Responsável: Orivan Junior
    Dado que esteja autenticado
    Quando eu valido um token com os seguintes dados:
      | cpf        | contato                 | codigoAtivacao |
      | 9226143200 | i914544@prebanco.com.br |     1234567890 |
    Então o sistema deve retornar o código de status 400

  @alteracontato @bsid
  Cenário: CT009 - Endpoint [Altera contato] - CPF inválido | Responsável: Orivan Junior
    Dado que esteja autenticado
    Quando eu altero um contato com os seguintes dados:
      | cpf        | tipoContato | contato                 |
      | 9226143200 | EMAIL       | i914544@prebanco.com.br |
    Então o sistema deve retornar o código de status 400

  @criausuario @bsid
  Cenário: CT010 - Endpoint [Criação Usuário] - CPF inválido | Responsável: Orivan Junior
    Dado que esteja autenticado
    Quando eu crio um usuário com os seguintes dados:
      | cpf        |
      | 9226143200 |
    Então o sistema deve retornar o código de status 400

  @criausuario @bsid
  Cenário: CT011 - Endpoint [setpasswd-usuario] - CPF inválido | Responsável: Orivan Junior
    Dado que esteja autenticado
    Quando eu crio um usuário com os seguintes dados:
      | cpf        |
      | 9226143200 |
    Então o sistema deve retornar o código de status 400