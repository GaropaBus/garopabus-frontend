import * as util from './util.js'
// Muda para adicionar uma variação em uma rota já existente
const btn_AddRota_AddVariacao = document.getElementById('addRota-addVariacao');
const div_addVariacao = document.querySelector('.addVariacao');
const div_addRota = document.querySelector('.addRota')

btn_AddRota_AddVariacao.addEventListener('change', () => {
    if (btn_AddRota_AddVariacao.checked) {
        div_addRota.hidden = true; 
        div_addVariacao.hidden = false; 
    } else {
        div_addRota.hidden = false; 
        div_addVariacao.hidden = true; 
    }
});



// Tabela de pontos de trajeto
let trajetos_add = [];

const moverParaCima = (event, botao, tableId = "trajetoTable") => {
    event.preventDefault();

    var linhaAtual = botao.parentElement.parentElement;
    var linhaAnterior = linhaAtual.previousElementSibling;

    if (linhaAnterior) {
        // Troca as linhas
        linhaAtual.parentElement.insertBefore(linhaAtual, linhaAnterior);

        // Atualiza as ordens
        atualizarOrdens(tableId);
    }
};


const moverParaBaixo = (event, botao, tableId = "trajetoTable") => {
    event.preventDefault();

    var linhaAtual = botao.parentElement.parentElement;
    var linhaProxima = linhaAtual.nextElementSibling;

    if (linhaProxima) {
        // Troca as linhas
        linhaAtual.parentElement.insertBefore(linhaProxima, linhaAtual);

        // Atualiza as ordens
        atualizarOrdens(tableId);
    }
};


const reorganizarTrajetos = (tableId = "trajetoTable") => {
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

const atualizarOrdens = (tableId = "trajetoTable") => {
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
    
const removerParada = (event, botao, tableId = "trajetoTable") => {
    event.preventDefault();

    var linhaAtual = botao.parentElement.parentElement;
    linhaAtual.remove();
    atualizarOrdens(tableId);
}

const editarParada = (event, botao, tableId = "trajetoTable") => {
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

const moverLinhaParaNovaPosicao = (linhaAtual, ordemAntiga, novaOrdem, tableId = "trajetoTable") => {
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

const mostrarFormularioEdicao = (nameRota) => {
    // Oculta todos os outros formulários
    const allForms = document.querySelectorAll('[id^="editForm-"]');
    allForms.forEach(form => form.style.display = 'none');

    // Exibe apenas o formulário correspondente à rota clicada
    const editForm = document.getElementById(`editForm-${nameRota}`);
    if (editForm) {
        editForm.style.display = "block";
    }
}

//Parte de modificar a tabela de trajetos
const adicionarPontoTrajeto = (event, tableId = "trajetoTable") => {
    event.preventDefault(); // Previne o envio do formulário e recarregamento da página

    var coordenada = document.getElementById("coordenada").value;

    // Verifica se a coordenada é válida
    if (!util.isCoordinate(coordenada)) {
        alert("Por favor, insira uma coordenada válida! O formato correto é 'latitude,longitude' com valores numéricos.");
        return;
    }

    var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var novaLinha = table.insertRow();

    var celulaOrdem = novaLinha.insertCell(0);
    var celulaCoordenada = novaLinha.insertCell(1);
    var celulaAcoes = novaLinha.insertCell(2);

    // Define o texto da célula de ordem
    celulaOrdem.innerText = table.getElementsByTagName('tr').length;
    celulaCoordenada.innerText = coordenada;
    celulaAcoes.innerHTML = `
        <button type="button" onclick="moverParaCima(event, this, '${tableId}')">↑</button>
        <button type="button" onclick="moverParaBaixo(event, this, '${tableId}')">↓</button>
        <button type="button" onclick="editarParada(event, this, '${tableId}')">✎</button>
        <button type="button" onclick="removerParada(event, this, '${tableId}')">✖</button>
    `;

    // Limpar os campos do formulário após adicionar
    document.getElementById("coordenada").value = "";
    atualizarOrdens(tableId);
}

document.addEventListener('DOMContentLoaded', () => {
    // Corrige o seletor para buscar elementos pela classe
    document.querySelectorAll('.btn-add-ponto-trajeto').forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault(); // Previne o comportamento padrão do botão
            adicionarPontoTrajeto(event); // Chama a função corretamente
        });
    });
    
    // Add Funções no escopo global
    window.moverParaBaixo = moverParaBaixo;
    window.moverParaCima = moverParaCima;
    window.editarParada = editarParada;
    window.removerParada = removerParada;

});
