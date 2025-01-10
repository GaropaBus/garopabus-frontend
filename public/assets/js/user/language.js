const VALID_LANGUAGES = ["pt-br", "esp", "eng"];
const DEFAULT_LANGUAGE = "pt-br";
const STORAGE_KEY = "language";

export const loadTranslations = async () => {
  const langs = {};
  try {
    const promises = VALID_LANGUAGES.map(async (lang) => {
      const response = await fetch(`/assets/js/lang/${lang}.json`);
      const data = await response.json();
      langs[lang] = data;
    });
    await Promise.all(promises);
  } catch (error) {
    console.error("Erro ao carregar as traduções:", error);
  }
  return langs;
};

export const translatePage = (language, langs) => {
  const data = langs[language];
  const elements = document.querySelectorAll("*");
  elements.forEach((element) => {
    const key = element.id;
    if (key) {
      let [prefix, ...wprefix] = key.split("-");
      wprefix = wprefix.join("-");
      if (data[prefix]) {
        switch (prefix) {
          case "metadata":
            document.title = data[prefix][wprefix];
            break;
          case "navbar":
            element.innerHTML = data[prefix][wprefix];
            break;
          case "label":
            element.innerHTML = data[prefix][wprefix];
            break;
          case "placeholder":
            element.placeholder = data[prefix][wprefix];
            break;
          default:
            console.log("Chave não encontrada:", key);
            break;
        }
      }
    }
  });
};

export const changeLanguage = async (newLanguage) => {
  try {
    localStorage.setItem(STORAGE_KEY, newLanguage);

    const langs = await loadTranslations();
    translatePage(newLanguage, langs);

    const languageSettings = document.getElementById("language-settings");
    if (languageSettings) {
      switch (newLanguage) {
        case "pt-br":
          languageSettings.className = "fi fi-br";
          break;
        case "esp":
          languageSettings.className = "fi fi-es";
          break;
        case "eng":
          languageSettings.className = "fi fi-us";
          break;
        default:
          console.error("Idioma não suportado.");
      }
    }

    const radio = document.getElementById(newLanguage);
    if (radio) {
      radio.checked = true;
    }
  } catch (error) {
    console.error("Erro ao alterar o idioma:", error);
  }
};

export const currentLanguage = async () => {
  const savedLanguage = localStorage.getItem(STORAGE_KEY);
  return VALID_LANGUAGES.includes(savedLanguage)
    ? savedLanguage
    : DEFAULT_LANGUAGE;
};

window.onload = async () => {
  try {
    const langs = await loadTranslations();
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    const language =
      savedLanguage && VALID_LANGUAGES.includes(savedLanguage)
        ? savedLanguage
        : DEFAULT_LANGUAGE;

    if (!savedLanguage) {
      localStorage.setItem(STORAGE_KEY, language);
    }

    translatePage(language, langs);

    const languageSettings = document.getElementById("language-settings");
    if (languageSettings) {
      switch (language) {
        case "pt-br":
          languageSettings.className = "fi fi-br";
          break;
        case "esp":
          languageSettings.className = "fi fi-es";
          break;
        case "eng":
          languageSettings.className = "fi fi-us";
          break;
        default:
          console.error("Idioma não suportado.");
      }
    }

    const radio = document.getElementById(language);
    if (radio) {
      radio.checked = true;
    }
  } catch (error) {
    console.error("Erro durante o carregamento da página:", error);
  }
};

const languageSettings = document.getElementById("language-settings");
const languagesBox = document.querySelector(".languages-box");

if (languageSettings) {
  const lang = await currentLanguage();
  switch (lang) {
    case "pt-br":
      languageSettings.className = "fi fi-br";
      break;
    case "esp":
      languageSettings.className = "fi fi-es";
      break;
    case "eng":
      languageSettings.className = "fi fi-us";
      break;
    default:
      console.error("Idioma não suportado.");
  }

  languageSettings.addEventListener("click", () => {
    if (languagesBox) {
      languagesBox.classList.toggle("hidden");
    }
  });
}

const languageRadios = document.querySelectorAll(
  ".languages-box input[type='radio']"
);
if (languageRadios) {
  languageRadios.forEach((radio) => {
    radio.addEventListener("change", async (event) => {
      const newLanguage = event.target.id;
      await changeLanguage(newLanguage);
    });
  });
}
