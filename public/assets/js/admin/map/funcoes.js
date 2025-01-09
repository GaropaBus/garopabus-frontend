const tela = document.getElementById("screen-paradas");
const incones = document.getElementById("icons");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-sair").addEventListener("click", () => {
    window.location = "/admin/dashboard/";
  });
  document.getElementById("btn-parada").addEventListener("click", () => {
    incones.style.display = "none";
    tela.style.display = "block";
  });
  document.getElementById("fechar").addEventListener("click", () => {
    incones.style.display = "flex";
    tela.style.display = "none";
  });
});
