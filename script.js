// Highlights the navigation link for the section currently in view.
const navLinks = Array.from(document.querySelectorAll(".nav a"));
const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

function setActive(id) {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

if (sections.length > 0 && "IntersectionObserver" in window) {
    setActive(sections[0].id);

    // A section becomes active when it crosses a band 30–40% down the viewport.
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((section) => observer.observe(section));

    // The last section may never reach the band, so activate it at the bottom of the page.
    window.addEventListener(
        "scroll",
        () => {
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            if (atBottom) {
                setActive(sections[sections.length - 1].id);
            }
        },
        { passive: true }
    );
}
