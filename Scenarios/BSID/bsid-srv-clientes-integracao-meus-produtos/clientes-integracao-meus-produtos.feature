#language: pt
Funcionalidade: Consulta Resumo de Produtos

  @bsidresumo
  Cenário: CT006 - Consulta resumo de produtos do usuário
    Quando consulto o resumo de produtos do usuário com CPF "06445988911" e CN "cn-teste"
    Então valido que o resumo de produtos foi retornado com sucesso