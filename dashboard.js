document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const html = document.documentElement;

    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");

    const pageTitle = document.getElementById("pageTitle");
    const toast = document.getElementById("toast");

    const profileMenu = document.querySelector(".profile-menu");
    const profileTrigger = document.getElementById("profileTrigger");

    const themeSetting = document.getElementById("themeSetting");
    const rtlSetting = document.getElementById("rtlSetting");

    const dashboardYear = document.getElementById("dashboardYear");
    const dashboardFooterYear = document.getElementById("dashboardFooterYear");

    const titles = {
        overview: "Overview",
        courses: "My Courses",
        recordings: "Recorded Classes",
        schedule: "Class Schedule",
        portfolio: "Mock Portfolio",
        progress: "Learning Progress",
        profile: "My Profile",
        settings: "Settings",
        support: "Learning Support"
    };

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function showToast(message) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2600);
    }

    function closeProfileDropdown() {
        if (!profileMenu || !profileTrigger) return;

        profileMenu.classList.remove("open");
        profileTrigger.setAttribute("aria-expanded", "false");
    }

    function navigateTo(sectionId) {
        const target = document.getElementById(sectionId);

        if (!target || !target.classList.contains("content-section")) {
            return;
        }

        document.querySelectorAll(".content-section").forEach(section => {
            section.classList.remove("active");
        });

        target.classList.add("active");

        document.querySelectorAll(".sidebar .nav-link").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.section === sectionId
            );
        });

        if (pageTitle) {
            pageTitle.textContent = titles[sectionId] || "Dashboard";
        }

        if (sidebar) {
            sidebar.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }

        closeProfileDropdown();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        refreshIcons();
    }

    document.querySelectorAll("[data-section]").forEach(button => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.section);
        });
    });

    /* Mobile sidebar */
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            const isOpen = sidebar.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close sidebar menu" : "Open sidebar menu"
            );
        });
    }

    document.addEventListener("click", event => {
        if (sidebar &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            menuToggle &&
            !menuToggle.contains(event.target)
        ) {
            sidebar.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });

    /* Profile dropdown */
    if (profileTrigger && profileMenu) {
        profileTrigger.addEventListener("click", event => {
            event.stopPropagation();

            const isOpen = profileMenu.classList.toggle("open");
            profileTrigger.setAttribute("aria-expanded", String(isOpen));
        });
    }

    document.addEventListener("click", event => {
        if (profileMenu && !profileMenu.contains(event.target)) {
            closeProfileDropdown();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeProfileDropdown();

            if (sidebar) {
                sidebar.classList.remove("open");
            }

            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
            }
        }
    });

    /* Settings switches trigger main.js toggles */
    if (themeSetting) {
        themeSetting.addEventListener("click", () => {
            const mainThemeToggle = document.querySelector(".js-theme-toggle");

            if (mainThemeToggle) {
                mainThemeToggle.click();
            }
        });
    }

    if (rtlSetting) {
        rtlSetting.addEventListener("click", () => {
            const mainRtlToggle = document.querySelector(".js-rtl-toggle");

            if (mainRtlToggle) {
                mainRtlToggle.click();
            }
        });
    }

    /* Sync dashboard switches with main.js theme/RTL state */
    function syncDashboardSettings() {
        const isDark = body.classList.contains("dark-mode");
        const isRTL = html.getAttribute("dir") === "rtl";

        if (themeSetting) {
            themeSetting.classList.toggle("checked", isDark);
        }

        if (rtlSetting) {
            rtlSetting.classList.toggle("checked", isRTL);
        }
    }

    const settingsObserver = new MutationObserver(syncDashboardSettings);

    settingsObserver.observe(body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    settingsObserver.observe(html, {
        attributes: true,
        attributeFilter: ["dir", "data-theme"]
    });

    syncDashboardSettings();

    /* Profile form */
    const profileForm = document.getElementById("profileForm");

    if (profileForm) {
        profileForm.addEventListener("submit", event => {
            event.preventDefault();

            const newName = document.getElementById("profileName").value.trim();

            if (!newName) {
                showToast("Please enter your name.");
                return;
            }

            const studentName = document.getElementById("studentName");
            const welcomeName = document.querySelector(".welcome-content h2 span");

            if (studentName) {
                studentName.textContent = newName;
            }

            if (welcomeName) {
                welcomeName.textContent = newName.split(" ")[0];
            }

            showToast("Profile updated in this demo.");
        });
    }

    /* Demo actions */
    document.querySelectorAll(".watch-button").forEach(button => {
        button.addEventListener("click", () => {
            showToast("Connect your authorized video player to watch recordings.");
        });
    });

    document.querySelectorAll(".meeting-button").forEach(button => {
        button.addEventListener("click", () => {
            showToast("Class meeting details will appear when provided by the academy.");
        });
    });

    document.querySelectorAll(".course-continue").forEach(button => {
        button.addEventListener("click", () => {
            showToast("Connect this button to your course lesson page.");
        });
    });

    const notificationButton = document.getElementById("notificationBtn");

    if (notificationButton) {
        notificationButton.addEventListener("click", () => {
            showToast("You are viewing the dashboard demo notifications.");
        });
    }

    function handleLogout() {
        const confirmed = window.confirm("Log out of TradeMasters?");

        if (confirmed) {
            showToast("Connect your authentication system to log out.");
        }
    }

    const profileLogoutButton = document.getElementById("profileLogoutBtn");

    if (profileLogoutButton) {
        profileLogoutButton.addEventListener("click", handleLogout);
    }

    /* Year */
    const currentYear = new Date().getFullYear();

    if (dashboardYear) {
        dashboardYear.textContent = currentYear;
    }

    if (dashboardFooterYear) {
        dashboardFooterYear.textContent = currentYear;
    }

    refreshIcons();
});

/* =====================================================
   TRADEMASTERS DASHBOARD — LOGOUT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const sidebarLogout = document.getElementById("sidebarLogout");
    const profileLogout = document.getElementById("profileLogout");

    function handleLogout() {
        const confirmed = window.confirm(
            "Are you sure you want to log out?"
        );

        if (!confirmed) return;

        /*
         * Demo dashboard:
         * Redirect to your login page.
         *
         * Connect your authentication logout process here
         * before using this on a live website.
         */

        window.location.href = "login.html";
    }

    sidebarLogout?.addEventListener("click", handleLogout);

    profileLogout?.addEventListener("click", handleLogout);

    /* Refresh Lucide icons */

    if (window.lucide) {
        window.lucide.createIcons();
    }

});