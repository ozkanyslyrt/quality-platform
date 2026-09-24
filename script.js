const languageButton = document.getElementById("languageToggle");

let currentLanguage = "tr";

function changeLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;

    const elements = document.querySelectorAll("[data-tr][data-en]");

    elements.forEach(function (element) {
        const text = element.getAttribute("data-" + language);

        if (text !== null) {
            element.textContent = text;
        }
    });

    if (languageButton) {
        languageButton.textContent = language === "tr" ? "EN" : "TR";
    }
}

if (languageButton) {
    languageButton.addEventListener("click", function () {
        changeLanguage(currentLanguage === "tr" ? "en" : "tr");
    });
}

changeLanguage("tr");