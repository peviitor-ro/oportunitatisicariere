document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".nav__links__list a");

  function highlightNavLink() {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      if (
        (scrollPosition >= section.offsetTop - 100) &&
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

  // Trigger the function when the user scroll over the page:
  document.addEventListener("scroll", () => {
    highlightNavLink();
  });

  // Highlight when the page gets loaded:
  highlightNavLink();
});
