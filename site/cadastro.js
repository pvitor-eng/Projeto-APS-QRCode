document.getElementById('btn-cadastrar').addEventListener('click', async () => {
    // 1. Pegando os valores digitados na tela
    const nome = document.getElementById('nome-cadastro').value;
    const email = document.getElementById('email-cadastro').value;
    const senha = document.getElementById('senha-cadastro').value;

    // 2. Validação simples para evitar envio de formulário em branco
    if (!nome || !email || !senha) {
        alert("Preencha todos os campos para se cadastrar!");
        return;
    }

    try {
        // 3. Montando o DTO RegisterRequest
        const registerRequestDTO = {
            name: nome,
            email: email,
            password: senha
        };

        // 4. Fazendo o POST para a rota de criação de conta
        const resposta = await fetch('http://localhost:8080/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerRequestDTO)
        });

        // 5. Tratando a resposta do servidor
        if (resposta.ok) {
            // O backend devolve o nome e o token (RegisterResponse)
            const dados = await resposta.json();
            
            // Salvando o token e o nome no armazenamento do navegador
            localStorage.setItem('spda_token', dados.token);
            localStorage.setItem('spda_nome', dados.name);
            
            alert(`Conta criada com sucesso! Bem-vindo(a), ${dados.name}!`);
            
            // Redireciona o usuário direto para a tela principal de gerar QR Code
            window.location.href = "index.html"; 
        } else {
            alert("Erro ao criar conta. Verifique os dados ou se o e-mail já existe no sistema.");
        }

    } catch (erro) {
        console.error("Erro de conexão:", erro);
        alert("Não foi possível conectar ao servidor. O backend está rodando na sua máquina?");
    }
});