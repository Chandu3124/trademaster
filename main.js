/* =========================================================
   TRADEMASTERS — HEADER & FOOTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;
    const html = document.documentElement;

    const siteHeader = document.getElementById("siteHeader");
    const brandLogo = document.getElementById("brandLogo");
    const footerBrandLogo = document.getElementById("footerBrandLogo");

    const themeToggles = document.querySelectorAll(".js-theme-toggle");
    const rtlToggles = document.querySelectorAll(".js-rtl-toggle");

    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const mainNavigation = document.getElementById("mainNavigation");

    const homeDropdown = document.querySelector(".dropdown");
    const homeDropdownToggle = document.getElementById("homeDropdownToggle");

    const currentYear = document.getElementById("currentYear");
    const backToTop = document.getElementById("backToTop");


    /* =====================================================
       LUCIDE ICONS
    ====================================================== */

    function refreshIcons() {
        if (
            window.lucide &&
            typeof window.lucide.createIcons === "function"
        ) {
            window.lucide.createIcons();
        }
    }


    /* =====================================================
       LOGO HANDLING
    ====================================================== */

    function updateLogos(isDarkMode) {
        const logoPath = isDarkMode
            ? "logo_dark.png"
            : "logo_light.png";

        if (brandLogo) {
            brandLogo.src = logoPath;
            brandLogo.alt = isDarkMode
                ? "TradeMasters Dark Logo"
                : "TradeMasters Light Logo";
        }

        if (footerBrandLogo) {
            footerBrandLogo.src = logoPath;
            footerBrandLogo.alt = isDarkMode
                ? "TradeMasters Dark Logo"
                : "TradeMasters Light Logo";
        }
    }


    /* =====================================================
       THEME
    ====================================================== */

    function updateThemeIcons(isDarkMode) {
        themeToggles.forEach(function (button) {
            button.innerHTML = isDarkMode
                ? '<i data-lucide="sun"></i>'
                : '<i data-lucide="moon"></i>';

            button.setAttribute(
                "aria-label",
                isDarkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            button.setAttribute(
                "title",
                isDarkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );
        });
    }

    function applyTheme(theme) {
        const isDarkMode = theme === "dark";

        body.classList.toggle("dark-mode", isDarkMode);
        html.setAttribute("data-theme", isDarkMode ? "dark" : "light");

        updateLogos(isDarkMode);
        updateThemeIcons(isDarkMode);

        try {
            localStorage.setItem("theme", theme);
        } catch (error) {
            console.warn("Unable to save theme preference:", error);
        }

        refreshIcons();
    }

    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("theme") || "light";
    } catch (error) {
        savedTheme = "light";
    }

    applyTheme(savedTheme);

    themeToggles.forEach(function (button) {
        button.addEventListener("click", function () {
            const isDarkMode = body.classList.contains("dark-mode");
            applyTheme(isDarkMode ? "light" : "dark");
        });
    });


    /* =====================================================
       LOGO ERROR
    ====================================================== */

    function handleLogoError(logoElement) {
        if (!logoElement) return;

        logoElement.addEventListener("error", function () {
            console.warn("Unable to load logo image:", this.src);
        });
    }

    handleLogoError(brandLogo);
    handleLogoError(footerBrandLogo);


    /* =====================================================
       RTL / LTR
    ====================================================== */

    function updateDirectionIcons(isRTL) {
        rtlToggles.forEach(function (button) {
            button.setAttribute(
                "aria-label",
                isRTL
                    ? "Switch to left-to-right layout"
                    : "Switch to right-to-left layout"
            );

            button.setAttribute(
                "title",
                isRTL ? "Switch to LTR" : "Switch to RTL"
            );
        });
    }

    function applyDirection(direction) {
        const isRTL = direction === "rtl";

        html.setAttribute("dir", isRTL ? "rtl" : "ltr");
        updateDirectionIcons(isRTL);

        try {
            localStorage.setItem("direction", isRTL ? "rtl" : "ltr");
        } catch (error) {
            console.warn("Unable to save direction preference:", error);
        }

        refreshIcons();
    }

    let savedDirection = "ltr";

    try {
        savedDirection = localStorage.getItem("direction") || "ltr";
    } catch (error) {
        savedDirection = "ltr";
    }

    applyDirection(savedDirection);

    rtlToggles.forEach(function (button) {
        button.addEventListener("click", function () {
            const currentDirection = html.getAttribute("dir");

            applyDirection(
                currentDirection === "rtl" ? "ltr" : "rtl"
            );
        });
    });


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    function openMobileMenu() {
        if (!mainNavigation || !mobileMenuToggle) return;

        mainNavigation.classList.add("mobile-open");

        mobileMenuToggle.setAttribute("aria-expanded", "true");
        mobileMenuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        mobileMenuToggle.innerHTML = '<i data-lucide="x"></i>';
        refreshIcons();
    }

    function closeMobileMenu() {
        if (!mainNavigation || !mobileMenuToggle) return;

        mainNavigation.classList.remove("mobile-open");

        mobileMenuToggle.setAttribute("aria-expanded", "false");
        mobileMenuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        mobileMenuToggle.innerHTML = '<i data-lucide="menu"></i>';

        if (homeDropdown) {
            homeDropdown.classList.remove("open");
        }

        if (homeDropdownToggle) {
            homeDropdownToggle.setAttribute("aria-expanded", "false");
        }

        refreshIcons();
    }

    if (mobileMenuToggle && mainNavigation) {
        mobileMenuToggle.addEventListener("click", function () {
            const isOpen = mainNavigation.classList.contains("mobile-open");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }


    /* =====================================================
       HOME DROPDOWN
    ====================================================== */

    if (homeDropdown && homeDropdownToggle) {
        homeDropdownToggle.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = homeDropdown.classList.contains("open");

            homeDropdown.classList.toggle("open", !isOpen);
            homeDropdownToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );
        });
    }

    document.addEventListener("click", function (event) {
        if (
            homeDropdown &&
            !homeDropdown.contains(event.target)
        ) {
            homeDropdown.classList.remove("open");

            if (homeDropdownToggle) {
                homeDropdownToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }
    });


    /* =====================================================
       CLOSE MENU AFTER LINK CLICK
    ====================================================== */

    if (mainNavigation) {
        const navigationLinks =
            mainNavigation.querySelectorAll("a");

        navigationLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                closeMobileMenu();
            });
        });
    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMobileMenu();

            if (homeDropdown) {
                homeDropdown.classList.remove("open");
            }

            if (homeDropdownToggle) {
                homeDropdownToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }
    });


    /* =====================================================
       CLOSE MENU ON DESKTOP RESIZE
    ====================================================== */

    window.addEventListener("resize", function () {
        if (window.innerWidth > 1100) {
            closeMobileMenu();
        }
    });


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    function setActiveNavigation() {
        const currentPath = window.location.pathname;

        let currentPage = currentPath.split("/").pop();

        if (!currentPage) {
            currentPage = "index.html";
        }

        const navigationLinks = document.querySelectorAll(
            ".nav-list a, .dropdown-menu a"
        );

        navigationLinks.forEach(function (link) {
            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const linkPage = href
                .split("/")
                .pop()
                .split("?")[0]
                .split("#")[0];

            if (linkPage === currentPage) {
                link.classList.add("active");
            }
        });

        if (
            currentPage === "index.html" ||
            currentPage === "home2.html"
        ) {
            if (homeDropdownToggle) {
                homeDropdownToggle.classList.add("active");
            }
        }
    }

    setActiveNavigation();


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =====================================================
       HEADER SCROLL STATE
    ====================================================== */

    function updateHeaderScrollState() {
        if (!siteHeader) return;

        siteHeader.classList.toggle(
            "is-scrolled",
            window.scrollY > 10
        );
    }

    window.addEventListener(
        "scroll",
        updateHeaderScrollState,
        { passive: true }
    );

    updateHeaderScrollState();


    /* =====================================================
       FINAL ICON RENDER
    ====================================================== */

    refreshIcons();
});