document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".nav__links__nav a");

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

  function removeNavBottomBorder(){
    const scrollPosition = window.scrollY;
    const navbar = document.querySelector('.nav');

    if(scrollPosition > 50){
      navbar.classList.add('nav-bottom-border');
    }else{
      navbar.classList.remove('nav-bottom-border');
    }
  }

  // Trigger the function when the user scroll over the page:
  document.addEventListener("scroll", () => {
    highlightNavLink();
    removeNavBottomBorder();
  });

  // Highlight when the page gets loaded:
  highlightNavLink();
});
