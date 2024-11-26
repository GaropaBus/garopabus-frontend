import * as apiGet from '../api/get.js';

const addOptionRotas = async () => {
    try {
        const rotas = await apiGet.getRotasOnibus();
        const select_rotas = document.getElementById('rotas');
        
        rotas.forEach(element => {
            const option = document.createElement('option');
            option.value = element.id;
            option.textContent = element.nome;
            select_rotas.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar as rotas:', error);
        alert('Erro ao carregar as rotas. Tente novamente mais tarde.');
    }
};

let hora_partida = '';
let hora_chegada = '';
const getHorarios = () => {
    const partidaInput = document.getElementById('horario-partida');
    const chegadaInput = document.getElementById('horario-chegada');

    if (partidaInput.value === '' || chegadaInput.value === '') {
        alert('Algum horário não foi preenchido');
        return false;
    }

    hora_partida = partidaInput.value;
    hora_chegada = chegadaInput.value;
    return true;
};

let tipoDia = '';
const getTipoDia = () => {
    const divs_dias = document.querySelectorAll('.inp-dia');

    for (let element of divs_dias) {
        if (element.checked) {
            tipoDia = element.getAttribute('data-tipoDia');
            return true;
        }
    }

    alert('Selecione o tipo de dia que esse horário será usado');
    return false;
};

const addNewHorarioOnibus = () => {
    if (!getTipoDia()) return;
    if (!getHorarios()) return;

    const select_value = document.getElementById('rotas').value;
    if (select_value === 'null') {
        alert('Selecione uma rota');
        return;
    }

    const enviar = {
        dia_semana: tipoDia,
        hora_partida: hora_partida,
        hora_chegada: hora_chegada,
        id_rota: select_value,
    };

    console.log('Dados a enviar:', enviar);
};

document.addEventListener('DOMContentLoaded', async () => {
    await addOptionRotas();
    const submit = document.getElementById('submit');
    submit.addEventListener('click', (event) => {
        event.preventDefault();
        addNewHorarioOnibus();
    });
});
