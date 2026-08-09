const listaContatos = []

function cadastrar() {
    const campoNome = document.getElementById('inputnome');
    const campoCpf = document.getElementById('inputcpf');
    const campoNascimento = document.getElementById('inputnascimentodamae'); // campo nascimento da mãe
    const campoEmail = document.getElementById('inputemail');
    const campoTelefone = document.getElementById('inputtelefone');

    if (!campoNome.value || !campoEmail.value || !campoTelefone.value) {
    alert("Preencha todos os campos!");
    return;
  }


    const login = {
        nomeC: campoNome.value.trim(),
        cpfC: campoCpf.value.trim(),
        NascimentodamaeC: campoNascimento.value.trim(),
        EmailC: campoEmail.value.trim(),
        TelefoneC: campoTelefone.value.trim()
    };

    const erros = [];

    if(nomeC === '') {
        erros.push('O campo nome não pode ficar em branco.');
    } else if (nomeC.length < 3) {
        erros.push('Caprice no NOME! Digite ao menos 6 caracteres.')
    }

    if(EmailC === '') {
        erros.push('O campo nome não pode ficar em branco.');
    } else if (EmailC.length < 3) {
        erros.push('Caprice no EMAIL! Digite ao menos 6 caracteres.')
    }

    if(TelefoneC === '') {
        erros.push('O campo nome não pode ficar em branco.');
    } else if (TelefoneC.length < 3) {
        erros.push('Caprice no TELEFONE! Digite ao menos 6 caracteres.')
    }

    if (erros.length > 0) {
        alert("Ops! Por favor, caprice no preenchimento do formulário.")
    }

    listaContatos.push(login);

    campoNome.value = '';
    campoNascimento.value = '';
    campoEmail.value = '';
    campoCpf.value = '';
    campoTelefone.value = '';

console.log(listaContatos);
}