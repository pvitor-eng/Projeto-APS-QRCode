document.getElementById('btn-login').addEventListener('click', async () => {
    // 1. Pegando os dados digitados nos inputs
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        // 2. Montando o DTO LoginRequest
        const loginRequestDTO = {
            email: email,
            password: senha
        };

        // 3. Enviando para o backend (ajuste a URL se o do seu amigo for diferente)
        const resposta = await fetch('http://localhost:8080/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequestDTO)
        });

        // 4. Tratando a resposta
        if (resposta.ok) {
            // Recebendo o DTO LoginResponse (nome, token, role)
            const dados = await resposta.json();
            
            // 5. Salvando o Token no navegador para usar nas próximas requisições
            localStorage.setItem('spda_token', dados.token);
            localStorage.setItem('spda_role', dados.role);
            localStorage.setItem('spda_nome', dados.name);

            alert(`Bem-vindo(a), ${dados.name}!`);
            
            // 6. Redireciona o usuário para a tela principal (a do QR Code)
            window.location.href = "index.html"; 
        } else {
            alert("E-mail ou senha incorretos. Tente novamente.");
        }

    } catch (erro) {
        console.error("Erro de conexão:", erro);
        alert("Não foi possível conectar ao servidor. O backend está rodando?");
    }
});