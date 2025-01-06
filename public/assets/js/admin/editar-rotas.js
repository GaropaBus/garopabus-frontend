import * as util from "./util.js";
import * as apiGet from "../api/moldes_back/get.js";
import * as apiPost from "../api/moldes_back/post.js";
import * as apiPut from "../api/moldes_back/put.js";
import * as apiDelete from "../api/moldes_back/delete.js";

// Muda para adicionar uma variação em uma rota já existente
const btn_AddRota_AddVariacao = document.getElementById("addRota-addVariacao");
const div_addVariacao = document.querySelector(".addVariacao");
const div_addRota = document.querySelector(".addRota");
let rotas = [];
let rotas_filtradas = {};

btn_AddRota_AddVariacao.addEventListener("change", () => {
  if (btn_AddRota_AddVariacao.checked) {
    div_addRota.hidden = true;
    div_addVariacao.hidden = false;
  } else {
    div_addRota.hidden = false;
    div_addVariacao.hidden = true;
  }
});

// add nova rota
const addNewRota = async () => {
  const tem_variacao = document.getElementById("tem-variacao");
  const bairro_origem = document.getElementById("bairro-origem").value;
  const bairro_destino = document.getElementById("bairro-destino").value;

  if (bairro_origem === "" || bairro_destino === "") {
    alert("Alguma campo não foi preenchido");
    return;
  }
  let enviar;
  if (tem_variacao.checked === true) {
    enviar = {
      bairro_origem: bairro_origem,
      bairro_destino: bairro_destino,
      nome_variacao: "Direto",
      tipo: "principal",
      status: true,
      id_rota_principal: null,
    };
  } else {
    enviar = {
      bairro_origem: bairro_origem,
      bairro_destino: bairro_destino,
      nome_variacao: null,
      tipo: "principal",
      status: true,
      id_rota_principal: null,
    };
  }

  await apiPost.postNewRota(enviar);
};

// add nova Variação
const preencherRotas = () => {
  const select_rota = document.getElementById("select-rota");
  rotas.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.id;
    option.textContent = element.nome;
    select_rota.appendChild(option);
  });
};

const addNewVariacao = async () => {
  const select_rota = document.getElementById("select-rota").value;
  const inp_nome_variacao = document.getElementById("nome-variacao").value;
  const rota = await apiGet.getRota(parseInt(select_rota));
  const enviar = {
    bairro_origem: rota.bairro_origem,
    bairro_destino: rota.bairro_destino,
    nome_variacao: inp_nome_variacao,
    tipo: "variacao",
    status: true,
    id_rota_principal: parseInt(select_rota),
  };

  await apiPost.postNewRota(enviar);
};

const closeUpdadeModal = () => {
  const modal = document.getElementById("modal");
  const modal_backdrop = document.getElementById("modal-backdrop");
  modal_backdrop.style.display = "none";
  modal.style.display = "none";
};

const openModal = async (id_rota) => {
  const modal = document.getElementById("modal");
  const modal_backdrop = document.getElementById("modal-backdrop");
  const rota = await apiGet.getRota(id_rota);
  document.getElementById("id-horario-selecionado").textContent = rota.id;
  const div_principal = document.getElementById("principal");
  const div_variacao = document.getElementById("variacao");

  if (rota.id_rota_principal === null) {
    div_principal.style.display = "block";
    div_variacao.style.display = "none";
    document.getElementById("bairro-origem_edit").value = rota.bairro_origem;
    document.getElementById("bairro-destino_edit").value = rota.bairro_destino;
  } else {
    div_principal.style.display = "none";
    div_variacao.style.display = "block";

    document.getElementById("nome-variacao_edit").value = rota.nome_variacao;
    const select_rota = document.getElementById("select-rota_edit");
    rotas.forEach((element) => {
      const option = document.createElement("option");
      option.value = element.id;
      option.textContent = element.nome;
      if (option.value === rota.id) {
        option.selected;
      }
      select_rota.appendChild(option);
    });
  }

  document
    .getElementById("addNewRota_edit")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      let enviar;
      if (div_principal.style.display === "block") {
        enviar = {
          bairro_origem: document.getElementById("bairro-origem_edit").value,
          bairro_destino: document.getElementById("bairro-destino_edit").value,
          nome_variacao: null,
          tipo: "principal",
          status: true,
          id_rota_principal: null,
        };
      } else if (div_variacao.style.display === "block") {
        enviar = {
          bairro_origem: rota.bairro_origem,
          bairro_destino: rota.bairro_destino,
          nome_variacao: document.getElementById("nome-variacao_edit").value,
          tipo: "variacao",
          status: true,
          id_rota_principal: parseInt(
            document.getElementById("select-rota_edit").value
          ),
        };
      }
      console.log(rota.id, enviar);

      await apiPut.updateRota(rota.id, enviar);
      closeUpdadeModal();
      /* Enviar */
    });

  modal_backdrop.style.display = "block";
  modal.style.display = "block";
};

const deleteRota = async (id) => {
  if (confirm(`Deseja deletar a rota de id ${id}`)) {
    await apiDelete.deleteRota(id);
  }
};

const addRotasEdit = () => {
  const div_sentido_bairros = document.getElementById("rotas-sentido-bairros");
  const dic_sentido_garopaba = document.getElementById(
    "rotas-sentido-garopaba"
  );
  rotas_filtradas.sentido_bairros.forEach((element) => {
    const div = `
            <div class="item">
                <div class="parada-info">
                    <div class="name-item">
                        <p>${element.nome}</p>
                    </div>
                </div>
                <div class="parada-actions">
                    <button class="edit-btn" onclick="openModal(${element.id})">✏️</button>
                    <button class="delete-btn" onclick="deleteRota(${element.id})">❌</button>
                </div>
            </div>
        `;
    div_sentido_bairros.innerHTML += div;
  });

  rotas_filtradas.sentido_garopaba.forEach((element) => {
    const div = `
            <div class="item">
                <div class="parada-info">
                    <div class="name-item">
                        <p>${element.nome}</p>
                    </div>
                </div>
                <div class="parada-actions">
                    <button class="edit-btn" onclick="openModal(${element.id})">✏️</button>
                    <button class="delete-btn" onclick="deleteRota(${element.id})">❌</button>
                </div>
            </div>
        `;
    dic_sentido_garopaba.innerHTML += div;
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  rotas_filtradas = await apiGet.getRotasFiltradas();
  rotas = await apiPost.getRotasListFiltrada({ tipo: "principal" });

  preencherRotas();
  document
    .getElementById("addNewRota")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      await addNewRota();
    });

  document
    .getElementById("addNewVariacao")
    .addEventListener("click", (event) => {
      event.preventDefault();
      addNewVariacao();
    });

  addRotasEdit();

  window.closeUpdadeModal = closeUpdadeModal;
  window.openModal = openModal;
  window.deleteRota = deleteRota;
});
