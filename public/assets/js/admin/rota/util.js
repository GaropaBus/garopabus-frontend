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
function moverParaCima(event, botao, tableId = "trajetoTable") {
    event.preventDefault();

    var linhaAtual = botao.parentElement.parentElement;
    var linhaAnterior = linhaAtual.previousElementSibling;
    
    if (linhaAnterior) {
        // Troca as linhas
        linhaAtual.parentElement.insertBefore(linhaAtual, linhaAnterior);
        
        // Atualiza as ordens
        atualizarOrdens(tableId);
    }
}

function moverParaBaixo(event, botao, tableId = "trajetoTable") {
    event.preventDefault();

    var linhaAtual = botao.parentElement.parentElement;
    var linhaProxima = linhaAtual.nextElementSibling;

    if (linhaProxima) {
        // Troca as linhas
        linhaAtual.parentElement.insertBefore(linhaProxima, linhaAtual);
        
        // Atualiza as ordens
        atualizarOrdens(tableId);
    }
}

function reorganizarTrajetos(tableId = "trajetoTable") {
    var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
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

function atualizarOrdens(tableId = "trajetoTable") {
    var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var linhas = table.getElementsByTagName('tr');

    // Atualiza as ordens na tabela
    for (var i = 0; i < linhas.length; i++) {
        var celulaOrdem = linhas[i].getElementsByTagName('td')[0];
        celulaOrdem.innerText = i + 1; // Atualiza a ordem na tabela
    }
    reorganizarTrajetos(tableId);
    console.log(trajetos_add);
}

function removerParada(event, botao, tableId = "trajetoTable") {
    event.preventDefault();

    var linhaAtual = botao.parentElement.parentElement;
    linhaAtual.remove();
    atualizarOrdens(tableId);
}

function editarParada(event, botao, tableId = "trajetoTable") {
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
            moverLinhaParaNovaPosicao(linhaAtual, ordemAtual, parseInt(novaOrdem), tableId);
        } else {
            // Apenas atualiza a coordenada
            linhaAtual.cells[1].innerText = novaCoordenada;
        }
    }
}

function moverLinhaParaNovaPosicao(linhaAtual, ordemAntiga, novaOrdem, tableId = "trajetoTable") {
    var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
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
    atualizarOrdens(tableId);
}

function mostrarFormularioEdicao(nameRota) {
    // Oculta todos os outros formulários
    const allForms = document.querySelectorAll('[id^="editForm-"]');
    allForms.forEach(form => form.style.display = 'none');

    // Exibe apenas o formulário correspondente à rota clicada
    const editForm = document.getElementById(`editForm-${nameRota}`);
    if (editForm) {
        editForm.style.display = "block";
    }
}


function mostrarFormularioEdicao(nameRota) {
    // Oculta todos os outros formulários
    const allForms = document.querySelectorAll('[id^="editForm-"]');
    allForms.forEach(form => form.style.display = 'none');

    // Exibe apenas o formulário correspondente à rota clicada
    const editForm = document.getElementById(`editForm-${nameRota}`);
    if (editForm) {
        editForm.style.display = "block";
    }
}


