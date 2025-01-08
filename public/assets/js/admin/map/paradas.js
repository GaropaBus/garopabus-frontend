import * as apiGet from "../../api/moldes_back/get.js";
import * as mapbox from "./mapbox-init.js";
import * as util from "../util.js ";

let rotas = [];
let enviar;

const postParadaToBack = async (enviar) => {
  console.log(enviar);
};

// paradas.js
export default async function tratarClick(coordinates) {
  let linkMaps = prompt("Digite o link do Maps para a parada:");
  enviar = {
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    link_maps: linkMaps === "" ? null : linkMaps,
  };
  await postParadaToBack(enviar);
}

const openModal = () => {
  const modal = document.getElementById("modal");
  const modal_backdrop = document.getElementById("modal-backdrop");

  if (modal && modal_backdrop) {
    modal.style.display = "block";
    modal_backdrop.style.display = "block";
  } else {
    console.error("Elementos não encontrados");
  }
};

const closeModal = () => {
  const modal = document.getElementById("modal");
  const modal_backdrop = document.getElementById("modal-backdrop");

  if (modal && modal_backdrop) {
    modal.style.display = "none";
    modal_backdrop.style.display = "none";
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
    longitude: coords.longitude,
    latitude: coords.latitude,
    link_maps: link,
  };

  await postParadaToBack(enviar);
  clear();
};

// Carrega a lista de rotas no dropdown ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
  try {
    rotas = await apiGet.getRotasList();
    const select_rotas = document.getElementById("select-rotas");
    for (const rota of rotas) {
      const opt = document.createElement("option");
      opt.value = rota.id;
      opt.textContent = rota.nome;
      select_rotas.appendChild(opt);
    }
  } catch (error) {
    console.error("Erro ao carregar as rotas:", error);
    alert("Falha ao carregar as rotas. Tente novamente.");
  }

  // Configura o botão para capturar coordenadas ao clicar
  const adicionarParadaBtn = document.getElementById("adicionar-parada-click");
  if (adicionarParadaBtn) {
    adicionarParadaBtn.addEventListener("click", () => {
      if (mapbox && typeof mapbox.ativarCapturaCoordenadas === "function") {
        mapbox.ativarCapturaCoordenadas();
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

  document
    .getElementById("adicionar-parada-coord")
    .addEventListener("click", () => {
      openModal();
    });

  document
    .getElementById("submit-new-parada")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      await addParadaCoord();
    });

  window.closeModal = closeModal;
});
