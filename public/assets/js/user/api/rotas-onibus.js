// api/rotas-onibus.js
export const getRotasOnibus = async () => {
    const rotas = [
        {
            id: 1,
            nome: "Garopaba x Rosa",
            origem: "Garopaba",
            destino: "Rosa",
            horarios: [
                { horarioPartida: "06:45", horarioChegada: "07:15", variacao: "Direto" },
                { horarioPartida: "08:50", horarioChegada: "09:20", variacao: "Direto" },
                { horarioPartida: "10:15", horarioChegada: "10:45", variacao: "Ressacada" },
                { horarioPartida: "12:30", horarioChegada: "13:00", variacao: "Direto" },
            ]
        },
        {
            id: 2,
            nome: "Garopaba x Campo Duna",
            origem: "Garopaba",
            destino: "Campo Duna",
            horarios: [
                { horarioPartida: "07:00", horarioChegada: "07:30", variacao: "Direto" },
                { horarioPartida: "09:15", horarioChegada: "09:45", variacao: "Direto" },
                { horarioPartida: "13:00", horarioChegada: "13:30", variacao: "Ressacada" },
                { horarioPartida: "19:30", horarioChegada: "20:00", variacao: "Direto" },
            ]
        },
        {
            id: 3,
            nome: "Garopaba x Imbituba",
            origem: "Garopaba",
            destino: "Imbituba",
            horarios: [
                { horarioPartida: "05:30", horarioChegada: "06:00", variacao: "Direto" },
                { horarioPartida: "10:45", horarioChegada: "11:15", variacao: "Direto" },
                { horarioPartida: "14:20", horarioChegada: "15:50", variacao: "Ressacada" },
                { horarioPartida: "20:15", horarioChegada: "20:45", variacao: "Direto" },
            ]
        }
    ];
    return rotas;
};
