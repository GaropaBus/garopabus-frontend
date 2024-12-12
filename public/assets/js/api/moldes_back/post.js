import * as util from '../util.js'

const token = sessionStorage.getItem('token')

export const updateHorario = async (id, dados) => {
    console.log(id)
    console.log(dados)
}

export const Token = async (username, password) => {
    try {
      const response = await fetch('https://dev.api.garopabus.uk/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao obter token: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.access;
    } catch (error) {
      console.error('Erro ao obter token:', error.message);
      return null;
    }
  };

  export async function getRotasListFiltrada(params) {
    try {
        const response = await fetch('https://dev.api.garopabus.uk/api/rotas/filtrar/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "bairro_origem": (params.bairro_origem ? params.bairro_origem : ''),
                "bairro_destino": (params.bairro_destino ? params.bairro_destino : ''),
                "tipo": (params.tipo ? params.tipo : ''),
            })
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

