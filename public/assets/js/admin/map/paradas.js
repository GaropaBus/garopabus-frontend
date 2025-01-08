import * as apiGet from "../../api/moldes_back/get.js";
import * as mapbox from "./mapbox-init.js";

let rotas = [];
let enviar;

const postToBack = async (enviar) => {
  console.log(enviar);
};

// paradas.js
export default function tratarClick(coordinates) {
  let linkMaps = prompt("Digite o link do Maps para a parada:");
  enviar = {
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    link_maps: linkMaps === "" ? null : linkMaps,
  };
  postToBack(enviar);
}

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
});
