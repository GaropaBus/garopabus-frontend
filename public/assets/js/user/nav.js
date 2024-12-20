const btn_ajuda = document.getElementById("garopabus-ajuda");
const btn_rotas = document.getElementById("garopabus-rotas");
const btn_map = document.getElementById("garopabus-map");
const btn_settings = document.getElementById("garopabus-configuracao");
console.log(btn_settings)

const verificarLink = () => {
    switch (window.location.pathname) {
        case "/user/ajuda/":
          btn_ajuda.classList.add("active");
          break;
        case "/user/rotas-onibus/":
          btn_rotas.classList.add("active");
          break;
        case "/user/map/":
          btn_map.classList.add("active");
          break;
        case "/user/configuracoes/":
          btn_settings.classList.add("active");
          break;
        default:
          break;
      }
    };
    document.addEventListener("DOMContentLoaded", () => {
      verificarLink();
      btn_ajuda.addEventListener('click', () => {
        window.location.href = "/user/ajuda/";
      })
      btn_rotas.addEventListener('click', () => {
        window.location.href = "/user/rotas-onibus/";
      })
      btn_map.addEventListener('click', () => {
        window.location.href = "/user/map/";
      })
      btn_settings.addEventListener('click', () => {
        window.location.href = "/user/configuracoes/";
      })
    });