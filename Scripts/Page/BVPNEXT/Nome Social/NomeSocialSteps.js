import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { anexarImagem, anexarTexto } from '../../../../../e2e/Support/utils/allureUtils';
//import { highlightElement } from '../../../../../e2e/Support/Before/beforeHoks';
import { highlightElement } from '../../../../../e2e/Support/Helpers/browserHelpers';

const { Given, When, Then } = createBdd();

When('preencho o campo {string} com {string} no formulário BVPNEXT', async ({ page }, fieldLabel, value) => {
  // Mapeia os rótulos para os seletores dos campos
  const fieldMap = {
    'ID': '#ID',
    'Nome': '#Nome',
    'Produto': '#gs_NM_PRODUTO',
  };

  // Verifica se o rótulo fornecido está no mapa
  const selector = fieldMap[fieldLabel];
  if (!selector) {
    throw new Error(`Campo com o rótulo '${fieldLabel}' não encontrado no mapa.`);
  }

  // Localiza o campo e aguarda ele estar visível
  const field = page.locator(selector);
  await field.waitFor({ state: 'visible' });
  console.log(`Campo '${fieldLabel}' localizado e visível.`);

  // Clica no campo para focar
  await field.click();
  console.log(`Focado no campo '${fieldLabel}'.`);

  // Limpa o campo antes de preencher
  await field.fill('');
  console.log(`Campo '${fieldLabel}' limpo.`);

  // Insere o valor no campo
  await field.type(value, { delay: 50 }); // Adiciona um pequeno delay entre as teclas para simular digitação humana
  console.log(`Campo '${fieldLabel}' preenchido com o valor '${value}'.`);
});

When('seleciono a opção {string}', async ({ page }, option) => {
  const dropdown = page.locator('#cdGrupo'); // Localiza o combobox pelo ID
  await highlightElement(page, dropdown); // Aplica o highlight no combobox
  await dropdown.selectOption(option); // Seleciona a opção
  console.log(`Opção '${option}' selecionada no combobox.`);
});

When('clico no botão {string}', async ({ page }, linkText) => {
  await page.getByRole('button', { name: linkText }).click();
});

const ids = [
  '18440595000161',
  '96439823000197', // id Corretor
  '01497994000166',
  '02505611000117',
  '03384134000166',
  '03385134000160',
  '03385134000166',
  '04624449000181',
  '04756208000196',
  '05997484000109',
  '07753626000118',
  '088303990001040',
  '08830399000140',
  '08862713000176',
];

When('clico no link {string}', async ({ page }, linkText) => {
  // Localiza o link pelo texto fornecido
  const link = page.getByRole('link', { name: linkText });

  // Verifica se o link existe
  if (await link.count() === 0) {
    throw new Error(`Link com o texto '${linkText}' não encontrado.`);
  }

  // Clica no link
  await link.click();
  console.log(`Link '${linkText}' clicado.`);

  // Aguarda a navegação
  await page.waitForLoadState('networkidle');

  // Verifica se a página redirecionou para "AccessDenied"
  if (page.url() === 'https://bvpnext.dsv.bradseg.com.br/Account/AccessDenied') {
    console.log('Redirecionado para a página de acesso negado. Tentando logar com um novo ID.');

    for (const id of ids) {
      console.log(`Tentando logar com o ID: ${id}`);

      // Preenche o campo ID
      const idField = page.locator('#ID');
      await idField.fill(id);
      console.log(`Campo 'ID' preenchido com o valor '${id}'.`);

      // Preenche o campo Nome
      const nomeField = page.locator('#Nome');
      await nomeField.fill('CORRETOR');
      console.log(`Campo 'Nome' preenchido com o valor 'CORRETOR'.`);

      // Seleciona a opção no combobox
      const dropdown = page.locator('#cdGrupo');
      await dropdown.selectOption('2');
      console.log('Opção "2" selecionada no combobox.');

      // Clica no botão "Gerar Link"
      const gerarLinkButton = page.getByRole('button', { name: 'Gerar Link' });
      await gerarLinkButton.click();
      console.log('Botão "Gerar Link" clicado.');

      // Aguarda a navegação após tentar logar
      await page.waitForLoadState('networkidle');

      // Verifica se saiu da página de acesso negado
      if (page.url() !== 'https://bvpnext.dsv.bradseg.com.br/Account/AccessDenied') {
        console.log(`Login bem-sucedido com o ID: ${id}`);
        break; // Sai do loop se o login for bem-sucedido
      } else {
        console.log(`Falha ao logar com o ID: ${id}`);
      }
    }
  } else {
    console.log('Navegação bem-sucedida. Não foi redirecionado para a página de acesso negado.');
  }
});

When('resto', async ({ page }) => {
  // Navega para a seção "Cotação" e seleciona "Individual"
  await page.getByRole('link', { name: 'Cotação' }).click();
  console.log('Link "Cotação" clicado.');
  await page.getByRole('link', { name: 'Individual' }).click();
  console.log('Link "Individual" clicado.');

  // Preenche os campos obrigatórios
  await page.getByRole('textbox', { name: 'CPF' }).click();
  await page.getByRole('textbox', { name: 'CPF' }).fill('00000008508');
  console.log('Campo "CPF" preenchido.');

  await page.getByRole('textbox', { name: 'Nome' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).fill('TESTE');
  console.log('Campo "Nome" preenchido.');

  await page.getByRole('textbox', { name: 'Cód. Produto' }).click();
  await page.getByRole('textbox', { name: 'Cód. Produto' }).fill('1009');
  console.log('Campo "Cód. Produto" preenchido.');

  // Clica no botão "Novo"
  await page.getByRole('button', { name: 'Novo' }).click();
  console.log('Botão "Novo" clicado.');

  // Preenche os campos adicionais
  await page.locator('#DataNascimento').click();
  await page.locator('#DataNascimento').fill('01011990');
  console.log('Campo "Data de Nascimento" preenchido.');

  await page.locator('#Idade').click();
  await page.locator('#idSexo').selectOption('1');
  console.log('Campo "Sexo" selecionado.');

  await page.getByRole('textbox', { name: 'Nome Social' }).click();
  await page.getByRole('textbox', { name: 'Nome Social' }).fill('teste social');
  await page.getByRole('textbox', { name: 'Nome Social' }).press('Enter');
  console.log('Campo "Nome Social" preenchido.');

  await page.getByLabel('Identidade de Gênero').selectOption('3');
  console.log('Campo "Identidade de Gênero" selecionado.');

  await page.locator('#idTelefone').selectOption('4');
  console.log('Campo "Tipo de Telefone" selecionado.');

  await page.getByRole('textbox', { name: 'DDD' }).click();
  await page.locator('#Telefone').click();
  await page.locator('#Telefone').fill('991526111');
  console.log('Campo "Telefone" preenchido.');

  await page.locator('#Email').click();
  await page.locator('#Email').fill('teste@gmail.com.br');
  console.log('Campo "Email" preenchido.');

  await page.getByRole('textbox', { name: 'Renda Mensal' }).click();
  await page.getByRole('textbox', { name: 'Renda Mensal' }).clear();
  await page.getByRole('textbox', { name: 'Renda Mensal' }).fill('2121');
  console.log('Campo "Renda Mensal" preenchido.');

  // Avança para a próxima etapa
  await page.getByRole('button', { name: 'Avançar' }).click();
  console.log('Botão "Avançar" clicado.');
  await page.waitForTimeout(1000); // Simula um pequeno delay
  await page.getByRole('button', { name: 'Avançar' }).click();
  console.log('Botão "Avançar" clicado novamente.');

  // Finaliza a contratação
  await page.getByRole('button', { name: 'Contratar' }).click();
  console.log('Botão "Contratar" clicado.');
});



When('seleciono o produto por nome {string}', async ({ page }, productName) => {
  const product = page.getByRole('gridcell', { name: productName }); // Localiza o produto pelo nome
  await highlightElement(page, product); // Aplica o highlight no produto
  await product.click(); // Seleciona o produto
  console.log(`Produto '${productName}' selecionado.`);
});

When('seleciono o combobox {string} como {string}', async ({ page }, comboboxName, option) => {
  const combobox = page.locator(`#${comboboxName}`); // Localiza o combobox pelo ID
  await highlightElement(page, combobox); // Aplica o highlight no combobox
  await combobox.selectOption(option); // Seleciona a opção
  console.log(`Opção '${option}' selecionada no combobox '${comboboxName}'.`);
});

When('seleciono a {string} como {string}', async ({ page }, genderOption) => {
  const genderDropdown = page.getByLabel('Identidade de Gênero'); // Localiza o dropdown pelo rótulo
  await highlightElement(page, genderDropdown); // Aplica o highlight no dropdown
  await genderDropdown.selectOption(genderOption); // Seleciona a opção
  console.log(`Identidade de Gênero selecionada como '${genderOption}'.`);
});

/*
18440595000161


96439823000197 id Corretor
01497994000166
02505611000117
03384134000166
03385134000160
03385134000166
04624449000181
04756208000196
05997484000109
07753626000118
088303990001040
08830399000140
08862713000176


import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('link', { name: 'https://bvpnext.dsv.bradseg.' }).click();
  await page.getByRole('link', { name: 'Cotação' }).click();
  await page.getByRole('link', { name: 'Individual' }).click();
  await page.getByRole('textbox', { name: 'CPF' }).click();
  await page.getByRole('textbox', { name: 'CPF' }).fill('00000008508');
  await page.getByRole('textbox', { name: 'Nome' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).fill('TESTE');
  await page.getByRole('textbox', { name: 'Cód. Produto' }).click();
  await page.getByRole('textbox', { name: 'Cód. Produto' }).fill('1009');
  await page.getByRole('button', { name: 'Novo' }).click();

  await page.locator('#DataNascimento').click();
  await page.locator('#DataNascimento').fill('01011990');
  await page.locator('#Idade').click();
  await page.locator('#idSexo').selectOption('1');

  await page.getByRole('textbox', { name: 'Nome Social' }).click();
  await page.getByRole('textbox', { name: 'Nome Social' }).fill('teste social');
  await page.getByRole('textbox', { name: 'Nome Social' }).press('Enter');
  await page.getByLabel('Identidade de Gênero').selectOption('3');
  await page.locator('#idTelefone').selectOption('4');
  await page.getByRole('textbox', { name: 'DDD' }).click();
  await page.locator('#Telefone').click();
  await page.locator('#Telefone').fill('991526111');
  await page.locator('#Email').click();
  await page.locator('#Email').fill('teste@gmail.com.br');

  await page.getByRole('textbox', { name: 'Renda Mensal' }).click();
  await page.getByRole('textbox', { name: 'Renda Mensal' }).clear();
  await page.getByRole('textbox', { name: 'Renda Mensal' }).fill('2121');

  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.waitForTimeout(1000); // Espera 1 segundo para simular o delay
  await page.getByRole('button', { name: 'Avançar' }).click();

  await page.getByRole('button', { name: 'Contratar' }).click();
  
  
  await page.locator('#btnProd').click();

  await page.getByRole('gridcell', { name: 'Crédito Rural Individual' }).click();
  await page.getByRole('gridcell', { name: '1009' }).click();
  await page.locator('#gs_NM_PRODUTO').click();
  await page.locator('#gs_NM_PRODUTO').fill('');
  await page.locator('#gs_NM_PRODUTO').press('CapsLock');
  await page.locator('#gs_NM_PRODUTO').fill('Cr');
  await page.locator('#gs_NM_PRODUTO').press('Dead');
  await page.locator('#gs_NM_PRODUTO').fill('Crédito rural Individual');
  await page.locator('#gs_CD_PRODUTO').click();
  await page.locator('#gs_CD_PRODUTO').fill('1009');
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await page.getByRole('button', { name: 'Fechar' }).click();
  await page.getByRole('gridcell', { name: 'Crédito Rural Individual' }).click();
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await page.locator('#btnProd').click();
  await page.locator('#gs_CD_PRODUTO').click();
  await page.locator('#gs_CD_PRODUTO').fill('1009');
  await page.getByRole('gridcell', { name: '1009' }).click();
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await page.getByRole('button', { name: 'Novo' }).click();
  await page.locator('#DataNascimento').click();
  await page.locator('#Idade').click();
  await page.locator('#idSexo').selectOption('1');
  await page.locator('#idSexo').click();
  await page.getByRole('textbox', { name: 'Nome Social' }).click();
  await page.getByRole('textbox', { name: 'Nome Social' }).fill('teste social');
  await page.getByRole('textbox', { name: 'Nome Social' }).press('Enter');
  await page.getByLabel('Identidade de Gênero').selectOption('3');
  await page.locator('#idTelefone').selectOption('4');
  await page.getByRole('textbox', { name: 'DDD' }).click();
  await page.locator('#Telefone').click();
  await page.locator('#Email').click();
  await page.locator('#Email').fill('teste@gmail.com.br');
  await page.getByRole('textbox', { name: 'Renda Mensal' }).click();
  await page.getByRole('textbox', { name: 'Renda Mensal' }).click();
  await page.getByRole('textbox', { name: 'Renda Mensal' }).click();
  await page.locator('#nmCorretor_ex').click();
  await page.locator('#NumeroDoContrato').click();
  await page.locator('#Prazo').click();
  await page.locator('#ValorDaOperacao').click();
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.locator('#ValorDaOperacao').click();
  await page.getByRole('textbox', { name: 'Renda Mensal' }).click();
  await page.getByRole('textbox', { name: 'Renda Mensal' }).fill('2121');
  await page.locator('#ValorDaOperacao').click();
  await page.locator('#ValorDaOperacao').fill('1212');
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.getByText('710').click();
  await page.getByText('Plano Unico').click();
  await page.getByText('23/05/').click();
  await page.getByText('Crédito Rural Individual').click();
  await page.getByRole('button', { name: 'Contratar' }).click();
  await page.locator('#gs_CD_SUCURSAL').click();
  await page.locator('#gs_CD_SUCURSAL').fill('9367');
  await page.getByRole('gridcell', { name: '9367' }).click();
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await page.getByRole('cell', { name: 'Aguarde Aguarde' }).click();
  await page.getByRole('img', { name: 'Aguarde' }).click();
  await page.getByRole('heading', { name: 'CADASTRO DE PROPOSTA -' }).click();
  await page.getByRole('cell', { name: 'Nº Proposta 812-' }).click();
  await page.getByRole('cell', { name: 'Status Pendente' }).click();
  await page.getByRole('cell', { name: 'Plano Plano Unico' }).click();
  await page.getByRole('cell', { name: 'Produto Crédito Rural' }).click();
  await page.getByRole('cell', { name: 'Sucursal SALVADOR - MERCADO' }).click();
  await page.getByRole('cell', { name: 'Nome (*) TESTE' }).click();
  await page.getByRole('cell', { name: 'Nome (*) TESTE' }).click();
  await page.getByRole('cell', { name: 'Dt. Nascimento (*) 01/01/' }).click();
  await page.getByRole('cell', { name: 'Idade (*) 35' }).click();
  await page.getByRole('textbox', { name: 'Renda Mensal' }).click();
  await page.locator('#dadoslinha2 div').filter({ hasText: 'Masculino Feminino' }).click();
  await page.locator('#Proponente_Label_FIELD_NOMESOCIAL').click();
  await page.getByRole('button', { name: 'Menu Principal' }).click();
  await page.getByRole('link', { name: 'Sair do Sistema' }).click();
});


await page.goto('https://bvpnext.dsv.bradseg.com.br/oAuth/GeraLink');
await page.locator('#ID').click();
await page.locator('#ID').fill('01497994000166');
await page.locator('#Nome').click();
await page.locator('#Nome').fill('CORRETOR');
await page.locator('#cdGrupo').selectOption('2');
await page.getByRole('button', { name: 'Gerar Link' }).click();
await page.getByRole('link', { name: 'https://bvpnext.dsv.bradseg.' }).click();


CORRETOR
MASSIFICADOS
Gerar Link*/