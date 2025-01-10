export const addNomeRotas = async (rotasList) => {
  if (!Array.isArray(rotasList)) {
    throw new Error("O argumento fornecido não é um array.");
  }

  rotasList.forEach((element) => {
    element.nome = `${element.bairro_origem} - ${element.bairro_destino}${element.id_rota_principal ? ` (${element.nome_variacao})` : ""}`;
  });

  return rotasList; // Retorna a lista atualizada
};

export const addNomeRota = async (rota) => {
  rota.nome = `${rota.bairro_origem} - ${rota.bairro_destino}${rota.id_rota_principal ? ` (${rota.nome_variacao})` : ""}`;

  return rota; // Retorna a lista atualizada
};

export const addNomeRotasFiltradas = async (rotasList) => {
  rotasList.sentido_bairros.forEach((element) => {
    element.nome = `${element.bairro_origem} - ${element.bairro_destino}${element.id_rota_principal ? ` (${element.nome_variacao})` : ""}`;
  });

  rotasList.sentido_garopaba.forEach((element) => {
    element.nome = `${element.bairro_origem} - ${element.bairro_destino}${element.id_rota_principal ? ` (${element.nome_variacao})` : ""}`;
  });
  return rotasList; // Retorna a lista atualizada
};

export const addNomeRotasPontoOnibosFiltrar = async (rotasList) => {
  rotasList.forEach((element) => {
    element.id_rota.nome = `${element.id_rota.bairro_origem} - ${element.id_rota.bairro_destino}${element.id_rota.id_rota_principal ? ` (${element.id_rota.nome_variacao})` : ""}`;
  });
  return rotasList; // Retorna a lista atualizada
};