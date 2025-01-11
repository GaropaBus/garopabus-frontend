const tela_paradas = document.getElementById("screen-paradas");
const tela_rota = document.getElementById("screen-pontos-trajeto");
const incones = document.getElementById("icons");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-sair").addEventListener("click", () => {
    window.location = "/admin/dashboard/";
  });
  document.getElementById("btn-parada").addEventListener("click", () => {
    incones.style.display = "none";
    tela_paradas.style.display = "block";
  });
  document.getElementById("btn-rota").addEventListener("click", () => {
    incones.style.display = "none";
    tela_rota.style.display = "block";
  });
  document.querySelectorAll(".fechar-tela-secundaria").forEach(element => {
    element.addEventListener("click", () => {
      incones.style.display = "flex";
      tela_paradas.style.display = "none";
      tela_rota.style.display = "none";
    });
  });
});
