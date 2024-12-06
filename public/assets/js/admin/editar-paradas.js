import * as apiGet from '../api/moldes_back/get.js';
import * as util from './util.js';


const rotas = await apiGet.getRotasList()



const getCoordenadas = async () => {
    const inp_coordenada = document.getElementById('coordenada')
    let coord = inp_coordenada.value

    if(await util.isCoordinate(coord)){
        let latitude = coord.split(',')[0].replace(/\s+/g, '')
        let longitude = coord.split(',')[1].replace(/\s+/g, '')
        return [longitude, latitude]
    }
    alert('Coordenada invalida')
    return false
}

const addRotasList = () => {
    const select_rotas = document.getElementById('rotas')
    rotas.forEach(rota => {
        const option = document.createElement('option')
        option.textContent = rota.nome
        option.value = rota.id

        select_rotas.appendChild(option)
    })
}


let rotas_selecionadas = []
const selecionarRota = async () => {
    try {
        // Obtém o ID da rota selecionada
        const select_rotas = document.getElementById('rotas');
        const rotaId = parseInt(select_rotas.value);

        if (isNaN(rotaId)) {
            console.error('ID da rota inválido.');
            return;
        } else if (rotas_selecionadas.includes(rotaId)){
            alert('Rota já selecionada')
            return
        }

        rotas_selecionadas.push(rotaId)
        // Chama a API para obter os detalhes da rota
        const rota_selecionada = await apiGet.getRota(rotaId);

        if (!rota_selecionada || !rota_selecionada.nome) {
            console.error('Rota não encontrada ou inválida:', rota_selecionada);
            return;
        }

        // Cria o elemento da rota selecionada

        const div_rotas_selecionadas = document.getElementById('selected-rotas');
        const rotaDiv = document.createElement('div');
        rotaDiv.classList.add('rota-selecionada');

        const p = document.createElement('p');
        p.textContent = rota_selecionada.nome;

        rotaDiv.appendChild(p);
        div_rotas_selecionadas.appendChild(rotaDiv);
    } catch (error) {
        console.error('Erro ao selecionar a rota:', error);
    }
};

const add_parada = async () => {
    const coords = await getCoordenadas()

}

document.addEventListener('DOMContentLoaded', ()=>{
    addRotasList()
    document.getElementById('selecionar-rota').addEventListener('click',async event => {
        event.preventDefault()
        await selecionarRota()
    })
})