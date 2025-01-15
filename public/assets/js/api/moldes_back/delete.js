import { API_BASE_URL } from "../../config.js";
const token = sessionStorage.getItem("token");

export const deleteHorario = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/horarios/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao buscar as rotas:", error.message);
  }
};

export const deleteRota = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rotas/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Detalhes do erro
      console.error("Erro detalhado do servidor:", errorResponse);
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao buscar as rotas:", error.message);
  }
};

export const deletePontoOnibus = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pontos_onibus/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Detalhes do erro
      console.error("Erro detalhado do servidor:", errorResponse);
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao buscar as rotas:", error.message);
  }
};

export const deleteRotasPontoOnibus = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/rotas_ponto_onibus/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json(); // Detalhes do erro
      console.error("Erro detalhado do servidor:", errorResponse);
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao buscar as rotas:", error.message);
  }
};
