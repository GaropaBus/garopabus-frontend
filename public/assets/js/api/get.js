export const getRotasOnibus = async () => {
    const rotas = [
        {
            id: 1,
            nome: "Garopaba x Rosa",
            origem: "Garopaba",
            destino: "Rosa",
            horarios_semana: [
                { horarioPartida: "06:45", horarioChegada: "07:15", variacao: "Direto" },
                { horarioPartida: "08:50", horarioChegada: "09:20", variacao: "Direto" },
                { horarioPartida: "10:15", horarioChegada: "10:45", variacao: "Ressacada" },
                { horarioPartida: "12:30", horarioChegada: "13:00", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "06:45", horarioChegada: "07:15", variacao: "Direto" },
                { horarioPartida: "08:50", horarioChegada: "09:20", variacao: "Direto" },
            ]
        },
        {
            id: 2,
            nome: "Garopaba x Campo Duna",
            origem: "Garopaba",
            destino: "Campo Duna",
            horarios_semana: [
                { horarioPartida: "07:00", horarioChegada: "07:30", variacao: "Direto" },
                { horarioPartida: "09:15", horarioChegada: "09:45", variacao: "Direto" },
                { horarioPartida: "13:00", horarioChegada: "13:30", variacao: "Ressacada" },
                { horarioPartida: "19:30", horarioChegada: "20:00", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "07:00", horarioChegada: "07:30", variacao: "Direto" },
                { horarioPartida: "09:15", horarioChegada: "09:45", variacao: "Direto" }
            ],
        },
        {
            id: 3,
            nome: "Garopaba x Imbituba",
            origem: "Garopaba",
            destino: "Imbituba",
            horarios_semana: [
                { horarioPartida: "05:30", horarioChegada: "06:00", variacao: "Direto" },
                { horarioPartida: "10:45", horarioChegada: "11:15", variacao: "Direto" },
                { horarioPartida: "14:20", horarioChegada: "15:50", variacao: "Ressacada" },
                { horarioPartida: "20:15", horarioChegada: "20:45", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "05:30", horarioChegada: "06:00", variacao: "Direto" },
                { horarioPartida: "10:45", horarioChegada: "11:15", variacao: "Direto" },
            ]
        },
        {
            id: 4,
            nome: "Rosa x Garopaba",
            origem: "Rosa",
            destino: "Garopaba",
            horarios_semana: [
                { horarioPartida: "06:45", horarioChegada: "07:15", variacao: "Direto" },
                { horarioPartida: "08:50", horarioChegada: "09:20", variacao: "Direto" },
                { horarioPartida: "10:15", horarioChegada: "10:45", variacao: "Ressacada" },
                { horarioPartida: "12:30", horarioChegada: "13:00", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "06:45", horarioChegada: "07:15", variacao: "Direto" },
                { horarioPartida: "08:50", horarioChegada: "09:20", variacao: "Direto" },
            ]
        },
        {
            id: 5,
            nome: "Campo Duna x Garopaba",
            origem: "Campo Duna",
            destino: "Garopaba",
            horarios_semana: [
                { horarioPartida: "07:00", horarioChegada: "07:30", variacao: "Direto" },
                { horarioPartida: "09:15", horarioChegada: "09:45", variacao: "Direto" },
                { horarioPartida: "13:00", horarioChegada: "13:30", variacao: "Ressacada" },
                { horarioPartida: "19:30", horarioChegada: "20:00", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "07:00", horarioChegada: "07:30", variacao: "Direto" },
                { horarioPartida: "09:15", horarioChegada: "09:45", variacao: "Direto" }
            ],
        },
        {
            id: 6,
            nome: "Imbituba x Garopaba",
            origem: "Imbituba",
            destino: "Garopaba",
            horarios_semana: [
                { horarioPartida: "05:30", horarioChegada: "06:00", variacao: "Direto" },
                { horarioPartida: "10:45", horarioChegada: "11:15", variacao: "Direto" },
                { horarioPartida: "14:20", horarioChegada: "15:50", variacao: "Ressacada" },
                { horarioPartida: "20:15", horarioChegada: "20:45", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "05:30", horarioChegada: "06:00", variacao: "Direto" },
                { horarioPartida: "10:45", horarioChegada: "11:15", variacao: "Direto" },
            ]
        }
    ];
    return rotas;
}

export const getRotasOnibusPartindoGaropaba = async () => {
    const rotas = [
        {
            id: 1,
            nome: "Garopaba x Rosa",
            origem: "Garopaba",
            destino: "Rosa",
            horarios_semana: [
                { horarioPartida: "06:45", horarioChegada: "07:15", variacao: "Direto" },
                { horarioPartida: "08:50", horarioChegada: "09:20", variacao: "Direto" },
                { horarioPartida: "10:15", horarioChegada: "10:45", variacao: "Ressacada" },
                { horarioPartida: "12:30", horarioChegada: "13:00", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "06:45", horarioChegada: "07:15", variacao: "Direto" },
                { horarioPartida: "08:50", horarioChegada: "09:20", variacao: "Direto" },
            ]
        },
        {
            id: 2,
            nome: "Garopaba x Campo Duna",
            origem: "Garopaba",
            destino: "Campo Duna",
            horarios_semana: [
                { horarioPartida: "07:00", horarioChegada: "07:30", variacao: "Direto" },
                { horarioPartida: "09:15", horarioChegada: "09:45", variacao: "Direto" },
                { horarioPartida: "13:00", horarioChegada: "13:30", variacao: "Ressacada" },
                { horarioPartida: "19:30", horarioChegada: "20:00", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "07:00", horarioChegada: "07:30", variacao: "Direto" },
                { horarioPartida: "09:15", horarioChegada: "09:45", variacao: "Direto" }
            ],
        },
        {
            id: 3,
            nome: "Garopaba x Imbituba",
            origem: "Garopaba",
            destino: "Imbituba",
            horarios_semana: [
                { horarioPartida: "05:30", horarioChegada: "06:00", variacao: "Direto" },
                { horarioPartida: "10:45", horarioChegada: "11:15", variacao: "Direto" },
                { horarioPartida: "14:20", horarioChegada: "15:50", variacao: "Ressacada" },
                { horarioPartida: "20:15", horarioChegada: "20:45", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "05:30", horarioChegada: "06:00", variacao: "Direto" },
                { horarioPartida: "10:45", horarioChegada: "11:15", variacao: "Direto" },
            ]
        }
    ];
    return rotas;
};

export const getRotasOnibusSentidoGaropaba = async () => {
    const rotas = [
        {
            id: 4,
            nome: "Rosa x Garopaba",
            origem: "Rosa",
            destino: "Garopaba",
            horarios_semana: [
                { horarioPartida: "06:45", horarioChegada: "07:15", variacao: "Direto" },
                { horarioPartida: "08:50", horarioChegada: "09:20", variacao: "Direto" },
                { horarioPartida: "10:15", horarioChegada: "10:45", variacao: "Ressacada" },
                { horarioPartida: "12:30", horarioChegada: "13:00", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "06:45", horarioChegada: "07:15", variacao: "Direto" },
                { horarioPartida: "08:50", horarioChegada: "09:20", variacao: "Direto" },
            ]
        },
        {
            id: 5,
            nome: "Campo Duna x Garopaba",
            origem: "Campo Duna",
            destino: "Garopaba",
            horarios_semana: [
                { horarioPartida: "07:00", horarioChegada: "07:30", variacao: "Direto" },
                { horarioPartida: "09:15", horarioChegada: "09:45", variacao: "Direto" },
                { horarioPartida: "13:00", horarioChegada: "13:30", variacao: "Ressacada" },
                { horarioPartida: "19:30", horarioChegada: "20:00", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "07:00", horarioChegada: "07:30", variacao: "Direto" },
                { horarioPartida: "09:15", horarioChegada: "09:45", variacao: "Direto" }
            ],
        },
        {
            id: 6,
            nome: "Imbituba x Garopaba",
            origem: "Imbituba",
            destino: "Garopaba",
            horarios_semana: [
                { horarioPartida: "05:30", horarioChegada: "06:00", variacao: "Direto" },
                { horarioPartida: "10:45", horarioChegada: "11:15", variacao: "Direto" },
                { horarioPartida: "14:20", horarioChegada: "15:50", variacao: "Ressacada" },
                { horarioPartida: "20:15", horarioChegada: "20:45", variacao: "Direto" },
            ],
            horarios_feriado: [
                { horarioPartida: "05:30", horarioChegada: "06:00", variacao: "Direto" },
                { horarioPartida: "10:45", horarioChegada: "11:15", variacao: "Direto" },
            ]
        }
    ];
    return rotas;
};


export const getRotaSelecionada = async (rotaNome) => {
    const rotas = await getRotasOnibus();

    for (let rota of rotas) {
        if (rota.nome.replace(/ /g, '') === rotaNome) {
            return rota; 
        }
    }

    console.log('Rota não encontrada');
    return null; 
};


export const getAvisos = async () => {
    const avisos = [
        {
            title: 'Interrompimento de horário',
            desc: 'A partir de 31/11 o horário das 14:30 sentido Garopaba X Campo Duna, irá deixar de existir.'
        },
        {
            title: 'Interrompimento de horário',
            desc: 'A partir de 31/11 o horário das 14:30 sentido Garopaba X Campo Duna, irá deixar de existir.'
        },
        {
            title: 'Interrompimento de horário',
            desc: 'A partir de 31/11 o horário das 14:30 sentido Garopaba X Campo Duna, irá deixar de existir.'
        },
    ]
    return avisos
}

export const getAllBusStops = async () => {
    const busStops = [
        {
          coordinates: [-48.62894836820254, -28.02746079165392],
          linkStreatView: "Link aqui",
        },
        {
          coordinates: [-48.628410903411876, -28.025598241783666],
          linkStreatView: "Link aqui",
        },
        {
          coordinates: [-48.621591752515485, -28.026523938849035],
          linkStreatView: "Link aqui",
        },
    ];
    return busStops;
}