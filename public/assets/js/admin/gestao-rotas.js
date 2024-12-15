import * as util from './util.js';
let new_rota = {}


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


// Função para carregar os dados da rota para o formulário
