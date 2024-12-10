export const isCoordinate = async (str) => {
  // Remove espaços extras antes de validar o formato
  const cleanedStr = str.trim();

  // Expressão regular para validar o formato: número decimal (positivo ou negativo), separado por vírgula
  const regex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;

  // Verifica se a string corresponde ao formato esperado
  if (!regex.test(cleanedStr)) {
      console.log("Formato inválido:", cleanedStr);  // Log se o formato não for válido
      return false;
  }

  // Separa latitude e longitude e converte para números
  const [latitude, longitude] = cleanedStr.split(',').map(coord => parseFloat(coord.trim()));

  console.log("Latitude:", latitude, "Longitude:", longitude);  // Log dos valores convertidos

  // Valida se estão dentro dos intervalos permitidos
  const isValidLatitude = latitude >= -90 && latitude <= 90;
  const isValidLongitude = longitude >= -180 && longitude <= 180;

  console.log("Latitude válida:", isValidLatitude, "Longitude válida:", isValidLongitude);  // Logs de validação
  
  return isValidLatitude && isValidLongitude;
};
