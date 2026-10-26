/* =====================================================
   TRADEMASTERS — ANIMATED MARKET GRAPH
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const section = document.querySelector(".tm-home2");

    if (!section) return;

    const chartLine = document.getElementById("tm-chart-line");
    const chartFill = document.getElementById("tm-chart-area-fill");
    const chartPoint = document.getElementById("tm-chart-point");

    const marketValue = document.getElementById("tm-market-value");
    const marketChange = document.getElementById("tm-market-change");

    if (!chartLine || !chartFill || !chartPoint) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const chartWidth = 600;
    const chartHeight = 250;
    const pointCount = 70;

    const centerValue = 125;
    const baseValue = 24850;

    let animationFrame = null;
    let isVisible = false;
    let startTime = null;


    /* Generate a smooth, illustrative market-style wave */
    function getMarketValue(index, time) {

        const slowWave =
            Math.sin(index * 0.19 + time * 0.00055) * 24;

        const mediumWave =
            Math.sin(index * 0.43 - time * 0.0009) * 12;

        const quickWave =
            Math.sin(index * 0.92 + time * 0.0013) * 5;

        const trendWave =
            Math.sin(time * 0.00025) * 12;

        return centerValue
            - slowWave
            - mediumWave
            - quickWave
            - trendWave;
    }


    /* Draw the graph */
    function drawChart(time) {

        const points = [];

        for (let i = 0; i < pointCount; i++) {

            const x =
                (i / (pointCount - 1)) * chartWidth;

            const y = getMarketValue(i, time);

            points.push({ x, y });
        }

        const linePath = points
            .map((point, index) => {
                const command = index === 0 ? "M" : "L";

                return `${command} ${point.x} ${point.y}`;
            })
            .join(" ");

        const fillPath = `
            ${linePath}
            L ${chartWidth} ${chartHeight}
            L 0 ${chartHeight}
            Z
        `;

        chartLine.setAttribute("d", linePath);
        chartFill.setAttribute("d", fillPath);

        const lastPoint = points[points.length - 1];

        chartPoint.setAttribute("cx", lastPoint.x);
        chartPoint.setAttribute("cy", lastPoint.y);


        /* Update the illustrative value */
        const currentValue =
            baseValue + (centerValue - lastPoint.y) * 4;

        const changePercent =
            ((currentValue - baseValue) / baseValue) * 100;

        if (marketValue) {

            marketValue.textContent = currentValue.toLocaleString(
                "en-IN",
                {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );
        }

        if (marketChange) {

            const changeText = marketChange.querySelector("span");
            const changeIcon = marketChange.querySelector("svg");

            if (changeText) {

                const sign = changePercent >= 0 ? "+" : "";

                changeText.textContent =
                    `${sign}${changePercent.toFixed(2)}%`;
            }

            marketChange.style.color = changePercent >= 0
                ? "var(--color-secondary)"
                : "var(--color-primary)";

            if (changeIcon) {

                changeIcon.style.transform = changePercent >= 0
                    ? "rotate(0deg)"
                    : "rotate(180deg)";
            }
        }
    }


    /* Continuous animation loop */
    function animate(time) {

        if (!isVisible || reducedMotion.matches) {
            animationFrame = null;
            return;
        }

        if (startTime === null) {
            startTime = time;
        }

        drawChart(time - startTime);

        animationFrame = requestAnimationFrame(animate);
    }


    /* Start animation */
    function startAnimation() {

        if (!isVisible || reducedMotion.matches) {
            drawChart(0);
            return;
        }

        if (animationFrame !== null) return;

        startTime = null;

        animationFrame = requestAnimationFrame(animate);
    }


    /* Stop animation when section is out of view */
    function stopAnimation() {

        if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }


    /* Run only while dashboard is visible */
    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            isVisible = entry.isIntersecting;

            if (isVisible) {
                startAnimation();
            } else {
                stopAnimation();
            }

        });

    }, {
        threshold: 0.1
    });

    observer.observe(section);


    /* Respect motion preference changes */
    reducedMotion.addEventListener("change", () => {

        stopAnimation();

        if (isVisible) {
            startAnimation();
        }

    });


    /* Smooth scrolling for section links */
    section.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: reducedMotion.matches ? "auto" : "smooth",
                    block: "start"
                });
            }
        });

    });

});

/* =========================================
   TRADEMASTERS — SECTION 2
   MARKET KNOWLEDGE INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".tm-market-knowledge");

    if (!section) return;

    /* INITIALIZE LUCIDE ICONS */

    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* ADD REVEAL CLASSES */

    const intro = section.querySelector(
        ".tm-market-knowledge-intro"
    );

    const cards = section.querySelectorAll(
        ".tm-market-topic-card"
    );

    if (intro) {
        intro.classList.add("tm-reveal");
    }

    cards.forEach((card, index) => {

        card.classList.add("tm-reveal");

        if (index === 1) {
            card.classList.add("tm-reveal-delay-1");
        }

        if (index === 2) {
            card.classList.add("tm-reveal-delay-2");
        }

        if (index === 3) {
            card.classList.add("tm-reveal-delay-3");
        }

    });

    /* SCROLL REVEAL */

    const revealElements = section.querySelectorAll(".tm-reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("tm-visible");

                        currentObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("tm-visible");
        });

    }

    /* SMOOTH SCROLL */

    const exploreButton = section.querySelector(
        ".tm-market-knowledge-button"
    );

    if (exploreButton) {

        exploreButton.addEventListener("click", event => {

            const targetId = exploreButton.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }

});
/* =====================================================
   TRADEMASTERS — SECTION 3: SKILL LEVELS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".tm-skill-levels");

    if (!section) return;


    /* ---------------------------------------------
       INITIALIZE LUCIDE ICONS
    --------------------------------------------- */

    if (window.lucide) {
        window.lucide.createIcons();
    }


    /* ---------------------------------------------
       SCROLL REVEAL ANIMATION
    --------------------------------------------- */

    const revealElements = [
        section.querySelector(".tm-skill-levels-header"),
        ...section.querySelectorAll(".tm-skill-card"),
        section.querySelector(".tm-skill-levels-bottom")
    ].filter(Boolean);


    revealElements.forEach((element, index) => {

        element.classList.add("tm-skill-reveal");

        /* Stagger the three cards */
        if (element.classList.contains("tm-skill-card")) {

            const cardIndex = Array.from(
                section.querySelectorAll(".tm-skill-card")
            ).indexOf(element);

            element.style.transitionDelay = `${cardIndex * 140}ms`;

        } else {

            element.style.transitionDelay = index === 0
                ? "0ms"
                : "100ms";

        }

    });


    /* ---------------------------------------------
       INTERSECTION OBSERVER
    --------------------------------------------- */

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("tm-skill-visible");

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

    } else {

        revealElements.forEach(element => {
            element.classList.add("tm-skill-visible");
        });

    }


    /* ---------------------------------------------
       SMOOTH SCROLL FOR SECTION LINKS
    --------------------------------------------- */

    section.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

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

/* =====================================================
   TRADEMASTERS — SECTION 4: COURSE SPOTLIGHT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".tm-course-spotlight");

    if (!section) return;


    /* =================================================
       LUCIDE ICONS
    ================================================= */

    function refreshIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    refreshIcons();


    /* =================================================
       SCROLL REVEAL WITH STAGGER
    ================================================= */

    const revealElements = [
        ...section.querySelectorAll(".tm-course-reveal")
    ];

    revealElements.forEach((element, index) => {

        element.style.transitionDelay =
            `${Math.min(index * 120, 360)}ms`;

    });


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "tm-course-visible"
                        );

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

    } else {

        revealElements.forEach(element => {
            element.classList.add("tm-course-visible");
        });

    }


    /* =================================================
       CHART ANIMATION ON VIEW
    ================================================= */

    const chartVisual = section.querySelector(
        ".tm-featured-visual"
    );


    if (chartVisual && "IntersectionObserver" in window) {

        const chartObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        section.classList.add(
                            "tm-course-chart-active"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.3
            }
        );

        chartObserver.observe(chartVisual);

    } else {

        section.classList.add("tm-course-chart-active");

    }


    /* =================================================
       INTERACTIVE TOPIC SELECTION
    ================================================= */

    const topicButtons = [
        ...section.querySelectorAll(".tm-featured-topic")
    ];


    topicButtons.forEach(button => {

        button.addEventListener("click", () => {

            topicButtons.forEach(topic => {
                topic.classList.remove("active");
                topic.removeAttribute("aria-pressed");
            });


            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");


            /*
              Highlight the related learning topic.
              The course topics are educational content,
              not live market signals.
            */

            const topic = button.dataset.topic;

            section.dataset.activeTopic = topic;

        });

    });


    /* INITIAL ACCESSIBILITY STATE */

    topicButtons.forEach(button => {

        button.setAttribute(
            "aria-pressed",
            button.classList.contains("active") ? "true" : "false"
        );

    });


    /* =================================================
       SUBTLE MOUSE INTERACTION ON CHART
    ================================================= */

    const visual = section.querySelector(".tm-featured-visual");
    const chartSVG = section.querySelector(".tm-chart-svg");

    const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (visual && chartSVG && canHover) {

        visual.addEventListener("mousemove", event => {

            const bounds = visual.getBoundingClientRect();

            const pointerX =
                (event.clientX - bounds.left) / bounds.width;

            const pointerY =
                (event.clientY - bounds.top) / bounds.height;

            const moveX = (pointerX - 0.5) * 7;
            const moveY = (pointerY - 0.5) * 7;

            chartSVG.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

        });


        visual.addEventListener("mouseleave", () => {

            chartSVG.style.transform = "translate(0, 0)";

        });

    }


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    section.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetID = link.getAttribute("href");

            if (!targetID || targetID === "#") return;

            const target = document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =================================================
       CLEAN UP MOUSE EFFECT FOR REDUCED MOTION
    ================================================= */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {

        section.classList.add("tm-course-chart-active");

        revealElements.forEach(element => {
            element.classList.add("tm-course-visible");
        });

    }

});

/* =====================================================
   TRADEMASTERS — SECTION 5 JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".tm-instructor-expertise");

    if (!section) return;


    /* ---------------------------------------------
       INITIALIZE LUCIDE ICONS
    --------------------------------------------- */

    const initializeIcons = () => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    initializeIcons();


    /* ---------------------------------------------
       SCROLL REVEAL
    --------------------------------------------- */

    const revealElements = section.querySelectorAll(".tm-reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

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

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("tm-visible");
        });

    }


    /* ---------------------------------------------
       PAUSE ANIMATION WHEN SECTION IS NOT VISIBLE
    --------------------------------------------- */

    const animatedElements = section.querySelectorAll(
        ".tm-orbit, .tm-center-ring, .tm-circle-glow, " +
        ".tm-circle-center, .tm-circle-label, .tm-circle-marker"
    );

    if ("IntersectionObserver" in window) {

        const animationObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    animatedElements.forEach((element) => {

                        element.style.animationPlayState =
                            entry.isIntersecting ? "running" : "paused";

                    });

                });

            },
            {
                threshold: 0.05
            }
        );

        animationObserver.observe(section);

    }


    /* ---------------------------------------------
       PAUSE ANIMATION WHEN TAB IS HIDDEN
    --------------------------------------------- */

    document.addEventListener("visibilitychange", () => {

        const isPaused = document.hidden;

        animatedElements.forEach((element) => {

            element.style.animationPlayState =
                isPaused ? "paused" : "running";

        });

    });


    /* ---------------------------------------------
       SUBTLE POINTER INTERACTION
    --------------------------------------------- */

    const visual = section.querySelector(".tm-circle-visual-inner");

    if (
        visual &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {

        visual.addEventListener("pointermove", (event) => {

            const rect = visual.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            const moveX = (x - 0.5) * 7;
            const moveY = (y - 0.5) * 7;

            visual.style.setProperty("--tm-pointer-x", `${moveX}px`);
            visual.style.setProperty("--tm-pointer-y", `${moveY}px`);

        });

        visual.addEventListener("pointerleave", () => {

            visual.style.setProperty("--tm-pointer-x", "0px");
            visual.style.setProperty("--tm-pointer-y", "0px");

        });

    }


    /* ---------------------------------------------
       REINITIALIZE ICONS IF THEME CHANGES
    --------------------------------------------- */

    const themeObserver = new MutationObserver(() => {
        initializeIcons();
    });

    themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

});

/* =====================================================
   TRADEMASTERS — SECTION 6 JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".tm-mock-portfolio");

    if (!section) return;


    /* ---------------------------------------------
       LUCIDE ICONS
    --------------------------------------------- */

    function initializeIcons() {

        if (window.lucide) {
            window.lucide.createIcons();
        }

    }

    initializeIcons();


    /* ---------------------------------------------
       SCROLL REVEAL
    --------------------------------------------- */

    const revealElements = section.querySelectorAll(".tm-mock-reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("tm-mock-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -25px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("tm-mock-visible");
        });

    }


    /* ---------------------------------------------
       IMAGE CHART ANIMATION
    --------------------------------------------- */

    const visual = section.querySelector(".tm-mock-visual");

    if ("IntersectionObserver" in window && visual) {

        const visualObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        visual.classList.add("tm-mock-visual-active");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.2
            }
        );

        visualObserver.observe(visual);

    } else if (visual) {

        visual.classList.add("tm-mock-visual-active");

    }


    /* ---------------------------------------------
       FEATURE HOVER EFFECT
    --------------------------------------------- */

    const features = section.querySelectorAll(".tm-mock-feature");

    features.forEach((feature, index) => {

        feature.style.transitionDelay = `${index * 45}ms`;

    });


    /* ---------------------------------------------
       PAUSE ANIMATIONS WHEN TAB IS HIDDEN
    --------------------------------------------- */

    const animatedElements = section.querySelectorAll(
        ".tm-mock-market-image, " +
        ".tm-mock-image-badge > span, " +
        ".tm-mock-image-chart, " +
        ".tm-mock-image-floating"
    );

    document.addEventListener("visibilitychange", () => {

        animatedElements.forEach((element) => {

            element.style.animationPlayState =
                document.hidden ? "paused" : "running";

        });

    });


    /* ---------------------------------------------
       THEME CHANGE — REINITIALIZE ICONS
    --------------------------------------------- */

    const themeObserver = new MutationObserver(() => {
        initializeIcons();
    });

    themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

});

/* =====================================================
   TRADEMASTERS — SECTION 7: FREE RESOURCES JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".tm-free-resources");

    if (!section) return;


    /* -------------------------------------------------
       INITIALIZE LUCIDE ICONS
    ------------------------------------------------- */

    function initializeResourceIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initializeResourceIcons();


    /* -------------------------------------------------
       SCROLL REVEAL
    ------------------------------------------------- */

    const resourceCards = section.querySelectorAll(
        ".tm-resource-card"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {

        const resourceObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        resourceCards.forEach((card) => {
            resourceObserver.observe(card);
        });

    } else {

        resourceCards.forEach((card) => {
            card.classList.add("is-visible");
        });

    }


    /* -------------------------------------------------
       IMAGE FALLBACK
       Hide broken images gracefully
    ------------------------------------------------- */

    const resourceImages = section.querySelectorAll(
        ".tm-resource-image img"
    );

    resourceImages.forEach((img) => {

        img.addEventListener("error", () => {

            img.style.display = "none";

            const imageContainer = img.closest(
                ".tm-resource-image"
            );

            if (imageContainer) {

                imageContainer.style.background =
                    "linear-gradient(135deg, var(--color-primary), var(--color-secondary))";

            }

        });

    });


    /* -------------------------------------------------
       CARD LINK INTERACTIONS
    ------------------------------------------------- */

    const resourceLinks = section.querySelectorAll(
        ".tm-resource-link"
    );

    resourceLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const destination = link.getAttribute("href");

            if (
                destination &&
                destination.startsWith("#") &&
                destination.length > 1
            ) {

                const target = document.querySelector(destination);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: reducedMotion ? "auto" : "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    /* -------------------------------------------------
       CTA BUTTON INTERACTION
    ------------------------------------------------- */

    const exploreButton = section.querySelector(
        ".tm-resources-button"
    );

    if (exploreButton) {

        exploreButton.addEventListener("click", (event) => {

            const destination = exploreButton.getAttribute("href");

            if (
                destination &&
                destination.startsWith("#") &&
                destination.length > 1
            ) {

                const target = document.querySelector(destination);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: reducedMotion ? "auto" : "smooth",
                        block: "start"
                    });

                }

            }

        });

    }


    /* -------------------------------------------------
       REINITIALIZE ICONS ON THEME CHANGE
    ------------------------------------------------- */

    const themeObserver = new MutationObserver(() => {
        initializeResourceIcons();
    });

    themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

});

/* =====================================================
   TRADEMASTERS — SECTION 8: FINAL CTA JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".tm-final-cta");

    if (!section) return;


    /* Initialize Lucide Icons */
    function initializeIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initializeIcons();


    /* Scroll Reveal */
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        section.classList.add("tm-cta-visible");

                        currentObserver.unobserve(section);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        observer.observe(section);

    } else {

        section.classList.add("tm-cta-visible");

    }


    /* Smooth Scroll */
    section.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });

        });

    });


    /* Pause Decorative Animations When Tab Is Hidden */
    document.addEventListener("visibilitychange", () => {

        section.querySelectorAll(
            ".tm-cta-glow, .tm-cta-orbit, .tm-visual-orbit, .tm-visual-main-circle, .tm-visual-floating, .tm-visual-dot"
        ).forEach((element) => {

            element.style.animationPlayState =
                document.hidden ? "paused" : "running";

        });

    });


    /* Refresh Icons When Theme Changes */
    const themeObserver = new MutationObserver(() => {
        initializeIcons();
    });

    themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

});