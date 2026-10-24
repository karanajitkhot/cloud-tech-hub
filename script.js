
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

const serverCountDisplay = document.getElementById("serverCount");
const statusText = document.getElementById("statusText");
const serverVisualization = document.getElementById("serverVisualization");
const statusDot = document.querySelector(".status-dot");

const provisionBtn = document.getElementById("provisionBtn");
const scaleBtn = document.getElementById("scaleBtn");
const resetBtn = document.getElementById("resetBtn");

const yearDisplay = document.getElementById("year");

let serverCount = 0;

// Set the current year in the footer.
yearDisplay.textContent = new Date().getFullYear();

// Mobile navigation menu.
menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after choosing a section.
navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Update the simulated server display.
function updateServerDisplay() {
    serverCountDisplay.textContent = serverCount;

    if (serverCount === 0) {
        statusText.textContent = "No servers provisioned";
        statusDot.classList.remove("online");

        serverVisualization.innerHTML =
            '<div class="empty-server" aria-label="No servers">☁</div>';

        return;
    }

    statusText.textContent =
        serverCount === 1
            ? "Website provisioned successfully"
            : "Website scaled to " + serverCount + " servers";

    statusDot.classList.add("online");

    serverVisualization.innerHTML = "";

    for (let i = 1; i <= serverCount; i++) {
        const server = document.createElement("div");
        server.className = "server-unit";

        const symbol = document.createElement("div");
        symbol.className = "server-symbol";
        symbol.textContent = "▤";

        const label = document.createElement("div");
        label.className = "server-label";
        label.textContent = "Server " + i;

        const light = document.createElement("span");
        light.className = "server-light";

        const state = document.createElement("span");
        state.className = "server-label";
        state.textContent = "Online";

        server.appendChild(symbol);
        server.appendChild(label);
        server.appendChild(light);
        server.appendChild(state);

        serverVisualization.appendChild(server);
    }
}

// Simulate provisioning one server.
provisionBtn.addEventListener("click", () => {
    serverCount = 1;
    updateServerDisplay();
});

// Simulate scaling to three servers.
scaleBtn.addEventListener("click", () => {
    serverCount = 3;
    updateServerDisplay();
});

// Reset the simulation.
resetBtn.addEventListener("click", () => {
    serverCount = 0;
    updateServerDisplay();
});

// Highlight the navigation link for the current section.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                }
            });
        },
        { rootMargin: "-25% 0px -60% 0px" }
    );

    sections.forEach((section) => sectionObserver.observe(section));
}

// Display the initial state.
updateServerDisplay();
