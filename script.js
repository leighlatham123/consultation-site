// Mobile Navigation

document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");
    const body = document.body;

    if (!navToggle || !navMenu) return;

    function openMenu() {
        navMenu.classList.add("is-open");
        navToggle.classList.add("is-open");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close menu");
        body.classList.add("menu-open");
    }

    function closeMenu() {
        navMenu.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        body.classList.remove("menu-open");
    }

    navToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.contains("is-open");
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 720) {
                closeMenu();
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 720) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
});

// Rotating quotes

const quoteTextEl = document.getElementById("rotating-quote-text");
const quoteSourceEl = document.getElementById("rotating-quote-source");
const quoteCardEl = document.querySelector(".quote-rotator-card");

const rotatingQuotes = [
    {
        text: "84% of organizations struggle to manage cloud spend.",
        source: "- Flexera, 2025 State of the Cloud",
    },
    {
        text: "Public cloud end-user spending is forecast to reach $723.4 billion in 2025.",
        source: "- Gartner, 2025 public cloud forecast",
    },
    {
        text: "69% of finance leaders believe that between 10% and 30% of their total cloud spend is currently wasted or underutilized.",
        source: "- Maneesha Tiwari, erp.today",
    },
    {
        text: "59% of organizations now have a dedicated FinOps team.",
        source: "Flexera, 2025 State of the Cloud",
    },
];

let quoteIndex = 0;
let quoteTimer = null;
const quoteIntervalMs = 7000;
const quoteAnimationMs = 260;

function applyQuote(index) {
    quoteTextEl.textContent = rotatingQuotes[index].text;
    quoteSourceEl.textContent = rotatingQuotes[index].source;
}

function renderQuote(index) {
    if (!quoteTextEl || !quoteSourceEl || !quoteCardEl) return;

    quoteTextEl.classList.add("is-fading");

    window.setTimeout(() => {
        applyQuote(index);

        quoteTextEl.classList.remove("is-fading");
        quoteTextEl.classList.add("is-entering");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                quoteTextEl.classList.remove("is-entering");
            });
        });
    }, quoteAnimationMs);
}

function nextQuote() {
    quoteIndex = (quoteIndex + 1) % rotatingQuotes.length;
    renderQuote(quoteIndex);
}

function startQuoteRotation() {
    if (!quoteTextEl || !quoteSourceEl || !quoteCardEl || rotatingQuotes.length < 2) return;
    if (quoteTimer) return;

    quoteTimer = window.setInterval(() => {
        nextQuote();
    }, quoteIntervalMs);
}

function stopQuoteRotation() {
    if (quoteTimer) {
        window.clearInterval(quoteTimer);
        quoteTimer = null;
    }
}

function restartQuoteRotation() {
    stopQuoteRotation();
    startQuoteRotation();
}

document.addEventListener("DOMContentLoaded", () => {
    if (!quoteTextEl || !quoteSourceEl || !quoteCardEl) return;

    applyQuote(quoteIndex);
    startQuoteRotation();

    quoteCardEl.addEventListener("mouseenter", stopQuoteRotation);
    quoteCardEl.addEventListener("mouseleave", startQuoteRotation);
    quoteCardEl.addEventListener("focusin", stopQuoteRotation);
    quoteCardEl.addEventListener("focusout", startQuoteRotation);

    quoteCardEl.addEventListener("click", () => {
        nextQuote();
        restartQuoteRotation();
    });

    quoteCardEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            nextQuote();
            restartQuoteRotation();
        }
    });
});

// Scroll reveal

document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll(".reveal-on-scroll");

    if (!revealItems.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px",
        }
    );

    revealItems.forEach((item) => observer.observe(item));
});

// Year

document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("footer-year");

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});