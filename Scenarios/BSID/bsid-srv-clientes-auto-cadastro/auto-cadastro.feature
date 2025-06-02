# language: pt
Funcionalidade: BSID-SRV-CLIENTES-AUTO-CADASTRO

  @validacpf
  Cenário: Validar CPF que já possui usuário e senha cadastrados
    Dado que esteja autenticado
    Então eu valido o CPF "16442228096"
    E o sistema deve retornar o código de status 200
    E o sistema deve retornar o código "1"
    E a mensagem "CPF com usuário e senha já cadastrados"

  @validacpf
  Cenário: Validar CPF que não possui usuário chancelado
    Dado que esteja autenticado
    Então eu valido o CPF "75559122017"
    E o sistema deve retornar o código de status 200
    E o sistema deve retornar o código "3"
    E a mensagem "CPF não possui cadastro chancelado"

  @validacpf
  Cenário: Validar CPF que já possui usuário chancelado
    Dado que esteja autenticado
    Então eu valido o CPF "00701423005"
    E o sistema deve retornar o código de status 200
    E o sistema deve retornar o código "4"
    E a mensagem "CPF possui cadastro com chancela"

  @validacpf
  Cenário: Validar CPF Inválido
    Dado que esteja autenticado
    Então eu valido o CPF "855591220175"
    E o sistema deve retornar o código de status 400

  @processachancela
  Cenário: Validação de Cadastro - Processo Chancela
    Dado que esteja autenticado
    Quando eu processo a chancela do CPF com os seguintes dados:
      | cpf         | codigoCpf | nome    | dataNasc   | nomeMae | sexo      |
      | 35665044083 |         3 | MR NOME | 30/10/1986 | MRS MAE | MASCULINO |
    E o sistema deve retornar o código de status 200
    E a mensagem "Dados de validação de cadastro foram verificados com sucesso."
