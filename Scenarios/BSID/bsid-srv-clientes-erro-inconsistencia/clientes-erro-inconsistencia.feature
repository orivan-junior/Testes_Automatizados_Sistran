#language: pt
Funcionalidade: SISTRAN » Projeto - TBSID-SRV-CLIENTES-ERRO-INCONSISTENCIA

  @novoerroprivado  @erroprivado
  Cenário: Inclusão de nova mensagem de erro (POST) - | Responsável: Orivan Junior
  Dado que existe um id-token valido
  Então incluo uma nova mensagem de erro com a descrição gerada
  E consulto as ultimas mensagens de erro cadastradas com sucesso


  @consultaerroprivado @erroprivado
  Cenário: Consulta mensagens de erro (GET) | Responsável: Orivan Junior
  Dado que existe um id-token valido
  Então consulto as ultimas mensagens de erro cadastradas com sucesso