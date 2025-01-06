import * as apiGet from "../api/moldes_back/get.js";
import * as apiPost from "../api/moldes_back/post.js";

// Função genérica para preencher a tabela
const preencherTabelaRotas = (rotas, tbody) => {
  // Limpar o conteúdo existente na tabela
  tbody.innerHTML = "";

  // Percorrer todas as rotas e adicionar as linhas
  rotas.forEach((rota) => {
    const tr = document.createElement("tr"); // Criar uma linha

    // Coluna com o nome da rota
    const tdNome = document.createElement("td");
    tdNome.textContent = rota.nome;
    tdNome.classList.add("item-nome-rota"); // Classe para estilização
    tdNome.onclick = () => showSchedule(rota.id); // Ação ao clicar
    tr.appendChild(tdNome);

    // Coluna de ações com ícones
    const tdAcoes = document.createElement("td");
    tdAcoes.classList.add("buttons");

    // Ícone do mapa
    const divMapa = document.createElement("div");
    divMapa.classList.add("btn-table-routes-itens");
    const iconeMapa = document.createElement("i");
    iconeMapa.classList.add("fa", "fa-map-location-dot"); // Compatível com Font Awesome 4.7
    divMapa.appendChild(iconeMapa);

    // Ícone de horários
    const divHorarios = document.createElement("div");
    divHorarios.classList.add("btn-table-routes-itens");
    divHorarios.setAttribute("id", "horarios");
    divHorarios.onclick = () => showSchedule(rota.id);
    const iconeHorarios = document.createElement("i");
    iconeHorarios.classList.add("fa", "fa-clock"); // Compatível com Font Awesome 4.7
    divHorarios.appendChild(iconeHorarios);

    // Adicionar ícones à coluna de ações
    tdAcoes.appendChild(divMapa);
    tdAcoes.appendChild(divHorarios);
    tr.appendChild(tdAcoes);

    // Adicionar a linha ao tbody
    tbody.appendChild(tr);
  });
};

const verificarBordas = (tbody) => {
  // Selecionar todas as linhas visíveis
  const linhasVisiveis = Array.from(tbody.querySelectorAll("tr")).filter(
    (linha) => linha.style.display !== "none"
  );

  // Remover bordas de todas as linhas
  linhasVisiveis.forEach((linha) => {
    linha.style.borderBottom = "1px solid #ddd"; // Borda padrão
  });

  // Verificar se existe apenas um elemento visível
  if (linhasVisiveis.length === 1) {
    // Remover a borda do único elemento visível
    linhasVisiveis[0].style.borderBottom = "none";
  } else if (linhasVisiveis.length > 1) {
    // Remover a borda apenas do último elemento visível
    const ultimaLinha = linhasVisiveis[linhasVisiveis.length - 1];
    ultimaLinha.style.borderBottom = "none";
  }
};

const filtrarRotas = (texto, tbody) => {
  // Converter o texto da pesquisa para minúsculas
  const filtro = texto.toLowerCase();

  // Selecionar todas as linhas da tabela
  const linhas = tbody.querySelectorAll("tr");

  linhas.forEach((linha) => {
    // Selecionar a primeira célula da linha (nome da rota)
    const nomeRota = linha.querySelector(".item-nome-rota");

    if (nomeRota) {
      // Verificar se o texto da rota inclui o filtro
      const rotaTexto = nomeRota.textContent.toLowerCase();
      if (rotaTexto.includes(filtro)) {
        linha.style.display = ""; // Mostrar a linha
      } else {
        linha.style.display = "none"; // Ocultar a linha
      }
    }
  });

  verificarBordas(tbody);
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Obter dados das rotas do backend
    const rotas_partindo = await apiPost.getRotasListFiltrada({
      tipo: "principal",
      bairro_origem: "Garopaba",
    });
    const rotas_sentido = await apiPost.getRotasListFiltrada({
      tipo: "principal",
      bairro_destino: "Garopaba",
    });
    const searchInput = document.getElementById("search-input");

    // Selecionar os elementos do tbody das tabelas
    const tbody_partindo = document.getElementById("tabelaRotasPartindo");
    const tbody_sentido = document.getElementById("tabelaRotasSentido");

    // Preencher as tabelas com os dados
    preencherTabelaRotas(rotas_partindo, tbody_partindo);
    preencherTabelaRotas(rotas_sentido, tbody_sentido);

    searchInput.addEventListener("input", () => {
      const texto = searchInput.value;

      // Filtrar ambas as tabelas com base no texto
      filtrarRotas(texto, tbody_partindo);
      filtrarRotas(texto, tbody_sentido);
    });
  } catch (error) {
    console.error("Erro ao carregar as rotas:", error);
  }
});

// Função para redirecionar para o link específico utilizando query strings
export const showSchedule = async (routeId) => {
  try {
    const selectedRoute = await apiGet.getRota(routeId);

    if (selectedRoute) {
      const routeName = encodeURIComponent(
        selectedRoute.nome.replace(/\s+/g, "").toLowerCase()
      );
      const link = `/user/horarios/?rota=${routeName}`;
      window.location.assign(link);
    } else {
      console.error("Rota não encontrada!");
    }
  } catch (error) {
    console.error("Erro ao processar o redirecionamento:", error);
  }
};
