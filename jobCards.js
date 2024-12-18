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
      console.error("Error loading JSON data:", error);
    });

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredJobs = jobsData.filter((job) =>
      job.title.toLowerCase().includes(searchTerm)
    );
    renderJobs(filteredJobs);
  });

  function renderJobs(data) {
    jobContainer.innerHTML = "";

    // Filter out inactive jobs
    const activeJobs = data.filter((job) => job.isHiring);

    if (activeJobs.length === 0) {
      const noResultElement = document.createElement("div");
      noResultElement.classList.add(
        "how-contribute__job",
        "swiper-slide",
        "no-result"
      );
      noResultElement.innerHTML = `
        <div class="no-result__text">
          <h3>Hopa! Se pare că jobul tău perfect este bine ascuns. Mai încearcă!</h3>
        </div>
      `;
      jobContainer.appendChild(noResultElement);
    } else {
      activeJobs.forEach((job) => {
        if (!job.isHiring) return;
        const jobElement = document.createElement("div");
        jobElement.classList.add("how-contribute__job", "swiper-slide");
        jobElement.innerHTML = `
          <img src="${job.image}" alt="${job.title} Logo" />
          <div class="how-contribute__job__text">
            <h3 class="how-contribute__job__text__title">${job.title}</h3>
            <a href="details.html?id=${job.id}" class="how-contribute__job__text__detail-btn" data-id="${job.id}">Detalii</a>
          </div>
        `;
        jobContainer.appendChild(jobElement);
      });
    }
    initializeSwiper();
  }

  const swiperConfig = {
    default: { slidesPerView: 4, spaceBetween: 20 },
    laptop: {
      slidesPerView: 3,
      spaceBetween: 20,
      mediaQuery: deviceSizes.laptop,
    },
    smallLaptop: {
      slidesPerView: 3,
      spaceBetween: 20,
      mediaQuery: deviceSizes.smallLaptop,
    },
    tablet: {
      slidesPerView: 2,
      spaceBetween: 10,
      mediaQuery: deviceSizes.tablet,
    },
    phone: {
      slidesPerView: 1,
      spaceBetween: 10,
      mediaQuery: deviceSizes.phone,
    },
  };

  function getSwiperConfig() {
    for (let key in swiperConfig) {
      if (
        swiperConfig[key].mediaQuery &&
        window.matchMedia(swiperConfig[key].mediaQuery).matches
      ) {
        return swiperConfig[key];
      }
    }
    return swiperConfig.default;
  }

  function initializeSwiper() {
    if (swiper) {
      swiper.destroy(true, true);
    }
    const config = getSwiperConfig();
    swiper = new Swiper(".how-contribute__jobs", {
      slidesPerView: config.slidesPerView,
      spaceBetween: config.spaceBetween,
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

  // Reinitialize swiper on window resize
  window.addEventListener("resize", initializeSwiper);

  // Call the handler to set the initial state
  initializeSwiper();
});
