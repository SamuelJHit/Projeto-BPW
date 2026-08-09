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
        nomeC: campoNome.value,
        cpfC: campoCpf.value,
        NascimentodamaeC: campoNascimento.value,
        EmailC: campoEmail.value,
        TelefoneC: campoTelefone.value
    };

    listaContatos.push(login);

    campoNome.value = '';
    campoNascimento.value = '';
    campoEmail.value = '';
    campoCpf.value = '';
    campoTelefone.value = '';

console.log(listaContatos);
}