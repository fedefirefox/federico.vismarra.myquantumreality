const papersData = [
    {
        title: "Classical Dipole Emission",
        description: "A first-principles route through classical dipole radiation, connecting electrodynamics intuition with the language used in quantum optics.",
        link: "papers/theclassicaldipoleradiation.pdf",
        image: "assets/paper-art/classical-dipole.svg",
        tags: ["optics", "quantum"],
        type: "Course note",
        year: "Electrodynamics",
        date: "2019-2020"
    },
    {
        title: "Propagation of Pulses in Waveplates",
        description: "How optical pulses evolve through birefringent media, with emphasis on polarization, phase delay, and practical waveplate behavior.",
        link: "papers/pulsepropagationinwaveplates.pdf",
        image: "assets/paper-art/waveplates.svg",
        tags: ["optics"],
        type: "Course note",
        year: "Pulse propagation",
        date: "2020-2021"
    },
    {
        title: "BCS Theory: An ab initio Discussion",
        description: "A ground-up discussion of superconductivity through Cooper pairing and the Bardeen-Cooper-Schrieffer framework.",
        link: "papers/bcsfinale-1.pdf",
        image: "assets/paper-art/bcs-theory.svg",
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
        image: "assets/paper-art/high-intensity-laser.svg",
        tags: ["optics", "experimental"],
        type: "Course note",
        year: "Laser physics",
        date: "2023-2024"
    },
    {
        title: "Gas Jet Characterization with Fringe Analysis",
        description: "Experimental characterization of gas jets using interference fringes and optical diagnostics.",
        link: "papers/gasjetcharacterization.pdf",
        image: "assets/paper-art/gas-jet-fringes.svg",
        tags: ["experimental", "optics"],
        type: "Course note",
        year: "Diagnostics",
        date: "2019-2020"
    },
    {
        title: "On Semiclassical Light-Matter Interaction",
        description: "A bridge between classical fields and quantum systems, focused on the mechanics of light-matter interaction.",
        link: "papers/on-light-matter-quantum-interaction.pdf",
        image: "assets/paper-art/light-matter.svg",
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

document.addEventListener("DOMContentLoaded", () => {
    renderPapers("all");
    setupFilters();
    setupNavigationState();
});

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
