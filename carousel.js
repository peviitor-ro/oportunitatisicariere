const carouselState = {
  numOfSlides: 4,
  slidesSpace: 40,
};

const deviceSizes = {
  laptop: "(min-width: 1025px) and (max-width: 1398px)",
  smallLaptop: "(min-width: 769px) and (max-width: 1150px)",
  tablet: "(min-width: 640px) and (max-width: 768px)",
  phone: "(min-width: 320px) and (max-width: 640px)",
  smallPhone: "(max-width: 320px)",
};

// Avoid object properties values to be changed:
Object.freeze(deviceSizes);

let swiperInstance;

function initializeSwiper(carouselConfig) {
  if (swiperInstance) {
    swiperInstance.destroy(true, true); // Destroy the existing instance
  }
  swiperInstance = new Swiper(".how-contribute__jobs", {
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

  // Swiper pause/play functionality based on input value
  const searchFilter = document.querySelector("#job-filter");
  searchFilter.addEventListener("input", () => {
    const query = searchFilter.value.trim();
    if (query) {
      swiperInstance.autoplay.stop();
    } else {
      swiperInstance.autoplay.start();
    }
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
      slidesSpace: 5,
    });
  } else if (pageEndpoints.smallLaptop.matches || pageEndpoints.tablet.matches) {
    initializeSwiper({
      numOfSlides: 2,
      slidesSpace: 0,
    });
  } else if (pageEndpoints.tablet.matches || pageEndpoints.phone.matches) {
    initializeSwiper({
      numOfSlides: 1,
      slidesSpace: 0,
    });
  } else {
    initializeSwiper(carouselState); // Default to initial state
  }
}

Object.values(pageEndpoints).forEach((endpoint) => {
  endpoint.addEventListener("change", handleCarouselResponsiveness);
});

handleCarouselResponsiveness();
