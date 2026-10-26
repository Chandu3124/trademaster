/* =====================================================
   TRADEMASTERS — CONTACT HERO JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide Icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Smooth Scroll */
    document.querySelectorAll(
        '.tm-contact-hero a[href^="#"]'
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
   TRADEMASTERS — SECTION 3: ENQUIRY FORM
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("tmEnquiryForm");

    if (!form) return;

    const fullName = document.getElementById("tmFullName");
    const email = document.getElementById("tmEmail");
    const phone = document.getElementById("tmPhone");
    const enquiryType = document.getElementById("tmEnquiryType");
    const course = document.getElementById("tmCourse");
    const subject = document.getElementById("tmSubject");
    const message = document.getElementById("tmMessage");

    const privacyConsent = document.getElementById("tmPrivacyConsent");
    const consentError = document.getElementById("tmConsentError");

    const successMessage = document.getElementById("tmFormSuccess");


    /* =================================================
       SHOW FIELD ERROR
    ================================================= */

    function showError(field, messageText) {

        const formGroup = field.closest(".tm-form-group");

        if (!formGroup) return;

        const errorElement = formGroup.querySelector(".tm-field-error");

        field.classList.add("tm-input-invalid");
        field.setAttribute("aria-invalid", "true");

        if (errorElement) {
            errorElement.textContent = messageText;
        }

    }


    /* =================================================
       CLEAR FIELD ERROR
    ================================================= */

    function clearError(field) {

        const formGroup = field.closest(".tm-form-group");

        if (formGroup) {

            const errorElement = formGroup.querySelector(".tm-field-error");

            if (errorElement) {
                errorElement.textContent = "";
            }

        }

        field.classList.remove("tm-input-invalid");
        field.removeAttribute("aria-invalid");

    }


    /* =================================================
       EMAIL VALIDATION
    ================================================= */

    function isValidEmail(value) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

    }


    /* =================================================
       VALIDATE FORM
    ================================================= */

    function validateForm() {

        let isValid = true;

        const requiredFields = [
            fullName,
            email,
            enquiryType,
            message
        ];

        requiredFields.forEach(clearError);

        consentError.textContent = "";


        /* FULL NAME */

        if (!fullName.value.trim()) {

            showError(
                fullName,
                "Please enter your full name."
            );

            isValid = false;

        }


        /* EMAIL */

        if (!email.value.trim() || !isValidEmail(email.value)) {

            showError(
                email,
                "Please provide a valid email address."
            );

            isValid = false;

        }


        /* ENQUIRY TYPE */

        if (!enquiryType.value) {

            showError(
                enquiryType,
                "Please select an enquiry type."
            );

            isValid = false;

        }


        /* MESSAGE */

        if (!message.value.trim()) {

            showError(
                message,
                "Please enter your message."
            );

            isValid = false;

        }


        /* PRIVACY POLICY */

        if (!privacyConsent.checked) {

            consentError.textContent =
                "Please accept the Privacy Policy to continue.";

            privacyConsent.setAttribute("aria-invalid", "true");

            isValid = false;

        } else {

            privacyConsent.removeAttribute("aria-invalid");

        }


        return isValid;

    }


    /* =================================================
       CLEAR ERRORS WHILE TYPING
    ================================================= */

    [fullName, email, enquiryType, message].forEach((field) => {

        field.addEventListener("input", () => {
            clearError(field);
        });

        field.addEventListener("change", () => {
            clearError(field);
        });

    });


    privacyConsent.addEventListener("change", () => {

        consentError.textContent = "";

        privacyConsent.removeAttribute("aria-invalid");

    });


    /* =================================================
       FORM SUBMISSION
    ================================================= */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        successMessage.hidden = true;

        if (!validateForm()) {

            const firstInvalidField = form.querySelector(
                ".tm-input-invalid"
            );

            if (firstInvalidField) {
                firstInvalidField.focus();
            } else if (!privacyConsent.checked) {
                privacyConsent.focus();
            }

            return;

        }


        /* COLLECT FORM DATA */

        const enquiryData = {
            fullName: fullName.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            enquiryType: enquiryType.value,
            course: course.value,
            subject: subject.value.trim(),
            message: message.value.trim(),
            privacyConsent: privacyConsent.checked
        };


        /*
         * FRONTEND DEMO ONLY
         *
         * Connect a backend or form service to send
         * this data to the TradeMasters team.
         */

        console.log("TradeMasters enquiry:", enquiryData);


        /* DISPLAY SUCCESS MESSAGE */

        successMessage.hidden = false;

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });


        /* RESET FORM */

        form.reset();

        [fullName, email, enquiryType, message].forEach(clearError);

        consentError.textContent = "";

        privacyConsent.removeAttribute("aria-invalid");

    });


    /* =================================================
       INITIALIZE LUCIDE ICONS
    ================================================= */

    if (window.lucide) {
        window.lucide.createIcons();
    }

});


/* =====================================================
   TRADEMASTERS — SECTION 4: VISIT OUR ACADEMY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* INITIALIZE LUCIDE ICONS */

    if (window.lucide) {
        window.lucide.createIcons();
    }


    /* =================================================
       GOOGLE MAP / DIRECTIONS CONFIGURATION
    ================================================= */

    /*
       IMPORTANT:
       The current map is a general India map, not a verified
       TradeMasters academy location.

       After confirming the actual academy address, replace
       the address below with the verified address.
    */

    const verifiedAcademyAddress = "";

    const directionsButton = document.querySelector(
        ".tm-visit-directions-btn"
    );

    const mapFrame = document.querySelector(
        ".tm-visit-map"
    );

    const mapCaption = document.querySelector(
        ".tm-map-caption > div > span"
    );


    /*
       Do not create a location-specific directions link until
       a verified address has been provided.
    */

    if (verifiedAcademyAddress.trim()) {

        const encodedAddress = encodeURIComponent(
            verifiedAcademyAddress.trim()
        );

        if (mapFrame) {
            mapFrame.src =
                "https://maps.google.com/maps?q=" +
                encodedAddress +
                "&output=embed";
        }

        if (directionsButton) {
            directionsButton.href =
                "https://www.google.com/maps/dir/?api=1&destination=" +
                encodedAddress;
        }

        if (mapCaption) {
            mapCaption.textContent = verifiedAcademyAddress;
        }

    } else {

        if (directionsButton) {
            directionsButton.href = "https://www.google.com/maps";
        }

        if (mapCaption) {
            mapCaption.textContent =
                "Academy location will be updated soon";
        }

    }

});

/* =====================================================
   TRADEMASTERS — SECTION 5: FAQ ACCORDION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const faqSection = document.querySelector(".tm-faq");

    if (!faqSection) return;

    const faqCards = faqSection.querySelectorAll(".tm-faq-card");

    /* Initialize Lucide Icons */
    function refreshFaqIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    /* FAQ Accordion */
    faqCards.forEach((card) => {

        const question = card.querySelector(".tm-faq-question");
        const answer = card.querySelector(".tm-faq-answer");
        const iconContainer = card.querySelector(".tm-faq-toggle");

        if (!question || !answer || !iconContainer) return;

        question.addEventListener("click", () => {

            const isOpen =
                question.getAttribute("aria-expanded") === "true";

            /* Close all FAQ cards */
            faqCards.forEach((otherCard) => {

                const otherQuestion =
                    otherCard.querySelector(".tm-faq-question");

                const otherAnswer =
                    otherCard.querySelector(".tm-faq-answer");

                const otherIcon =
                    otherCard.querySelector(".tm-faq-toggle");

                otherCard.classList.remove("tm-faq-open");

                otherQuestion.setAttribute("aria-expanded", "false");

                otherAnswer.hidden = true;

                otherIcon.innerHTML =
                    '<i data-lucide="plus"></i>';

            });

            /* Open selected card */
            if (!isOpen) {

                card.classList.add("tm-faq-open");

                question.setAttribute("aria-expanded", "true");

                answer.hidden = false;

                iconContainer.innerHTML =
                    '<i data-lucide="minus"></i>';

            }

            refreshFaqIcons();

        });

    });

    refreshFaqIcons();

});

/* =====================================================
   TRADEMASTERS — SECTION 6: FINAL CONTACT CTA
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide Icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Smooth Scroll for Internal Links */
    const ctaLinks = document.querySelectorAll(
        '.tm-contact-cta a[href^="#"]'
    );

    ctaLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

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