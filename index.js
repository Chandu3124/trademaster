document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    document.querySelectorAll('.tm-home a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const selector = link.getAttribute("href");
            const target = document.querySelector(selector);

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

/* =====================================================
   TRADEMASTERS — SECTION 3
   SCROLL REVEAL ANIMATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const advantagesSection = document.querySelector(".tm-advantages");

    if (!advantagesSection) {
        return;
    }

    const revealElements =
        advantagesSection.querySelectorAll(".tm-reveal");

    /* Fallback for browsers without IntersectionObserver */

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("tm-visible");
        });

        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("tm-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

});

/* =====================================================
   TRADEMASTERS — SECTION 4 COURSE REVEAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide Icons */

    if (window.lucide) {
        window.lucide.createIcons();
    }


    /* Scroll Reveal */

    const courseElements = document.querySelectorAll(
        ".tm-courses .tm-course-reveal"
    );

    if ("IntersectionObserver" in window) {

        const courseObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("tm-course-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        courseElements.forEach((element) => {
            courseObserver.observe(element);
        });

    } else {

        courseElements.forEach((element) => {
            element.classList.add("tm-course-visible");
        });

    }

});

/* =====================================================
   TRADEMASTERS — SECTION 5: INSTRUCTOR REVEAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide Icons */

    if (window.lucide) {
        window.lucide.createIcons();
    }


    /* Instructor Scroll Reveal */

    const instructorElements = document.querySelectorAll(
        ".tm-instructor .tm-instructor-reveal"
    );

    if ("IntersectionObserver" in window) {

        const instructorObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "tm-instructor-visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        instructorElements.forEach((element) => {
            instructorObserver.observe(element);
        });

    } else {

        instructorElements.forEach((element) => {
            element.classList.add("tm-instructor-visible");
        });

    }

});

/* =====================================================
   TRADEMASTERS — SECTION 6: HOW IT WORKS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide Icons */

    if (window.lucide) {
        window.lucide.createIcons();
    }


    /* Scroll Reveal */

    const howElements = document.querySelectorAll(
        ".tm-how-it-works .tm-how-reveal"
    );

    if ("IntersectionObserver" in window) {

        const howObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("tm-how-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        howElements.forEach((element) => {
            howObserver.observe(element);
        });

    } else {

        howElements.forEach((element) => {
            element.classList.add("tm-how-visible");
        });

    }

});

/* =========================================================
   TRADEMASTERS — SECTION 7 JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const learningSection = document.querySelector(
        ".tm-learning-experience"
    );

    if (!learningSection) return;


    /* =====================================================
       INITIALIZE LUCIDE ICONS
    ===================================================== */

    function initializeLearningIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initializeLearningIcons();


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const learningObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        learningSection.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        learningObserver.observe(learningSection);

    } else {

        learningSection.classList.add("is-visible");

    }


    /* =====================================================
       COURSE PROGRESS BAR
    ===================================================== */

    const progressTrack = learningSection.querySelector(
        ".tm-progress-track"
    );

    const progressFill = learningSection.querySelector(
        ".tm-progress-fill"
    );

    const progressPercentage = learningSection.querySelector(
        ".tm-progress-percentage"
    );

    if (progressTrack && progressFill) {

        const progressValue = Math.min(
            100,
            Math.max(
                0,
                Number(progressTrack.getAttribute("aria-valuenow")) || 72
            )
        );

        progressTrack.setAttribute(
            "aria-valuenow",
            progressValue
        );

        progressFill.style.width = "0%";

        const progressObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        learningSection.classList.add("is-visible");

                        progressFill.style.width = progressValue + "%";

                        if (progressPercentage) {

                            progressPercentage.textContent =
                                progressValue + "%";

                        }

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.25
            }
        );

        progressObserver.observe(progressTrack);

    }


    /* =====================================================
       FEATURE CARD HOVER ACCESSIBILITY
    ===================================================== */

    const featureCards = learningSection.querySelectorAll(
        ".tm-learning-feature"
    );

    featureCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("is-active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("is-active");
        });

        card.addEventListener("focusin", () => {
            card.classList.add("is-active");
        });

        card.addEventListener("focusout", () => {
            card.classList.remove("is-active");
        });

    });


    /* =====================================================
       SMOOTH SCROLL FOR SECTION LINKS
    ===================================================== */

    const sectionLinks = learningSection.querySelectorAll(
        'a[href^="#"]'
    );

    sectionLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});

/* =========================================
   TRADEMASTERS — SECTION 8
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Smooth scrolling for section links
    document.querySelectorAll(
        '.tm-final-cta a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");
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