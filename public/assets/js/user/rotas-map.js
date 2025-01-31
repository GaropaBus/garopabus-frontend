import * as apiGet from "../api/moldes_back/get.js";
import * as util from "./util.js";

let rota_nome;
let list_rota;
let list_pontos;
let markersBusStops = [];

window.goBack = () => {
  window.location.href = "/user/rotas-onibus";
};

const formatarString = (str) => {
  // Dividir a string no caractere "-"
  const partes = str.replace(/_/g, " ").split("-");

  // Capitalizar a primeira letra de cada parte e unir com " - "
  return partes
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" - ");
};

const preencherNomeRota = () => {
  const routeNameElement = document.getElementById("routeName");
  // Preenche o nome da rota
  routeNameElement.textContent = rota_nome;
};

const preencherNavBar = () => {
  const nav = document.getElementById("nav");
  const keys = Object.keys(list_rota);

  for (const rota of keys) {
    const btn = document.createElement("button");

    btn.textContent = rota
      .split("_")
      .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
      .join(" ");

    btn.dataset.rota = rota;
    nav.appendChild(btn);
  }
};

// MapBox
// Inicialize o Mapbox
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

async function isValidLink(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error(`Erro ao verificar o link: ${url}`, error);
    return false;
  }
}

function addBusStopsSpecificRoute(pontos_onibus) {
  try {
    const busStops = pontos_onibus;
    busStops.forEach(async function (stop) {
      // Verifica se já existe um marcador nas coordenadas
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

      // Cria o marcador
      const marker = new mapboxgl.Marker(el)
        .setLngLat([stop.longitude, stop.latitude])
        .addTo(map);

      if (isValid) {
        marker.setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<a href="${stop.link_maps}" target="_blank">Link Maps</a>`
          )
        );
      }
      // Armazena o marcador
      markersBusStops.push(marker);
    });
  } catch (error) {
    console.error("Erro ao carregar os pontos de ônibus:", error);
  }
}

export function removeAllMarkersBusStops() {
  markersBusStops.forEach((marker) => {
    marker.remove(); // Remove o marcador do mapa
  });
  markersBusStops = []; // Limpa o array de marcadores
}

function addRotaMapSpecificRoute(pontos_trajeto) {
  // Verifica se o array está vazio ou indefinido
  if (!pontos_trajeto || pontos_trajeto.length === 0) {
    alert(
      "Nenhum ponto de trajeto cadastrado, por isso não vai aparecer a rota"
    );
    removeRotaMapSpecificRoute();
    return;
  }

  // Usa a função local para preparar os pontos
  const waypoints = util.prepararPontosParaApi(pontos_trajeto).join(";");
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const route = data.routes[0].geometry.coordinates;

      if (map.getSource("route")) {
        map.getSource("route").setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        });
      } else {
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
              "line-color": "#0550A1", // Define a cor da linha (azul, por exemplo)
              "line-width": 4, // Define a largura da linha (ajuste conforme necessário)
            },
          },
          "aerialway"
        );
      }

      const bounds = new mapboxgl.LngLatBounds();
      route.forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds, { padding: 20 });
    })
    .catch((error) => console.error("Erro ao adicionar rota:", error));
}

function removeRotaMapSpecificRoute() {
  // Verifica se a camada "route1" existe no mapa
  if (map.getLayer("route1")) {
    map.removeLayer("route1"); // Remove a camada
  }

  // Verifica se a fonte "route" existe no mapa
  if (map.getSource("route")) {
    map.removeSource("route"); // Remove a fonte
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const rota_url = urlParams.get("rota") || "Desconhecida";
  rota_nome = formatarString(rota_url);
  list_rota = await apiGet.GetPontosTrajetoRotaNome(rota_url);
  list_pontos = await apiGet.GetPontosOnibusNome(rota_url);
  console.log(list_rota);
  preencherNomeRota();
  preencherNavBar();
  document.getElementById("nav").addEventListener("click", (event) => {
    // Verifica se o elemento clicado é um botão
    if (event.target.tagName === "BUTTON") {
      // Seleciona todos os botões dentro do elemento com ID "nav"
      const botoes = document.getElementById("nav").querySelectorAll("button");

      // Remove a classe "selecionado" de todos os botões
      botoes.forEach((botao) => {
        botao.classList.remove("selecionado");
      });

      // Adiciona a classe "selecionado" ao botão clicado
      event.target.classList.add("selecionado");

      // Exibe o valor do atributo data-rota no console
      removeRotaMapSpecificRoute();
      removeAllMarkersBusStops();
      addBusStopsSpecificRoute(list_pontos[event.target.dataset.rota]);
      addRotaMapSpecificRoute(list_rota[event.target.dataset.rota]);
    }
  });
});
