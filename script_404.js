// Object to store routes
const routes = {
  "": "home", // Default route for home
  "our-mission": "ourMission",
  "how-contribute": "howContribute",
  "why-contribute": "whyContribute",
  team: "team",
};

// Load content based on the current hash
function loadContent() {
  const path = window.location.hash.substring(1);
  const page = routes[path];

  if (!page) {
    window.location.href = "pageNotFound.html";
  }
}

// Load the initial content
window.addEventListener("load", loadContent);

// Update content when the hash changes
window.addEventListener("hashchange", loadContent);
