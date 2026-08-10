const listaContatos = []

function cadastrar() {
    const campoNome = document.getElementById('inputnome');
    const campoCpf = document.getElementById('inputcpf');
    const campoNascimento = document.getElementById('inputnascimentodamae'); // campo nascimento da mãe
    const campoEmail = document.getElementById('inputemail');
    const campoTelefone = document.getElementById('inputtelefone');

    const login = {
        nomeC: campoNome.value.trim(),
        cpfC: campoCpf.value.trim(),
        NascimentodamaeC: campoNascimento.value.trim(),
        EmailC: campoEmail.value.trim(),
        TelefoneC: campoTelefone.value.trim()
    };

    const erros = [];

    if(login.nomeC === '') {
        erros.push('O campo nome não pode ficar em branco.');
    } else if (login.nomeC.length < 3) {
        erros.push('Caprice no NOME! Digite ao menos 6 caracteres.')
    }

    if(login.EmailC === '') {
        erros.push('O campo nome não pode ficar em branco.');
    } else if (login.EmailC.length < 3) {
        erros.push('Caprice no EMAIL! Digite ao menos 6 caracteres.')
    }

    if(login.TelefoneC === '') {
        erros.push('O campo nome não pode ficar em branco.');
    } else if (login.TelefoneC.length < 3) {
        erros.push('Caprice no TELEFONE! Digite ao menos 6 caracteres.')
    }

    if (erros.length > 0) {
        alert("Ops! Por favor, caprice no preenchimento do formulário.")
        return;
    }

    listaContatos.push(login);

    localStorage.setItem('login', JSON.stringify(login));

    campoNome.value = '';
    campoNascimento.value = '';
    campoEmail.value = '';
    campoCpf.value = '';
    campoTelefone.value = '';

    console.log(listaContatos);
    alert("Login realizado com sucesso!");


    window.location.href = '/SistemaBanco/pagina.html';
}

function cadastrosen() {
    alert("Ops! Por favor, cadastre sua conta.");
    window.location.href = 'cc/cc.html';
}