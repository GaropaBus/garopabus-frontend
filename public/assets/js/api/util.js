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
  rota.nome = `${rota.bairro_origem} -x- ${rota.bairro_destino}${rota.id_rota_principal ? ` (${rota.nome_variacao})` : ""}`;

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

// Função para formatar o nome da rota para a URL
export const formatRouteNameForUrl = (routeName) => {
  return routeName
    .replace(/\s*\/\s*/g, "-") // Substitui / por -
    .replace(/\s*-\s*/g, "-") // Normaliza os hífens
    .replace(/\s+/g, "-") // Substitui espaços por -
    .replace(/-+/g, "-") // Remove hífens duplicados
    .trim();
};

export const addNomeRotasPontoOnibosFiltrar = async (rotasList) => {
  rotasList.forEach((element) => {
    element.rota.nome = `${element.rota.bairro_origem} - ${element.rota.bairro_destino}${element.rota.id_rota_principal ? ` (${element.rota.nome_variacao})` : ""}`;
  });
  return rotasList; // Retorna a lista atualizada
};
