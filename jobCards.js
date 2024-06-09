import { data } from "./data.js"; // Importă datele din data.js

document.addEventListener("DOMContentLoaded", () => {
  const jobContainer = document.querySelector(".swiper-wrapper");

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
});
