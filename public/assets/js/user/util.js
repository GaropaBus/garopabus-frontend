export const prepararPontosParaApi = (pontos_trajeto) => {
  return pontos_trajeto.map((ponto) => `${ponto.longitude},${ponto.latitude}`);
};
