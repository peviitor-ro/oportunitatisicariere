document.addEventListener("DOMContentLoaded", () => {
  const storiesContainer = document.querySelector(".stories-wrapper");

  function loadTestimonials() {
    fetch("./testimonials.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((testimonial) => {
          const { name, avatar, role, text } = testimonial;
          storiesContainer.innerHTML += `
        <div class="swiper-slide">      <div class="stories-individual ">
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
      })
      .catch((error) => console.error("Eroare la încarcarea JSON:", error));
  }

  loadTestimonials();
});