document.addEventListener("DOMContentLoaded", () => {
  const jobContainer = document.querySelector(".swiper-wrapper");
  const searchInput = document.querySelector(".search-input");

  let jobsData = [];

  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      jobsData = data;
      renderJobs(data);
    })
    .catch((error) => {
      throw new Error("Error loading JSON data:", error);
    });

  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredJobs = jobsData.filter((job) =>
      job.title.toLowerCase().includes(searchTerm)
    );
    renderJobs(filteredJobs);
  });

  function renderJobs(data) {
    jobContainer.innerHTML = "";
    data.forEach((job) => {
      const jobElement = document.createElement("div");
      jobElement.classList.add("how-contribute__job", "swiper-slide");
      jobElement.innerHTML = `
        <img src="${job.image}" alt="${job.title} Logo" />
        <div class="how-contribute__job__text">
          <h3>${job.title}</h3>
          <a href="details.html?id=${job.id}" class="detail-btn" data-id="${job.id}">Detalii</a>
        </div>
      `;
      jobContainer.appendChild(jobElement);
    });

    // Reinitialize the swiper after updating the DOM
    if (swiper) {
      swiper.destroy(true, true);
    }
    swiper = new Swiper(".how-contribute__jobs", {
      slidesPerView: 4,
      spaceBetween: 20,
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
});
