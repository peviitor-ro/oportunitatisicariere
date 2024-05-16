const carouselState = {
  numOfSlides: 4,
  slidesSpace: 40,
};

const deviceSizes = {
  laptop: "(min-width: 1024px) and (max-width: 1398px)",
  smallLaptop: "(min-width: 769px) and (max-width: 1150px)",
  tablet: "(min-width: 640px) and (max-width: 768px)",
  phone: "(min-width: 320px) and (max-width: 640px)",
  smallPhone: "(max-width: 320px)",
};

//Avoid object properties values to be changed:
Object.freeze(deviceSizes);

function initializeSwiper(carouselConfig) {
  // Initialize Swiper and define the carousel structure:
  new Swiper(".how-contribute__jobs", {
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

//Initialize swiper function for its first rendering on the page:
initializeSwiper(carouselState);

const pageEndpoints = {
  //We don't need a desktop endpoint since the desktop is default for carousel state config:
  laptop: window.matchMedia(deviceSizes.laptop),
  smallLaptop: window.matchMedia(deviceSizes.smallLaptop),
  tablet: window.matchMedia(deviceSizes.tablet),
  phone: window.matchMedia(deviceSizes.phone),
};

function handleCarouselResponsiveness(responsiveEndpoint) {
  if (responsiveEndpoint.laptop.matches) {
    initializeSwiper({
      numOfSlides: 3,
      slidesSpace: 5,
    });
  }

  if (
    responsiveEndpoint.smallLaptop.matches ||
    responsiveEndpoint.tablet.matches
  ) {
    initializeSwiper({
      numOfSlides: 2,
      slidesSpace: 0,
    });
  }

  if (responsiveEndpoint.tablet.matches || responsiveEndpoint.phone.matches) {
    initializeSwiper({
      numOfSlides: 1,
      slidesSpace: 0,
    });
  }
}

handleCarouselResponsiveness(pageEndpoints);
