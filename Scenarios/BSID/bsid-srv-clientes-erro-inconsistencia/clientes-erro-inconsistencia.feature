#language: pt
Funcionalidade: SISTRAN » Projeto - TBSID-SRV-CLIENTES-ERRO-INCONSISTENCIA

    
  @novoerroprivado  @erroprivado @bsid
  Cenário: CT001 - Endpont [Criar inconsistência] - inconsistencia criada | Responsável: Orivan Junior
  Dado que existe um id-token valido
  Então incluo uma nova mensagem de erro com a descrição gerada
  E consulto as ultimas mensagens de erro cadastradas com sucesso
  
  @consultaerroprivado @erroprivado @bsid
  Cenário: CT002 - Endpoint [Buscar erros] | Responsável: Orivan Junior
  Dado que existe um id-token valido
  Então consulto as ultimas mensagens de erro cadastradas com sucesso