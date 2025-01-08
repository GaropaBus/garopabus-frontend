import * as apiGet from "../../api/moldes_back/get.js";
import tratarClick from "./paradas.js";

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

// Array para armazenar as coordenadas dos marcadores adicionados
export const addedMarkers = [];

// Função para verificar se um marcador já existe em uma coordenada específica
function hasMarkerAt(lng, lat) {
  return addedMarkers.some((coord) => coord.lng === lng && coord.lat === lat);
}

// Adiciona os pontos de ônibus ao mapa
export async function addBusStops() {
  try {
    const busStops = await apiGet.getPontoOnibus();

    busStops.forEach(function (stop) {
      // Verifica se já existe um marcador nas coordenadas
      if (!hasMarkerAt(stop.longitude, stop.latitude)) {
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

        // Adiciona o marcador ao mapa
        new mapboxgl.Marker(el)
          .setLngLat([stop.longitude, stop.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${stop.title}</h3><p>${stop.description}</p>`
            )
          )
          .addTo(map);

        // Armazena as coordenadas do marcador
        addedMarkers.push({ lng: stop.longitude, lat: stop.latitude });
      } else {
        console.log(
          `Já existe um marcador em [${stop.longitude}, ${stop.latitude}].`
        );
      }
    });
  } catch (error) {
    console.error("Erro ao carregar os pontos de ônibus:", error);
  }
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

      await tratarClick(coordinates);

      ativarCaptura = false; // Desativa a captura após um clique
    });
  } else {
    alert("A captura já está ativada. Clique no mapa.");
  }
}
