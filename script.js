document.addEventListener("DOMContentLoaded", () => {

    /* ── Active nav link ── */
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu a').forEach(a => {
        if (a.getAttribute('href') === currentFile) {
            a.classList.add('is-active');
            a.setAttribute('aria-current', 'page');
        }
    });

    /* ── Header scroll shadow ── */
    const header = document.querySelector(".site-header");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ── Mobile nav toggle ── */
    const navToggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("primary-nav");

    if (navToggle && menu) {
        navToggle.addEventListener("click", () => {
            const open = menu.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", String(open));
            navToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
        });
        menu.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", () => {
                menu.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.setAttribute("aria-label", "Menü öffnen");
            });
        });
    }

    /* ── Scroll reveal (.reveal elements) ── */
    const reveals = document.querySelectorAll(".reveal");
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); revealObs.unobserve(e.target); }});
    }, { threshold: 0.12 });
    reveals.forEach(el => revealObs.observe(el));

    /* ── Explosion: component fade on scroll (desktop only) ── */
    const steps = document.querySelectorAll(".explosion-steps .step");
    const componentImgs = document.querySelectorAll(".component-img");

    if (steps.length && componentImgs.length && window.matchMedia("(min-width: 1024px)").matches) {

        const setActive = (idx) => {
            componentImgs.forEach(img => img.classList.remove("is-active"));
            const target = document.querySelector(`.component-img[data-component="${idx}"]`);
            if (target) target.classList.add("is-active");
        };

        const stepObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    steps.forEach(s => s.classList.remove("is-active"));
                    e.target.classList.add("is-active");
                    setActive(e.target.dataset.component);
                }
            });
        }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });

        steps.forEach(step => stepObs.observe(step));
    }

});
