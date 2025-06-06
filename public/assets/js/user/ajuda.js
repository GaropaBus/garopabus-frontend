import { API_BASE_URL } from "../config.js";
import * as apiGet from "../api/moldes_back/get.js";

document.addEventListener("DOMContentLoaded", async () => {
  const lista_aviso = document.getElementById("lista-avisos");
  if (!lista_aviso) {
    console.error("Elemento 'lista-avisos' não encontrado.");
    return;
  }

  lista_aviso.textContent = "";

  const avisos = await apiGet.getNotificationsList().catch((error) => {
    console.error("Erro ao buscar avisos:", error);
    return [];
  });

  for (const aviso_element of avisos) {
    const aviso = document.createElement("div");
    aviso.classList.add("aviso");

    const info_circle = document.createElement("div");
    const i_fainfo = document.createElement("i");
    i_fainfo.classList.add("fa-solid", "fa-info", "fa-fw");
    info_circle.appendChild(i_fainfo);
    info_circle.classList.add("info-circle");

    aviso.appendChild(info_circle);

    const aviso_information = document.createElement("div");
    aviso_information.classList.add("aviso-information");
    const h3_title = document.createElement("h3");
    h3_title.textContent = aviso_element.title;
    const p_message = document.createElement("p");
    p_message.textContent = aviso_element.message;
    p_message.classList.add("custom-message-font");

    aviso_information.appendChild(h3_title);
    aviso_information.appendChild(p_message);

    aviso.appendChild(aviso_information);

    lista_aviso.appendChild(aviso);
  }
});

// Função principal para solicitar permissão e inscrever o usuário em notificações push
async function initPushNotifications() {
  if (!("Notification" in window)) {
    console.error("Notificações não são suportadas neste navegador.");
    return;
  }
  if (!("serviceWorker" in navigator)) {
    console.error("Service Workers não são suportados neste navegador.");
    return;
  }
  if (!("PushManager" in window)) {
    console.error("PushManager não é suportado neste navegador.");
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Permissão para notificações negada.");
      return;
    }
    await subscribeUserToPush();
  } catch (error) {
    console.error("Erro ao solicitar permissão para notificações:", error);
  }
}

// Função para inscrever o usuário em notificações push
async function subscribeUserToPush() {
  try {
    const registration = await navigator.serviceWorker.ready;

    // Obtém a chave pública VAPID do backend
    const publicVapidKey = await getVapidKey();

    // Verifica se o usuário já está inscrito
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
    }
    // Envia a subscrição para o backend
    await sendSubscriptionToBackend(subscription);
  } catch (error) {
    console.error("Erro ao subscrever para notificações:", error);
  }
}

// Função para buscar a chave pública VAPID do backend
async function getVapidKey() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/subscription-notification/vapid-key/`
    );
    if (!response.ok) throw new Error("Falha ao buscar chave VAPID");
    const data = await response.json();
    return await data.vapid_public_key;
  } catch (error) {
    console.error("Erro ao buscar chave VAPID:", error);
    throw error;
  }
}

// Função para enviar os dados de subscrição ao backend
async function sendSubscriptionToBackend(subscription) {
  try {
    const data = subscription.toJSON();
    const response = await fetch(
      `${API_BASE_URL}/api/subscription-notification/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: data.endpoint,
          public_key: data.keys.p256dh,
          auth_key: data.keys.auth,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Erro ao registrar subscrição no backend: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Erro ao registrar subscrição no backend:", error);
  }
}

// Função utilitária para converter a chave VAPID (Base64) para Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

// Inicializa o sistema de notificações push e modal de informações de contato
initModal();
initPushNotifications();

// Controle do Modal
function initModal() {
  const modalContato = document.getElementById("modal-contato");
  const btnContato = document.getElementById("label-button-contact");
  const closeBtnContato = document.querySelector(".close-modal-contato");

  const modalInstalacao = document.getElementById("modal-install");
  const btnInstalacao = document.getElementById("label-button-install");
  const installBtnInstalacao = document.querySelector("#label-install-accept");
  const closeBtnInstalacao = document.querySelector(".close-modal-install");
  const cancelBtnInstalacao = document.querySelector("#label-install-cancel");

  if (
    !modalContato ||
    !btnContato ||
    !closeBtnContato ||
    !modalInstalacao ||
    !btnInstalacao ||
    !installBtnInstalacao ||
    !closeBtnInstalacao ||
    !cancelBtnInstalacao
  ) {
    console.error("Elementos do modal não encontrados.");
    return;
  }
  btnContato.addEventListener("click", () => {
    modalContato.style.display = "flex";
  });
  closeBtnContato.addEventListener("click", () => {
    modalContato.style.display = "none";
  });
  btnInstalacao.addEventListener("click", () => {
    modalInstalacao.style.display = "flex";
  });
  installBtnInstalacao.addEventListener("click", () => {
    const userAgent = navigator.userAgent;

    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      // iPhone | iPad | iPod
      modalInstalacao.style.display = "none";
    } else if (/Android/i.test(userAgent)) {
      // Android
      modalInstalacao.style.display = "none";
    } else {
      // Outros
      modalInstalacao.style.display = "none";
      console.warn("Dispositivo não identificado como Android ou iOS.");
    }
  });
  closeBtnInstalacao.addEventListener("click", () => {
    modalInstalacao.style.display = "none";
  });
  cancelBtnInstalacao.addEventListener("click", () => {
    modalInstalacao.style.display = "none";
  });
  window.addEventListener("click", (event) => {
    if (event.target === modalContato) {
      modalContato.style.display = "none";
    }

    if (event.target === modalInstalacao) {
      modalInstalacao.style.display = "none";
    }
  });
}
