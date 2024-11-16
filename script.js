// window.addEventListener("hashchange", function () {
//   window.scrollTo(window.scrollX, window.scrollY - 100);
// });

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".nav__links__nav a");
  const navTitleLogo = document.querySelector(".nav__logo__title");
  const logoSection = document.querySelector(".intro__container__logo");
  const joinUsSection = document.querySelector(".join-us-section");

  // Start with nav title disabled
  navTitleLogo.style.pointerEvents = "none";
  navTitleLogo.style.cursor = "none";

  function highlightNavLink() {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      if (
        scrollPosition >= section.offsetTop - 200 &&
        scrollPosition < section.offsetTop + section.offsetHeight
      ) {
        const sectionId = section.getAttribute("id");

        navLinks.forEach((navLink) => {
          if (navLink.getAttribute("href") === `#${sectionId}`) {
            navLink.classList.add("active");
          } else {
            navLink.classList.remove("active");
          }
        });
      }
    });
  }

  function removeNavBottomBorder() {
    const scrollPosition = window.scrollY;
    const navbar = document.querySelector(".nav");

    if (scrollPosition > 50) {
      navbar.classList.add("nav-bottom-border");
    } else {
      navbar.classList.remove("nav-bottom-border");
    }
  }

  function toggleLogoVisibility() {
    const introTreshold = logoSection.getBoundingClientRect().bottom;
    const footerTreshold = joinUsSection.getBoundingClientRect().top;

    // Remove footerTreshold if you do not want the behavior to trigger
    // As the footer comes into view
    if (introTreshold < 1 && footerTreshold > 12) {
      // Enable title and make it visible
      navTitleLogo.style.pointerEvents = "auto";
      navTitleLogo.style.cursor = "pointer";
      navTitleLogo.classList.add("visible-title");
    } else {
      // Disable title and hide it
      navTitleLogo.style.pointerEvents = "none";
      navTitleLogo.style.cursor = "none";
      navTitleLogo.classList.remove("visible-title");
    }
  }

  window.addEventListener("scroll", toggleLogoVisibility);

  // Trigger the function when the user scroll over the page:
  document.addEventListener("scroll", () => {
    highlightNavLink();
    removeNavBottomBorder();
  });

  // Highlight when the page gets loaded:
  highlightNavLink();
});

function showMenuContent() {
  const navLinksList = document.querySelector(".nav__links__list");
  const hamburgerIcon = document.querySelector(".hamburger-menu-icon");
  const closeIcon = document.querySelector(".close-menu-icon");
  const navTitleLogo = document.querySelector(".nav__logo__title");

  navLinksList.classList.add("transition-effect");
  navLinksList.classList.add("show");
  hamburgerIcon.classList.add("hidden");
  closeIcon.classList.remove("hidden");
  closeIcon.classList.add("visible");

  if (closeIcon.classList.contains("visible")) {
    navTitleLogo.classList.add("visible-title");
    scrollBtn.style.display = "none";
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  } 

  navLinksList.addEventListener("click", function () {
    navLinksList.classList.remove("show");
    closeIcon.classList.remove("visible");
    closeIcon.classList.add("hidden");
    hamburgerIcon.classList.remove("hidden");
  });
}

document
  .querySelector(".hamburger-menu-icon")
  .addEventListener("click", showMenuContent);

function hideMenuContent() {
  const navLinksList = document.querySelector(".nav__links__list");
  const closeIcon = document.querySelector(".close-menu-icon");
  const hamburgerIcon = document.querySelector(".hamburger-menu-icon");
  const navTitleLogo = document.querySelector(".nav__logo__title");

  if (hamburgerIcon.classList.contains("hidden")) {
    document.body.style.overflow = "";
  }
  
  navTitleLogo.classList.remove("visible-title");
  navLinksList.classList.remove("show");
  closeIcon.classList.toggle("hidden");
  closeIcon.classList.remove("visible");
  hamburgerIcon.classList.toggle("hidden");
}

document
  .querySelector(".close-menu-icon")
  .addEventListener("click", hideMenuContent);

function createNewSubList() {
  const newList = document.createElement("ul");

  const newItems = [
    {
      href: "https://www.linkedin.com/company/asociatia-oportunitati-si-cariere/",
      src: "./assets/social-media-icons/linkedin_icon.svg",
      text: "linkedin",
    },
    {
      href: "https://www.instagram.com/peviitor.ro/",
      src: "./assets/social-media-icons/instagram_icon.svg",
      text: "instagram",
    },
    {
      href: "https://discord.gg/KPMkdUfQNu",
      src: "./assets/social-media-icons/discord.svg",
      text: "discord",
    },
    {
      href: "https://github.com/peviitor-ro/oportunitatisicariere/issues",
      src: "./assets/social-media-icons/github_icon.svg",
      text: "github",
    },
    {
      href: "https://meet.jit.si/PEVIITOR.RO",
      src: "./assets/jitsi.svg",
      text: "jit",
    },
    {
      href: "https://dev.to/t/peviitor",
      src: "./assets/social-media-icons/dev_icon.svg",
      text: "dev",
    },
  ];

  newItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");

    a.href = item.href;
    a.target = "blank";

    img.src = item.src;
    img.alt = item.text;

    a.appendChild(img);
    li.appendChild(a);
    newList.appendChild(li);
  });

  return newList;
}

function insertNewListBeforeButton() {
  const navList = document.querySelector(".nav__links__list.nav__links__nav");

  const items = navList.children;

  let buttonListItem;
  for (let item of items) {
    if (item.querySelector("button")) {
      buttonListItem = item;
      break;
    }
  }

  const newList = createNewSubList();
  newList.id = "socialLinks";

  if (buttonListItem) {
    navList.insertBefore(newList, buttonListItem);
  }
}

insertNewListBeforeButton();

document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("current-year");
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = `© ${currentYear}`;
});

// Scroll-to-top button
const scrollBtn = document.querySelector(".top-redirect-btn");
const closeIcon = document.querySelector(".close-menu-icon");

const toggleArrowVisibility = () => {
  if (
    window.scrollY > 500 &&
    window.matchMedia("(min-width: 1023px)").matches
  ) {
    scrollBtn.style.opacity = "1";
    document.body.style.overflow = "";
  } else if (
    window.scrollY > 500 &&
    closeIcon.classList.contains("hidden") &&
    window.matchMedia("(min-width: 320px) and (max-width: 1023px)").matches
  ) {
    scrollBtn.style.opacity = "1";
    document.body.style.overflow = "";
    scrollBtn.style.display = "";
    scrollBtn.style.visibility = "visible";
  } else {
    scrollBtn.style.opacity = "0";
    scrollBtn.style.display = "";
    document.body.style.overflow = "";
  }
};

window.addEventListener("scroll", toggleArrowVisibility);

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav__links__nav a");
    const arrowLink = document.querySelector(".intro__cta");
    const links = [...navLinks, arrowLink];
  
    links.forEach(link => {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        const headerHeight = 82.4;
  
        // Derulează pagina până la secțiunea dorită, ținând cont de înălțimea header-ului
        window.scrollTo({
          top: targetSection.offsetTop - headerHeight, 
          behavior: "smooth"
        });
      });
    });
  });
