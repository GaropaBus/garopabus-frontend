import { changeLanguage } from "../../js/user/language.js";

document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.querySelector(".settings-language");

  if (languageSelect) {
    languageSelect.addEventListener("change", async function () {
      const newLanguage = languageSelect.value;
      await changeLanguage(newLanguage);
    });
  }
});
