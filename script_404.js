const redirectBtn = document.getElementById("redirect-btn");

// Object to store routes
const routes = {
  "": "home", // Default route for home
  "our-mission": "ourMission",
  "how-contribute": "howContribute",
  "why-contribute": "whyContribute",
  teamList: "team-rooster",
  team: "team",
  schedule: "schedule",
  stories: "stories",
};

// Load content based on the current hash
function loadContent() {
  const path = window.location.hash.substring(1);
  const page = routes[path];

  if (!page) {
    window.location.href = "404.html";
  }

  if (path) {
    //setTimeout - să aiba timp să se încarce conținutul generat dinamic de pe index.html
    setTimeout(() => {
      const targetElement = document.querySelector(`#${path}`);
      // Scroll to the target element
      targetElement.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }
}

// Load the initial content
window.addEventListener("load", loadContent);

// Update content when the hash changes
window.addEventListener("hashchange", loadContent);

function redirectToHome() {
  window.location.href = "https://oportunitatisicariere.ro/index.html";
}

redirectBtn?.addEventListener("click", redirectToHome);
