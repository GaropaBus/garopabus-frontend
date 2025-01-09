import * as apiGetBack from "../api/moldes_back/get.js";
import * as apiPostBack from "../api/moldes_back/post.js";
import * as apiDelete from "../api/moldes_back/delete.js";
import * as apiPut from "../api/moldes_back/put.js";
import { formatRouteNameForUrl } from "../api/util.js";

// adicionar algum horario
const addOptionRotas = async () => {
  try {
    const rotas = await apiGetBack.getRotasList(); // Obtenha as rotas aqui
    const select_rotas = document.getElementById("rotas");

    rotas.forEach((element) => {
      const option = document.createElement("option");
      option.value = element.id;
      option.textContent = element.nome;
      select_rotas.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar as rotas:", error);
    alert("Erro ao carregar as rotas. Tente novamente mais tarde.");
  }
};

let hora_partida = "";
let hora_chegada = "";
const getHorarios = () => {
  const partidaInput = document.getElementById("horario-partida");
  const chegadaInput = document.getElementById("horario-chegada");

  if (partidaInput.value === "" || chegadaInput.value === "") {
    alert("Algum horário não foi preenchido");
    return false;
  } else if (partidaInput.value === chegadaInput.value) {
    alert(
      "Não deixe os horarios iguas ( Dica: coloque no minimo 30min de diferença entre eles )"
    );
    return false;
  }

  hora_partida = partidaInput.value;
  hora_chegada = chegadaInput.value;
  return true;
};

let tipoDia = "";
const getTipoDia = () => {
  const divs_dias = document.querySelectorAll(".inp-dia");

  for (let element of divs_dias) {
    if (element.checked) {
      tipoDia = element.getAttribute("data-tipoDia");
      return true;
    }
  }

  alert("Selecione o tipo de dia que esse horário será usado");
  return false;
};

const clearInformacoes = () => {
  // Limpar o campo select
  const rotaSelect = document.getElementById("rotas");
  if (rotaSelect) {
    rotaSelect.selectedIndex = 0; // Define para o primeiro item
  }

  // Limpar os campos de horário
  const horarioPartida = document.getElementById("horario-partida");
  const horarioChegada = document.getElementById("horario-chegada");
  if (horarioPartida) {
    horarioPartida.value = "";
  }
  if (horarioChegada) {
    horarioChegada.value = "";
  }

  // Desmarcar os botões de rádio
  const radioButtons = document.querySelectorAll(".inp-dia");
  radioButtons.forEach((radio) => {
    radio.checked = false;
  });
};

const addNewHorarioOnibus = async () => {
  if (!getTipoDia()) return;
  if (!getHorarios()) return;

  const select_value = parseInt(document.getElementById("rotas").value);
  if (select_value === "null") {
    alert("Selecione uma rota");
    return;
  }

  const enviar = {
    dia_semana: tipoDia,
    hora_partida: hora_partida,
    hora_chegada: hora_chegada,
    id_rota: select_value,
  };
  console.log(enviar);

  await apiPostBack.postNewHorario(enviar);
  clearInformacoes();
};

// editar os horarios

const addRotasHorariosEdit = async () => {
  const div_edit = document.getElementById("edit-section"); // Elemento onde os itens serão adicionados

  for (const rota of rotas_principais) {
    try {
      // Obter os horários (com variações) de cada rota
      let rota_nome = `${rota.bairro_origem.toLowerCase()}-X-${rota.bairro_destino.toLowerCase()}`;
      const horarios_rota = await apiGetBack.getHorariosRota(
        `${formatRouteNameForUrl(rota_nome)}`
      );
      console.log(horarios_rota);

      let horariosDiaUtilHtml = "";
      let horariosFimDeSemanaHtml = "";

      horarios_rota.dias_uteis.forEach((horario) => {
        const horarioHtml = `
                    <div class="edit-time" data-id="${horario.id}">
                        <p id="variacao">${horario.tipo_variacao}</p>
                        <p>Partida: <span>${horario.hora_partida}</span></p>
                        <p>Chegada: <span>${horario.hora_chegada}</span></p>
                    </div>
                `;
        horariosDiaUtilHtml += horarioHtml;
      });

      horarios_rota.fim_semana.forEach((horario) => {
        const horarioHtml = `
                    <div class="edit-time" data-id="${horario.id}">
                        <p id="variacao">${horario.tipo_variacao}</p>
                        <p>Partida: <span>${horario.hora_partida}</span></p>
                        <p>Chegada: <span>${horario.hora_chegada}</span></p>
                    </div>
                `;
        horariosFimDeSemanaHtml += horarioHtml;
      });

      const edit_item = `
                <div class="edit-item">
                    <div class="edit-info">
                        <h3>
                            <span>${rota.nome}</span>
                        </h3>
                        <div class="edit-tipo-dia">
                            <h4>Dia Util</h4>
                            <div class="edit-times">
                                ${horariosDiaUtilHtml}
                            </div>
                        </div>
                        
                        <div class="edit-tipo-dia">
                            <h4>Fim de semana/feriado</h4>
                            <div class="edit-times">
                                ${horariosFimDeSemanaHtml}
                            </div>
                        </div>
                    </div>
                    <div class="parada-actions">
                        <button class="edit-btn">✏️</button>
                        <button class="delete-btn">❌</button>
                    </div>
                </div>
            `;
      div_edit.innerHTML += edit_item;
    } catch (error) {
      console.error(`Erro ao buscar horários para a rota ${rota.nome}:`, error);
    }
  }
};

let editButonFocus = false;
let deletButtonFocus = false;

const editButton = () => {
  const buttons = document.querySelectorAll(".edit-btn");

  buttons.forEach((button) => {
    button.addEventListener("focus", () => {
      editButonFocus = true;
      document.querySelectorAll(".edit-time").forEach((element) => {
        element.classList.add("edit-mode");
      });
    });

    button.addEventListener("blur", () => {
      setTimeout(() => {
        editButonFocus = false;
        document.querySelectorAll(".edit-time").forEach((element) => {
          element.classList.remove("edit-mode");
        });
      }, 100);
    });
  });
};

const deleteButton = () => {
  const buttons = document.querySelectorAll(".delete-btn");

  buttons.forEach((button) => {
    button.addEventListener("focus", () => {
      deletButtonFocus = true;
      document.querySelectorAll(".edit-time").forEach((element) => {
        element.classList.add("delete-mode");
      });
    });

    button.addEventListener("blur", () => {
      setTimeout(() => {
        deletButtonFocus = false;
        document.querySelectorAll(".edit-time").forEach((element) => {
          element.classList.remove("delete-mode");
        });
      }, 100);
    });
  });
};

const openUpdadeModal = (horario) => {
  const modal = document.getElementById("modal");
  const modal_backdrop = document.getElementById("modal-backdrop");

  document.getElementById("id-horario-selecionado").innerText = horario.id;

  try {
    const select_rotas = document.getElementById("rotas_updt");
    select_rotas.textContent = "";
    rotas.forEach((element) => {
      const option = document.createElement("option");
      option.value = element.id;
      option.textContent = element.nome;
      if (element.id === horario.id_rota) {
        option.selected = true;
      }
      select_rotas.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar as rotas:", error);
    alert("Erro ao carregar as rotas. Tente novamente mais tarde.");
  }

  document.getElementById("horario-partida_updt").value = horario.hora_partida;
  document.getElementById("horario-chegada_updt").value = horario.hora_chegada;

  if (horario.dia_semana === "dia_util") {
    document.getElementById("dia-util_updt").checked = true;
  } else if (horario.dia_semana === "final_semana_feriado") {
    document.getElementById("final_semana_feriado_updt").checked = true;
  }

  modal_backdrop.style.display = "block";
  modal.style.display = "block";
};

const closeUpdadeModal = () => {
  const modal = document.getElementById("modal");
  const modal_backdrop = document.getElementById("modal-backdrop");
  modal_backdrop.style.display = "none";
  modal.style.display = "none";
};

let tipoDiaUpdate = "";
const getTipoDiaUpdate = () => {
  const divs_dias = document.querySelectorAll(".inp-dia_updt");

  for (let element of divs_dias) {
    if (element.checked) {
      tipoDiaUpdate = element.getAttribute("data-tipoDia");
      return true;
    }
  }

  alert("Selecione o tipo de dia que esse horário será usado");
  return false;
};

let hora_partidaUpdate = "";
let hora_chegadaUpdate = "";
const getHorariosUpdate = () => {
  const partidaInput = document.getElementById("horario-partida_updt");
  const chegadaInput = document.getElementById("horario-chegada_updt");

  if (partidaInput.value === "" || chegadaInput.value === "") {
    alert("Algum horário não foi preenchido");
    return false;
  }

  hora_partidaUpdate = partidaInput.value;
  hora_chegadaUpdate = chegadaInput.value;
  return true;
};

const enviarUpdateHorario = () => {
  if (!getTipoDiaUpdate()) return;
  if (!getHorariosUpdate()) return;
  const id = parseInt(
    document.getElementById("id-horario-selecionado").textContent
  );
  const select_value = parseInt(document.getElementById("rotas_updt").value);
  if (select_value === "null") {
    alert("Selecione uma rota");
    return;
  }

  const enviar = {
    dia_semana: tipoDiaUpdate,
    hora_partida: hora_partidaUpdate,
    hora_chegada: hora_chegadaUpdate,
    id_rota: select_value,
  };
  apiPut.updateHorario(id, enviar);
  closeUpdadeModal();
};

const deleteHorario = (id) => {
  if (deletButtonFocus) {
    apiDelete.deleteHorario(id);
  }
};

const handleHorarioClick = async (dataId, action) => {
  if (dataId && action === "edição") {
    const horario = await apiGetBack.getHorario(parseInt(dataId));
    openUpdadeModal(horario);
  } else if (dataId && action === "exclusão") {
    if (confirm(`Deseja excluir o horário de ID ${dataId}?`)) {
      deleteHorario(dataId);
    }
  }
};

const updateHorario = () => {
  const horarios = document.querySelectorAll(".edit-time");

  horarios.forEach((element) => {
    element.addEventListener("pointerdown", async (event) => {
      const dataId = event.currentTarget.getAttribute("data-id");
      if (editButonFocus) {
        await handleHorarioClick(dataId, "edição");
      } else if (deletButtonFocus) {
        await handleHorarioClick(dataId, "exclusão");
      }
    });
  });
};

let rotas = [];
let rotas_principais = [];
// assim que a página abrir
document.addEventListener("DOMContentLoaded", async () => {
  rotas = await apiGetBack.getRotasList();

  // arrumar quando o back fazer a api certa
  rotas_principais = await apiPostBack.getRotasListFiltrada({
    tipo: "principal",
  });

  await addOptionRotas();
  const submit = document.getElementById("submit");
  submit.addEventListener("click", async (event) => {
    event.preventDefault();
    await addNewHorarioOnibus();
  });
  await addRotasHorariosEdit();
  editButton();
  deleteButton();
  updateHorario();
  window.closeUpdadeModal = closeUpdadeModal;
  document.getElementById("submit_updt").addEventListener("click", (event) => {
    event.preventDefault();
    enviarUpdateHorario();
  });
});
