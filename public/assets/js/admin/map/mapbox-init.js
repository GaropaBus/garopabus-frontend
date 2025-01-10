import * as apiGet from "../../api/moldes_back/get.js";
import * as paradas from "./paradas.js";

// Inicialize o Mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoibmF0YW5rb25pZyIsImEiOiJjbTFrc25mNXUwMWo1MmtvZzd5azBoZXI4In0.lo8p-OeLIoIVWAl5SdVsow";

const bounds = [
  [-48.82116, -28.16977],
  [-48.49197, -27.92301],
];

export let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/natankonig/cm3t1dmi8002m01qsf07y0o6d",
  center: [-48.628226014644234, -28.02787236965428], // Inicializa com o centro em Nova Iorque
  zoom: 12,
  maxBounds: bounds,
});

// Adiciona os pontos de ônibus ao mapa
// Array para armazenar os objetos Marker

let markers = [];

export async function addBusStops(pontos_onibus) {
  try {
    const busStops = pontos_onibus;
    busStops.forEach(function (stop) {
      // Verifica se já existe um marcador nas coordenadas
      // Cria um elemento HTML para o ícone do ponto de ônibus
      const el = document.createElement("div");
      el.className = "bus-stop-marker";

      // Estilos do marcador
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
      el.style.borderRadius = "5px";
      el.style.backgroundImage =
        "url(../../../../../../assets/images/icon_bus.png)";
      el.style.backgroundSize = "80%";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";
      el.style.filter = "invert(1)";

      // Cria o HTML do popup
      const div_popup = document.createElement("div");
      div_popup.classList.add("botoes-popup");

      const delete_btn_popup = document.createElement("button");
      delete_btn_popup.textContent = "Excluir";
      delete_btn_popup.addEventListener("click", () => {
        paradas.deleteParada(stop.id);
      });

      const sobre_rotas_btn_popup = document.createElement("button");
      sobre_rotas_btn_popup.textContent = "Sobre Rotas";
      sobre_rotas_btn_popup.addEventListener("click", async () => {
        document.getElementById("parada_id").textContent = stop.id;
        paradas.openModal(2);
        await paradas.addSobreRotasParadas(stop.id);
      });

      div_popup.appendChild(delete_btn_popup);
      div_popup.appendChild(sobre_rotas_btn_popup);

      // Cria o marcador
      const marker = new mapboxgl.Marker(el)
        .setLngLat([stop.longitude, stop.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setDOMContent(div_popup) // Usando setDOMContent
        )
        .addTo(map);

      // Armazena o marcador
      markers.push(marker);
      // Armazena as coordenadas do marcador
    });
  } catch (error) {
    console.error("Erro ao carregar os pontos de ônibus:", error);
  }
}

export async function addBusStopsSpecificRoute(pontos_onibus) {
  try {
    const busStops = pontos_onibus;
    busStops.forEach(function (stop) {
      // Verifica se já existe um marcador nas coordenadas

      // Cria um elemento HTML para o ícone do ponto de ônibus
      const el = document.createElement("div");
      el.className = "bus-stop-marker";

      // Estilos do marcador
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
      el.style.borderRadius = "5px";
      el.style.backgroundImage =
        "url(../../../../../../assets/images/icon_bus.png)";
      el.style.backgroundSize = "80%";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";
      el.style.filter = "invert(1)";

      // Cria o HTML do popup
      const div_popup = document.createElement("div");
      div_popup.classList.add("botoes-popup");

      const delete_btn_popup = document.createElement("button");
      delete_btn_popup.textContent = "Excluir";
      delete_btn_popup.addEventListener("click", () => {
        paradas.deleteParada(stop.ponto_onibus.id);
      });

      const sobre_rotas_btn_popup = document.createElement("button");
      sobre_rotas_btn_popup.textContent = "Sobre Rotas";
      sobre_rotas_btn_popup.addEventListener("click", async () => {
        document.getElementById("parada_id").textContent =
          stop.ponto_onibus.id;
        paradas.openModal(2);
        await paradas.addSobreRotasParadas(stop.ponto_onibus.id);
      });

      div_popup.appendChild(delete_btn_popup);
      div_popup.appendChild(sobre_rotas_btn_popup);

      // Cria o marcador
      const marker = new mapboxgl.Marker(el)
        .setLngLat([
          stop.ponto_onibus.longitude,
          stop.ponto_onibus.latitude,
        ])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setDOMContent(div_popup) // Usando setDOMContent
        )
        .addTo(map);

      // Armazena o marcador
      markers.push(marker);
    });
  } catch (error) {
    console.error("Erro ao carregar os pontos de ônibus:", error);
  }
}

// Função para deletar todos os marcadores
export function removeAllMarkers() {
  markers.forEach((marker) => {
    marker.remove(); // Remove o marcador do mapa
  });
  markers = []; // Limpa o array de marcadores
}

// Função para ativar/desativar o evento de clique no mapa
let ativarCaptura = false;

export function ativarCapturaCoordenadas() {
  if (!ativarCaptura) {
    const container_map = document.getElementById("map");
    container_map.style.cursor = "pointer !important";
    ativarCaptura = true;

    map.once("click", async (event) => {
      const coordinates = event.lngLat;

      // Cria o elemento HTML para o marcador
      const el = document.createElement("div");
      el.className = "bus-stop-marker"; // Usando 'id' em vez de 'idName'

      // Estilos do marcador
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.backgroundColor = "rgba(0, 251, 33, 0.7)";
      el.style.borderRadius = "5px";
      el.style.border = "1px solid black";
      el.style.backgroundImage =
        "url(../../../../../../assets/images/icon_bus.png)";
      el.style.backgroundSize = "80%";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";

      // Adiciona o marcador ao mapa
      new mapboxgl.Marker(el)
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map);

      await paradas.tratarClick(coordinates);

      ativarCaptura = false; // Desativa a captura após um clique
    });
  } else {
    alert("A captura já está ativada. Clique no mapa.");
  }
}
