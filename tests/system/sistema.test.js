// Importa os módulos necessários do Selenium WebDriver
const { Builder, By, until } = require('selenium-webdriver');

// Função assíncrona principal que executa o teste
(async function testeCriarUsuario() {
    // Cria uma instância do navegador Chrome
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log('1. Iniciando o teste de criação e edição de usuário...');

        // Acessa a página inicial de cadastro de usuários
        await driver.get('http://localhost:3000');
        console.log('2. Página de cadastro acessada.');
        await driver.sleep(3000); // Pausa de 3 segundos para visualização

        // Preenche o formulário de cadastro de usuário e clica no botão de cadastro
        await driver.findElement(By.id('nome')).sendKeys('Teste');  // Insere "Teste" no campo nome
        await driver.findElement(By.id('email')).sendKeys('Teste@gmail.com');  // Insere "Teste@gmail.com" no campo email
        await driver.findElement(By.css('button[type="submit"]')).click();  // Clica no botão de submit
        console.log('3. Usuário "Teste" cadastrado.');
        await driver.sleep(3000); // Pausa de 3 segundos para visualização

        // Acessa a lista de usuários clicando no botão que leva a 'usuarios.html'
        await driver.findElement(By.css('button[onclick*="usuarios.html"]')).click();
        await driver.wait(until.urlContains('usuarios.html'), 10000);  // Aguarda o redirecionamento para a URL da lista de usuários
        console.log('4. Página de lista de usuários acessada.');
        await driver.sleep(3000); // Pausa de 3 segundos para visualização

        // Encontra e percorre a lista de usuários exibida
        const listaUsuarios = await driver.findElements(By.css('#usuariosLista li'));
        for (let usuario of listaUsuarios) {
            const nomeUsuario = await usuario.getText();  // Obtém o texto do usuário

            // Verifica se o usuário contém o nome "Teste" e abre o modal de edição
            if (nomeUsuario.includes('Teste')) {
                await usuario.findElement(By.css('button')).click(); // Clica no botão de editar
                await driver.wait(until.elementLocated(By.id('modalOverlay')), 10000); // Aguarda até o modal ser exibido
                console.log('5. Modal de edição aberto.');
                await driver.sleep(3000); // Pausa de 3 segundos para visualização

                // Edita os dados do usuário no modal e salva as alterações
                await driver.findElement(By.id('nome')).clear();  // Limpa o campo nome
                await driver.findElement(By.id('nome')).sendKeys('Teste Editado');  // Insere o novo nome
                await driver.findElement(By.id('email')).clear();  // Limpa o campo email
                await driver.findElement(By.id('email')).sendKeys('testeeditado@gmail.com');  // Insere o novo email
                await driver.findElement(By.css('button[onclick="salvarEdicao()"]')).click();  // Clica para salvar a edição
                console.log('6. Usuário editado com sucesso.');
                await driver.sleep(3000); // Pausa de 3 segundos para visualização
                break;
            }
        }

        // Atualiza a lista de usuários para verificar e excluir o usuário editado
        await driver.get('http://localhost:3000/usuarios.html');
        const listaUsuariosAtualizada = await driver.findElements(By.css('#usuariosLista li'));
        for (let usuario of listaUsuariosAtualizada) {
            const nomeUsuario = await usuario.getText();  // Obtém o texto do usuário atualizado

            // Verifica se o nome atualizado está presente e executa a exclusão
            if (nomeUsuario.includes('Teste Editado')) {
                await usuario.findElement(By.css('button.excluir')).click();  // Clica no botão de excluir
                await driver.sleep(3000); // Pausa de 3 segundos para visualização
                await driver.findElement(By.css('button.confirmar')).click(); // Clica para confirmar exclusão
                console.log('7. Usuário excluído com sucesso.');
                await driver.sleep(3000); // Pausa de 3 segundos para visualização
                break;
            }
        }

    } catch (error) {
        console.error('Erro durante o teste:', error);  // Exibe erros, caso ocorra algum
    } finally {
        console.log('8. Encerrando o teste e fechando o navegador.');
        await driver.quit();  // Encerra o navegador ao final do teste
    }
})();
