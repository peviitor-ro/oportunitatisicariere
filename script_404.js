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
  
  console.info("Current path:", path);
  console.info("Resolved page:", page);

  if (!page) {
    window.location.href = "404.html";
  }
}

// Load the initial content
window.addEventListener("load", loadContent);

// Update content when the hash changes
window.addEventListener("hashchange", loadContent);
