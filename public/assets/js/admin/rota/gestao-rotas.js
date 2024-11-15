import * as util from './util.js';
let new_rota = {}

let trajetos_add = [];

// Muda para adicionar uma variação em uma rota já existente
const btn_AddRota_AddVariacao = document.getElementById('addRota-addVariacao');
const div_addRota = document.querySelector('.addRota');
const div_addVariacao = document.querySelector('.addVariacao');

btn_AddRota_AddVariacao.addEventListener('change', () => {
    if (btn_AddRota_AddVariacao.checked) {
        div_addRota.hidden = true; 
        div_addVariacao.hidden = false; 
    } else {
        div_addRota.hidden = false; 
        div_addVariacao.hidden = true; 
    }
});


//Parte de modificar a tabela de trajetos
function adicionarParada(event, tableId = "trajetoTable") {
    event.preventDefault(); // Previne o envio do formulário e recarregamento da página

    var coordenada = document.getElementById("coordenada").value;

    // Verifica se a coordenada é válida
    if (!coordenadaValida(coordenada)) {
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


// Adicionar uma nova rota

function adicionarRota(){
    if (document.getElementById("name-rota").value == '') {
        alert("Coloque um nome na parada")
        return
    }
    if (trajetos_add.length < 2){
        alert("Você tem que colocar um fim e um inicio no minimo para o trajeto")
        return
    }
    new_rota = {
        nomeRota: document.getElementById("name-rota").value,
        trajeto: trajetos_add,
        varicao: null
    }
    console.log(new_rota)
}

document.getElementById("addNewRota").addEventListener("click", adicionarRota)

// Rotas já cadastradas
const editRotas = document.getElementById("rota-item");

let rotas = [
    {
        nameRota: "Garopaba x Rosa",
        trajeto: [
            {ordem: 1, coordenada: "-28.026928577851876, -48.62888570583518"},
            {ordem: 2, coordenada: "-28.026928577851876, -48.62888570583518"},
            {ordem: 3, coordenada: "-28.026928577851876, -48.62888570583518"}
        ],
        variacao: null
    },
    {
        nameRota: "Garopaba x Rosa",
        trajeto: [
            {ordem: 1, coordenada: "-28.026928577851876, -48.62888570583518"},
            {ordem: 2, coordenada: "-28.026928577851876, -48.62888570583518"},
            {ordem: 3, coordenada: "-28.026928577851876, -48.62888570583518"}
        ],
        variacao: "Via Ressacada" 
    }
]

// Função para carregar os dados da rota para o formulário

// Gerar a lista de rotas e associar o botão de edição
for (let i = 0; i < rotas.length; i++) {
    const rota = rotas[i];
    editRotas.innerHTML += `
        <div>
          <div class="item">
            <div class="parada-info">
                <div class="name-item">
                    <p><span>${rota.nameRota}</span></p>
                    ${rota.variacao ? `<p>(<span id="variacao">${rota.variacao}</span>)</p>` : ''}
                </div>
                <!-- Formulário para editar a rota -->
                <div id="editForm-${rota.nameRota}" style="display: none;">
                    <form class="inputs">
                    <div class="name-rota-div inp">
                        <label for="edit-name-rota-${rota.nameRota}">Nome da Rota</label>
                        <input type="text" id="edit-name-rota-${rota.nameRota}" placeholder="Garopaba x Rosa" value="${rota.nameRota}" />
                    </div>
                
                    <fieldset>
                        <legend>Trajeto da linha</legend>
                        <div class="inputs">
                        <div>
                            <label for="edit-coordenada-${rota.nameRota}">Coordenada (Latitude, Longitude):</label>
                            <input type="text" id="edit-coordenada-${rota.nameRota}" placeholder="Ex: -22.91216, -43.23015" />
                        </div>
                
                        <div class="submit-button">
                            <button type="button" onclick="adicionarParada(event, edit-trajetoTable-${rota.nameRota})">
                            Adicionar ponto de trajeto
                            </button>
                        </div>
                        </div>
                
                        <table id="edit-trajetoTable-${rota.nameRota}">
                        <thead>
                            <tr>
                            <th>Ordem</th>
                            <th>Latitude e Longitude</th>
                            <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Aqui serão adicionados os pontos de trajeto da rota -->
                        </tbody>
                        </table>
                    </fieldset>
                
                    <div class="submit-button">
                        <button type="button" onclick="salvarEdicao('${rota.nameRota}')">Salvar Alterações</button>
                    </div>
                    </form>
                </div>
            </div>
            <div class="parada-actions">
              <button class="edit-btn" onclick="mostrarFormularioEdicao('${rota.nameRota}')">✏️</button>
              <button class="delete-btn">❌</button>
            </div>
          </div>
        </div> 
    `;
}
