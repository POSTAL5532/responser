window.addEventListener('load', (event) => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const initParallax = (parallaxItem, parallaxStartTrigger, start) => {
        gsap.to(parallaxItem, {
            scrollTrigger: {
                trigger: parallaxStartTrigger,
                start: start,
                scrub: true,
            },
            y: (i, target) => ScrollTrigger.maxScroll(window) * target.dataset.speed * 0.1,
            ease: "none"
        });
    }

    // ====================================
    // === HOW IT WORKS CARDS SCROLLING ===
    // ====================================
    const howItWorksTimeLine = gsap.timeline();
    howItWorksTimeLine
    .to(".card-2", {top: 0}, "card-2")
    .to(".card-3", {top: 0}, "card-3")
    .to(".card-4", {top: 0}, "card-4")
    .to(".card-5", {top: 0}, "card-5");

    const howItWorksCardsST = ScrollTrigger.create({
        animation: howItWorksTimeLine,
        id: "st",
        trigger: ".how-it-works",
        start: "center center",
        pin: true,
        scrub: 1.5
    });

    // click scroll - doesn't work
    /*gsap.utils.toArray(".how-it-works .card .card-header").forEach(function(a) {
        a.addEventListener("click", function(e) {
            const percent = howItWorksTimeLine.labels[e.target.getAttribute("data-jump")] / howItWorksTimeLine.totalDuration();
            const scrollPos = howItWorksCardsST.start + (howItWorksCardsST.end) * percent;
            gsap.to(window, {scrollTo: scrollPos});
        });
    });*/

    // =================================
    // === EXTENSION DEMO SCROLL PIN ===
    // =================================
    const extensionDemoContentClass = ".extension-demo-content";

    const scrollTriggerTimeline = {
        scrollTrigger: {
            trigger: ".extension-demo",
            start: "center center",
            pin: true,
            scrub: 1,
            markers: false
        }
    };

    ScrollTrigger.matchMedia({
        "(min-width: 1920px)": () => {
            const extensionDemoTimeLine = gsap.timeline(scrollTriggerTimeline);
            extensionDemoTimeLine
            .to(extensionDemoContentClass, {y: -374})
        },
        "(min-width: 1440px) and (max-width: 1919px)": () => {
            const extensionDemoTimeLine = gsap.timeline(scrollTriggerTimeline);
            extensionDemoTimeLine
            .to(extensionDemoContentClass, {y: -352})
        },
        "(min-width: 1024px) and (max-width: 1439px)": () => {
            const extensionDemoTimeLine = gsap.timeline(scrollTriggerTimeline);
            extensionDemoTimeLine
            .to(extensionDemoContentClass, {y: -344})
        },
        "(min-width: 1px) and (max-width: 1023px)": () => {
            const extensionDemoTimeLine = gsap.timeline(scrollTriggerTimeline);
            extensionDemoTimeLine
            .to(extensionDemoContentClass, {y: -336})
        }
    });

    // =================================================
    // === EXTENSION HEADER DEMO DECORATOR ANIMATION ===
    // =================================================
    const extensionDemoDecoratorAnimation = new Vivus('extension-demo-header-decorator', {start: "manual", duration: 150});
    ScrollTrigger.create({
        trigger: ".extension-demo",
        start: 'center center',
        end: 'center center',
        onEnter: () => {
            extensionDemoDecoratorAnimation.stop().reset().play()
        },
        once: true,
        markers: false,
    });

    // ======================================
    // === HONEST REVIEWS IMAGES PARALLAX ===
    // ======================================
    initParallax(".jacob-container", ".honest-reviews", "center center");
    initParallax(".noah-container", ".honest-reviews", "center center");
    initParallax(".backy-container", ".honest-reviews", "center center");

    // ====================================
    // === QUICK ACCESS IMAGES PARALLAX ===
    // ====================================
    initParallax(".extension-bg", ".quick-access", "center center");
    initParallax(".google-rating-container", ".quick-access", "center center");
    initParallax(".amazon-rating-container", ".quick-access", "center center");

    // ====================================
    // === QUICK ACCESS IMAGES PARALLAX ===
    // ====================================
    initParallax(".product-container", ".ease-of-use", "center center");
    initParallax(".piers-card", ".ease-of-use", "center center");
    initParallax(".ellis-card", ".ease-of-use", "center center");

    // =============================================
    // === ADVENTURES BACKGROUND COLOR ANIMATION ===
    // =============================================
    ScrollTrigger.create({
        trigger: ".honest-reviews",
        start: '-=400 top',
        end: () => {
            return `+=${document.querySelector(".ease-of-use").offsetHeight * 3 + 100}`;
        },
        toggleActions: 'play reverse none reverse',
        toggleClass: {targets: ".page", className: "dark"},
        markers: false
    });

    // ======================================
    // === HONEST REVIEWS ICONS ANIMATION ===
    // ======================================
    const honestReviewsTimeLine = gsap.timeline({
        scrollTrigger: {
            trigger: ".honest-reviews",
            start: "top 30%",
            once: true
        }
    });

    honestReviewsTimeLine
    .to(".user-jacob", 0.2, {scale: 1})
    .to(".user-noah", 0.2, {scale: 1})
    .to(".user-backy", 0.2, {scale: 1})
    .to(".send-icon", 0.2, {scale: 1})
    .to(".rating-icon", 0.2, {scale: 1});

    // ======================================
    // ==== QUICK ACCESS ICONS ANIMATION ====
    // ======================================
    const quickAccessTimeLine = gsap.timeline({
        scrollTrigger: {
            trigger: ".quick-access",
            start: "top 30%",
            once: true
        }
    });

    quickAccessTimeLine
    .to(".google-rating", 0.5, {scale: 1, opacity: 1, ease: "back.out(4)"})
    .to(".amazon-rating", 0.5, {scale: 1, opacity: 1, ease: "back.out(4)"});

    // =====================================
    // ==== EASE OF USE ICONS ANIMATION ====
    // =====================================
    const easeOfUseTimeLine = gsap.timeline({
        scrollTrigger: {
            trigger: ".ease-of-use",
            start: "top 30%",
            once: true
        }
    });

    easeOfUseTimeLine
    .to(".piers-card", 0.5, {scale: 1})
    .to(".ellis-card", 0.5, {scale: 1});

    // ===============================
    // ====== FEEDBACKS GALLERY ======
    // ===============================
    let slider = tns({
        loop: true,
        container: '.feedbacks-gallery',
        startIndex: 1,
        items: 6,
        responsive: {
            1920: {items: 6},
            1440: {items: 4},
            1024: {items: 3},
            1: {items: 2},
        },
        autoplay: false,
        nav: false,
        controlsContainer: ".feedbacks-gallery-controls",
        swipeAngle: false,
        center: true,
        mouseDrag: true,
        preventScrollOnTouch: "force",
        onInit: () => {
            ScrollTrigger.refresh();
        }
    });

    // ============================================
    // === FEEDBACKS HEADER DECORATOR ANIMATION ===
    // ============================================
    const feedbacksHeaderDecoratorAnimation = new Vivus('feedbacks-header-decorator', {start: "manual", duration: 150});
    ScrollTrigger.create({
        trigger: ".feedbacks",
        start: 'center 60%',
        end: 'center center',
        onEnter: () => {
            feedbacksHeaderDecoratorAnimation.stop().reset().play()
        },
        once: true,
        markers: false
    });

    function toggleQuestionItem() {
        const activeClassName = "active";

        $(".question-card").removeClass(activeClassName);

        const parent = $(this).closest(".question-card");
        parent.toggleClass(activeClassName);
    }

    /**
     * FAQ items click logic.
     */
    $(function () {
        $(".question").click(toggleQuestionItem);
    });

    // ===============================
    // ======= CONTACT US FORM =======
    // ===============================
    $(function () {
        const disabledClass = "disabled";
        const fieldMessageClass = ".field-message";
        const errorClass = "error";

        const submitContactFormBtn = $("#submit-contact-form");

        const nameField = $("#contact-form-name");
        const nameFieldParent = nameField.closest(".field-container");
        nameField.change(function () {
            nameFieldParent.removeClass(errorClass);
            nameFieldParent.children(fieldMessageClass).text("");
        });

        const emailField = $("#contact-form-email");
        const emailFieldParent = emailField.closest(".field-container");
        emailField.change(function () {
            emailFieldParent.removeClass(errorClass);
            emailFieldParent.children(fieldMessageClass).text("");
        });

        const textField = $("#contact-form-text");
        const textFieldParent = textField.closest(".text-area-container");
        textField.change(function () {
            textFieldParent.removeClass(errorClass);
            textFieldParent.children(fieldMessageClass).text("");
        });

        const validate = (values) => {
            let result = true;

            if (!values.username || values.username.length < 2 || values.username.length > 225) {
                nameFieldParent.addClass(errorClass);
                nameFieldParent.children(fieldMessageClass).text("Name can't be empty and must be between 2 and 255 characters.");
                result = false;
            }

            const emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!values.email) {
                emailFieldParent.addClass(errorClass);
                emailFieldParent.children(fieldMessageClass).text("Email can't be empty.");
                result = false;
            } else if (!values.email.match(emailRegexp)) {
                emailFieldParent.addClass(errorClass);
                emailFieldParent.children(fieldMessageClass).text("Email must be an email string (example youremail@domain.com).");
                result = false;
            }

            if (!values.text || values.text.length < 2 || values.text.length > 1000) {
                textFieldParent.addClass(errorClass);
                textFieldParent.children(fieldMessageClass).text("Text can't be empty and must be between 2 and 1000 characters.");
                result = false;
            }

            return result;
        }

        const toggleFieldsEnabled = (enabled = true) => {
            if (!enabled) {
                submitContactFormBtn.addClass(disabledClass);
                submitContactFormBtn.text("Wait...");

                nameFieldParent.addClass(disabledClass);
                emailFieldParent.addClass(disabledClass);
                textFieldParent.addClass(disabledClass);
            } else {
                nameFieldParent.removeClass(disabledClass);
                emailFieldParent.removeClass(disabledClass);
                textFieldParent.removeClass(disabledClass);

                submitContactFormBtn.removeClass(disabledClass);
                submitContactFormBtn.text("Submit");
            }
        }

        const submitContactFormResultModal = $("#submit-contact-form-result-modal");

        submitContactFormBtn.click(async function () {
            const values = {
                username: nameField.val(),
                email: emailField.val(),
                text: textField.val()
            }

            const validationResult = validate(values);

            if (!validationResult) {
                return;
            }

            toggleFieldsEnabled(false);

            const requestPath = `${window.location.origin}/api/contact-form`;
            const headers = prepareRequestHeaders(requestPath);

            $.ajax({
                method: "POST",
                url: requestPath,
                headers: headers,
                data: JSON.stringify(values),
                contentType: "application/json",
                success: () => {
                    submitContactFormResultModal.removeClass("error");
                    submitContactFormResultModal.css("display", "flex");

                    nameField.val("");
                    emailField.val("");
                    textField.val("");

                    toggleFieldsEnabled(true);
                },
                error: () => {
                    submitContactFormResultModal.addClass("error");
                    submitContactFormResultModal.css("display", "flex");
                    toggleFieldsEnabled(true);
                }
            });
        });

        $("#close-submit-contact-form-result-modal").click(function () {
            submitContactFormResultModal.css("display", "none");
        });
    });
});
