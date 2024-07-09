document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("id");

  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      const job = data.find((job) => job.id === jobId);
      if (job) {
        document.querySelector(".title").textContent = job.title;
        document.querySelector(".employer").textContent += job.employer;
        document.querySelector(".departament").textContent += job.department;
        document.querySelector(".location").textContent = job.location;
        document.querySelector(".jobType").textContent = job.jobType;
        document.querySelector(".experience").textContent = job.experience;
        document.querySelector(".salary").textContent = job.salary;
        document.getElementById("jd").textContent = job.jobDescription;

        const responsabilities = document.getElementById("responsabilities");
        job.responsabilities.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          responsabilities.appendChild(li);
        });

        const demands = document.getElementById("demands");
        job.demands.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          demands.appendChild(li);
        });

        const offerings = document.getElementById("offerings");
        job.offerings.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          offerings.appendChild(li);
        });

        const generalInfo = document.getElementById("generalInfo");
        job.generalInfo.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          generalInfo.appendChild(li);
        });

        document.getElementById("recruiter-photo").src =
          job.aboutEmployer.photo;
        document.querySelector(".contact__person").textContent =
          job.aboutEmployer.name;
        document.querySelector(".contact__role").textContent =
          job.aboutEmployer.title;
        document.getElementById("phone").textContent += job.aboutEmployer.phone;
        document.getElementById("email").textContent += job.aboutEmployer.email;
        document.getElementById("address").textContent +=
          job.aboutEmployer.address;
      }
      checkPath(data); // Call the function to check if the path matches any of the job IDs
    })
    .catch((error) => {
      {
        throw new Error("Error loading data:", error);
      }
    });
});

// Check if the path matches any of the job IDs
// function checkPath(data) {
//   const path = window.location.href;
//   const pathId = path.split("=");
//   let matchFound = false;

//   for (let job of data) {
//     if (job.id === pathId[pathId.length - 1]) {
//       matchFound = true;
//       break;
//     }
//   }

//   if (!matchFound) {
//     window.location.href = "pageNotFound.html";
//   }
// }
function checkPath(data, idKey = "id") {
  try {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid data provided");
    }

    const path = new URLSearchParams(window.location.search);
    const pathId = path.get(idKey);

    // Check if pathId exists in the data array
    const matchFound = data.some((job) => job[idKey] === pathId);

    if (!matchFound) {
      window.location.href = "pageNotFound.html";
    }
  } catch (error) {
    console.error("Error in checkPath:", error.message);
  }
}
