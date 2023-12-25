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
const extensionDemoScreenClass = ".extension-demo-screen";
const screenScale = 1.15;

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
        .to(extensionDemoScreenClass, {scale: screenScale})
    },
    "(min-width: 1440px) and (max-width: 1919px)": () => {
        const extensionDemoTimeLine = gsap.timeline(scrollTriggerTimeline);
        extensionDemoTimeLine
        .to(extensionDemoContentClass, {y: -352})
        .to(extensionDemoScreenClass, {scale: screenScale})
    },
    "(min-width: 1024px) and (max-width: 1439px)": () => {
        const extensionDemoTimeLine = gsap.timeline(scrollTriggerTimeline);
        extensionDemoTimeLine
        .to(extensionDemoContentClass, {y: -352})
        .to(extensionDemoScreenClass, {scale: screenScale})
    },
    "(min-width: 1px) and (max-width: 1023px)": () => {
        const extensionDemoTimeLine = gsap.timeline(scrollTriggerTimeline);
        extensionDemoTimeLine
        .to(extensionDemoContentClass, {y: -336})
        .to(extensionDemoScreenClass, {scale: screenScale})
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

// ============================================
// === FEEDBACKS HEADER DECORATOR ANIMATION ===
// ============================================
const feedbacksHeaderDecoratorAnimation = new Vivus('feedbacks-header-decorator', {start: "manual", duration: 150});
ScrollTrigger.create({
    trigger: ".feedbacks",
    start: 'center 60%',
    end: 'center center',
    onEnter: () => {
        console.log("ON ENTER")
        feedbacksHeaderDecoratorAnimation.stop().reset().play()
    },
    once: true,
    markers: false,
});

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
    preventScrollOnTouch: "force"
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
