document.addEventListener("DOMContentLoaded", () => {
  const jobContainer = document.querySelector(".swiper-wrapper");
  const jobFilterInput = document.getElementById("job-filter");

  let jobs = [];

  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      jobs = data;
      displayJobs(jobs);
      initializeSwiper(carouselState); // Initialize carousel with all jobss
      handleCarouselResponsiveness(); // Update carousel responsiveness
    })
    .catch((error) => {
      throw new Error("Error loading JSON data:", error);
    });

  function displayJobs(jobs) {
    jobContainer.innerHTML = ""; // Clear previous content
    jobs.forEach((job) => {
      const jobElement = document.createElement("div");
      jobElement.classList.add("how-contribute__job", "swiper-slide");
      jobElement.innerHTML = `
        <img src="${job.image}" alt="${job.title} Logo" onclick="location.href='details.html?id=${job.id}';"/>
        <div class="how-contribute__job__text">
          <h3>${job.title}</h3>
          <a href="details.html?id=${job.id}" class="detail-btn" data-id="${job.id}">Detalii</a>
        </div>
      `;
      jobContainer.appendChild(jobElement);
    });
  }

  // Filter jobs
  jobFilterInput.addEventListener("input", () => {
    const query = jobFilterInput.value.toLowerCase();
    const filteredJobs = jobs.filter((job) => job.title.toLowerCase().includes(query));
    displayJobs(filteredJobs);
    initializeSwiper(carouselState); // Reinitialize carousel with filtered jobs
    handleCarouselResponsiveness(); // Update carousel responsiveness
  });
});
