window.onload = async () => {
  const form = document.getElementById("auth-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log(username, password);

    location.href = "/admin/dashboard";
  });
};
