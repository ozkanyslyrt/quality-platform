const languageButton = document.getElementById("languageToggle");

let currentLanguage = "tr";

function changeLanguage(language) {

```
currentLanguage = language;

document.documentElement.lang = language;

const elements = document.querySelectorAll("[data-tr][data-en]");

elements.forEach(function (element) {

    const text = element.getAttribute("data-" + language);

    if (text !== null) {
        element.textContent = text;
    }

});

if (language === "tr") {
    languageButton.textContent = "EN";
} else {
    languageButton.textContent = "TR";
}
```

}

if (languageButton) {

```
languageButton.addEventListener("click", function () {

    if (currentLanguage === "tr") {
        changeLanguage("en");
    } else {
        changeLanguage("tr");
    }

});
```

}

changeLanguage("tr");
