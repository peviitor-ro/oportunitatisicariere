import teamMembers from "./teamMembers.json" with { type: "json" };

// Cream un vector nou, fiecare element din vector reprezinta o echipa
// Se genereaza dinamic in functie de numarul unic de echipe din teamMembers
const teams = [...new Set(teamMembers.map((teamMember) => teamMember.team))];

const teamNavigation = document.querySelector("#team-navbar");
const membersWrapper = document.querySelector("#team-wrapper");

function displayTeamMembers(team) {
  membersWrapper.innerHTML = "";  // Golim continutul anterior

  // Filtrarea membrilor dupa echipe
  const filteredMembers = team === "All" 
      ? teamMembers 
      : teamMembers.filter(member => member.team === team);

  // Sortare pentru a avea teamLead-ii la început
  const sortedMembers = filteredMembers.sort((a, b) => b.teamLead - a.teamLead);

  // Afisarea membrilor
  for (let member of sortedMembers) {
      // Crearea card
      const card = document.createElement("div");
      card.classList.add("team__member");

      // Adaugare clasa "team-leader" daca membrul este teamLead
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
              ${member.socials.linkedin ? `
                <span>
                <a
                href="${member.socials.linkedin}"
                target="_blank"
                ></a></span>
                ` : ""}
              ${member.socials.github ? `<span><a href="${member.socials.github}" target="_blank">

                </a></span>` : ""}
              ${member.socials.discord ? `<span><a
                  href="${member.socials.discord}"
                  target="_blank"
                ></a></span>` : ""}`;

      // Adaugare card in wrapperul pentru membrii
      membersWrapper.appendChild(card);
  }
}



document.addEventListener("DOMContentLoaded", () => {
    let firstButton = null; // Variabilă pentru a reține primul buton creat

    // Generam butoanele de navigare pentru echipe
    for (let team of teams) {
        const button = document.createElement("button");
        button.classList.add("team-nav-btn");
        button.textContent = team;

        if (!firstButton) firstButton = button;
        button.addEventListener("click", () => {
          window.location.href = "#teamRooster"; // Redirecționează utilizatorul către URL
      });

        // Adaugăm event listener pentru selectarea echipei
        button.addEventListener("click", () => {
            // Scoate clasa active de la toate butoanele și o adaugă doar celui curent
            document.querySelectorAll(".team-nav-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Afișează doar membrii echipei selectate
            displayTeamMembers(team);
        });

        // Adaugare buton la navigare
        teamNavigation.appendChild(button);
    }

 // Setarea butonului "Membrii Principali" cu clasa "active" la prima generare
    if (firstButton) {
        firstButton.classList.add("active");

        // Afișează membrii cu echipele din textContent-ul butonului activat
        displayTeamMembers(firstButton.textContent); 
    }
});
