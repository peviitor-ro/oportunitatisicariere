const carouselState = {
  numOfSlides: 4,
  slidesSpace: 40,
};

const endpointSizes = {
  laptop: "(min-width: 1024px) and (max-width: 1398px)",
};

//Avoid object properties values to be changed:
Object.freeze(endpointSizes);

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

const laptopEndpoint = window.matchMedia(endpointSizes.laptop);

function handleCarouselResponsiveness(responsiveEndpoint) {
  if (responsiveEndpoint.matches) {
    initializeSwiper({
      numOfSlides: 3,
      slidesSpace: 30,
    });
  } else {
    initializeSwiper(carouselState);
  }
}

handleCarouselResponsiveness(laptopEndpoint);

document.addEventListener("change", () => {
  handleCarouselResponsiveness(laptopEndpoint);
});
