import { API_BASE_URL } from "../../config.js";
import * as util from "../util.js";

// api de rotas
export const getRotasList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rotas/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return await util.addNomeRotas(data);
  } catch (error) {
    console.error("Erro ao buscar as rotas:", error.message);
  }
};

export const getRotasFiltradas = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rotas/filtrado/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return await util.addNomeRotasFiltradas(data);
  } catch (error) {
    console.error("Erro ao buscar as rotas:", error.message);
  }
};

export const getVariacaoRota = async (rota_id) => {
  const rotas = await getRotasList();
  let rotas_variacao = [];
  rotas.forEach((element) => {
    if (element.id_variacao === rota_id) {
      rotas_variacao.push(element);
    }
  });
  return rotas_variacao;
};

export const getRota = async (rota_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rotas/${rota_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return await util.addNomeRota(data);
  } catch (error) {
    console.error("Erro ao buscar as rotas:", error.message);
  }
};

export const getHorariosList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/horarios/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar os horarios:", error.message);
  }
};

export const getHorario = async (horario_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/horarios/${horario_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar os horarios:", error.message);
  }
};

export const getHorariosRota = async (rota_name) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/horarios/rota/${rota_name}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro:", error.message);
    throw error;
  }
};

export const getTokenValid = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/token/validate/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle 401 (Unauthorized) response
        throw new Error("Token inválido. Por favor, faça login novamente.");
      } else {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao validar token:", error.message);
    throw error; // Re-throw the error for client-side handling
  }
};

export const getPontoOnibus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pontos_onibus/`, {
      // URL corrigida
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle 401 (Unauthorized) response
        throw new Error("Token inválido. Por favor, faça login novamente.");
      } else {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro:", error.message);
    throw error; // Re-throw the error for client-side handling
  }
};

export const getNotificationsList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar as notificações:", error.message);
    throw error; // Re-throw the error for client-side handling
  }
};

export const GetPontosTrajetoRota = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pontos_trajeto/rota-id/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar as notificações:", error.message);
    throw error; // Re-throw the error for client-side handling
  }
};
