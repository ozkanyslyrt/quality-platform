const languageButton = document.getElementById("languageToggle");

let currentLanguage = localStorage.getItem("siteLanguage") || "tr";

function changeLanguage(language) {
    currentLanguage = language;
    localStorage.setItem("siteLanguage", language);
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

changeLanguage(currentLanguage);

/* =========================
   V2 FEATURES
========================= */
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("siteTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    if (themeToggle) {
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀" : "☾";
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem(
                "siteTheme",
                document.body.classList.contains("dark-mode") ? "dark" : "light"
            );
            themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀" : "☾";
        });
    }

    const searchInput = document.getElementById("articleSearch");
    const filterButtons = document.querySelectorAll(".filter-button");
    const articleCards = document.querySelectorAll(".article-card");
    let activeCategory = "all";

    function filterArticles() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

        articleCards.forEach(function (card) {
            const category = card.getAttribute("data-category") || "";
            const text = card.textContent.toLowerCase();
            const categoryMatch = activeCategory === "all" || category === activeCategory;
            const searchMatch = !query || text.includes(query);

            card.classList.toggle("is-hidden", !(categoryMatch && searchMatch));
        });
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });
            button.classList.add("active");
            activeCategory = button.getAttribute("data-category");
            filterArticles();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", filterArticles);
    }

    const commentForm = document.getElementById("commentForm");
    const commentList = document.getElementById("commentList");

    if (commentForm && commentList) {
        const storageKey = "ozkanKnowledgeComments";
        let comments = JSON.parse(localStorage.getItem(storageKey) || "[]");

        function saveComments() {
            localStorage.setItem(storageKey, JSON.stringify(comments));
        }

        function renderComments() {
            commentList.innerHTML = "";

            comments.forEach(function (comment, index) {
                const item = document.createElement("div");
                item.className = "comment-item";

                const head = document.createElement("div");
                head.className = "comment-head";

                const name = document.createElement("strong");
                name.textContent = comment.name;

                const date = document.createElement("span");
                date.className = "comment-date";
                date.textContent = new Date(comment.date).toLocaleString();

                head.appendChild(name);
                head.appendChild(date);

                const body = document.createElement("p");
                body.textContent = comment.text;

                const actions = document.createElement("div");
                actions.className = "comment-actions";

                const edit = document.createElement("button");
                edit.textContent = "Düzenle";
                edit.addEventListener("click", function () {
                    const nextText = prompt("Yorumunuzu düzenleyin:", comment.text);
                    if (nextText !== null && nextText.trim()) {
                        comments[index].text = nextText.trim();
                        saveComments();
                        renderComments();
                    }
                });

                const remove = document.createElement("button");
                remove.textContent = "Sil";
                remove.addEventListener("click", function () {
                    if (confirm("Bu yorumu silmek istediğinize emin misiniz?")) {
                        comments.splice(index, 1);
                        saveComments();
                        renderComments();
                    }
                });

                actions.appendChild(edit);
                actions.appendChild(remove);
                item.appendChild(head);
                item.appendChild(body);
                item.appendChild(actions);
                commentList.appendChild(item);
            });
        }

        commentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("commentName").value.trim();
            const textValue = document.getElementById("commentText").value.trim();

            if (!name || !textValue) return;

            comments.push({
                name: name,
                text: textValue,
                date: new Date().toISOString()
            });

            saveComments();
            commentForm.reset();
            renderComments();
        });

        renderComments();
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("[data-tr-placeholder][data-en-placeholder]");
    inputs.forEach(function (input) {
        input.setAttribute(
            "placeholder",
            document.documentElement.lang === "en"
                ? input.getAttribute("data-en-placeholder")
                : input.getAttribute("data-tr-placeholder")
        );
    });
});
