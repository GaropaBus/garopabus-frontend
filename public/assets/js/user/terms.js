window.addEventListener("DOMContentLoaded", async () => {
  const createTermsStorage = () =>
    localStorage.setItem("hasAcceptedTerms", false);

  const verifyTermsStorage = () =>
    localStorage.getItem("hasAcceptedTerms") ? null : createTermsStorage();

  const haveAcceptedTerms = () => {
    verifyTermsStorage();
    return localStorage.getItem("hasAcceptedTerms") === "true";
  };

  if (!haveAcceptedTerms()) {
    const termsModal = document.createElement("div");
    termsModal.style.position = "fixed";
    termsModal.style.top = "0";
    termsModal.style.left = "0";
    termsModal.style.width = "100%";
    termsModal.style.height = "100%";
    termsModal.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    termsModal.style.display = "flex";
    termsModal.style.alignItems = "center";
    termsModal.style.justifyContent = "center";
    termsModal.style.zIndex = "1000";

    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "white";
    modalContent.style.padding = "20px";
    modalContent.style.borderRadius = "8px";
    modalContent.style.maxWidth = "90%";
    modalContent.style.width = "350px";
    modalContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

    const title = document.createElement("h2");
    title.id = "terms-modal-title";
    title.style.margin = "0";
    title.style.fontSize = "20px";
    title.style.fontWeight = "600";
    title.style.color = "#333";
    modalContent.appendChild(title);

    const description = document.createElement("p");
    description.id = "terms-modal-description";
    description.style.fontSize = "14px";
    description.style.color = "#666";
    description.style.marginTop = "12px";
    modalContent.appendChild(description);

    const termsLink = document.createElement("a");
    termsLink.href = "https://garopabus.uk/termos-uso";
    termsLink.target = "_blank";
    termsLink.id = "terms-modal-link";
    termsLink.style.fontSize = "14px";
    termsLink.style.color = "#1a73e8";
    termsLink.style.textDecoration = "none";
    termsLink.style.marginBottom = "12px";
    modalContent.appendChild(termsLink);

    const checkboxContainer = document.createElement("div");
    checkboxContainer.style.display = "flex";
    checkboxContainer.style.alignItems = "center";
    checkboxContainer.style.marginBottom = "20px";
    checkboxContainer.style.marginTop = "10px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginRight = "10px";
    checkbox.style.transform = "scale(1.2)";
    checkboxContainer.appendChild(checkbox);

    const checkboxLabel = document.createElement("label");
    checkboxLabel.id = "terms-modal-checkbox-label";
    checkboxLabel.style.fontSize = "14px";
    checkboxLabel.style.color = "#666";
    checkboxContainer.appendChild(checkboxLabel);

    modalContent.appendChild(checkboxContainer);

    const confirmButton = document.createElement("button");
    confirmButton.id = "terms-modal-confirm-button";
    confirmButton.style.padding = "12px 20px";
    confirmButton.style.backgroundColor = "#4CAF50";
    confirmButton.style.color = "white";
    confirmButton.style.border = "none";
    confirmButton.style.borderRadius = "4px";
    confirmButton.style.cursor = "pointer";
    confirmButton.style.fontSize = "16px";
    confirmButton.style.width = "100%";
    confirmButton.style.transition = "background-color 0.3s";
    confirmButton.addEventListener("mouseenter", () => {
      confirmButton.style.backgroundColor = "#45a049";
    });
    confirmButton.addEventListener("mouseleave", () => {
      confirmButton.style.backgroundColor = "#4CAF50";
    });

    confirmButton.addEventListener("click", () => {
      if (checkbox.checked) {
        localStorage.setItem("hasAcceptedTerms", "true");
        document.body.removeChild(termsModal);
      } else {
        alert("Você precisa aceitar os termos para continuar.");
      }
    });

    modalContent.appendChild(confirmButton);
    termsModal.appendChild(modalContent);
    document.body.appendChild(termsModal);
  }
});
