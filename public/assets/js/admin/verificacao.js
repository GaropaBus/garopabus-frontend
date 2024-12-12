import * as apiGet from '../api/moldes_back/get.js';
window.onload = async () => {
    
    const token = sessionStorage.getItem('token');

    if (!token) {
      window.location.href = '/admin/';
      return;
    }
  
    try {
      const validToken = await apiGet.getTokenValid(token);
  
      if (validToken.message === "Token válido!") {
        return
    } else {
        window.location.href = '/admin/';
        console.error("Token inválido:", validToken);
      }
    } catch (error) {
        window.location.href = '/admin/';
        console.error("Error validating token:", error.message);
    }
  };