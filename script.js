document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       Footer Year
    ========================= */
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================
       Mobile Navigation
    ========================= */
    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
            menuButton.classList.toggle("active");

            const isOpen = navigation.classList.contains("open");
            menuButton.setAttribute("aria-expanded", isOpen);
        });

        // Close menu after clicking a navigation link
        const navLinks = navigation.querySelectorAll("a");

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("open");
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =========================
       Header Scroll Effect
    ========================= */
    const header = document.querySelector(".header");

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();


    /* =========================
       Scroll Reveal Animation
    ========================= */
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       Active Navigation Link
    ========================= */
    const sections = document.querySelectorAll("section[id]");
    const sectionLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveNavigation() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        sectionLinks.forEach(link => {
            link.classList.remove("active");

            const target = link.getAttribute("href");

            if (target === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);
    updateActiveNavigation();


    /* =========================
       Smooth Scroll
    ========================= */
    sectionLinks.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                const headerHeight = header
                    ? header.offsetHeight
                    : 80;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    /* =========================
       Hero Mouse Parallax
    ========================= */
    const hero = document.querySelector(".hero");
    const heroVisual = document.querySelector(".hero-visual");
    const circleOne = document.querySelector(".circle-one");
    const circleTwo = document.querySelector(".circle-two");

    if (
        hero &&
        heroVisual &&
        circleOne &&
        circleTwo &&
        window.matchMedia("(min-width: 769px)").matches
    ) {
        hero.addEventListener("mousemove", event => {
            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            heroVisual.style.transform = `
                translate(${x * 10}px, ${y * 10}px)
            `;

            circleOne.style.transform = `
                translate(${x * 20}px, ${y * 20}px)
            `;

            circleTwo.style.transform = `
                translate(${x * -15}px, ${y * -15}px)
            `;
        });

        hero.addEventListener("mouseleave", () => {
            heroVisual.style.transform = "";
            circleOne.style.transform = "";
            circleTwo.style.transform = "";
        });
    }


    /* =========================
       Button Arrow Animation
    ========================= */
    const buttons = document.querySelectorAll(".button");

    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.classList.add("button-hover");
        });

        button.addEventListener("mouseleave", () => {
            button.classList.remove("button-hover");
        });
    });


    /* =========================
       Skill Bar Animation
    ========================= */
    const skillBars = document.querySelectorAll(".skill-progress");

    const skillObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;

                    // Keep the percentage already defined in CSS
                    bar.classList.add("animate");

                    skillObserver.unobserve(bar);
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });


    /* =========================
       Back To Top
    ========================= */
    const backTop = document.querySelector(".back-top");

    if (backTop) {
        backTop.addEventListener("click", event => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =========================
       Escape Key
       Close Mobile Menu
    ========================= */
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            if (navigation) {
                navigation.classList.remove("open");
            }

            if (menuButton) {
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            }
        }
    });


    /* =========================
       Page Loaded
    ========================= */
    document.body.classList.add("loaded");

    console.log("Website loaded successfully.");
});
const photoInput = document.getElementById("photo");
const preview = document.getElementById("preview");

photoInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        preview.src = URL.createObjectURL(file);
    }
});
const sidebarToggle = document.getElementById("sidebarToggle");
const dashboard = document.querySelector(".dashboard");

if (sidebarToggle && dashboard) {
    sidebarToggle.addEventListener("click", function () {

        if (window.innerWidth <= 768) {
            dashboard.classList.toggle("sidebar-mobile-open");
        } else {
            dashboard.classList.toggle("sidebar-hidden");
        }

    });
}
/* =========================================================
   MENU TOGGLE
========================================================= */

const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const main = document.querySelector(".main");

function toggleMenu() {

    const isDesktop = window.innerWidth > 850;

    if (isDesktop) {

        /* Desktop */

        menuButton.classList.toggle("open");

        sidebar.classList.toggle("collapsed");

        main.classList.toggle("expanded");

    } else {

        /* Mobile */

        menuButton.classList.toggle("open");

        sidebar.classList.toggle("open");

        overlay.classList.toggle("show");

    }

}


/* Hamburger */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        toggleMenu
    );

}


/* Overlay */

if (overlay) {

    overlay.addEventListener(
        "click",
        toggleMenu
    );

}
