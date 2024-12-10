
export const addNomeRota = async (rotasList) => {
    if (!Array.isArray(rotasList)) {
        throw new Error('O argumento fornecido não é um array.');
    }

    rotasList.forEach(element => {
        element.nome = `${element.bairro_origem} - ${element.bairro_destino}${element.id_rota_principal ? ` (${element.nome_variacao})` : ''}`;
    });

    return rotasList; // Retorna a lista atualizada
};

export const addNomeRotasFiltradas = async (rotasList) => {

    rotasList.sentido_bairros.forEach(element => {
        element.nome = `${element.bairro_origem} - ${element.bairro_destino}${element.id_rota_principal ? ` (${element.nome_variacao})` : ''}`;
    });

    rotasList.sentido_garopaba.forEach(element => {
        element.nome = `${element.bairro_origem} - ${element.bairro_destino}${element.id_rota_principal ? ` (${element.nome_variacao})` : ''}`;
    });
    return rotasList; // Retorna a lista atualizada
};
