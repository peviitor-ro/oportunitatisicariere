// Initialize Swiper and define the carousel structure:
new Swiper(".how-contribute__jobs", {
  slidesPerView: 4,
  spaceBetween: 40,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});
