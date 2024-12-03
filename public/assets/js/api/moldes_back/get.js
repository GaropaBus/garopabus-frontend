
// api de rotas 
export const getRotasList = async () => {
    const rotas = [
        {
            id: 1,
            nome: "Garopaba X Rosa",
            bairro_origem: "Garopaba",
            bairro_destino: "Rosa",
            nome_variacao: null,
            id_variacao: null,
            tipo: "principal",
            status: true
        },
        {
            id: 2,
            nome: "Garopaba X Rosa (Ressacada)",
            bairro_origem: "Garopaba",
            bairro_destino: "Rosa",
            nome_variacao: "Ressacada",
            id_variacao: 1,
            tipo: "variacao",
            status: true
        },
        {
            id: 3,
            nome: "Garopaba X Campo Duna",
            bairro_origem: "Garopaba",
            bairro_destino: "Campo Duna",
            nome_variacao: null,
            id_variacao: null,
            tipo: "principal",
            status: true
        },
        {
            id: 4,
            nome: "Garopaba X Campo Duna (Ressacada)",
            bairro_origem: "Garopaba",
            bairro_destino: "Campo Duna",
            nome_variacao: "Ressacada",
            id_variacao: 3,
            tipo: "variacao",
            status: true
        },
        {
            id: 5,
            nome: "Garopaba X Imbituba",
            bairro_origem: "Garopaba",
            bairro_destino: "Imbituba",
            nome_variacao: null,
            id_variacao: null,
            tipo: "principal",
            status: true
        },
        {
            id: 6,
            nome: "Garopaba X Imbituba (Ressacada)",
            bairro_origem: "Garopaba",
            bairro_destino: "Imbituba",
            nome_variacao: "Ressacada",
            id_variacao: 5,
            tipo: "variacao",
            status: true
        },
        {
            id: 7,
            nome: "Rosa X Garopaba",
            bairro_origem: "Rosa",
            bairro_destino: "Garopaba",
            nome_variacao: null,
            id_variacao: null,
            tipo: "principal",
            status: true
        },
        {
            id: 8,
            nome: "Rosa X Garopaba (Ressacada)",
            bairro_origem: "Rosa",
            bairro_destino: "Garopaba",
            nome_variacao: "Ressacada",
            id_variacao: 9,
            tipo: "variacao",
            status: true
        },
        {
            id: 9,
            nome: "Campo Duna X Garopaba",
            bairro_origem: "Campo Duna",
            bairro_destino: "Garopaba",
            nome_variacao: null,
            id_variacao: null,
            tipo: "principal",
            status: true
        },
        {
            id: 10,
            nome: "Campo Duna X Garopaba (Ressacada)",
            bairro_origem: "Campo Duna",
            bairro_destino: "Garopaba",
            nome_variacao: "Ressacada",
            id_variacao: 11,
            tipo: "variacao",
            status: true
        },
        {
            id: 11,
            nome: "Imbituba X Garopaba",
            bairro_origem: "Imbituba",
            bairro_destino: "Garopaba",
            nome_variacao: null,
            id_variacao: null,
            tipo: "principal",
            status: true
        },
        {
            id: 12,
            nome: "Imbituba X Garopaba (Ressacada)",
            bairro_origem: "Imbituba",
            bairro_destino: "Garopaba",
            nome_variacao: "Ressacada",
            id_variacao: 13,
            tipo: "variacao",
            status: true
        },
    ]
    return rotas
}

/* export const rotasApi = async () => {
    try {
        const response = await fetch('https://dev.api.garopabus.uk/rotas/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Rotas:', data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar as rotas:', error.message);
    }
}; */



export const getRotasPrincipais = async () => {
    const rotas = await getRotasList()
    let rotas_principais = []
    for (const rota of rotas) {
        if (rota.tipo === 'principal') {
            rotas_principais.push(rota)
        }
    }
    return rotas_principais
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
    const rotas = await getRotasList()
    const rota = rotas.find((r) => r.id === rota_id);
    return rota
}

export const getHorariosList = async () => {
    const horarios = [
        { 
            id: 1, 
            dia_semana: "dia_util", 
            hora_partida: "06:45", 
            hora_chegada: "07:15", 
            id_rota: 1 
        },
        { 
            id: 2, 
            dia_semana: "dia_util", 
            hora_partida: "08:50", 
            hora_chegada: "09:20", 
            id_rota: 1 
        },
        { 
            id: 3, 
            dia_semana: "dia_util", 
            hora_partida: "12:30", 
            hora_chegada: "13:00", 
            id_rota: 1 
        },
        { 
            id: 4, 
            dia_semana: "dia_util", 
            hora_partida: "10:15", 
            hora_chegada: "10:45", 
            id_rota: 2 
        },
        { 
            id: 5, 
            dia_semana: "fim_semana_feriado", 
            hora_partida: "06:45", 
            hora_chegada: "07:15", 
            id_rota: 1 
        },
        { 
            id: 6, 
            dia_semana: "fim_semana_feriado", 
            hora_partida: "08:50", 
            hora_chegada: "09:20", 
            id_rota: 1 
        },
        { 
            id: 7, 
            dia_semana: "dia_util", 
            hora_partida: "06:45", 
            hora_chegada: "07:15", 
            id_rota: 3
        },
        { 
            id: 8, 
            dia_semana: "dia_util", 
            hora_partida: "08:50", 
            hora_chegada: "09:20", 
            id_rota: 3
        },
        { 
            id: 9, 
            dia_semana: "dia_util", 
            hora_partida: "12:30", 
            hora_chegada: "13:00", 
            id_rota: 3
        },
        { 
            id: 10, 
            dia_semana: "dia_util", 
            hora_partida: "10:15", 
            hora_chegada: "10:45", 
            id_rota: 4 
        },
        { 
            id: 11, 
            dia_semana: "fim_semana_feriado", 
            hora_partida: "06:45", 
            hora_chegada: "07:15", 
            id_rota: 3 
        },
        { 
            id: 12, 
            dia_semana: "fim_semana_feriado", 
            hora_partida: "08:50", 
            hora_chegada: "09:20", 
            id_rota: 3
        },
    ];
    return horarios
}

export const getHorario = async (horario_id) => {
    const horarios = await getHorariosList(); 
    const horario = horarios.find(horario => horario.id === horario_id);
    return horario;
};

export const getHorariosRota = async (rota_id) => {
    const rota = await getRota(rota_id)
    const horarios = await getHorariosList()
    let horarios_rota = []
    horarios.forEach(element => {
        if (element.id_rota === rota_id) {
            if (rota.nome_variacao === null) {
                element['tipo_varicao'] = "Direto"
            } else {
                element['tipo_varicao'] = rota.nome_variacao
            }
            horarios_rota.push(element)
        }
    })
    return horarios_rota
};

export const getHorariosRotaVariacao = async (rota_id) => {
    const rotasVariacao = await getVariacaoRota(rota_id);
    const rota = await getRota(rota_id);
    let listHorarios = [];

    const horariosRotaPrincipal = await getHorariosRota(rota_id);
    listHorarios.push(...horariosRotaPrincipal);

    for (const variacao of rotasVariacao) {
        const horariosVariacao = await getHorariosRota(variacao.id);
        listHorarios.push(...horariosVariacao);
    }

    listHorarios.sort((a, b) => {
        const timeA = a.hora_partida.split(":").map(Number); 
        const timeB = b.hora_partida.split(":").map(Number);
        return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    });

    return listHorarios;
};
