const carouselState = {
  numOfSlides: 4,
  slidesSpace: 40,
};

const deviceSizes = {
  laptop: "(min-width: 1024px) and (max-width: 1398px)",
  smallLaptop: "(min-width: 769px) and (max-width: 1024px)",
  tablet: "(min-width: 640px) and (max-width: 768px)",
  phone: "(max-width: 639px)",
};

// Avoid object properties values to be changed:
Object.freeze(deviceSizes);

let swiper;

function initializeSwiper(carouselConfig) {
  if (swiper) {
    swiper.destroy(true, true);
  }
  swiper = new Swiper(".how-contribute__jobs", {
    slidesPerView: carouselConfig.numOfSlides,
    spaceBetween: carouselConfig.slidesSpace,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
}

// Initialize swiper function for its first rendering on the page:
initializeSwiper(carouselState);

const pageEndpoints = {
  // We don't need a desktop endpoint since the desktop is default for carousel state config:
  laptop: window.matchMedia(deviceSizes.laptop),
  smallLaptop: window.matchMedia(deviceSizes.smallLaptop),
  tablet: window.matchMedia(deviceSizes.tablet),
  phone: window.matchMedia(deviceSizes.phone),
};

function handleCarouselResponsiveness() {
  if (pageEndpoints.laptop.matches) {
    initializeSwiper({
      numOfSlides: 3,
      slidesSpace: 20,
    });
  } else if (pageEndpoints.smallLaptop.matches) {
    initializeSwiper({
      numOfSlides: 3,
      slidesSpace: 20,
    });
  } else if (pageEndpoints.tablet.matches) {
    initializeSwiper({
      numOfSlides: 2,
      slidesSpace: 10,
    });
  } else if (pageEndpoints.phone.matches) {
    initializeSwiper({
      numOfSlides: 1,
      slidesSpace: 10,
    });
  } else {
    initializeSwiper(carouselState);
  }
}

// Check when the window resizes and reinitialize swiper accordingly:
window.addEventListener("resize", handleCarouselResponsiveness);

// Call the handler to set the initial state:
handleCarouselResponsiveness();
