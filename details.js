const goToTeamBtns = document.getElementsByClassName("go-to-team-btn");
let preferredTeam;

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("id");

  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      const job = data.find((job) => job.id === jobId);

      if (!job) {
        // Redirect to 404 if job not found in data
        window.location.href = "404.html";
        return;
      }
      if (job.isHiring === false) {
        // Redirect to 404 if not hiring for mentioned position
        window.location.href = "404.html";
        return;
      }

      if (job) {
        preferredTeam = job.team;
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
        document.getElementById("location").textContent += job.location;
        document.getElementById(
          "email"
        ).innerHTML += `<a href="mailto:${job.aboutEmployer.email}">${job.aboutEmployer.email}</a>`;
        document.getElementById("address").textContent +=
          job.aboutEmployer.address;
        document
          .getElementById("employer-linkedin")
          .setAttribute("href", job.aboutEmployer.linkedin);
        document
          .getElementById("employer-github")
          .setAttribute("href", job.aboutEmployer.github);
        document
          .getElementById("employer-discord")
          .setAttribute("href", job.aboutEmployer.discord);
      }
      checkPath(data); // Call the function to check if the path matches any of the job IDs
    })
    .catch((error) => {
      {
        throw new Error("Error loading data:", error);
      }
    });
});

for (let i = 0; i < goToTeamBtns.length; i++) {
  goToTeamBtns[i].addEventListener("click", goToTeam);
}

function checkPath(data, idKey = "id") {
  try {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid data provided");
    }

    const path = new URLSearchParams(window.location.search);
    const pathId = path.get(idKey);

    const matchFound = data.some((job) => job[idKey] === pathId);

    if (!matchFound) {
      window.location.href = "404.html";
    }
  } catch (error) {
    console.error("Error in checkPath:", error.message);
  }
}

function goToTeam() {
  sessionStorage.setItem("preferredTeam", preferredTeam);
  window.location.href = "/index.html#teamList";
}
