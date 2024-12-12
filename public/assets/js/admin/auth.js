import * as apiPost from '../api/moldes_back/post.js';

window.onload = async () => {
  const form = document.getElementById("auth-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
      const token = await apiPost.Token(username, password);

      if (token) {
        sessionStorage.setItem('token', token)
        location.href = "/admin/dashboard";
      } else {
        // Tratamento de erro: Token não obtido
        console.error("Falha ao obter token.");
        // Exibir mensagem de erro ao usuário, por exemplo:
        alert("Falha na autenticação. Verifique suas credenciais.");
      }
    } catch (error) {
      // Tratamento de erros gerais
      console.error("Erro durante a autenticação:", error);
      // Exibir mensagem de erro genérica ao usuário, por exemplo:
      alert("Ocorreu um erro inesperado. Por favor, tente novamente.");
    }
  });
};