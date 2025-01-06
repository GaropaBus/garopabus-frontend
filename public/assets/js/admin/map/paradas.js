import * as apiGet from "../../api/moldes_back/get.js";

let rotas = [];

document.addEventListener("DOMContentLoaded", async () => {
  rotas = await apiGet.getRotasList();
  const select_rotas = document.getElementById("select-rotas");
  for (const rota of rotas) {
    const opt = document.createElement("option");
    opt.value = rota.id;
    opt.textContent = rota.nome;

    select_rotas.appendChild(opt);
  }
});
