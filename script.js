// =========================
// LANGUAGE SYSTEM
// =========================

const languageButton = document.getElementById("languageToggle");

let currentLanguage = "tr";

function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    const elements = document.querySelectorAll("[data-tr][data-en]");

    elements.forEach(element => {

        const text = element.getAttribute(`data-${language}`);

        if (text) {
            element.innerHTML = text;
        }

    });

    // Butonun göstereceği dili değiştir
    if (language === "tr") {
        languageButton.textContent = "EN";
    } else {
        languageButton.textContent = "TR";
    }
}


// =========================
// LANGUAGE BUTTON
// =========================

languageButton.addEventListener("click", function () {

    if (currentLanguage === "tr") {
        changeLanguage("en");
    } else {
        changeLanguage("tr");
    }

});


// =========================
// START
// =========================

changeLanguage("tr");
