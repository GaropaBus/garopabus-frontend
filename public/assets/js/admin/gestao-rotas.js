// Exibir detalhes de variação somente se o checkbox for marcado
document.getElementById('variacao').addEventListener('change', function() {
    const variacaoDetails = document.getElementById('variacao-details');
    if (this.checked) {
        variacaoDetails.style.display = 'block';
    } else {
        variacaoDetails.style.display = 'none';
    }
});

function moverParaCima(botao) {
    var linhaAtual = botao.parentElement.parentElement;
    var linhaAnterior = linhaAtual.previousElementSibling;
    
    if (linhaAnterior) {
    linhaAtual.parentElement.insertBefore(linhaAtual, linhaAnterior);
    }
}

function moverParaBaixo(botao) {
    var linhaAtual = botao.parentElement.parentElement;
    var linhaProxima = linhaAtual.nextElementSibling;

    if (linhaProxima) {
    linhaAtual.parentElement.insertBefore(linhaProxima, linhaAtual);
    }
}

function removerParada(botao) {
    var linhaAtual = botao.parentElement.parentElement;
    linhaAtual.remove();
}

function editarParada(botao) {
    var linhaAtual = botao.parentElement.parentElement;
    var numeroLinha = linhaAtual.cells[0].innerText;
    var coordenada = linhaAtual.cells[1].innerText;

    var novoNumeroLinha = prompt("Editar Número da Linha:", numeroLinha);
    var novaCoordenada = prompt("Editar Coordenada (Latitude, Longitude):", coordenada);

    if (novoNumeroLinha != null && novaCoordenada != null) {
        linhaAtual.cells[0].innerText = novoNumeroLinha;
        linhaAtual.cells[1].innerText = novaCoordenada;
    }
}

function adicionarParada(event) {
    event.preventDefault(); // Previne o envio do formulário e recarregamento da página

    var coordenada = document.getElementById("coordenada").value;

    if (coordenada === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    var table = document.getElementById("trajetoTable").getElementsByTagName('tbody')[0];
    var novaLinha = table.insertRow();

    var celulaCoordenada = novaLinha.insertCell(0);
    var celulaCoordenada = novaLinha.insertCell(1);
    var celulaAcoes = novaLinha.insertCell(2);

    celulaCoordenada.innerText = coordenada;
    celulaAcoes.innerHTML = `
        <button type="button" onclick="moverParaCima(this)">↑</button>
        <button type="button" onclick="moverParaBaixo(this)">↓</button>
        <button type="button" onclick="editarParada(this)">✎</button>
        <button type="button" onclick="removerParada(this)">✖</button>
    `;

    // Limpar os campos do formulário após adicionar
    document.getElementById("coordenada").value = "";
}
