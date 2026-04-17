function pvaCopyText() {
    const textarea = document.getElementById("pvaCopyTextarea");
    const button = document.getElementById("pvaCopyButton");
    if (textarea) {
        textarea.select();
        document.execCommand("copy");
        button.textContent = "Copied!";
    } else {
        button.textContent = "No Copy";
    }
    setTimeout(() => {
        button.textContent = "Copy Link";
    }, 3000);
}

(function () {
    if (window.__luxSearchPatched) {
        return;
    }
    window.__luxSearchPatched = true;

    const normalizeText = (value) =>
        (value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ")
            .trim();

    const escapeHtml = (value) =>
        (value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");

    const collectSearchItems = () => {
        const selectors = [
            "a[href*='/san-pham/']",
            "a[href*='san-pham/']",
            "a[href*='/product/']",
            "a[href*='product/']",
        ];
        const found = [];
        const keys = new Set();

        document.querySelectorAll(selectors.join(",")).forEach((link) => {
            const href = link.getAttribute("href");
            const title = (link.textContent || "").replace(/\s+/g, " ").trim();
            if (!href || !title || href.startsWith("#") || href.startsWith("javascript:")) {
                return;
            }
            const url = link.href || href;
            const key = `${title}||${url}`;
            if (keys.has(key)) {
                return;
            }
            keys.add(key);
            found.push({ title, url, search: normalizeText(title) });
        });

        if (found.length > 0) {
            return found;
        }

        document.querySelectorAll("a[href]").forEach((link) => {
            const href = link.getAttribute("href");
            const title = (link.textContent || "").replace(/\s+/g, " ").trim();
            if (!href || !title || href.startsWith("#") || href.startsWith("javascript:")) {
                return;
            }
            const url = link.href || href;
            const key = `${title}||${url}`;
            if (keys.has(key)) {
                return;
            }
            keys.add(key);
            found.push({ title, url, search: normalizeText(title) });
        });

        return found;
    };

    const renderItems = (container, items) => {
        if (!container) {
            return;
        }
        if (!items.length) {
            container.innerHTML =
                '<li class="text-secondary small px-1 py-2">Không tìm thấy sản phẩm phù hợp.</li>';
            return;
        }
        container.innerHTML = items
            .map(
                (item) =>
                    `<li class="search-it"><a class="search-link" href="${escapeHtml(
                        item.url,
                    )}">${escapeHtml(item.title)}</a></li>`,
            )
            .join("");
    };

    const handleSearchFallback = () => {
        const form = document.getElementById("modal-form-search-ajax-product");
        const input = form?.querySelector(".monaFilterJS-input-product");
        const resultBox = document.getElementById("search-product");

        if (!form || !input || !resultBox) {
            return;
        }

        const localItems = collectSearchItems();

        const runLocalSearch = (query) => {
            const keyword = normalizeText(query);
            if (!keyword) {
                resultBox.innerHTML = "";
                return;
            }
            const results = localItems
                .filter((item) => item.search.includes(keyword))
                .slice(0, 12);
            renderItems(resultBox, results);
        };

        let timer;
        input.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                runLocalSearch(input.value);
            }, 180);
        });

        form.addEventListener(
            "keypress",
            (event) => {
                if (event.key !== "Enter" || !event.target.classList.contains("monaFilterJS-input-product")) {
                    return;
                }
                event.preventDefault();
                event.stopImmediatePropagation();

                const firstResult = resultBox.querySelector("a.search-link");
                if (firstResult) {
                    window.location.href = firstResult.href;
                    return;
                }

                const query = input.value.trim();
                if (!query) {
                    return;
                }

                const searchUrl = new URL("https://luxquartzvietnam.com/");
                searchUrl.searchParams.set("mona_search", "on");
                searchUrl.searchParams.set("s", query);
                window.location.href = searchUrl.toString();
            },
            true,
        );
    };

    const patchSearchModalTrigger = () => {
        const modal = document.getElementById("modalSearch");
        if (!modal) {
            return;
        }

        document
            .querySelectorAll('[data-bs-target="#modalSearch"]')
            .forEach((trigger) => {
                trigger.addEventListener("click", (event) => {
                    if (!window.bootstrap?.Modal) {
                        return;
                    }
                    event.preventDefault();
                    window.bootstrap.Modal.getOrCreateInstance(modal).show();
                });
            });
    };

    const init = () => {
        patchSearchModalTrigger();
        handleSearchFallback();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
