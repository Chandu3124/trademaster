/* =====================================================
   TRADEMASTERS — RESOURCES HERO JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide Icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Smooth Scroll */
    const resourceLinks = document.querySelectorAll(
        '.tm-resources-hero a[href^="#"]'
    );

    resourceLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });

});

/* =====================================================
   TRADEMASTERS — BEGINNER'S LEARNING LIBRARY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide Icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Scroll Reveal */
    const libraryElements = document.querySelectorAll(
        ".tm-library-header, .tm-library-card"
    );

    if ("IntersectionObserver" in window) {

        const libraryObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("tm-library-visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        libraryElements.forEach((element) => {
            libraryObserver.observe(element);
        });

    } else {

        libraryElements.forEach((element) => {
            element.classList.add("tm-library-visible");
        });

    }

});

/* =====================================================
   TRADEMASTERS — TECHNICAL ANALYSIS RESOURCES JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".tm-analysis-resources");

    if (!section) return;


    /* Initialize Lucide Icons */
    function initializeIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initializeIcons();


    /* Scroll Reveal Animation */
    const revealElements = section.querySelectorAll(
        ".tm-analysis-header, .tm-analysis-card, .tm-analysis-cta"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("tm-analysis-visible");

                        currentObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("tm-analysis-visible");
        });

    }


    /* Smooth Scroll for Section Links */
    section.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* Image Loading Fallback */
    section.querySelectorAll(".tm-analysis-card-image img").forEach((img) => {

        img.addEventListener("error", () => {

            img.style.opacity = "0";

            const wrapper = img.closest(".tm-analysis-card-image");

            if (wrapper) {
                wrapper.style.background = "var(--soft-bg, var(--bg))";
            }

        });

    });

});

/* =====================================================
   TRADEMASTERS — SECTION 4: TRADING TOOLS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       INITIALIZE LUCIDE ICONS
    ================================================= */

    function initializeIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initializeIcons();


    /* =================================================
       CSV DOWNLOAD HELPER
    ================================================= */

    function downloadCSV(filename, headers, rows) {

        const escapeCSV = (value) => {
            const text = String(value ?? "");
            return `"${text.replace(/"/g, '""')}"`;
        };

        const csvContent = [
            headers,
            ...rows
        ]
            .map(row => row.map(escapeCSV).join(","))
            .join("\r\n");

        const blob = new Blob(
            ["\uFEFF" + csvContent],
            { type: "text/csv;charset=utf-8;" }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }


    /* =================================================
       TRADING JOURNAL DOWNLOAD
    ================================================= */

    document
        .getElementById("downloadJournal")
        ?.addEventListener("click", () => {

            downloadCSV(
                "trademasters-trading-journal.csv",
                [
                    "Date",
                    "Asset",
                    "Trade Idea",
                    "Entry Assumption",
                    "Exit Assumption",
                    "Reason for Decision",
                    "Risk Considerations",
                    "Outcome",
                    "Lessons Learned"
                ],
                [
                    ["", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", ""]
                ]
            );

        });


    /* =================================================
       TRADING PLAN DOWNLOAD
    ================================================= */

    document
        .getElementById("downloadPlan")
        ?.addEventListener("click", () => {

            downloadCSV(
                "trademasters-trading-plan.csv",
                [
                    "Learning Objective",
                    "Strategy Rules",
                    "Market Conditions",
                    "Risk Considerations",
                    "Entry Criteria",
                    "Exit Criteria",
                    "Review Schedule",
                    "Notes"
                ],
                [
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""]
                ]
            );

        });


    /* =================================================
       COURSE CHECKLIST DOWNLOAD
    ================================================= */

    document
        .getElementById("downloadChecklist")
        ?.addEventListener("click", () => {

            downloadCSV(
                "trademasters-course-progress-checklist.csv",
                [
                    "Module",
                    "Lesson",
                    "Completed",
                    "Needs Revision",
                    "Practical Exercise",
                    "Notes"
                ],
                [
                    ["Market Fundamentals", "", "No", "No", "", ""],
                    ["Technical Analysis", "", "No", "No", "", ""],
                    ["Risk Management", "", "No", "No", "", ""],
                    ["Trading Psychology", "", "No", "No", "", ""],
                    ["Practice Exercises", "", "No", "No", "", ""]
                ]
            );

        });


    /* =================================================
       MOCK PORTFOLIO ELEMENTS
    ================================================= */

    const modal = document.getElementById("portfolioModal");

    const openButton = document.getElementById("openPortfolio");
    const closeButton = document.getElementById("closePortfolio");
    const overlay = document.getElementById("closePortfolioOverlay");

    const form = document.getElementById("portfolioForm");

    const tableBody = document.getElementById("portfolioTableBody");
    const emptyState = document.getElementById("portfolioEmpty");

    const investedElement = document.getElementById("totalInvested");
    const currentElement = document.getElementById("currentValue");
    const profitElement = document.getElementById("portfolioProfit");

    const STORAGE_KEY = "trademasters_mock_portfolio";

    let holdings = [];


    /* =================================================
       LOAD SAVED HOLDINGS
    ================================================= */

    try {

        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {

            const parsedData = JSON.parse(savedData);

            if (Array.isArray(parsedData)) {

                holdings = parsedData.filter(item =>
                    item &&
                    typeof item.name === "string" &&
                    Number.isFinite(item.quantity) &&
                    Number.isFinite(item.purchasePrice) &&
                    Number.isFinite(item.currentPrice) &&
                    item.quantity > 0 &&
                    item.purchasePrice >= 0 &&
                    item.currentPrice >= 0
                );

            }

        }

    } catch (error) {

        console.warn("Unable to load saved portfolio.", error);

        holdings = [];

    }


    /* =================================================
       CURRENCY FORMAT
    ================================================= */

    function formatCurrency(value) {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);

    }


    /* =================================================
       SAVE HOLDINGS
    ================================================= */

    function saveHoldings() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(holdings)
            );

        } catch (error) {

            console.warn("Unable to save portfolio.", error);

        }

    }


    /* =================================================
       UPDATE PORTFOLIO SUMMARY
    ================================================= */

    function updateSummary() {

        const invested = holdings.reduce(
            (total, item) =>
                total + item.quantity * item.purchasePrice,
            0
        );

        const current = holdings.reduce(
            (total, item) =>
                total + item.quantity * item.currentPrice,
            0
        );

        const profit = current - invested;

        investedElement.textContent = formatCurrency(invested);
        currentElement.textContent = formatCurrency(current);
        profitElement.textContent = formatCurrency(profit);

        profitElement.classList.remove(
            "tm-profit-positive",
            "tm-profit-negative"
        );

        if (profit > 0) {

            profitElement.classList.add("tm-profit-positive");

        } else if (profit < 0) {

            profitElement.classList.add("tm-profit-negative");

        }

    }


    /* =================================================
       RENDER PORTFOLIO TABLE
    ================================================= */

    function renderPortfolio() {

        if (!tableBody || !emptyState) {
            return;
        }

        tableBody.replaceChildren();

        emptyState.hidden = holdings.length > 0;

        holdings.forEach((holding, index) => {

            const invested = holding.quantity * holding.purchasePrice;

            const currentValue = holding.quantity * holding.currentPrice;

            const profit = currentValue - invested;

            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = holding.name;

            const quantityCell = document.createElement("td");
            quantityCell.textContent = holding.quantity;

            const purchaseCell = document.createElement("td");
            purchaseCell.textContent = formatCurrency(
                holding.purchasePrice
            );

            const currentCell = document.createElement("td");
            currentCell.textContent = formatCurrency(
                holding.currentPrice
            );

            const profitCell = document.createElement("td");
            profitCell.textContent = formatCurrency(profit);

            if (profit > 0) {

                profitCell.classList.add("tm-row-profit");

            } else if (profit < 0) {

                profitCell.classList.add("tm-row-loss");

            }

            const actionCell = document.createElement("td");

            const deleteButton = document.createElement("button");

            deleteButton.type = "button";
            deleteButton.className = "tm-portfolio-delete";

            deleteButton.setAttribute(
                "aria-label",
                "Remove " + holding.name
            );

            deleteButton.innerHTML = '<i data-lucide="trash-2"></i>';

            deleteButton.addEventListener("click", () => {

                holdings.splice(index, 1);

                saveHoldings();
                renderPortfolio();

            });

            actionCell.appendChild(deleteButton);

            row.append(
                nameCell,
                quantityCell,
                purchaseCell,
                currentCell,
                profitCell,
                actionCell
            );

            tableBody.appendChild(row);

        });

        updateSummary();
        initializeIcons();

    }


    /* =================================================
       OPEN PORTFOLIO MODAL
    ================================================= */

    function openPortfolioModal() {

        if (!modal) {
            console.error("Portfolio modal element was not found.");
            return;
        }

        /* Force modal to become visible */
        modal.classList.add("tm-modal-open");

        modal.setAttribute("aria-hidden", "false");

        /* Prevent background page scrolling */
        document.body.style.overflow = "hidden";

        /* Make summary, form, table and empty state visible */
        renderPortfolio();

        /* Refresh modal icons */
        initializeIcons();

        /* Focus close button */
        if (closeButton) {
            closeButton.focus();
        }

    }


    /* =================================================
       CLOSE PORTFOLIO MODAL
    ================================================= */

    function closePortfolioModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("tm-modal-open");

        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (openButton) {
            openButton.focus();
        }

    }


    /* =================================================
       PORTFOLIO BUTTON EVENTS
    ================================================= */

    if (openButton) {

        openButton.addEventListener("click", openPortfolioModal);

    }

    if (closeButton) {

        closeButton.addEventListener("click", closePortfolioModal);

    }

    if (overlay) {

        overlay.addEventListener("click", closePortfolioModal);

    }


    /* =================================================
       CLOSE WITH ESCAPE KEY
    ================================================= */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("tm-modal-open")
        ) {

            closePortfolioModal();

        }

    });


    /* =================================================
       ADD HOLDING
    ================================================= */

    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();

            const nameInput = document.getElementById("stockName");

            const quantityInput = document.getElementById("stockQuantity");

            const purchaseInput = document.getElementById("purchasePrice");

            const currentInput = document.getElementById("currentStockPrice");

            const name = nameInput.value.trim();

            const quantity = Number(quantityInput.value);

            const purchasePrice = Number(purchaseInput.value);

            const currentPrice = Number(currentInput.value);


            /* Validate values */

            if (
                !name ||
                !Number.isFinite(quantity) ||
                !Number.isFinite(purchasePrice) ||
                !Number.isFinite(currentPrice) ||
                quantity <= 0 ||
                purchasePrice < 0 ||
                currentPrice < 0
            ) {

                return;

            }


            /* Store hypothetical holding */

            holdings.push({
                name: name,
                quantity: quantity,
                purchasePrice: purchasePrice,
                currentPrice: currentPrice
            });


            /* Save and update interface */

            saveHoldings();

            renderPortfolio();

            form.reset();

            nameInput.focus();

        });

    }


    /* =================================================
       INITIAL RENDER
    ================================================= */

    renderPortfolio();

});

/* =====================================================
   TRADEMASTERS — SECTION 5: VIDEO LEARNING LIBRARY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide icons */
    if (window.lucide) {
        lucide.createIcons();
    }

    const videoItems = document.querySelectorAll(".tm-video-item");
    const mainVideo = document.getElementById("tmMainVideo");
    const currentVideoTitle = document.getElementById("tmCurrentVideoTitle");

    /* =====================================================
       VIDEO LESSON SWITCHING
    ===================================================== */

    videoItems.forEach((item) => {

        item.addEventListener("click", () => {

            const videoId = item.dataset.videoId;
            const videoTitle = item.dataset.videoTitle;

            if (!videoId || videoId === "VIDEO_ID") {
                alert(
                    "Please add a valid YouTube video ID to this lesson before playing it."
                );
                return;
            }

            /* Update active lesson */
            videoItems.forEach((video) => {
                video.classList.remove("active");
            });

            item.classList.add("active");

            /* Update video player */
            mainVideo.src =
                `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;

            /* Update video title */
            currentVideoTitle.textContent = videoTitle;

            /* Refresh icons */
            if (window.lucide) {
                lucide.createIcons();
            }

        });

    });


    /* =====================================================
       SMOOTH SCROLL FOR RESOURCE BUTTON
    ===================================================== */

    const resourceButton = document.querySelector(
        '.tm-video-library a[href="#video-resources"]'
    );

    const resourceSection = document.getElementById("video-resources");

    if (resourceButton && resourceSection) {

        resourceButton.addEventListener("click", (event) => {

            event.preventDefault();

            resourceSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }

});

/* =====================================================
   TRADEMASTERS — RESOURCE FAQ JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide Icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const faqItems = document.querySelectorAll(
        ".tm-resource-faq-item"
    );

    faqItems.forEach((item) => {

        const question = item.querySelector(
            ".tm-resource-faq-question"
        );

        const answer = item.querySelector(
            ".tm-resource-faq-answer"
        );

        if (!question || !answer) {
            return;
        }

        /* Set initial accessibility state */
        const isInitiallyOpen = item.classList.contains("active");

        question.setAttribute(
            "aria-expanded",
            String(isInitiallyOpen)
        );

        answer.setAttribute(
            "aria-hidden",
            String(!isInitiallyOpen)
        );

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            /* Close all FAQ items */
            faqItems.forEach((otherItem) => {

                otherItem.classList.remove("active");

                const otherQuestion = otherItem.querySelector(
                    ".tm-resource-faq-question"
                );

                const otherAnswer = otherItem.querySelector(
                    ".tm-resource-faq-answer"
                );

                if (otherQuestion) {
                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

                if (otherAnswer) {
                    otherAnswer.setAttribute(
                        "aria-hidden",
                        "true"
                    );
                }

            });

            /* Open clicked item if it was closed */
            if (!isOpen) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }

        });

    });

    /* Refresh Lucide icons if available */
    if (window.lucide) {
        window.lucide.createIcons();
    }

});

/* =====================================================
   TRADEMASTERS — SECTION 7: RESOURCES CTA JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide Icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Smooth Scroll */
    document.querySelectorAll(
        '.tm-resources-cta a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });

});