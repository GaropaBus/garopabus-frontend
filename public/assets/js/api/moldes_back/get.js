
import * as util from '../util.js'

// api de rotas 
export const getRotasList = async () => {
    try {
        const response = await fetch('https://dev.api.garopabus.uk/api/rotas/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return await util.addNomeRotas(data);
    } catch (error) {
        console.error('Erro ao buscar as rotas:', error.message);
    }
}

export const getRotasFiltradas = async () => {
    try {
        const response = await fetch('https://dev.api.garopabus.uk/api/rotas/filtrado/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return await util.addNomeRotasFiltradas(data);
    } catch (error) {
        console.error('Erro ao buscar as rotas:', error.message);
    }
}

export const getVariacaoRota = async (rota_id) => {
    const rotas = await getRotasList()
    let rotas_variacao = []
    rotas.forEach(element => {
        if (element.id_variacao === rota_id) {
            rotas_variacao.push(element)
        }
    })
    return rotas_variacao
}

export const getRota = async (rota_id) => {
    try {
        const response = await fetch(`https://dev.api.garopabus.uk/api/rotas/${rota_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return await util.addNomeRota(data);
    } catch (error) {
        console.error('Erro ao buscar as rotas:', error.message);
    }
}

export const getHorariosList = async () => {
    try {
        const response = await fetch('https://dev.api.garopabus.uk/api/horarios/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar os horarios:', error.message);
    }
}

export const getHorario = async (horario_id) => {
    try {
        const response = await fetch(`https://dev.api.garopabus.uk/api/horarios/${horario_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar os horarios:', error.message);
    }
};

export const getHorariosRota = async (rota_name) => {
    try {
        const response = await fetch(`https:///dev.api.garopabus.uk/api/horarios/rota/${rota_name}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar os horarios:', error.message);
    }
};

export const getPontosTrajeto = async () => {
    const pontos_trajeto = [
        {
            id: 1,
            ordem: 1,
            latitude: "-28.02746079165392",
            longitude: "-48.62894836820254",
            id_rota: 1
        },
        {
            id: 2,
            ordem: 2,
            latitude: "-28.025598241783666",
            longitude: "-48.628410903411876",
            id_rota: 1
        },
        {
            id: 3,
            ordem: 3,
            latitude: "-28.026523938849035",
            longitude: "-48.621591752515485",
            id_rota: 1
        },
    ]

    return pontos_trajeto
}

export const getPontosTrajetoRota = async (rota_id) => {
    const pontos_trajeto = await getPontosTrajeto()
    const pontos_trajeto_rota = pontos_trajeto.find(ponto_trajeto => ponto_trajeto.id_rota === rota_id)

    return pontos_trajeto_rota
}

export const getTokenValid = async (token) => {
    try {
      const response = await fetch(`https://dev.api.garopabus.uk/api/token/validate/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
      console.error('Erro ao validar token:', error.message);
      throw error; // Re-throw the error for client-side handling
    }
  };