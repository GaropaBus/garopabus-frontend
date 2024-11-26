import * as apiGet from '../api/get.js';

// Obter as rotas do backend
const rotas = await apiGet.getRotasOnibus();
const rotas_partindo = await apiGet.getRotasOnibusPartindoGaropaba();
const rotas_sentido = await apiGet.getRotasOnibusSentidoGaropaba();

// Selecionar o elemento tbody da tabela
const tbody_partindo = document.getElementById("tabelaRotasPartindo");
const tbody_sentido = document.getElementById("tabelaRotasSentido");


// Função para adicionar as rotas na tabela
const preencherTabelaRotasPartindo = (rotas) => {
    // Limpar o tbody antes de adicionar os dados
    tbody_partindo.innerHTML = '';

    // Percorrer todas as rotas e criar uma linha para cada uma
    rotas.forEach((rota) => {
        const tr = document.createElement('tr'); // Criar uma nova linha

        // Coluna do nome da rota
        const tdNome = document.createElement('td');
        tdNome.textContent = rota.nome;
        tdNome.classList.add('item-nome-rota'); // Adiciona uma classe para estilizar
        tdNome.onclick = () => showSchedule(rota.id);
        tr.appendChild(tdNome);

        // Coluna de ações com ícones
        const tdAcoes = document.createElement('td');
        tdAcoes.classList.add('buttons');

        // Primeiro ícone (mapa)
        const divMapa = document.createElement('div');
        divMapa.classList.add('btn-table-routes-itens');
        const iconeMapa = document.createElement('i');
        iconeMapa.classList.add('fa', 'fa-map-location-dot');
        divMapa.appendChild(iconeMapa);

        // Segundo ícone (ver horários)
        const divHorarios = document.createElement('div');
        divHorarios.classList.add('btn-table-routes-itens');
        divHorarios.setAttribute('id', 'horarios');
        divHorarios.onclick = () => showSchedule(rota.id);
        const iconeHorarios = document.createElement('i');
        iconeHorarios.classList.add('fa-regular', 'fa-clock', 'fa-fw');
        divHorarios.appendChild(iconeHorarios);

        // Adiciona os ícones à coluna de ações
        tdAcoes.appendChild(divMapa);
        tdAcoes.appendChild(divHorarios);
        tr.appendChild(tdAcoes);

        // Adicionar a linha ao tbody
        tbody_partindo.appendChild(tr);
    });
};

const preencherTabelaRotasSentido = (rotas) => {
    // Limpar o tbody antes de adicionar os dados
    tbody_sentido.innerHTML = '';

    // Percorrer todas as rotas e criar uma linha para cada uma
    rotas.forEach((rota) => {
        const tr = document.createElement('tr'); // Criar uma nova linha

        // Coluna do nome da rota
        const tdNome = document.createElement('td');
        tdNome.textContent = rota.nome;
        tdNome.classList.add('item-nome-rota'); // Adiciona uma classe para estilizar
        tdNome.onclick = () => showSchedule(rota.id);
        tr.appendChild(tdNome);

        // Coluna de ações com ícones
        const tdAcoes = document.createElement('td');
        tdAcoes.classList.add('buttons');

        // Primeiro ícone (mapa)
        const divMapa = document.createElement('div');
        divMapa.classList.add('btn-table-routes-itens');
        const iconeMapa = document.createElement('i');
        iconeMapa.classList.add('fa', 'fa-map-location-dot');
        divMapa.appendChild(iconeMapa);

        // Segundo ícone (ver horários)
        const divHorarios = document.createElement('div');
        divHorarios.classList.add('btn-table-routes-itens');
        divHorarios.setAttribute('id', 'horarios');
        divHorarios.onclick = () => showSchedule(rota.id);
        const iconeHorarios = document.createElement('i');
        iconeHorarios.classList.add('fa-regular', 'fa-clock', 'fa-fw');
        divHorarios.appendChild(iconeHorarios);

        // Adiciona os ícones à coluna de ações
        tdAcoes.appendChild(divMapa);
        tdAcoes.appendChild(divHorarios);
        tr.appendChild(tdAcoes);

        // Adicionar a linha ao tbody
        tbody_sentido.appendChild(tr);
    });
};

// Preencher a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    preencherTabelaRotasPartindo(rotas_partindo);
    preencherTabelaRotasSentido(rotas_sentido);
});

// Função para redirecionar para o link específico utilizando query strings
export const showSchedule = async (routeId) => {
    const selectedRoute = rotas.find(route => route.id === routeId);

    if (selectedRoute) {
        // Substitui espaços em branco no nome da rota para construir o nome na URL
        const routeName = selectedRoute.nome.replace(/ /g, '');
        
        // Utiliza query strings para redirecionar
        const link = `/user/horarios/?rota=${encodeURIComponent(routeName)}`;

        // Redireciona para o link com a query string
        window.location.href = link;
    } else {
        console.error('Rota não encontrada!');
    }
};
