import * as apiGet from '../api/get.js';

let watchId;
// Função para iniciar o monitoramento de localização
function iniciarMonitoramentoLocalizacao() {
  if ("geolocation" in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`Nova localização: Latitude: ${latitude}, Longitude: ${longitude}`);

        // Exemplo: Centralizar o mapa ou atualizar algo na interface
        attCordsMarkerUSer([longitude, latitude]);
      },
      (error) => {
        console.error("Erro ao monitorar localização:", error);
      },
      {
        enableHighAccuracy: true, // Solicita maior precisão, mas consome mais bateria
        maximumAge: 3000,           // Garante que os dados sejam recentes
        timeout: 1000,           // Tempo máximo para obter a localização
      }
    );
  } else {
    alert("Seu navegador não suporta serviços de geolocalização.");
  }
}

// Função para parar o monitoramento de localização
function pararMonitoramentoLocalizacao() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    console.log("Monitoramento de localização interrompido.");
  }
}

// Função para atualizar o mapa ou realizar alguma ação
function centralizarMapa() {
  // Verifica se o marcador foi corretamente criado e tem coordenadas
  if (userMarker && userMarker.getLngLat) {
    const userCoordinates = userMarker.getLngLat();  // Obtém as coordenadas diretamente

    console.log("Centralizando o mapa em:", userCoordinates);

    // Verifica se as coordenadas são válidas
    if (userCoordinates && userCoordinates.lng !== undefined && userCoordinates.lat !== undefined) {
      const bounds = new mapboxgl.LngLatBounds();
      
      // Adiciona as coordenadas do usuário ao bounds
      bounds.extend(userCoordinates);  // Aqui passa diretamente o objeto de coordenadas

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
mapboxgl.accessToken = "pk.eyJ1IjoibmF0YW5rb25pZyIsImEiOiJjbTFrc25mNXUwMWo1MmtvZzd5azBoZXI4In0.lo8p-OeLIoIVWAl5SdVsow";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-48.67506218376818, -28.09891989595239],
  zoom: 15,
});


// Waypoints (pontos de interesse)
const waypoints = [
  "-48.62894836820254, -28.02746079165392",
  "-48.6737003441736, -28.099317038170057",
].join(";");

// Solicitação à API Directions
const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;

fetch(url).then((response) => response.json()).then((data) => {
  const route = data.routes[0].geometry.coordinates;

  // Adiciona apenas o marcador ao mapa
  map.on("load", () => {
    iniciarMonitoramentoLocalizacao();

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
          "line-color": "#1B5789",
          "line-width": [
            'interpolate',
            ['linear'],
            ["zoom"],
            5, 2,
            10, 4,
            15, 6,
            22, 8
          ]
        },
    },'aerialway');

    /* // Centraliza o mapa na rota
    const bounds = new mapboxgl.LngLatBounds();
    route.forEach((coord) => bounds.extend(coord));
    map.fitBounds(bounds, { padding: 20 }); */


    const el = document.createElement("div");
    el.className = "user-marker";
    userMarker = new mapboxgl.Marker(el)
      .setLngLat([-48.67506218376818, -28.09891989595239])
      .addTo(map);

    console.log(userMarker);

    // Centraliza o mapa no marcador do usuário
    setTimeout(() => {
      if (userMarker && userMarker.getLngLat) {
        centralizarMapa();
      } else {
        console.error("Erro ao obter coordenadas do marcador.");
      }
    }, 1000); // Aguarda 1 segundo para garantir que o marcador tenha sido colocado

    // Botão para centralizar o mapa no usuário
    const btn_centralizar = document.getElementById('centralizar-user');
    btn_centralizar.addEventListener('click', () => {
      centralizarMapa();
    });
  });
}).catch((error) => console.error("Error:", error));

// Array de pontos de ônibus com coordenadas e informações
let busStops = await apiGet.getAllBusStops();
// Função para adicionar os pontos de ônibus ao mapa
busStops.forEach(function (stop) {
  const el = document.createElement("div");
  el.className = "parada-marker";

  new mapboxgl.Marker(el)
    .setLngLat(stop.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<p>Link Streat View: ${stop.linkStreatView}</p>`)
    )
    .addTo(map);
});