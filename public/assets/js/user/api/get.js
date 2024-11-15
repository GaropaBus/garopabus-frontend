// api/rotas-onibus.js
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
        }
    ];
    return rotas;
};


export const getRotaSelecionada = async (rotaNome) => {
    const rotas = await getRotasOnibus(); // Obter todas as rotas

    for (let rota of rotas) {
        if (rota.nome.replace(/ /g, '') === rotaNome) {
            return rota; // Retorna a rota encontrada
        }
    }
    // Caso não encontre a rota
    console.log('Rota não encontrada');
    return null; // Retorna null se não encontrar
};
