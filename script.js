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

  window.addEventListener('scroll', toggleLogoVisibility);

  // Trigger the function when the user scroll over the page:
  document.addEventListener("scroll", () => {
    highlightNavLink();
    removeNavBottomBorder();
  });

  // Highlight when the page gets loaded:
  highlightNavLink();
});

// Scroll-to-top button
const scrollBtn = document.querySelector(".top-redirect-btn");

const toggleArrowVisibility = () => {
  if (window.scrollY > 500) {
    scrollBtn.style.opacity = "1";
  } else {
    scrollBtn.style.opacity = "0";
  }
};

window.addEventListener("scroll", toggleArrowVisibility);

document.querySelector(".close-menu-icon").classList.add("hidden");
function showMenuContent() {
  const navLinksList = document.querySelector(".nav__links__list");
  const hamburgerIcon = document.querySelector(".hamburger-menu-icon");
  const closeIcon = document.querySelector(".close-menu-icon");

  navLinksList.classList.add("transition-effect");
  navLinksList.classList.add("show");
  hamburgerIcon.classList.add("hidden");
  closeIcon.classList.remove("hidden");
  closeIcon.classList.add("visible");

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

  navLinksList.classList.remove("show");
  closeIcon.classList.toggle("hidden");
  closeIcon.classList.remove("visible");
  hamburgerIcon.classList.toggle("hidden");
}
document
  .querySelector(".close-menu-icon")
  .addEventListener("click", hideMenuContent);

document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("current-year");
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = `© ${currentYear}`;
});
