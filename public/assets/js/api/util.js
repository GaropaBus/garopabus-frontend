
export const addNomeRotas = async (rotasList) => {
    if (!Array.isArray(rotasList)) {
        throw new Error('O argumento fornecido não é um array.');
    }

    rotasList.forEach(element => {
        element.nome = `${element.bairro_origem} - ${element.bairro_destino}${element.nome_variacao ? ` (${element.nome_variacao})` : ''}`;
    });

    return rotasList; // Retorna a lista atualizada
};

export const addNomeRota = async (rota) => {

    rota.nome = `${rota.bairro_origem} - ${rota.bairro_destino}${rota.nome_variacao ? ` (${rota.nome_variacao})` : ''}`;

    return rota; // Retorna a lista atualizada
};

export const addNomeRotasFiltradas = async (rotasList) => {

    rotasList.sentido_bairros.forEach(element => {
        element.nome = `${element.bairro_origem} - ${element.bairro_destino}${element.nome_variacao ? ` (${element.nome_variacao})` : ''}`;
    });

    rotasList.sentido_garopaba.forEach(element => {
        element.nome = `${element.bairro_origem} - ${element.bairro_destino}${element.nome_variacao ? ` (${element.nome_variacao})` : ''}`;
    });
    return rotasList; // Retorna a lista atualizada
};
