// details.js
import { data } from "./data.js";

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", function () {
  const jobId = getQueryParam("id");
  const jobDetails = data.find((job) => job.id === jobId);

  if (jobDetails) {
    populateJobDetails(jobDetails);
  } else {
    displayJobNotFound();
  }
});

function populateJobDetails(jobDetails) {
  document.querySelector(".title").textContent = jobDetails.title;
  document.querySelector(".employer").textContent += jobDetails.employer;
  document.querySelector(".departament").textContent += jobDetails.departament;
  document.querySelector(".location").textContent = jobDetails.location;
  document.querySelector(".workingHours").textContent = jobDetails.workingHours;
  document.querySelector(".jobType").textContent = jobDetails.jobType;
  document.querySelector(".experience").textContent = jobDetails.experience;
  document.querySelector(".postedAt").textContent = jobDetails.postedAt;
  document.querySelector(".salary").textContent = jobDetails.salary;
  document.getElementById("jd").textContent = jobDetails.jobDescription;

  populateList("responsabilities", jobDetails.responsabilities);
  populateList("demands", jobDetails.demands);
  populateList("offerings", jobDetails.oferings);
  populateList("generalInfo", jobDetails.generalInfo);

  document.getElementById("recruiter-photo").src =
    jobDetails.aboutEmployer.photo;
  document.querySelector(".contact__person").textContent =
    jobDetails.aboutEmployer.name;
  document.querySelector(".contact__role").textContent =
    jobDetails.aboutEmployer.title;
  document.getElementById("phone").textContent +=
    jobDetails.aboutEmployer.phone;
  document.getElementById("fax").textContent += jobDetails.aboutEmployer.fax;
  document.getElementById("email").textContent +=
    jobDetails.aboutEmployer.email;
  document.getElementById("address").textContent +=
    jobDetails.aboutEmployer.address;
}

function populateList(elementId, items) {
  const list = document.getElementById(elementId);
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function displayJobNotFound() {
  document.querySelector(".title").textContent = "Job not found";
}
