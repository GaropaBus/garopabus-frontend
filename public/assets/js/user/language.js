const VALID_LANGUAGES = ["pt-br", "esp", "eng"];
const DEFAULT_LANGUAGE = "pt-br";
const STORAGE_KEY = "language";

const loadTranslations = async () => {
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

const translatePage = (language, langs) => {
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
  } catch (error) {
    console.error("Erro durante o carregamento da página:", error);
  }
};
