
let new_rota = {
    nome_rota: String,
    trajeto: [
        {
            coordenada: String,
            ordem: Number,
        }
    ],
}

let trajetos_add = [];

// Muda para adicionar uma variação em uma rota já existente
const btn_AddRota_AddVariacao = document.getElementById('addRota-addVariacao');
const div_addRota = document.querySelector('.addRota');
const div_addVariacao = document.querySelector('.addVariacao');

btn_AddRota_AddVariacao.addEventListener('change', () => {
    if (btn_AddRota_AddVariacao.checked) {
      div_addRota.style.display = "none";
      div_addVariacao.style.display = "block"
    } else {
      div_addRota.style.display = "block";
      div_addVariacao.style.display = "none"
    }
});


/* Função para verificar se a coordenda fornecida pelo usuário é valida */
function coordenadaValida(coordenada) {
    const regex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;

    if (!regex.test(coordenada)) {
        return false; 
    }

    const [latitude, longitude] = coordenada.split(',').map(function(coord) {
        return parseFloat(coord.trim());
    });

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return false;
    }

    return true; 
}

// Tabela de trajeto
function moverParaCima(event, botao) {
    event.preventDefault();

    var linhaAtual = botao.parentElement.parentElement;
    var linhaAnterior = linhaAtual.previousElementSibling;
    
    if (linhaAnterior) {
        // Troca as linhas
        linhaAtual.parentElement.insertBefore(linhaAtual, linhaAnterior);
        
        // Atualiza as ordens
        atualizarOrdens();
    }
}

function moverParaBaixo(event, botao) {
    event.preventDefault();

    var linhaAtual = botao.parentElement.parentElement;
    var linhaProxima = linhaAtual.nextElementSibling;

    if (linhaProxima) {
        // Troca as linhas
        linhaAtual.parentElement.insertBefore(linhaProxima, linhaAtual);
        
        // Atualiza as ordens
        atualizarOrdens();
    }
}

function reorganizarTrajetos() {
    var table = document.getElementById("trajetoTable").getElementsByTagName('tbody')[0];
    var linhas = table.getElementsByTagName('tr');

    // Criar um novo array temporário para armazenar as paradas na nova ordem
    var novosTrajetos = [];

    for (var i = 0; i < linhas.length; i++) {
        var celulaCoordenada = linhas[i].getElementsByTagName('td')[1].innerText;
        // Adiciona a nova coordenada e a ordem correspondente à lista
        novosTrajetos.push({
            coordenada: celulaCoordenada,
            ordem: i + 1
        });
    }

    // Substitui trajetos_add pela nova ordem
    trajetos_add = novosTrajetos;
}

function atualizarOrdens() {
    var table = document.getElementById("trajetoTable").getElementsByTagName('tbody')[0];
    var linhas = table.getElementsByTagName('tr');

    // Atualiza as ordens na tabela e na lista de trajetos
    for (var i = 0; i < linhas.length; i++) {
        var celulaOrdem = linhas[i].getElementsByTagName('td')[0];
        celulaOrdem.innerText = i + 1; // Atualiza a ordem na tabela

    }
    reorganizarTrajetos()
    console.log(trajetos_add)
}


function moverLinhaParaNovaPosicao(linhaAtual, ordemAntiga, novaOrdem) {
    var table = document.getElementById("trajetoTable").getElementsByTagName('tbody')[0];
    var linhas = table.getElementsByTagName('tr');

    // Remove a linha atual da tabela
    table.removeChild(linhaAtual);

    // Insere a linha de volta na nova posição
    if (novaOrdem <= linhas.length) {
        // Insere a linha na posição correta
        var linhaAlvo = linhas[novaOrdem - 1];
        table.insertBefore(linhaAtual, linhaAlvo);
    } else {
        // Se a nova ordem for maior que o número de linhas, insere no final
        table.appendChild(linhaAtual);
    }

    // Atualiza as ordens após mover a linha
    atualizarOrdens();
}



function removerParada(event, botao) {
    event.preventDefault();

    var linhaAtual = botao.parentElement.parentElement;
    linhaAtual.remove();
    atualizarOrdens()
}

function editarParada(event, botao) {
    event.preventDefault();

    var linhaAtual = botao.parentElement.parentElement;
    var ordemAtual = parseInt(linhaAtual.cells[0].innerText);
    var coordenadaAtual = linhaAtual.cells[1].innerText;

    // Solicita as novas entradas do usuário
    var novaOrdem = prompt("Editar Número da Linha:", ordemAtual);
    var novaCoordenada = prompt("Editar Coordenada (Latitude, Longitude):", coordenadaAtual);

    // Verifica se o usuário cancelou a operação
    if (novaOrdem != null && novaCoordenada != null) {
        // Se a nova ordem é diferente da atual, atualiza as ordens
        if (novaOrdem != ordemAtual) {
            // Atualiza a coordenada
            linhaAtual.cells[1].innerText = novaCoordenada;

            // Atualiza a ordem da linha atual
            linhaAtual.cells[0].innerText = novaOrdem;

            // Move a linha para a nova posição
            moverLinhaParaNovaPosicao(linhaAtual, ordemAtual, parseInt(novaOrdem));
        } else {
            // Apenas atualiza a coordenada
            linhaAtual.cells[1].innerText = novaCoordenada;
        }
    }
}

function adicionarParada(event) {
    event.preventDefault(); // Previne o envio do formulário e recarregamento da página

    var coordenada = document.getElementById("coordenada").value;

    // Verifica se a coordenada é válida
    if (!coordenadaValida(coordenada)) {
        alert("Por favor, insira uma coordenada válida! O formato correto é 'latitude,longitude' com valores numéricos.");
        return;
    }

    var table = document.getElementById("trajetoTable").getElementsByTagName('tbody')[0];
    var novaLinha = table.insertRow();

    var celulaOrdem = novaLinha.insertCell(0);
    var celulaCoordenada = novaLinha.insertCell(1);
    var celulaAcoes = novaLinha.insertCell(2);

    // Define o texto da célula de ordem
    celulaOrdem.innerText = table.getElementsByTagName('tr').length;
    celulaCoordenada.innerText = coordenada;
    celulaAcoes.innerHTML = `
        <button type="button" onclick="moverParaCima(event, this)">↑</button>
        <button type="button" onclick="moverParaBaixo(event, this)">↓</button>
        <button type="button" onclick="editarParada(event, this)">✎</button>
        <button type="button" onclick="removerParada(event, this)">✖</button>
    `;

    // Limpar os campos do formulário após adicionar
    document.getElementById("coordenada").value = "";
    atualizarOrdens()
}
