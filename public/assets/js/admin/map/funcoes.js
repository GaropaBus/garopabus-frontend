document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-sair").addEventListener("click", () => {
    window.location = "/admin/dashboard/";
  });
  document.getElementById('btn-parada').addEventListener("click", () => {
    const incones = document.getElementById('icons')
    incones.style.display = 'none'
    const tela = document.getElementById('screen-paradas')
    tela.style.display = 'block'
  })
  document.getElementById('fechar').addEventListener("click", () => {
    const incones = document.getElementById('icons')
    incones.style.display = 'flex'
    const tela = document.getElementById('screen-paradas')
    tela.style.display = 'none'
  })
});
