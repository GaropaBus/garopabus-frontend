import { API_BASE_URL } from "../../config.js";
import * as util from "../util.js";

const token = sessionStorage.getItem("token");

export const postNewHorario = async (dados) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/horarios/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
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
    console.error("Erro:", error.message);
  }
};

export const Token = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Erro ao obter token: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.access;
  } catch (error) {
    console.error("Erro ao obter token:", error.message);
    return null;
  }
};

export const getRotasListFiltrada = async (params) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rotas/filtrar/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bairro_origem: params.bairro_origem ? params.bairro_origem : "",
        bairro_destino: params.bairro_destino ? params.bairro_destino : "",
        tipo: params.tipo ? params.tipo : "",
      }),
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

export const postPontoOnibus = async (dados) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pontos_onibus/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        latitude: dados.latitude,
        longitude: dados.longitude,
        link_maps: dados.link_maps,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Detalhes do erro
      console.error("Erro detalhado do servidor:", errorResponse);
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro:", error.message);
  }
};

export const postNewRota = async (dados) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rotas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
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
      const errorResponse = await response.json(); // Detalhes do erro
      console.error("Erro detalhado do servidor:", errorResponse);
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro:", error.message);
  }
};

export const postRotaPontoOnibusFiltrar = async (params) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rotas_ponto_onibus/filtrar/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        id_rota: params.id_rota ? params.id_rota : null,
        id_ponto_onibus: params.id_ponto_onibus ? params.id_ponto_onibus : null
      }),
    });

    if (!response.ok){
      const errorResponse = await response.json(); // Detalhes do erro
      console.error("Erro detalhado do servidor:", errorResponse);
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return await util.addNomeRotasPontoOnibosFiltrar(data);
  } catch (error) {
    console.error("Erro:", error.message);
  }
};