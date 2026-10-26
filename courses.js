/* =====================================================
   TRADEMASTERS — COURSES HERO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const heroSection = document.querySelector(".tm-courses-hero");

    if (!heroSection) return;


    /* Initialize Lucide Icons */
    function initializeIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initializeIcons();


    /* Refresh Icons on Theme or Direction Changes */
    const iconObserver = new MutationObserver(() => {
        initializeIcons();
    });

    iconObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    iconObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"]
    });


    /* Category Active State */
    const categoryItems = heroSection.querySelectorAll(
        ".tm-category-item"
    );

    categoryItems.forEach((item) => {

        item.addEventListener("click", () => {

            categoryItems.forEach((category) => {
                category.classList.remove("tm-category-active");
            });

            item.classList.add("tm-category-active");

        });

    });


    /* Smooth Scroll */
    heroSection.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            targetElement.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });

        });

    });

});

/* =====================================================
   TRADEMASTERS — SECTION 2: BEGINNER COURSES
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const beginnerSection = document.querySelector(
        ".tm-beginner-courses"
    );

    if (!beginnerSection) return;


    /* Initialize Lucide Icons */
    function initializeIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initializeIcons();


    /* Refresh Icons on Theme or Direction Changes */
    const iconObserver = new MutationObserver(() => {
        initializeIcons();
    });

    iconObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    iconObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"]
    });


    /* Smooth Scroll for Course Detail Links */
    beginnerSection.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            targetElement.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });

        });

    });

});

/* =====================================================
   TRADEMASTERS — SECTION 3: INTERMEDIATE COURSES
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Smooth scroll */
    document.querySelectorAll(
        '.tm-intermediate-courses a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

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

    /* Course card reveal animation */
    const cards = document.querySelectorAll(
        ".tm-intermediate-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "tm-intermediate-card-visible"
                        );

                        currentObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.08
            }
        );

        cards.forEach((card, index) => {

            card.classList.add("tm-intermediate-card-reveal");

            card.style.setProperty(
                "--card-delay",
                `${index * 100}ms`
            );

            observer.observe(card);

        });

    }

});

/* =====================================================
   TRADEMASTERS — SECTION 4: ADVANCED COURSES
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Smooth scroll for section links */
    document.querySelectorAll(
        '.tm-advanced-courses a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

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

    /* Scroll reveal animation */
    const cards = document.querySelectorAll(
        ".tm-advanced-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "tm-advanced-card-visible"
                        );

                        currentObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        cards.forEach((card, index) => {

            card.classList.add("tm-advanced-card-reveal");

            card.style.setProperty(
                "--advanced-card-delay",
                `${index * 90}ms`
            );

            observer.observe(card);

        });

    }

});
/* =====================================================
   TRADEMASTERS — SECTION 5: RISK MANAGEMENT JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const riskSection = document.querySelector(".tm-risk-section");

    if (!riskSection) return;


    /* Initialize Lucide icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }


    /* Smooth scroll for section links */
    riskSection.querySelectorAll('a[href^="#"]').forEach((link) => {

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


    /* Card reveal animation */
    const riskCards = riskSection.querySelectorAll(".tm-risk-card");

    riskCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(18px)";
        card.style.transition =
            "opacity 0.55s ease, transform 0.55s ease, border-color 0.3s ease, box-shadow 0.3s ease";

        card.style.transitionDelay = `${index * 100}ms`;

    });


    /* Reveal cards when section enters the viewport */
    if ("IntersectionObserver" in window) {

        const riskObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    riskCards.forEach((card) => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    });

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        riskObserver.observe(riskSection);

    } else {

        riskCards.forEach((card) => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        });

    }

});
/* =====================================================
   TRADEMASTERS — SECTION 6: HOW OUR COURSES WORK JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const howSection = document.querySelector(".tm-how-section");

    if (!howSection) return;


    /* Initialize Lucide icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }


    /* Select elements */
    const howVisual = howSection.querySelector(".tm-how-visual");
    const howSteps = howSection.querySelectorAll(".tm-how-step");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* Skip animations when reduced motion is enabled */
    if (prefersReducedMotion) {
        return;
    }


    /* Initial reveal animation */
    const animatedItems = [
        ...(howVisual ? [howVisual] : []),
        ...howSteps
    ];

    animatedItems.forEach((item, index) => {

        item.style.opacity = "0";
        item.style.transform = "translateY(16px)";

        item.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";

        item.style.transitionDelay = `${Math.min(index * 80, 400)}ms`;

    });


    /* Reveal content when the section enters the viewport */
    if ("IntersectionObserver" in window) {

        const howObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    animatedItems.forEach((item) => {

                        item.style.opacity = "1";
                        item.style.transform = "translateY(0)";

                    });

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12
            }
        );

        howObserver.observe(howSection);

    } else {

        animatedItems.forEach((item) => {

            item.style.opacity = "1";
            item.style.transform = "none";

        });

    }

});
/* =====================================================
   TRADEMASTERS — SECTION 7: FAQ + CTA
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* =================================================
       FAQ ACCORDION
    ================================================= */

    const faqItems = document.querySelectorAll(
        ".tm-courses-faq .tm-faq-item"
    );

    faqItems.forEach((item) => {

        const question = item.querySelector(".tm-faq-question");
        const answer = item.querySelector(".tm-faq-answer");

        if (!question || !answer) return;

        question.addEventListener("click", () => {

            const wasOpen = item.classList.contains("active");

            /* Close all items first */
            faqItems.forEach((faqItem) => {

                faqItem.classList.remove("active");

                const faqQuestion = faqItem.querySelector(
                    ".tm-faq-question"
                );

                const faqAnswer = faqItem.querySelector(
                    ".tm-faq-answer"
                );

                if (faqQuestion) {
                    faqQuestion.setAttribute("aria-expanded", "false");
                }

                if (faqAnswer) {
                    faqAnswer.hidden = true;
                }

            });

            /* Open selected item if it was closed */
            if (!wasOpen) {

                item.classList.add("active");

                question.setAttribute("aria-expanded", "true");
                answer.hidden = false;

            }

            /* Refresh Lucide icons */
            if (window.lucide) {
                window.lucide.createIcons();
            }

        });

    });

    /* =================================================
       CTA SMOOTH SCROLL
    ================================================= */

    const ctaLinks = document.querySelectorAll(
        ".tm-courses-faq .tm-courses-cta a[href^='#']"
    );

    ctaLinks.forEach((link) => {

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