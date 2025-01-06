import * as apiGet from "../../api/moldes_back/get.js";

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

// Waypoints (pontos de interesse)
const waypoints = [
  "-48.62894836820254, -28.02746079165392",
  "-48.628410903411876, -28.025598241783666",
  "-48.621591752515485, -28.026523938849035",
  "-48.621250363059566, -28.025854259476553",
  "-48.61873356401721, -28.026090321928184",
  "-48.619799252983604, -28.03086284299131",
  "-48.62132002274654, -28.030795007331825",
  "-48.66292993741211, -28.06737067528255",
  "-48.66676338550059, -28.068160420248585",
  "-48.66373924545923, -28.072476768416987",
  "-48.6737003441736, -28.099317038170057",
].join(";");

// Solicitação à API Directions
const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const route = data.routes[0].geometry.coordinates;

    // Adiciona a rota ao mapa
    map.on("load", () => {
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

      map.addLayer(
        {
          id: "route1",
          type: "line",
          source: "route",
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#1B5789",
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              5,
              2,
              10,
              4,
              15,
              6,
              22,
              8,
            ],
          },
        },
        "aerialway"
      );

      // Centraliza o mapa na rota
      const bounds = new mapboxgl.LngLatBounds();
      route.forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds, { padding: 20 });
    });
  })
  .catch((error) => console.error("Error:", error));

// Array de pontos de ônibus com coordenadas e informações
const busStops = await apiGet.getPontoOnibus();

// Função para adicionar os pontos de ônibus ao mapa
// Array para armazenar as coordenadas dos marcadores adicionados
const addedMarkers = [];

// Função para verificar se um marcador já existe em uma coordenada específica
function hasMarkerAt(lng, lat) {
  return addedMarkers.some(coord => coord.lng === lng && coord.lat === lat);
}

// Adiciona os pontos de ônibus ao mapa
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
    el.style.backgroundImage = "url(../../../../../../assets/images/icon_bus.png)";
    el.style.backgroundSize = "80%";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundPosition = "center";
    el.style.filter = "invert(1)";

    // Adiciona o marcador ao mapa
    new mapboxgl.Marker(el)
      .setLngLat([stop.longitude, stop.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${stop.title}</h3><p>${stop.description}</p>`)
      )
      .addTo(map);

    // Armazena as coordenadas do marcador
    addedMarkers.push({ lng: stop.longitude, lat: stop.latitude });
  } else {
    console.log(`Já existe um marcador em [${stop.longitude}, ${stop.latitude}].`);
  }
});

