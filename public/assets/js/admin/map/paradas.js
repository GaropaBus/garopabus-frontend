import * as apiGet from "../../api/moldes_back/get.js";
import * as mapbox from "./mapbox-init.js";
import * as util from "../util.js ";
import * as apiPost from "../../api/moldes_back/post.js";
import * as apiDelete from "../../api/moldes_back/delete.js";

let rotas = [];
let enviar;

const mostrarParadas = async () => {
  const rota_id = document.getElementById("select-rotas-ponto-onibus").value;
  if (rota_id === "null") {
    mapbox.addBusStops(await apiGet.getPontoOnibus());
  } else {
    mapbox.addBusStopsSpecificRoute(
      await apiPost.getRotaPontoOnibusFiltrar({ id_rota: rota_id })
    );
  }
};

const postParadaToBack = async (enviar) => {
  apiPost.postPontoOnibus(enviar);
};

// paradas.js
export async function tratarClick(coordinates) {
  let linkMaps = prompt("Digite o link do Maps para a parada:");
  enviar = {
    latitude: `${coordinates.lat.toFixed(14)}`,
    longitude: `${coordinates.lng.toFixed(14)}`,
    link_maps: linkMaps === "" ? null : linkMaps,
  };
  await postParadaToBack(enviar);
}

export function openModal(num) {
  const modal = document.getElementById("modal");
  const modal_backdrop = document.getElementById("modal-backdrop");
  const add_parada_coord_modal = document.getElementById(
    "add-parada-coord-modal"
  );
  const sorbre_rotas_popup_modal = document.getElementById(
    "sorbre-rotas-popup-modal"
  );

  if (modal && modal_backdrop) {
    modal.style.display = "block";
    modal_backdrop.style.display = "block";
  } else {
    console.error("Elementos não encontrados");
  }

  if (num === 1) {
    add_parada_coord_modal.style.display = "block";
  } else if (num === 2) {
    sorbre_rotas_popup_modal.style.display = "block";
  }
}

const closeModal = () => {
  const modal = document.getElementById("modal");
  const modal_backdrop = document.getElementById("modal-backdrop");
  const add_parada_coord_modal = document.getElementById(
    "add-parada-coord-modal"
  );
  const sorbre_rotas_popup_modal = document.getElementById(
    "sorbre-rotas-popup-modal"
  );

  if (modal && modal_backdrop) {
    modal.style.display = "none";
    modal_backdrop.style.display = "none";
    add_parada_coord_modal.style.display = "none";
    sorbre_rotas_popup_modal.style.display = "none";
  } else {
    console.error("Elementos não encontrados");
  }
};

const getCoordenadas = async () => {
  const inp_coordenada = document.getElementById("coordenada-parada-add");
  let coord = inp_coordenada.value;

  if (await util.isCoordinate(coord)) {
    let latitude = parseFloat(coord.split(",")[0].replace(/\s+/g, "")).toFixed(
      14
    );
    let longitude = parseFloat(coord.split(",")[1].replace(/\s+/g, "")).toFixed(
      14
    );

    return { longitude: longitude, latitude: latitude };
  }
  alert("Coordenada inválida");
  return false;
};

const clear = () => {
  const inp_coordenada = document.getElementById("coordenada-parada-add");
  inp_coordenada.value = "";
  const link = document.getElementById("link-open-street-parada-add");
  link.value = "";
};

const addParadaCoord = async () => {
  const coords = await getCoordenadas();
  let link;
  if (document.getElementById("link-open-street-parada-add").value === "") {
    link = null;
  } else {
    link = document.getElementById("link-open-street-parada-add").value;
  }

  const enviar = {
    longitude: coords.longitude.toFixed(14),
    latitude: coords.latitude.toFixed(14),
    link_maps: link,
  };

  await postParadaToBack(enviar);
  clear();
};

export async function deleteParada(id) {
  if (confirm(`Deseja Excluir a para de id ${id}?`)) {
    apiDelete.deletePontoOnibus(id);
  }
}

let focus_btn_deleteRotaPontoOnibus = false;
const deleteButton = () => {
  const button = document.getElementById("excluir-jucao");

  button.addEventListener("focus", () => {
    focus_btn_deleteRotaPontoOnibus = true;
    document.querySelectorAll(".rota-passa-parada").forEach((element) => {
      element.classList.add("delete-mode");
    });
  });

  button.addEventListener("blur", () => {
    setTimeout(() => {
      focus_btn_deleteRotaPontoOnibus = false;
      document.querySelectorAll(".rota-passa-parada").forEach((element) => {
        element.classList.remove("delete-mode");
      });
    }, 100);
  });
};

const deleteRotaPontoOnibus = (id) => {
  if (focus_btn_deleteRotaPontoOnibus) {
    if (confirm(`Deseja excluir a junção de id ${id}`)) {
      apiDelete.deleteRotasPontoOnibus(id);
    }
  }
};

export const addSobreRotasParadas = async (id_parada) => {
  const rotas_paradas = await apiPost.getRotaPontoOnibusFiltrar({
    id_ponto_onibus: id_parada,
  });
  const lista_rotas_parada = document.getElementById("lista-rotas-parada");
  lista_rotas_parada.innerHTML = "";
  for (const element of rotas_paradas) {
    const li = document.createElement("li");
    li.classList.add("rota-passa-parada");
    li.textContent = element.rota.nome;
    li.addEventListener("click", () => {
      deleteRotaPontoOnibus(element.id);
    });
    lista_rotas_parada.appendChild(li);
  }
};

const preencher_select_add_rota_passa_parada = () => {
  const select = document.getElementById("rotas-sobre-rotas");
  for (const rota of rotas) {
    const opt = document.createElement("option");
    opt.value = rota.id;
    opt.textContent = rota.nome;
    select.appendChild(opt);
  }
};

const clear_adiconar_rota_ponto_onibus = () => {
  document.getElementById("rotas-sobre-rotas").selectedIndex = 0;
};

const adiconar_rota_ponto_onibus = () => {
  // Obtendo o valor da rota
  const id_rota = document.getElementById("rotas-sobre-rotas").value;

  // Validando se é um número válido
  const id_rota_numero = Number(id_rota);
  if (!id_rota || id_rota === "null" || isNaN(id_rota_numero)) {
    alert("Selecione alguma rota para ser adicionada");
    return;
  }

  // Obtendo e convertendo o ID do ponto de ônibus do span
  const id_ponto_onibus_span = document.getElementById("parada_id");
  if (!id_ponto_onibus_span) {
    alert("O ID do ponto de ônibus não foi encontrado.");
    return;
  }

  const id_ponto_onibus = parseInt(id_ponto_onibus_span.textContent.trim(), 10);
  if (isNaN(id_ponto_onibus)) {
    alert("O ID do ponto de ônibus é inválido.");
    return;
  }
  const dados = {
    id_rota: id_rota,
    id_ponto_onibus: id_ponto_onibus,
  };

  // Debug para verificar os valores convertidos
  apiPost.postNewRotasPontoOnibus(dados);
  clear_adiconar_rota_ponto_onibus();
};

// Carrega a lista de rotas no dropdown ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
  try {
    rotas = await apiGet.getRotasList();
    const selects_rotas = document.querySelectorAll(".select-rotas");
    selects_rotas.forEach((element) => {
      for (const rota of rotas) {
        const opt = document.createElement("option");
        opt.value = rota.id;
        opt.textContent = rota.nome;
        element.appendChild(opt);
      }
    });
  } catch (error) {
    console.error("Erro ao carregar as rotas:", error);
    alert("Falha ao carregar as rotas. Tente novamente.");
  }

  // Configura o botão para capturar coordenadas ao clicar
  const adicionarParadaBtn = document.getElementById("adicionar-parada-click");
  if (adicionarParadaBtn) {
    adicionarParadaBtn.addEventListener("click", () => {
      if (
        mapbox &&
        typeof mapbox.ativarCapturaPontoOnibusCoordenadas === "function"
      ) {
        mapbox.ativarCapturaPontoOnibusCoordenadas();
      } else {
        console.error(
          "Função ativarCapturaCoordenadas não encontrada no módulo mapbox."
        );
        alert("Erro ao ativar a captura de coordenadas.");
      }
    });
  } else {
    console.error("Botão 'adicionar-parada-click' não encontrado.");
  }

  mostrarParadas();
  document
    .getElementById("mostrar-paradas")
    .addEventListener("click", async () => {
      // Remove todos os marcadores
      mapbox.removeAllMarkers();

      await mostrarParadas();
    });

  document
    .getElementById("adicionar-parada-coord")
    .addEventListener("click", () => {
      openModal(1);
    });

  document
    .getElementById("submit-new-parada")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      await addParadaCoord();
    });

  window.closeModal = closeModal;

  deleteButton();
  preencher_select_add_rota_passa_parada();

  document
    .getElementById("btn-add-rotas-sobre-rotas")
    .addEventListener("click", () => {
      adiconar_rota_ponto_onibus();
    });
});
