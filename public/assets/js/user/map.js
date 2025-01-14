import * as apiGet from "../api/moldes_back/get.js";

let watchId;
// Função para iniciar o monitoramento de localização
function iniciarMonitoramentoLocalizacao() {
  if ("geolocation" in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Exemplo: Centralizar o mapa ou atualizar algo na interface
        attCordsMarkerUSer([longitude, latitude]);
      },
      (error) => {
        console.error("Erro ao monitorar localização:", error);
      },
      {
        enableHighAccuracy: true, // Solicita maior precisão, mas consome mais bateria
        maximumAge: 3000, // Garante que os dados sejam recentes
        timeout: 1000, // Tempo máximo para obter a localização
      }
    );
  } else {
    alert("Seu navegador não suporta serviços de geolocalização.");
  }
}

// Função para atualizar o mapa ou realizar alguma ação
function centralizarMapa() {
  // Verifica se o marcador foi corretamente criado e tem coordenadas
  if (userMarker && userMarker.getLngLat) {
    const userCoordinates = userMarker.getLngLat(); // Obtém as coordenadas diretamente

    // Verifica se as coordenadas são válidas
    if (
      userCoordinates &&
      userCoordinates.lng !== undefined &&
      userCoordinates.lat !== undefined
    ) {
      const bounds = new mapboxgl.LngLatBounds();

      // Adiciona as coordenadas do usuário ao bounds
      bounds.extend(userCoordinates); // Aqui passa diretamente o objeto de coordenadas

      // Ajusta a visualização do mapa para cobrir todos os pontos
      map.fitBounds(bounds, { padding: 15, zoom: 15 });
    } else {
      console.error("Coordenadas inválidas do marcador.");
    }
  } else {
    console.error("Erro ao obter coordenadas do marcador.");
  }
}

let userMarker; // Declara a variável globalmente

const attCordsMarkerUSer = (coordinates) => {
  if (userMarker) {
    userMarker.setLngLat(coordinates); // Atualiza a posição do marcador
  } else {
    console.error("O marcador do usuário ainda não foi inicializado.");
  }
};

// Inicialize o Mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoibmF0YW5rb25pZyIsImEiOiJjbTFrc25mNXUwMWo1MmtvZzd5azBoZXI4In0.lo8p-OeLIoIVWAl5SdVsow";
const bounds = [
  [-48.804805894138106, -28.21629387616003],
  [-48.5596734459338, -27.927902200784235],
];
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/natankonig/cm3t1dmi8002m01qsf07y0o6d",
  center: [-48.67506218376818, -28.09891989595239],
  zoom: 12,
  maxBounds: bounds, // Mantém os limites do mapa
  minZoom: 9, // Nível mínimo de zoom (visão ampla)
  maxZoom: 16, // Nível máximo de zoom (visão próxima)
});

// Waypoints (pontos de interesse)
const waypoints = [
  "-48.62894836820254, -28.02746079165392",
  "-48.6737003441736, -28.099317038170057",
].join(";");

// Solicitação à API Directions
const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const route = data.routes[0].geometry.coordinates;

    // Adiciona apenas o marcador ao mapa
    map.on("load", () => {
      iniciarMonitoramentoLocalizacao();

    //  map.setFilter('poi-label', ['==', 'type', 'Bank']);

    map.setFilter('poi-label', [
      'any',  // O operador 'any' permite que qualquer uma das condições seja verdadeira
      ['==', ['get', 'type'], 'Bank'],  // Exibe ícones com 'type' igual a 'Bank'
      ['==', ['get', 'type'], 'Townhall'],
      ['==', ['get', 'type'], 'Office'],
      ['==', ['get', 'type'], 'Place Of Worship']  // Exibe ícones com 'type' começando com 'Townhall'
  ]);

      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        },
      });

      const el = document.createElement("div");
      el.className = "user-marker";
      userMarker = new mapboxgl.Marker(el)
        .setLngLat([-48.67506218376818, -28.09891989595239])
        .addTo(map);

      // Centraliza o mapa no marcador do usuário
      setTimeout(() => {
        if (userMarker && userMarker.getLngLat) {
          centralizarMapa();
        } else {
          console.error("Erro ao obter coordenadas do marcador.");
        }
      }, 1000); // Aguarda 1 segundo para garantir que o marcador tenha sido colocado

      // Botão para centralizar o mapa no usuário
      const btn_centralizar = document.getElementById("centralizar-user");
      btn_centralizar.addEventListener("click", () => {
        centralizarMapa();
      });
    });
  })
  .catch((error) => console.error("Error:", error));

// Array de pontos de ônibus com coordenadas e informações
const busStops = await apiGet.getPontoOnibus();

// Função para adicionar os pontos de ônibus ao mapa
const addedMarkers = [];

// Função para verificar se um marcador já existe em uma coordenada específica
function hasMarkerAt(lng, lat) {
  return addedMarkers.some((coord) => coord.lng === lng && coord.lat === lat);
}

// Função para verificar se um link é válido
async function isValidLink(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error(`Erro ao verificar o link: ${url}`, error);
    return false;
  }
}

// Adiciona os pontos de ônibus ao mapa
busStops.forEach(async function (stop) {
  if (!hasMarkerAt(stop.longitude, stop.latitude)) {
    // Verifica se o link é válido
    const isValid = await isValidLink(stop.link_maps);

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

    // Cria o marcador no mapa
    const marker = new mapboxgl.Marker(el).setLngLat([
      stop.longitude,
      stop.latitude,
    ]);

    // Define o zIndex baixo para o marcador
    marker.getElement().style.zIndex = "1"; // Camada mais baixa

    // Apenas adiciona o popup se o link for válido
    if (isValid) {
      marker.setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<a href="${stop.link_maps}" target="_blank">Link Maps</a>`
        )
      );
    }

    // Adiciona o marcador ao mapa
    marker.addTo(map);

    // Adiciona as coordenadas ao array
    addedMarkers.push({ lng: stop.longitude, lat: stop.latitude });
  }
});
