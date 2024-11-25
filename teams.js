const teamNavigation = document.querySelector("#team-navbar");
const membersWrapper = document.querySelector("#team-wrapper");

let teamMembers = []; // Vector gol pentru datele din json
let preferredTeam = sessionStorage.getItem("preferredTeam"); // pentru cand navigarea se face dinspre pagina Detalii
let hasActiveBtn = false;

// Functie de fetch pentru datele din json
function loadTeamMembers() {
  fetch("./teamMembers.json")
    .then((response) => response.json())
    .then((data) => {
      teamMembers = data;
      initializeTeams(); // Initiazare echipe dupa ce datele devin disponibile
    })
    .catch((error) => console.error("Eroare la încarcarea JSON:", error));
}

// Functie pentru initializarea echipelor
function initializeTeams() {
  // Vector pentru bara de navigare echipe, cu echipe unice extrase din rolurile membrilor
  const teams = [
    ...new Set(
      teamMembers.flatMap((member) => member.roles.map((role) => role.team))
    ),
  ];

  let firstButton = null; // Variabila pentru a retine primul buton creat

  // Generam butoanele de navigare pentru echipe
  for (let team of teams) {
    const button = document.createElement("button");
    button.classList.add("team-nav-btn");
    button.textContent = team;

    if (!firstButton) firstButton = button;
    button.addEventListener("click", () => {
      window.location.href = "#teamList"; // Redirectionare spre începutul sectiunii de afisare a echipei
    });

    // Event listener pentru selectarea echipei
    button.addEventListener("click", () => {
      // Gestionarea clasei de active pentru butonul activat
      document
        .querySelectorAll(".team-nav-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Afisarea membrilor echipei selectate în functie de butonul activat
      displayTeamMembers(team);
    });

    // Adaugam butonul în bara de navigare echipe
    teamNavigation.appendChild(button);

    //cand navigam dinspre pagina Detalii vrem ca butonul selectat sa corespunda echipei potrivite
    //verificam daca echipa transmisa dinspre pag Detalii are corespondent in echipele din teamList
    if (preferredTeam === team) {
      button.classList.add("active");
      hasActiveBtn = true;
      displayTeamMembers(team);
    }
  }

  // Setarea primului buton generat ca fiind activ, standard membrii "Principali"
  // daca nu avem deja o echipa 'preferata' - cand navigam dinspre pag Detalii
  if ((!preferredTeam || !hasActiveBtn) && firstButton) {
    firstButton.classList.add("active");
    // Apelarea functiei de afisare a membrilor echipei selectate, în functie de butonul activat
    displayTeamMembers(firstButton.textContent);
  }
}

// Functia de afisare a membrilor echipei
function displayTeamMembers(selectedTeam) {
  membersWrapper.innerHTML = ""; // Golim continutul anterior pentru afisarea doar a membrilor corespunzatori

  // Filtrarea membrilor care apartin echipei selectate
  const filteredMembers = teamMembers.filter((member) =>
    member.roles.some((role) => role.team === selectedTeam)
  );

  // Sortare pentru a avea Team Leaders la început
  const sortedMembers = filteredMembers.sort((a, b) => {
    const aIsLeader = a.roles.some(
      (role) => role.team === selectedTeam && role.teamLead
    );
    const bIsLeader = b.roles.some(
      (role) => role.team === selectedTeam && role.teamLead
    );
    return bIsLeader - aIsLeader; // Sortare descrescatoare pe baza `teamLead`
  });

  // Afisarea membrilor
  for (let member of sortedMembers) {
    const role = member.roles.find((role) => role.team === selectedTeam);
    if (role) {
      // Crearea cardului
      const card = document.createElement("div");
      card.classList.add("team__member");

      // Adaugarea clasei `team-leader`
      if (role.teamLead) {
        card.classList.add("team-leader");
      }

      // Crearea continutului cardului
      card.innerHTML = `
             <img
                    src="${member.avatar}"
                    alt=""
                    class="team__member-img"
                  />
                  <h4>${member.name}</h4>
                  <p>${role.position}</p>
                  <div class="team__member__socials">
                  ${
                    member.socials.linkedin
                      ? `<span><a href="${member.socials.linkedin}" target="_blank"></a></span>`
                      : ""
                  }
                  ${
                    member.socials.github
                      ? `<span><a href="${member.socials.github}" target="_blank"></a></span>`
                      : ""
                  }
                  ${
                    member.socials.discord
                      ? `<span><a href="${member.socials.discord}" target="_blank"></a></span>`
                      : ""
                  }
                  </div>
                  `;
      // Adaugarea cardului în wrapper-ul pentru membrii
      membersWrapper.appendChild(card);
    }
  }
}

// Încarcarea membrilor dupa încarcarea paginii
document.addEventListener("DOMContentLoaded", loadTeamMembers);
