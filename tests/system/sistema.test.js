const { Builder, By, until } = require('selenium-webdriver');

(async function testeCriarUsuario() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log('Iniciando o teste de criação de usuário...');
        
        // Define um tempo de espera implícito para desacelerar as interações
        await driver.manage().setTimeouts({ implicit: 2000 });

        // Acessa a página de cadastro de usuários
        console.log('Acessando a página de cadastro de usuários...');
        await driver.get('http://localhost:3000');
        await driver.sleep(2000); // Espera 2 segundos

        // Preenche o formulário de cadastro
        console.log('Preenchendo o formulário de cadastro...');
        const inputNome = await driver.findElement(By.id('nome'));
        await inputNome.sendKeys('Teste');
        await driver.sleep(2000); // Pausa de 2 segundos após preencher o nome

        const inputEmail = await driver.findElement(By.id('email'));
        await inputEmail.sendKeys('Teste@gmail.com');
        await driver.sleep(2000); // Pausa de 2 segundos após preencher o email

        // Clica no botão de cadastro
        console.log('Clicando no botão de cadastro...');
        const botaoCadastrar = await driver.findElement(By.css('button[type="submit"]'));
        await botaoCadastrar.click();
        await driver.sleep(2000); // Pausa de 2 segundos após o clique no cadastro

        // Aguardando que o usuário seja cadastrado
        console.log('Aguardando a conclusão do cadastro...');
        await driver.sleep(2000); // Aguarda 2 segundos

        // Clica no botão "Ver Usuários" para acessar a lista
        console.log('Clicando no botão para ver os usuários...');
        const botaoVerUsuarios = await driver.findElement(By.css('button[onclick*="usuarios.html"]'));
        await botaoVerUsuarios.click();
        console.log('Botão "Ver Usuários" clicado.');
        await driver.sleep(2000); // Pausa de 2 segundos após o clique no botão

        // Aguardando a navegação para a página de usuários
        console.log('Aguardando a página de usuários...');
        await driver.wait(until.urlContains('usuarios.html'), 10000); // Verifica se a URL contém 'usuarios.html'
        await driver.sleep(2000); // Pausa de 2 segundos após a navegação

        // Aguardando a lista de usuários ser visível
        await driver.wait(until.elementLocated(By.css('#usuariosLista li')), 10000); // Espera até que os usuários apareçam
        await driver.sleep(2000); // Pausa de 2 segundos para visualizar os usuários

        // Verifica se o usuário "Teste" aparece na lista
        console.log('Verificando se o usuário aparece na lista...');
        const listaUsuarios = await driver.findElements(By.css('#usuariosLista li')); // Seletor da lista de usuários
        let usuarioEncontrado = false;
        let botaoEditar;
        let botaoExcluir;

        for (let usuario of listaUsuarios) {
            const nomeUsuario = await usuario.getText();
            if (nomeUsuario.includes('Teste')) {
                usuarioEncontrado = true;

                // Localiza o botão de editar para o usuário "Teste"
                botaoEditar = await usuario.findElement(By.css('button')); // Seletor para o botão de editar
                break;
            }
        }

        if (usuarioEncontrado && botaoEditar) {
            console.log('Usuário "Teste" encontrado. Clicando em Editar...');
            await botaoEditar.click(); // Clica no botão de editar
            await driver.sleep(2000); // Pausa de 2 segundos após o clique

            // Aguardando o modal de edição abrir
            await driver.wait(until.elementLocated(By.id('modalOverlay')), 10000);
            console.log('Modal de edição aberto.');
            await driver.sleep(2000); // Pausa de 2 segundos para visualizar o modal

            // Preenche o formulário de edição
            const inputNomeEditado = await driver.findElement(By.id('nome'));
            await inputNomeEditado.clear(); // Limpa o campo de nome
            await inputNomeEditado.sendKeys('Teste Editado'); // Preenche com o novo nome
            await driver.sleep(2000); // Pausa de 2 segundos após preencher o nome

            const inputEmailEditado = await driver.findElement(By.id('email'));
            await inputEmailEditado.clear(); // Limpa o campo de email
            await inputEmailEditado.sendKeys('testeeditado@gmail.com'); // Preenche com o novo email
            await driver.sleep(2000); // Pausa de 2 segundos após preencher o email

            // Clica no botão de salvar
            const botaoSalvar = await driver.findElement(By.css('button[onclick="salvarEdicao()"]'));
            await botaoSalvar.click();
            console.log('Clicando no botão de salvar...');
            await driver.sleep(2000); // Pausa de 2 segundos após salvar

            // Aguardando a atualização do usuário
            await driver.sleep(2000); // Aguarda 2 segundos após salvar a edição

            console.log('Usuário editado com sucesso!');
        } else {
            console.log('Usuário "Teste" não encontrado ou botão de editar não encontrado.');
        }

        // Aguardando a lista de usuários ser visível após a edição
        console.log('Recarregando a lista de usuários...');
        await driver.get('http://localhost:3000/usuarios.html');
        await driver.sleep(2000); // Pausa de 2 segundos após recarregar a página

        // Agora, vamos procurar o usuário editado e clicar no botão de excluir
        const listaUsuariosAtualizada = await driver.findElements(By.css('#usuariosLista li'));
        let usuarioEditadoExcluido = false;

        for (let usuario of listaUsuariosAtualizada) {
            const nomeUsuario = await usuario.getText();
            if (nomeUsuario.includes('Teste Editado')) {
                usuarioEditadoExcluido = true;

                // Localiza o botão de excluir para o usuário editado
                botaoExcluir = await usuario.findElement(By.css('button.excluir')); // Seletor para o botão de excluir
                break;
            }
        }

        if (usuarioEditadoExcluido && botaoExcluir) {
            console.log('Usuário editado encontrado. Clicando em Excluir...');
            await botaoExcluir.click(); // Clica no botão de excluir
            await driver.sleep(2000); // Pausa de 2 segundos após clicar no botão de excluir

            // Aguardando o botão de confirmação de exclusão aparecer
            console.log('Aguardando o botão de confirmação de exclusão...');
            const botaoConfirmarExclusao = await driver.findElement(By.css('button.confirmar')); // Seletor para o botão de confirmação
            await botaoConfirmarExclusao.click(); // Clica no botão de confirmar exclusão
            await driver.sleep(2000); // Pausa de 2 segundos após a confirmação

            // Aguardando a exclusão do usuário
            await driver.sleep(2000); // Pausa de 2 segundos após a exclusão
            console.log('Usuário excluído com sucesso!');
        } else {
            console.log('Usuário editado não encontrado ou botão de excluir não encontrado.');
        }

    } catch (error) {
        console.error('Erro durante o teste:', error);
    } finally {
        console.log('Encerrando o teste e fechando o navegador.');
        await driver.quit();
    }
})();
