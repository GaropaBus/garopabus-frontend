document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".dashboard-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const url = e.target.getAttribute("data-url");
      window.location.href = url;
    });
  });
});
