// Inicialize o Mapbox
mapboxgl.accessToken =
"pk.eyJ1IjoibmF0YW5rb25pZyIsImEiOiJjbTFrc25mNXUwMWo1MmtvZzd5azBoZXI4In0.lo8p-OeLIoIVWAl5SdVsow";
const map = new mapboxgl.Map({
container: "map",
style: "mapbox://styles/mapbox/streets-v11",
center: [-48.628226014644234, -28.02787236965428], // Inicializa com o centro em Nova Iorque
zoom: 12,
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

    map.addLayer({
      id: "route1",
      type: "line",
      source: "route",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
          "line-color": "#888",
          "line-width": 8,
        },
    },'aerialway');

    // Centraliza o mapa na rota
    const bounds = new mapboxgl.LngLatBounds();
    route.forEach((coord) => bounds.extend(coord));
    map.fitBounds(bounds, { padding: 20 });
  });
})
.catch((error) => console.error("Error:", error));

// Array de pontos de ônibus com coordenadas e informações
const busStops = [
{
  coordinates: [-48.62894836820254, -28.02746079165392],
  title: "Ponto de Ônibus 1",
  description: "Este é o ponto de ônibus da rua principal.",
},
{
  coordinates: [-48.628410903411876, -28.025598241783666],
  title: "Ponto de Ônibus 2",
  description: "Este ponto atende as linhas 5 e 7.",
},
{
  coordinates: [-48.621591752515485, -28.026523938849035],
  title: "Ponto de Ônibus 3",
  description: "Ponto próximo ao parque.",
},
];

// Função para adicionar os pontos de ônibus ao mapa
busStops.forEach(function (stop) {
// Cria um elemento HTML para o ícone do ponto de ônibus
const el = document.createElement("div");
el.className = "bus-stop-marker";
el.style.width = "30px";
el.style.height = "30px";
el.style.backgroundImage =
  "url(https://img.icons8.com/ios-filled/50/000000/bus.png)";
el.style.backgroundSize = "100%";

// Adiciona o marcador no mapa
new mapboxgl.Marker(el)
  .setLngLat(stop.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // Popup ao clicar
      .setHTML(`<h3>${stop.title}</h3><p>${stop.description}</p>`)
  )
  .addTo(map);
});

