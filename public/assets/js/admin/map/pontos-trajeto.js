import * as mapbox from "./mapbox-init.js";

let pontos_trajeto = [
  { id: 1, ordem: 1, latitude: "-28.02752694369635", longitude: "-48.62849684633679" },
  { id: 2, ordem: 2, latitude: "-28.02691556577123", longitude: "-48.62882447884360" },
  { id: 3, ordem: 3, latitude: "-28.02558635378873", longitude: "-48.62838150944791" },
  { id: 4, ordem: 4, latitude: "-28.02637989232536", longitude: "-48.62256184293889" },
  { id: 5, ordem: 5, latitude: "-28.02666762637399", longitude: "-48.62046900680693" },
  { id: 6, ordem: 6, latitude: "-28.02586662097820", longitude: "-48.62026530117200" },
  { id: 7, ordem: 7, latitude: "-28.02607780883985", longitude: "-48.61886446533597" },
  { id: 8, ordem: 8, latitude: "-28.09934838638850", longitude: "-48.67372727400809" },
];

const addDataTable = (pontos_trajeto) => {
  const tabela_pontos_trajeto = document
    .getElementById("trajetoTable")
    .querySelector("tbody");

  // Certifique-se de que o tbody existe
  if (!tabela_pontos_trajeto) {
    console.error(
      "O elemento <tbody> não foi encontrado na tabela com id 'trajetoTable'."
    );
    return;
  }

  // Limpa o conteúdo do tbody
  tabela_pontos_trajeto.innerHTML = "";

  // Adiciona os dados na tabela
  pontos_trajeto.forEach((element) => {
    const tr = document.createElement("tr");

    const td_ordem = document.createElement("td");
    td_ordem.textContent = element.ordem;

    const td_lat = document.createElement("td");
    td_lat.textContent = element.latitude;

    const td_lng = document.createElement("td");
    td_lng.textContent = element.longitude;



    tr.appendChild(td_ordem);
    tr.appendChild(td_lat);
    tr.appendChild(td_lng);

    tabela_pontos_trajeto.appendChild(tr); // Adiciona a linha ao tbody
  });
};

mapbox.addRotaMapSpecificRoute(pontos_trajeto);
addDataTable(pontos_trajeto);
