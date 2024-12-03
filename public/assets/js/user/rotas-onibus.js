import * as apiGet from '../api/get.js';


// Função genérica para preencher a tabela
const preencherTabelaRotas = (rotas, tbody) => {
    // Limpar o conteúdo existente na tabela
    tbody.innerHTML = '';

    // Percorrer todas as rotas e adicionar as linhas
    rotas.forEach((rota) => {
        const tr = document.createElement('tr'); // Criar uma linha

        // Coluna com o nome da rota
        const tdNome = document.createElement('td');
        tdNome.textContent = rota.nome;
        tdNome.classList.add('item-nome-rota'); // Classe para estilização
        tdNome.onclick = () => showSchedule(rota.id); // Ação ao clicar
        tr.appendChild(tdNome);

        // Coluna de ações com ícones
        const tdAcoes = document.createElement('td');
        tdAcoes.classList.add('buttons');

        // Ícone do mapa
        const divMapa = document.createElement('div');
        divMapa.classList.add('btn-table-routes-itens');
        const iconeMapa = document.createElement('i');
        iconeMapa.classList.add('fa', 'fa-map-location-dot'); // Compatível com Font Awesome 4.7
        divMapa.appendChild(iconeMapa);

        // Ícone de horários
        const divHorarios = document.createElement('div');
        divHorarios.classList.add('btn-table-routes-itens');
        divHorarios.setAttribute('id', 'horarios');
        divHorarios.onclick = () => showSchedule(rota.id);
        const iconeHorarios = document.createElement('i');
        iconeHorarios.classList.add('fa', 'fa-clock'); // Compatível com Font Awesome 4.7
        divHorarios.appendChild(iconeHorarios);

        // Adicionar ícones à coluna de ações
        tdAcoes.appendChild(divMapa);
        tdAcoes.appendChild(divHorarios);
        tr.appendChild(tdAcoes);

        // Adicionar a linha ao tbody
        tbody.appendChild(tr);
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Obter dados das rotas do backend
        const rotas_partindo = await apiGet.getRotasOnibusPartindoGaropaba();
        const rotas_sentido = await apiGet.getRotasOnibusSentidoGaropaba();

        // Selecionar os elementos do tbody das tabelas
        const tbody_partindo = document.getElementById("tabelaRotasPartindo");
        const tbody_sentido = document.getElementById("tabelaRotasSentido");

        // Preencher as tabelas com os dados
        preencherTabelaRotas(rotas_partindo, tbody_partindo);
        preencherTabelaRotas(rotas_sentido, tbody_sentido);
    } catch (error) {
        console.error("Erro ao carregar as rotas:", error);
    }
});

// Função para redirecionar para o link específico utilizando query strings
export const showSchedule = async (routeId) => {
    try {
        // Garantir que rotas é um array
        const rotas = await apiGet.getRotasOnibus()

        if (!Array.isArray(rotas)) {
            console.error('Rotas não são um array!');
            return;
        }

        const selectedRoute = rotas.find(route => route.id === routeId);

        if (selectedRoute) {
            const routeName = encodeURIComponent(selectedRoute.nome.replace(/\s+/g, ''));
            const link = `/user/horarios/?rota=${routeName}`;
            window.location.assign(link);
        } else {
            console.error('Rota não encontrada!');
        }
    } catch (error) {
        console.error('Erro ao processar o redirecionamento:', error);
    }
};