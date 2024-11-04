const teamNavigation = document.querySelector("#team-navbar");
const membersWrapper = document.querySelector("#team-wrapper");

let teamMembers = []; // Vector gol pentru datele din json

// Functie de fetch pentru datele din json
function loadTeamMembers() {
  fetch("./teamMembers.json")
    .then((response) => response.json())
    .then((data) => {
      teamMembers = data;
      initializeTeams(); // Initiazare echipe dupa ce datele devin disponibile
    })
    .catch((error) => console.error("Eroare la încărcarea JSON:", error));
}

// Functie pentru initializarea echipelor
function initializeTeams() {
  // Vector pentru bara de navigare echipe, in functie de un numar unic de echipe
  const teams = [...new Set(teamMembers.map((teamMember) => teamMember.team))];

  let firstButton = null; // Variabila pentru a retine primul buton creat

  // Generam butoanele de navigare pentru echipe
  for (let team of teams) {
    const button = document.createElement("button");
    button.classList.add("team-nav-btn");
    button.textContent = team;

    if (!firstButton) firstButton = button;
    button.addEventListener("click", () => {
      window.location.href = "#teamRooster"; // Redirectionare spre inceputul sectiunii de afisare a echipei
    });

    // Event listener pentru selectarea echipei
    button.addEventListener("click", () => {
      // Gestionarea clasei de active pentru butonul activat
      document
        .querySelectorAll(".team-nav-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Afisarea membrilor echipei selectate in functie de butonul activat
      displayTeamMembers(team);
    });

    // Adaugam butonul in bara de navigare echipe
    teamNavigation.appendChild(button);
  }

  // Setarea primului buton generat ca fiind activ, standard membrii "Principali"
  if (firstButton) {
    firstButton.classList.add("active");

    // Apelarea functiei de afisare a membrilor echipei selectate, in functie de butonul activat
    displayTeamMembers(firstButton.textContent);
  }
}

// Functia de afisare a membrilor echipei
function displayTeamMembers(team) {
  membersWrapper.innerHTML = ""; // Golim continutul anterior pentru afisarea doar a membrilor corespunzatori

  // Filtrarea membrilor
  const filteredMembers =
    team === "All"
      ? teamMembers
      : teamMembers.filter((member) => member.team === team);

  // Sortare pentru a avea Team Leaders la inceput
  const sortedMembers = filteredMembers.sort((a, b) => b.teamLead - a.teamLead);

  // Afisarea membrilor
  for (let member of sortedMembers) {
    // Crearea card
    const card = document.createElement("div");
    card.classList.add("team__member");

    // Adaugarea clasa team-leader
    if (member.teamLead) {
      card.classList.add("team-leader");
    }

    // Creare continut card
    card.innerHTML = `
           <img
                  src="${member.avatar}"
                  alt=""
                  class="team__member-img"
                />
                <h4>${member.name}</h4>
                <p>${member.position}</p>
                <div class="team__member__socials">
                ${
                  member.socials.linkedin
                    ? `
                  <span>
                  <a
                  href="${member.socials.linkedin}"
                  target="_blank"
                  ></a></span>
                  `
                    : ""
                }
                ${
                  member.socials.github
                    ? `<span><a href="${member.socials.github}" target="_blank">
                  </a></span>`
                    : ""
                }
                ${
                  member.socials.discord
                    ? `<span><a
                    href="${member.socials.discord}"
                    target="_blank"
                  ></a></span>`
                    : ""
                }`;

    // Adaugare card in wrapperul pentru membrii
    membersWrapper.appendChild(card);
  }
}

// Incarcarea membrilor dupa incarcarea paginii
document.addEventListener("DOMContentLoaded", loadTeamMembers);
