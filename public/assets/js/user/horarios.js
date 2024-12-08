import * as apiGet from "../api/get.js";

let rota;

const tbody_semana = document.getElementById("weekSchedule-tbody");
const tbody_feriado = document.getElementById("weekendSchedule-tbody");

const preencherTabelaHorariosSemana = () => {
  if (!rota || !rota.horarios_semana) {
    console.error("Dados da rota ou horários não encontrados");
    return;
  }

  tbody_semana.innerHTML = "";

  for (const horario of rota.horarios_semana) {
    const tr = document.createElement("tr");

    const tdVariacao = document.createElement("td");
    tdVariacao.textContent = horario.variacao;
    tr.appendChild(tdVariacao);

    const tdHorarioPartida = document.createElement("td");
    tdHorarioPartida.textContent = horario.horarioPartida;
    tr.appendChild(tdHorarioPartida);

    const tdHorarioChegada = document.createElement("td");
    tdHorarioChegada.textContent = horario.horarioChegada;
    tr.appendChild(tdHorarioChegada);

    tbody_semana.appendChild(tr);
  }
};

const preencherTabelaHorariosFeriado = () => {
  if (!rota || !rota.horarios_feriado) {
    console.error("Dados da rota ou horários não encontrados");
    return;
  }

  tbody_feriado.innerHTML = "";

  for (const horario of rota.horarios_feriado) {
    const tr = document.createElement("tr");

    const tdVariacao = document.createElement("td");
    tdVariacao.textContent = horario.variacao;
    tr.appendChild(tdVariacao);

    const tdHorarioPartida = document.createElement("td");
    tdHorarioPartida.textContent = horario.horarioPartida;
    tr.appendChild(tdHorarioPartida);

    const tdHorarioChegada = document.createElement("td");
    tdHorarioChegada.textContent = horario.horarioChegada;
    tr.appendChild(tdHorarioChegada);

    tbody_feriado.appendChild(tr);
  }
};

// Função para preencher o nome da rota
const preencherNomeRota = () => {
  const routeNameElement = document.getElementById("routeName");

  if (!rota || !rota.nome) {
    console.error("Nome da rota não encontrado");
    return;
  }
  // Preenche o nome da rota
  routeNameElement.textContent = rota.nome;
};

// Função para obter dados da API e inicializar o preenchimento
const inicializarPagina = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const rota_url = urlParams.get("rota") || "Desconhecida";

    rota = await apiGet.getRotaSelecionada(rota_url); // Salvar a primeira rota na variável global

    preencherTabelaHorariosSemana(); // Preencher tabela de horários
    preencherNomeRota(); // Preencher nome da rota
    preencherTabelaHorariosFeriado();
  } catch (error) {
    console.error("Erro ao obter dados da API:", error);
  }
};

document.addEventListener("DOMContentLoaded", inicializarPagina);

window.changeTab = (tab) => {
  const weekSchedule = document.getElementById("weekSchedule");
  const weekendSchedule = document.getElementById("weekendSchedule");

  if (tab === "semana") {
    weekSchedule.style.display = "block";
    weekendSchedule.style.display = "none";
  } else {
    weekSchedule.style.display = "none";
    weekendSchedule.style.display = "block";
  }

  // Limpar a classe 'active' de todos os elementos .tab
  document.querySelectorAll(".tab").forEach((tabEl) => {
    tabEl.classList.remove("active");
  });

  // Adicionar a classe 'active' ao elemento clicado
  const activeTab =
    tab === "semana"
      ? document.querySelector(".tab:nth-child(1)")
      : document.querySelector(".tab:nth-child(2)");
  activeTab.classList.add("active");
};

window.goBack = () => {
  window.location.href = "/user/rotas-onibus";
};

/* Arrastar e trocar os horarios */

let startX;
let startY;
let endX;
let endY;

const threshold = 50; // Distância mínima para considerar um swipe
const container = document.querySelector("main"); // Elemento onde queremos detectar o swipe

// Detecta o início do toque
container.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

// Detecta o movimento do toque (opcional, para detectar enquanto arrasta)
container.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
  endY = e.touches[0].clientY;
});

// Detecta o fim do toque
container.addEventListener("touchend", () => {
  const diffX = endX - startX;
  const diffY = endY - startY;

  const weekSchedule = document.getElementById("weekSchedule");
  const weekendSchedule = document.getElementById("weekendSchedule");
  const tabs = document.querySelectorAll(".tab");

  // Verificar se o movimento foi horizontal (esquerda ou direita)
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Verificar se o swipe foi para a direita
    if (diffX > threshold) {
      console.log("Swipe para a direita!");
      weekSchedule.style.display = "block";
      weekendSchedule.style.display = "none";

      tabs[1].classList.remove("active");
      tabs[0].classList.add("active");
    }
    // Verificar se o swipe foi para a esquerda
    else if (diffX < -threshold) {
      console.log("Swipe para a esquerda!");
      weekSchedule.style.display = "none";
      weekendSchedule.style.display = "block";

      tabs[0].classList.remove("active");
      tabs[1].classList.add("active");
    }
  }
});
