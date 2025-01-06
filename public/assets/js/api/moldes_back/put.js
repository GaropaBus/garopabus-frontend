import { API_BASE_URL } from "../../config.js";
const token = sessionStorage.getItem("token");

export const updateHorario = async (id, dados) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/horarios/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dia_semana: dados.dia_semana,
        hora_partida: dados.hora_partida,
        hora_chegada: dados.hora_chegada,
        id_rota: dados.id_rota,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao buscar as rotas:", error.message);
  }
};

export const updateRota = async (id, dados) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rotas/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bairro_origem: dados.bairro_origem,
        bairro_destino: dados.bairro_destino,
        nome_variacao: dados.nome_variacao,
        tipo: dados.tipo,
        status: dados.status,
        id_rota_principal: dados.id_rota_principal,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Captura o texto completo da resposta
      console.error(
        `Erro detalhado do servidor (${response.status}):`,
        errorText
      );
      throw new Error(`Erro: ${response.status} - ${errorText}`);
    }

    return await response.json(); // Retorna o JSON da resposta
  } catch (error) {
    console.error("Erro:", error.message);
  }
};
