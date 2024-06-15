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

// Scroll-to-top button
const scrollBtn = document.querySelector('.top-redirect-btn');

const toggleArrowVisibility = () => {
    if (window.scrollY > 500) {
        scrollBtn.style.opacity = '1';
    } else {
        scrollBtn.style.opacity = '0';
    }
};

window.addEventListener('scroll', toggleArrowVisibility);

document.querySelector('.close-menu-icon').classList.add('hidden');
function showMenuContent(){
  const navLinksList = document.querySelector('.nav__links__list');
  const hamburgerIcon = document.querySelector('.hamburger-menu-icon');
  const closeIcon = document.querySelector('.close-menu-icon');

  navLinksList.classList.add('transition-effect');
  navLinksList.classList.add('show')
  hamburgerIcon.classList.add('hidden');
  closeIcon.classList.remove('hidden');
  closeIcon.classList.add('visible');

  navLinksList.addEventListener('click', function () {
    navLinksList.classList.remove('show')
    closeIcon.classList.remove('visible')
    closeIcon.classList.add('hidden')
    hamburgerIcon.classList.remove('hidden')
  })
}

document.querySelector('.hamburger-menu-icon').addEventListener('click', showMenuContent);

function hideMenuContent() {
  const navLinksList = document.querySelector('.nav__links__list');
  const closeIcon = document.querySelector('.close-menu-icon');
  const hamburgerIcon = document.querySelector('.hamburger-menu-icon');

  navLinksList.classList.remove('show')
  closeIcon.classList.toggle('hidden');
  closeIcon.classList.remove('visible');
  hamburgerIcon.classList.toggle('hidden');

}
document.querySelector('.close-menu-icon').addEventListener('click', hideMenuContent);



function createNewSubList() {
  const newList = document.createElement('ul');

  const newItems = [
      { href: "https://www.linkedin.com/company/asociatia-oportunitati-si-cariere/", src: "./assets/social-media-icons/linkedin_icon.svg", text: "linkedin" },
      { href: "https://www.instagram.com/peviitor.ro/", src: './assets/social-media-icons/instagram_icon.svg',text: "instagram" },
      { href: "https://discord.gg/KPMkdUfQNu", src: './assets/social-media-icons/discord.svg', text: "discord" },
      { href: "https://github.com/peviitor-ro/oportunitatisicariere/issues", src: './assets/social-media-icons/github_icon.svg', text: "github" },
      { href: "https://meet.jit.si/PEVIITOR.RO", src: "./assets/jitsi.svg", text: "jit" },
      { href: "https://dev.to/t/peviitor", src: "./assets/social-media-icons/dev_icon.svg", text: "dev" }
  ];

  //style that will be added in SASS
  newList.style.display = 'flex';
  newList.style.gap = '20px';
  newList.style.listStyleType = 'none';

  newItems.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const img = document.createElement('img');

      a.href = item.href;
      a.target = 'blank';

      img.src = item.src;
      img.alt = item.text;
      img.style.width = '24px'; 
      img.style.height = '24px';

      a.appendChild(img);
      li.appendChild(a);
      newList.appendChild(li);
  });

  return newList;
}


function insertNewListBeforeButton() {
  const navList = document.querySelector('.nav__links__list.nav__links__nav');
  const items = navList.children;

  let buttonListItem;
  for (let item of items) {
      if (item.querySelector('button')) {
          buttonListItem = item;
          break;
      }
  }

  const newList = createNewSubList();

  if (buttonListItem) {
      navList.insertBefore(newList, buttonListItem);
  }
}

insertNewListBeforeButton();