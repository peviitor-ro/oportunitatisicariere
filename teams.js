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
    
    // Afisarea membrilor
    for (let member of filteredMembers) {
        // Crearea card
        const card = document.createElement("div");
        card.classList.add("team__member");

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
                ${member.socials.linkedin ? `<a
                    href="${member.socials.linkedin}"
                    target="_blank"
                  >
                    <img
                      src="./assets/social-media-icons/linkedin_icon.svg"
                      alt="linkedin icon"
                  /></a>` : ""}
                ${member.socials.github ? `<a href="${member.socials.github}" target="_blank">
                    <img
                      src="./assets/social-media-icons/github_icon.svg"
                      alt="github icon"
                    />
                  </a>` : ""}
                ${member.socials.discord ? `<a
                    href="${member.socials.discord}"
                    target="_blank"
                  >
                    <img
                      src="./assets/social-media-icons/discord.svg"
                      alt="discord icon"
                    />
                  </a>` : ""}`;

        // Adaugare card in wrapperup pentru membrii
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

        // Afișează membrii pentru "Membrii Principali"
        displayTeamMembers(firstButton.textContent); 
    }
});
