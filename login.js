/* =========================================================
   TRADEMASTERS — LOGIN & SIGNUP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    const showSignupButton = document.getElementById("showSignupBtn");
    const showLoginButton = document.getElementById("showLoginBtn");

    const googleLoginButton = document.getElementById("googleLogin");
    const appleLoginButton = document.getElementById("appleLogin");

    const googleSignupButton = document.getElementById("googleSignup");
    const appleSignupButton = document.getElementById("appleSignup");

    const forgotPasswordLink = document.getElementById("forgotPasswordLink");

    const toast = document.getElementById("toast");

    const passwordToggles = document.querySelectorAll(".password-toggle");

    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    const signupName = document.getElementById("signupName");
    const signupEmail = document.getElementById("signupEmail");
    const signupPhone = document.getElementById("signupPhone");
    const signupExperience = document.getElementById("signupExperience");

    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");


    /* =====================================================
       ICON INITIALIZATION
    ===================================================== */

    function refreshIcons() {
        if (
            window.lucide &&
            typeof window.lucide.createIcons === "function"
        ) {
            window.lucide.createIcons();
        }
    }


    /* =====================================================
       TOAST NOTIFICATIONS
    ===================================================== */

    function showToast(message, type = "") {

        if (!toast) return;

        toast.textContent = message;
        toast.className = `toast show ${type}`;

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }


    /* =====================================================
       LOGIN / SIGNUP SWITCHING
    ===================================================== */

    function showSignup() {

        loginForm.classList.add("hide");
        signupForm.classList.remove("hide");

        refreshIcons();
    }


    function showLogin() {

        signupForm.classList.add("hide");
        loginForm.classList.remove("hide");

        refreshIcons();
    }


    showSignupButton.addEventListener("click", showSignup);

    showLoginButton.addEventListener("click", showLogin);


    /* =====================================================
       LOGIN FORM
    ===================================================== */

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value;

        if (!email || !password) {

            showToast(
                "Please enter your email and password.",
                "error"
            );

            return;
        }


        if (!isValidEmail(email)) {

            showToast(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }


        if (password.length < 6) {

            showToast(
                "Password must be at least 6 characters.",
                "error"
            );

            return;
        }


        /*
         * Demo behavior only.
         * Connect your actual authentication API here.
         */

        showToast(
            "Login successful. Redirecting to dashboard...",
            "success"
        );

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    });


    /* =====================================================
       SIGNUP FORM
    ===================================================== */

    signupForm.addEventListener("submit", event => {

        event.preventDefault();

        const fullName = signupName.value.trim();
        const email = signupEmail.value.trim();
        const phone = signupPhone.value.trim();

        const experience = signupExperience.value;

        const password = signupPassword.value;
        const confirm = confirmPassword.value;


        /* REQUIRED FIELD VALIDATION */

        if (
            !fullName ||
            !email ||
            !phone ||
            !experience ||
            !password ||
            !confirm
        ) {

            showToast(
                "Please fill in all registration fields.",
                "error"
            );

            return;
        }


        /* EMAIL VALIDATION */

        if (!isValidEmail(email)) {

            showToast(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }


        /* PASSWORD LENGTH VALIDATION */

        if (password.length < 6) {

            showToast(
                "Password must be at least 6 characters.",
                "error"
            );

            signupPassword.focus();

            return;
        }


        /* CONFIRM PASSWORD VALIDATION */

        if (password !== confirm) {

            showToast(
                "Passwords do not match. Please try again.",
                "error"
            );

            confirmPassword.focus();

            return;
        }


        /*
         * Demo behavior only.
         * Store registrations securely through your backend.
         * Never store plain-text passwords in localStorage.
         */

        showToast(
            "Registration successful. Please login.",
            "success"
        );

        loginEmail.value = email;

        signupForm.reset();

        showLogin();

    });


    /* =====================================================
       GOOGLE LOGIN
    ===================================================== */

    googleLoginButton.addEventListener("click", () => {

        showToast(
            "Google login will be added soon."
        );

    });


    /* =====================================================
       APPLE LOGIN
    ===================================================== */

    appleLoginButton.addEventListener("click", () => {

        showToast(
            "Apple login will be added soon."
        );

    });


    /* =====================================================
       GOOGLE SIGNUP
    ===================================================== */

    googleSignupButton.addEventListener("click", () => {

        showToast(
            "Google signup will be added soon."
        );

    });


    /* =====================================================
       APPLE SIGNUP
    ===================================================== */

    appleSignupButton.addEventListener("click", () => {

        showToast(
            "Apple signup will be added soon."
        );

    });


    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    forgotPasswordLink.addEventListener("click", event => {

        event.preventDefault();

        showToast(
            "Forgot password feature will be added soon."
        );

    });


    /* =====================================================
       SHOW / HIDE PASSWORD
    ===================================================== */

    passwordToggles.forEach(button => {

        const targetId = button.getAttribute("data-target");

        const input = document.getElementById(targetId);

        if (!input) return;


        button.addEventListener("click", () => {

            const isVisible = input.type === "text";

            input.type = isVisible ? "password" : "text";


            button.innerHTML = isVisible
                ? '<i class="fa-regular fa-eye"></i>'
                : '<i class="fa-regular fa-eye-slash"></i>';


            button.setAttribute(
                "aria-label",
                isVisible ? "Show password" : "Hide password"
            );

            button.setAttribute(
                "aria-pressed",
                String(!isVisible)
            );


            input.focus();

            const length = input.value.length;

            if (typeof input.setSelectionRange === "function") {
                input.setSelectionRange(length, length);
            }

        });

    });


    /* =====================================================
       INITIALIZE
    ===================================================== */

    refreshIcons();

});