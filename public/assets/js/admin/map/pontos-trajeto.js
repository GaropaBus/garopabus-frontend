import * as mapbox from "./mapbox-init.js";
import * as apiGet from "../../api/moldes_back/get.js";
import * as apiPost from "../../api/moldes_back/post.js";

let pontos_trajeto = [];
let pontos_trajeto_inalterada = [];

let rota_id;

const addDataTable = (pontos_trajeto) => {
  // Certifique-se de que o tbody existe
  if (!tabela_pontos_trajeto) {
    console.error(
      "O elemento <tbody> não foi encontrado na tabela com id 'trajetoTable'."
    );
    return;
  }

  // Limpa o conteúdo do tbody
  tabela_pontos_trajeto.innerHTML = "";

  // Adiciona os dados na tabela
  pontos_trajeto.forEach((element) => {
    const tr = document.createElement("tr");
    tr.draggable = true;

    const td_id = document.createElement("td");
    td_id.textContent = element.id ? element.id : "null";

    const td_ordem = document.createElement("td");
    td_ordem.textContent = element.ordem;

    const td_lat = document.createElement("td");
    td_lat.textContent = element.latitude;

    const td_lng = document.createElement("td");
    td_lng.textContent = element.longitude;

    tr.appendChild(td_id);
    tr.appendChild(td_ordem);
    tr.appendChild(td_lat);
    tr.appendChild(td_lng);

    tabela_pontos_trajeto.appendChild(tr); // Adiciona a linha ao tbody
  });
};

const selecionarRota = async () => {
  if (document.getElementById("select-rotas-pontos-trajeto").value === "null") {
    alert("Selecione uma rota");
    return;
  }
  rota_id = parseInt(
    document.getElementById("select-rotas-pontos-trajeto").value
  );
  pontos_trajeto = await apiGet.GetPontosTrajetoRota(rota_id);
  pontos_trajeto_inalterada = [...pontos_trajeto];
  addDataTable(pontos_trajeto);
  mapbox.addRotaMapSpecificRoute(pontos_trajeto);
  console.log(pontos_trajeto);
  console.log(pontos_trajeto_inalterada);
};

const arrumarArrayPontosTrajeto = () => {
  // Obter todas as linhas da tabela
  const rows = Array.from(tabela_pontos_trajeto.querySelectorAll("tr"));

  // Reorganizar o array de pontos
  pontos_trajeto = rows.map((row, index) => {
    const latitude = row.children[2].textContent;
    const longitude = row.children[3].textContent;

    // Localiza o ponto correspondente no array original
    const pontoExistente = pontos_trajeto.find(
      (p) => p.latitude === latitude && p.longitude === longitude
    );

    return {
      id: pontoExistente?.id || null, // Mantém o ID ou cria um novo
      ordem: index + 1, // Nova ordem
      latitude,
      longitude,
      id_rota: pontoExistente?.id_rota || null, // Preserva o ID da rota
    };
  });

  // Certifique-se de que todos os pontos estejam incluídos, mesmo os novos
  pontos_trajeto.forEach((ponto) => {
    if (
      !pontos_trajeto.find(
        (p) => p.latitude === ponto.latitude && p.longitude === ponto.longitude
      )
    ) {
      pontos_trajeto.push({
        ...ponto,
        ordem: pontos_trajeto.length + 1, // Adiciona nova ordem
      });
    }
  });

  console.log("Array atualizado:", pontos_trajeto);
  console.log(pontos_trajeto_inalterada);

  // Atualizar a tabela com os novos dados
  addDataTable(pontos_trajeto);
};

export const tratarClick = async (coordinates) => {
  if (!rota_id) {
    alert("Selecione uma rota");
    return;
  }
  const enviar = {
    id_rota: rota_id,
    latitude: `${coordinates.lat.toFixed(14)}`,
    longitude: `${coordinates.lng.toFixed(14)}`,
    ordem: null,
  };
  pontos_trajeto.push(enviar);
  console.log(pontos_trajeto);
  console.log(pontos_trajeto_inalterada);

  addDataTable(pontos_trajeto);
  arrumarArrayPontosTrajeto();
};

const tabela_pontos_trajeto = document
  .getElementById("trajetoTable")
  .querySelector("tbody");

let draggedRow = null;

tabela_pontos_trajeto.addEventListener("dragstart", (event) => {
  if (event.target.tagName === "TR") {
    draggedRow = event.target;
    draggedRow.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
  }
});

export const deletePontoTrajeto = async (ordem) => {
  pontos_trajeto.splice(ordem - 1, 1); // Remove 1 elemento a partir do índice 2
  console.log(pontos_trajeto);
  console.log(pontos_trajeto_inalterada);
  addDataTable(pontos_trajeto);
  arrumarArrayPontosTrajeto();
};

tabela_pontos_trajeto.addEventListener("dragover", (event) => {
  event.preventDefault(); // Permite o "drop"
  const draggingRow = tabela_pontos_trajeto.querySelector(".dragging");
  const targetRow = event.target.closest("tr");
  if (
    targetRow &&
    targetRow !== draggingRow &&
    targetRow.parentNode.tagName === "TBODY"
  ) {
    const rect = targetRow.getBoundingClientRect();
    const offset = event.clientY - rect.top;
    const height = rect.height;
    if (offset > height / 2) {
      targetRow.after(draggingRow);
    } else {
      targetRow.before(draggingRow);
    }
  }
});

tabela_pontos_trajeto.addEventListener("dragend", () => {
  if (draggedRow) {
    draggedRow.classList.remove("dragging");
    draggedRow = null;
  }

  arrumarArrayPontosTrajeto();
});

document.addEventListener("DOMContentLoaded", async () => {
  document
    .getElementById("atualizar-trajeto-rota")
    .addEventListener("click", () => {
      mapbox.removeMarkersPontoTrajeto();
      mapbox.removeRotaMapSpecificRoute();
      mapbox.addRotaMapSpecificRoute(pontos_trajeto);
    });

  document
    .getElementById("mostrar-rota")
    .addEventListener("click", async () => {
      await selecionarRota();
    });

  // Configura o botão para capturar coordenadas ao clicar
  const adicionarPontoTrajetoBtn = document.getElementById(
    "adicionar-ponto-trajeto-click"
  );
  if (adicionarPontoTrajetoBtn) {
    adicionarPontoTrajetoBtn.addEventListener("click", () => {
      if (!rota_id) {
        alert("Selecione uma rota");
        return;
      }
      if (
        mapbox &&
        typeof mapbox.ativarCapturaPontoTrajetoCoordenadas === "function"
      ) {
        mapbox.ativarCapturaPontoTrajetoCoordenadas();
      } else {
        console.error(
          "Função ativarCapturaCoordenadas não encontrada no módulo mapbox."
        );
        alert("Erro ao ativar a captura de coordenadas.");
      }
    });
  } else {
    console.error("Botão 'adicionar-ponto-trajeto-click' não encontrado.");
  }

  document
    .getElementById("salvar-lista-pontos-trajeto")
    .addEventListener("click", async () => {
      const isEqual =
        JSON.stringify(pontos_trajeto) ===
        JSON.stringify(pontos_trajeto_inalterada);
      if (isEqual) {
        alert("Nenhuma alteração feita");
        return;
      }
      if (pontos_trajeto.length === 0){
        alert("A lista não pode estar vazia");
        return;
      }
      if (confirm("Deseja salvar as alterções feitas?")) {
        console.log("Enviar back:", pontos_trajeto);
        apiPost.postNewPontosTrajetoMassa(pontos_trajeto);
      }
    });

  window.addEventListener("beforeunload", (event) => {
    const isEqual =
      JSON.stringify(pontos_trajeto) ===
      JSON.stringify(pontos_trajeto_inalterada);

    if (!isEqual) {
      event.preventDefault();
    }
  });
});
