#language: pt
Funcionalidade: SISTRAN » Projeto - BSID-SRV-CLIENTES-INTEGRACAO-MEUS-PRODUTOS

  @bsidresumo @bsid
  Cenário: CT001 - Endpoint [resumo] - CPF com produtos atribuídos usuário Fixo | Responsável: Orivan Junior
    Dado que eu esteja autenticado
    Quando consulto o resumo de produtos do usuário com CPF "06445988911" e CN "0644598891"
    Então a API deve retornar o status code 200
    E valido que o resumo de produtos foi retornado com sucesso

  @bsidresumo @gerarCpf @bsid
  Cenário: CT002 - Endpoint [resumo] - CPF com produtos atribuídos | Responsável: Orivan Junior
    Dado que eu esteja autenticado
    E que o usuário possui um CPF gerado e o CN correspondente
    Quando o usuário informa o CPF gerado e o CN para consultar o resumo de produtos
    Então a API deve retornar o status code 200
    E a mensagem deve apresentar a lista de produtos relacionados ao CPF
    E valido que o resumo de produtos foi retornado com sucesso

  @bsidresumo @bsid
  Cenário: CT003 - Endpoint [resumo] - CPF Inválido | Responsável: Orivan Junior
    Dado que eu esteja autenticado
    Quando consulto o resumo de produtos do usuário com CPF "12345678900" e CN "1234567890"
    Então a API deve retornar o status code 400
    E valido que a mensagem de erro para o campo "detalhe" é "Erro de validação de campos."
    E valido que a mensagem de erro para o campo "cpf" é "invalid Brazilian individual taxpayer registry number (CPF)"
