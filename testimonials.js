document.addEventListener("DOMContentLoaded", () => {
  const storiesContainer = document.querySelector(".stories-wrapper");

  if (!storiesContainer) {
    console.error("Error: .stories-wrapper not found in the DOM!");
    return; // Stop execution if the container is missing
  }

  function loadTestimonials() {
    fetch("data/testimonials.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((testimonial) => {
          const { name, avatar, role, text } = testimonial;

          storiesContainer.innerHTML += `
          <div class="swiper-slide">      
            <div class="stories-individual">
              <div class="stories-left">
                <img src="./assets/povesti-quote.svg" alt="" />
                <p>${text}</p>
                <div class="stories-name">
                  <h3>${name}</h3>
                  <p>${role}</p>
                </div>
                <p class="stories-extra">povești de succes</p>
              </div>
              <div class="stories-right">
                <img src="${avatar}" alt="Avatar of ${name}" />
              </div>
            </div>
          </div>`;
        });

        // Initialize Swiper only if testimonials were added
        if (data.length > 0) {
          initSwiper();
          window.addEventListener("resize", initSwiper);
        } else {
          console.warn("No testimonials found in testimonials.json");
        }
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }

  function initSwiper() {
    const isMobile = window.innerWidth < 1024;
    let storySwiper = new Swiper(".stories-container", {
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
        ? false
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

  loadTestimonials();
});
