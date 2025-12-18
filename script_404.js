const redirectBtn = document.getElementById("redirect-btn");

const routes = {
  "": "home",
  "our-mission": "ourMission",
  "how-contribute": "howContribute",
  "why-contribute": "whyContribute",
  teamList: "team-rooster",
  team: "team",
  schedule: "schedule",
  stories: "stories",
};

function loadContent() {
  const path = window.location.hash.substring(1);

  if (
    path &&
    !routes[path] &&
    !window.location.pathname.includes("index.html")
  ) {
    window.location.href = "404.html";
    return;
  }

  if (path) {
    setTimeout(() => {
      const targetElement = document.querySelector(`#${path}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }
}

window.addEventListener("load", () => {
  loadContent();
});

window.addEventListener("hashchange", loadContent);

function redirectToHome() {
  window.location.href = "./index.html";
}

redirectBtn?.addEventListener("click", redirectToHome);
