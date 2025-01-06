import * as apiGet from '../api/moldes_back/get.js';

let rota_nome;
let horarios;
let variacao;

const tbody_semana = document.getElementById('weekSchedule-tbody');
const tbody_feriado = document.getElementById('weekendSchedule-tbody');

const preencherTabelaHorariosSemana = () => {
    if (!horarios.dias_uteis) {
        console.error("Dados da rota ou horários não encontrados");
        return;
    }

    tbody_semana.innerHTML = '';

    for (const horario of horarios.dias_uteis) {
        const tr = document.createElement('tr');

        if (!variacao){
            const tdVariacao = document.createElement('td');
            tdVariacao.textContent = horario.tipo_variacao;
            tr.appendChild(tdVariacao);
        }

        const tdHorarioPartida = document.createElement('td');
        tdHorarioPartida.textContent = horario.hora_partida;
        tr.appendChild(tdHorarioPartida);

        const tdHorarioChegada = document.createElement('td');
        tdHorarioChegada.textContent = horario.hora_chegada;
        tr.appendChild(tdHorarioChegada);

        tbody_semana.appendChild(tr);
    }
};

const preencherTabelaHorariosFeriado = () => {
    if (!horarios.fim_semana) {
        console.error("Dados da rota ou horários não encontrados");
        return;
    }

    tbody_feriado.innerHTML = '';

    for (const horario of horarios.fim_semana) {
        const tr = document.createElement('tr');

        if (!variacao){
            const tdVariacao = document.createElement('td');
            tdVariacao.textContent = horario.tipo_variacao;
            tr.appendChild(tdVariacao);
        }

        const tdHorarioPartida = document.createElement('td');
        tdHorarioPartida.textContent = horario.hora_partida;
        tr.appendChild(tdHorarioPartida);

        const tdHorarioChegada = document.createElement('td');
        tdHorarioChegada.textContent = horario.hora_chegada;
        tr.appendChild(tdHorarioChegada);

        tbody_feriado.appendChild(tr);
    }
};

const formatarString = (str) => {
    // Dividir a string no caractere "-"
    const partes = str.split('-');

    // Capitalizar a primeira letra de cada parte e unir com " - "
    return partes
        .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
        .join(' - ');
};

// Função para preencher o nome da rota
const preencherNomeRota = () => {
    const routeNameElement = document.getElementById('routeName');

    // Preenche o nome da rota
    routeNameElement.textContent = rota_nome;
};

// Função para obter dados da API e inicializar o preenchimento
const inicializarPagina = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const rota_url = urlParams.get('rota') || 'Desconhecida';
        horarios = await apiGet.getHorariosNomeRota(rota_url)
        rota_nome = formatarString(rota_url)
        variacao = horarios.dias_uteis[0].tipo_variacao === null

        if (variacao){
            const ths = document.querySelectorAll('.variacao')
            ths.forEach(element => {
                element.style.display = 'none'
            })
        }

        document.title = `GaropaBus | ${rota_nome}`; 
        
        preencherTabelaHorariosSemana(); // Preencher tabela de horários
        preencherNomeRota(); // Preencher nome da rota
        preencherTabelaHorariosFeriado();
    } catch (error) {
        console.error("Erro ao obter dados da API:", error);
    }
};

document.addEventListener('DOMContentLoaded', inicializarPagina);


window.changeTab= (tab) => {
    const weekSchedule = document.getElementById('weekSchedule');
    const weekendSchedule = document.getElementById('weekendSchedule');

    if (tab === 'semana') {
        weekSchedule.style.display = 'block';
        weekendSchedule.style.display = 'none';
    } else {
        weekSchedule.style.display = 'none';
        weekendSchedule.style.display = 'block';
    }

    // Limpar a classe 'active' de todos os elementos .tab
    document.querySelectorAll('.tab').forEach(tabEl => {
        tabEl.classList.remove('active');
    });

    // Adicionar a classe 'active' ao elemento clicado
    const activeTab = tab === 'semana' ? document.querySelector('.tab:nth-child(1)') : document.querySelector('.tab:nth-child(2)');
    activeTab.classList.add('active');
}

window.goBack = () => {
    window.location.href = "/user/rotas-onibus";
}



/* Arrastar e trocar os horarios */

let startX;
let startY;
let endX;
let endY;

const threshold = 50; // Distância mínima para considerar um swipe
const container = document.querySelector('main'); // Elemento onde queremos detectar o swipe

// Detecta o início do toque
container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

// Detecta o movimento do toque (opcional, para detectar enquanto arrasta)
container.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
});

// Detecta o fim do toque
container.addEventListener('touchend', () => {
    const diffX = endX - startX;
    const diffY = endY - startY;
    
    const weekSchedule = document.getElementById('weekSchedule');
    const weekendSchedule = document.getElementById('weekendSchedule');
    const tabs = document.querySelectorAll('.tab');

    // Verificar se o movimento foi horizontal (esquerda ou direita)
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Verificar se o swipe foi para a direita
        if (diffX > threshold) {
            weekSchedule.style.display = 'block';
            weekendSchedule.style.display = 'none';
            
            tabs[1].classList.remove('active')
            tabs[0].classList.add('active')
        }
        // Verificar se o swipe foi para a esquerda
        else if (diffX < -threshold) {
            weekSchedule.style.display = 'none';
            weekendSchedule.style.display = 'block';
            
            tabs[0].classList.remove('active')
            tabs[1].classList.add('active')
        }
    }
});
