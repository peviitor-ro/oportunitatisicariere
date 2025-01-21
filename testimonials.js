document.addEventListener("DOMContentLoaded", () => {
  const storiesContainer = document.querySelector(".stories-wrapper");

  function loadTestimonials() {
    fetch("./testimonials.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((testimonial) => {
          const { name, avatar, role, text } = testimonial;
          storiesContainer.innerHTML += `
          <div class="swiper-slide">      
            <div class="stories-individual">
              <div class="stories-left">
                <img src="./assets/povesti-quote.svg" alt="" />
                <p>
                ${text}
                </p>
                <div class="stories-name">
                  <h3>${name}</h3>
                  <p>${role}</p>
                </div>
                <p class="stories-extra">povești de succes</p>
              </div>
              <div class="stories-right">
                <img src=${avatar} alt="" />
              </div>
            </div>
          </div>`;
        });

        let storySwiper;

        function initSwiper() {
          const isMobile = window.innerWidth < 1024;

          if (storySwiper) {
            storySwiper.destroy(true, true);
          }

          storySwiper = new Swiper(".stories-container", {
            effect: isMobile ? "slide" : "cards",
            cardsEffect: isMobile
              ? undefined
              : {
                  rotate: 40,
                  depth: 400,
                  modifier: 3,
                  slideShadows: false,
                },
            grabCursor: true,
            rewind: false,
            mousewheel: false,
            pagination: isMobile
              ? false // Disable pagination on mobile
              : {
                  el: ".stories-pagination",
                  clickable: true,
                },
            speed: 1000,
            direction: "horizontal",
            preventInteractionOnTransition: true,
            autoplay: {
              delay: 45000,
              disableOnInteraction: true,
            },
            touchReleaseOnEdges: true,
          });
        }

        // Initialize Swiper on page load
        initSwiper();

        // Reinitialize Swiper on window resize
        window.addEventListener("resize", initSwiper);
      })
      .catch((error) => console.error("Eroare la încarcarea JSON:", error));
  }

  loadTestimonials();
});
