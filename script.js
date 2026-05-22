const papersData = [
    {
        title: "Classical Dipole Emission",
        description: "A first-principles route through classical dipole radiation, connecting electrodynamics intuition with the language used in quantum optics.",
        link: "papers/theclassicaldipoleradiation.pdf",
        image: "assets/paper-art/classical-dipole-enhanced.png",
        tags: ["optics", "quantum"],
        type: "Course note",
        year: "Electrodynamics",
        date: "2019-2020"
    },
    {
        title: "Propagation of Pulses in Waveplates",
        description: "How optical pulses evolve through birefringent media, with emphasis on polarization, phase delay, and practical waveplate behavior.",
        link: "papers/pulsepropagationinwaveplates.pdf",
        image: "assets/paper-art/waveplates-enhanced.png",
        tags: ["optics"],
        type: "Course note",
        year: "Pulse propagation",
        date: "2020-2021"
    },
    {
        title: "BCS Theory: An ab initio Discussion",
        description: "A ground-up discussion of superconductivity through Cooper pairing and the Bardeen-Cooper-Schrieffer framework.",
        link: "papers/bcsfinale-1.pdf",
        image: "assets/paper-art/bcs-superconducting-magnet.png",
        tags: ["quantum"],
        type: "Course note",
        year: "Superconductivity",
        date: "2021-2022"
    },
    {
        title: "Y-Gate and Spintronics",
        description: "A look at spin-based quantum logic and the physical ideas behind quantum gates in spintronic systems.",
        link: "papers/ygate.pdf",
        image: "assets/paper-art/y-gate-spintronics.svg",
        tags: ["quantum"],
        type: "Course note",
        year: "Spintronics",
        date: "2022-2023"
    },
    {
        title: "Preview: High-Intensity Laser Book",
        description: "An introductory preview of high-intensity laser physics, nonlinear response, and the regimes where light drives matter strongly.",
        link: "papers/hil.pdf",
        image: "assets/paper-art/high-intensity-lasers-book-cover.jpg",
        tags: ["optics", "experimental"],
        type: "Course note",
        year: "Laser physics",
        date: "2023-2024"
    },
    {
        title: "Gas Jet Characterization with Fringe Analysis",
        description: "Experimental characterization of gas jets using interference fringes and optical diagnostics.",
        link: "papers/gasjetcharacterization.pdf",
        image: "assets/paper-art/gas-jet-fringes-enhanced.png",
        tags: ["experimental", "optics"],
        type: "Course note",
        year: "Diagnostics",
        date: "2019-2020"
    },
    {
        title: "On Semiclassical Light-Matter Interaction",
        description: "A bridge between classical fields and quantum systems, focused on the mechanics of light-matter interaction.",
        link: "papers/on-light-matter-quantum-interaction.pdf",
        image: "assets/paper-art/light-matter-quantum-enhanced.png",
        tags: ["quantum", "optics"],
        type: "Course note",
        year: "Interaction",
        date: "2021-2022"
    },
    {
        title: "The Conundrum of sqrt(-1) = i",
        description: "A careful note on imaginary units, square roots, and how complex numbers should be handled without hidden ambiguity.",
        link: "papers/i__imaginary_units.pdf",
        image: "assets/paper-art/imaginary-unit.svg",
        tags: ["math"],
        type: "Course note",
        year: "Complex numbers",
        date: "2020-2021"
    }
];

const fallbackLatestPaper = {
    label: "Latest Publication",
    title: "Self-compressed waveform-stable light transients enabling water-window attosecond spectroscopy",
    journal: "Nature Photonics",
    year: "2026",
    date: "Published online November 13, 2025",
    url: "https://www.nature.com/articles/s41566-025-01802-1",
    summary: "Water-window attosecond spectroscopy driven by self-compressed, waveform-stable light transients.",
    source: "Google Scholar profile, verified against publisher metadata"
};

document.addEventListener("DOMContentLoaded", () => {
    renderLatestPaper(fallbackLatestPaper);
    loadLatestPaper();
    renderPapers("all");
    setupFilters();
    setupNavigationState();
});

async function loadLatestPaper() {
    try {
        const response = await fetch("latest-paper.json", { cache: "no-store" });
        if (!response.ok) {
            return;
        }
        renderLatestPaper(await response.json());
    } catch (error) {
        // Static file previews can block fetch; the fallback keeps the page complete.
    }
}

function renderLatestPaper(paper) {
    const latestPaper = document.getElementById("latestPaper");
    if (!latestPaper || !paper) {
        return;
    }

    latestPaper.innerHTML = `
        <p class="eyebrow">${escapeHtml(paper.label || "Latest Publication")}</p>
        <h3>${escapeHtml(paper.title)}</h3>
        <div class="latest-paper-meta">
            <span>${escapeHtml(paper.journal)}</span>
            <span>${escapeHtml(paper.year)}</span>
        </div>
        <p>${escapeHtml(paper.summary)}</p>
        <a class="latest-paper-link" href="${escapeAttribute(paper.url)}" target="_blank" rel="noopener">Read latest paper</a>
    `;
}

function renderPapers(filter) {
    const papersGrid = document.getElementById("papersGrid");
    const visiblePapers = filter === "all"
        ? papersData
        : papersData.filter((paper) => paper.tags.includes(filter));

    papersGrid.innerHTML = visiblePapers.map((paper) => `
        <article class="paper-card">
            <a class="paper-art-link" href="${paper.link}" target="_blank" rel="noopener" aria-label="Open ${paper.title}">
                <img class="paper-art" src="${paper.image}" alt="">
            </a>
            <div class="paper-body">
                <div class="paper-meta">
                    <span>${paper.type}</span>
                    <span>${paper.date}</span>
                </div>
                <h3>${paper.title}</h3>
                <p>${paper.description}</p>
                <div class="paper-tags" aria-label="Topics">
                    ${paper.tags.map((tag) => `<span>${tag}</span>`).join("")}
                </div>
                <a class="paper-link" href="${paper.link}" target="_blank" rel="noopener">Read PDF</a>
            </div>
        </article>
    `).join("");
}

function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#039;"
    }[character]));
}

function escapeAttribute(value = "") {
    return escapeHtml(value).replace(/`/g, "&#096;");
}

function setupFilters() {
    const buttons = document.querySelectorAll(".filter-button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");
            renderPapers(button.dataset.filter);
        });
    });
}

function setupNavigationState() {
    const links = document.querySelectorAll(".site-nav a");
    const sections = [...document.querySelectorAll("main section[id]")];

    const updateActiveLink = () => {
        const activeSection = sections
            .filter((section) => section.getBoundingClientRect().top <= 140)
            .pop();

        links.forEach((link) => {
            const isActive = activeSection && link.getAttribute("href") === `#${activeSection.id}`;
            link.toggleAttribute("aria-current", Boolean(isActive));
        });
    };

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
}
