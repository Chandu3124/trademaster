document.addEventListener("DOMContentLoaded", () => {
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

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function showToast(message, type = "") {
        if (!toast) return;

        toast.textContent = message;
        toast.className = `toast show ${type}`;

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    /* Login / Signup switching */
    function showSignup() {
        loginForm.classList.add("hide");
        signupForm.classList.remove("hide");
    }

    function showLogin() {
        signupForm.classList.add("hide");
        loginForm.classList.remove("hide");
    }

    showSignupButton.addEventListener("click", showSignup);
    showLoginButton.addEventListener("click", showLogin);

    /* Login */
    loginForm.addEventListener("submit", event => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) {
            showToast("Please enter your email and password.", "error");
            return;
        }

        if (!emailPattern.test(email)) {
            showToast("Please enter a valid email address.", "error");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters.", "error");
            return;
        }

        showToast("Login successful. Redirecting to dashboard...", "success");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    });

    /* Signup */
    signupForm.addEventListener("submit", event => {
        event.preventDefault();

        const fullName = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const phone = document.getElementById("signupPhone").value.trim();
        const experience = document.getElementById("signupExperience").value;
        const password = document.getElementById("signupPassword").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fullName || !email || !phone || !experience || !password) {
            showToast("Please fill in all registration fields.", "error");
            return;
        }

        if (!emailPattern.test(email)) {
            showToast("Please enter a valid email address.", "error");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters.", "error");
            return;
        }

        showToast("Registration successful. Please login.", "success");

        showLogin();
        document.getElementById("loginEmail").value = email;
    });

    /* Social login demos */
    googleLoginButton.addEventListener("click", () => {
        showToast("Google login will be added soon.");
    });

    appleLoginButton.addEventListener("click", () => {
        showToast("Apple login will be added soon.");
    });

    googleSignupButton.addEventListener("click", () => {
        showToast("Google signup will be added soon.");
    });

    appleSignupButton.addEventListener("click", () => {
        showToast("Apple signup will be added soon.");
    });

    /* Forgot password */
    forgotPasswordLink.addEventListener("click", event => {
        event.preventDefault();
        showToast("Forgot password feature will be added soon.");
    });

    /* Password show / hide */
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

            button.setAttribute("aria-pressed", String(!isVisible));

            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        });
    });

    refreshIcons();
});