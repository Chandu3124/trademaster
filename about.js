/* =====================================================
   TRADEMASTERS — ABOUT HERO JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const aboutHero = document.querySelector(".tm-about-hero");

    if (!aboutHero) return;


    /* -------------------------------------------------
       INITIALIZE LUCIDE ICONS
    ------------------------------------------------- */

    const initializeIcons = () => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    initializeIcons();


    /* -------------------------------------------------
       REVEAL HERO CONTENT
    ------------------------------------------------- */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        aboutHero.classList.add("tm-about-visible");
    } else {

        const heroObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        aboutHero.classList.add("tm-about-visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        heroObserver.observe(aboutHero);
    }


    /* -------------------------------------------------
       SMOOTH SCROLL FOR HERO BUTTONS
    ------------------------------------------------- */

    const heroLinks = aboutHero.querySelectorAll(
        'a[href^="#"]'
    );

    heroLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start"
                });

            }

        });

    });


    /* -------------------------------------------------
       REFRESH ICONS WHEN THE THEME CHANGES
    ------------------------------------------------- */

    const themeObserver = new MutationObserver(() => {
        initializeIcons();
    });

    themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });


    /* -------------------------------------------------
       RTL DIRECTION SUPPORT
    ------------------------------------------------- */

    const directionObserver = new MutationObserver(() => {
        initializeIcons();
    });

    directionObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"]
    });

});

/* =====================================================
   TRADEMASTERS — SECTION 2: WHO WE ARE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const identitySection = document.querySelector(".tm-identity");

    if (!identitySection) {
        return;
    }


    /* =================================================
       INITIALIZE LUCIDE ICONS
    ================================================= */

    const initializeIdentityIcons = () => {

        if (window.lucide) {
            window.lucide.createIcons();
        }

    };

    initializeIdentityIcons();


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const identityReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !identityReducedMotion) {

        const identityObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        identitySection.classList.add(
                            "tm-identity-visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        identityObserver.observe(identitySection);

    } else {

        identitySection.classList.add("tm-identity-visible");

    }


    /* =================================================
       PRINCIPLE CARD INTERACTIONS
    ================================================= */

    const principleCards = identitySection.querySelectorAll(
        ".tm-identity-principle"
    );

    principleCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("tm-identity-principle-active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("tm-identity-principle-active");
        });

    });


    /* =================================================
       THEME AND RTL CHANGE SUPPORT
    ================================================= */

    const identityMutationObserver = new MutationObserver(() => {
        initializeIdentityIcons();
    });

    identityMutationObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    identityMutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"]
    });

});

/* =====================================================
   TRADEMASTERS — SECTION 3: OUR MISSION & VISION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const missionSection = document.querySelector(".tm-mission");

    if (!missionSection) {
        return;
    }


    /* =================================================
       INITIALIZE LUCIDE ICONS
    ================================================= */

    const initializeMissionIcons = () => {

        if (window.lucide) {
            window.lucide.createIcons();
        }

    };

    initializeMissionIcons();


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const missionReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !missionReducedMotion) {

        const missionObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        missionSection.classList.add(
                            "tm-mission-visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        missionObserver.observe(missionSection);

    } else {

        missionSection.classList.add("tm-mission-visible");

    }


    /* =================================================
       CARD INTERACTIONS
    ================================================= */

    const missionCards = missionSection.querySelectorAll(
        ".tm-mission-card"
    );

    missionCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("tm-mission-card-active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("tm-mission-card-active");
        });

    });


    /* =================================================
       THEME AND RTL CHANGE SUPPORT
    ================================================= */

    const missionMutationObserver = new MutationObserver(() => {
        initializeMissionIcons();
    });

    missionMutationObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    missionMutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"]
    });

});

/* =====================================================
   TRADEMASTERS — SECTION 4: WHAT MAKES US DIFFERENT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const differentSection = document.querySelector(".tm-different");

    if (!differentSection) {
        return;
    }


    /* =================================================
       INITIALIZE LUCIDE ICONS
    ================================================= */

    const initializeDifferentIcons = () => {

        if (window.lucide) {
            window.lucide.createIcons();
        }

    };

    initializeDifferentIcons();


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const differentReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !differentReducedMotion) {

        const differentObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        differentSection.classList.add(
                            "tm-different-visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        differentObserver.observe(differentSection);

    } else {

        differentSection.classList.add("tm-different-visible");

    }


    /* =================================================
       FEATURE CARD INTERACTIONS
    ================================================= */

    const differentCards = differentSection.querySelectorAll(
        ".tm-different-card"
    );

    differentCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("tm-different-card-active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("tm-different-card-active");
        });

    });


    /* =================================================
       THEME AND RTL CHANGE SUPPORT
    ================================================= */

    const differentMutationObserver = new MutationObserver(() => {
        initializeDifferentIcons();
    });

    differentMutationObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    differentMutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"]
    });

});
/* =====================================================
   TRADEMASTERS — SECTION 5: INSTRUCTORS JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide icons */
    function initInstructorIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initInstructorIcons();


    /* Refresh icons when theme or direction changes */
    const instructorObserver = new MutationObserver(() => {
        initInstructorIcons();
    });

    instructorObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    instructorObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"]
    });


    /* Smooth scroll for instructor detail links */
    document.querySelectorAll(
        '.tm-instructors a[href^="#"]'
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

});

/* =====================================================
   TRADEMASTERS — SECTION 6: METHODOLOGY JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide Icons */

    function initMethodologyIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initMethodologyIcons();


    /* Refresh icons when theme or direction changes */

    const methodologyObserver = new MutationObserver(() => {
        initMethodologyIcons();
    });

    methodologyObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    methodologyObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"]
    });


    /* Scroll Reveal */

    const methodologySection = document.querySelector(
        ".tm-methodology"
    );

    if (
        methodologySection &&
        "IntersectionObserver" in window
    ) {

        const methodologyReveal = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        methodologySection.classList.add(
                            "tm-methodology-visible"
                        );

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.08
            }
        );

        methodologyReveal.observe(methodologySection);
    }

});

/* =====================================================
   TRADEMASTERS — SECTION 7: ABOUT PAGE CTA
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const ctaSection = document.querySelector(".tm-about-cta");

    if (!ctaSection) return;

    /* Initialize Lucide Icons */
    function initializeIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initializeIcons();

    /* Refresh Icons on Theme or Direction Changes */
    const observer = new MutationObserver(() => {
        initializeIcons();
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"]
    });

    /* Smooth Scroll for Internal Links */
    ctaSection.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

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