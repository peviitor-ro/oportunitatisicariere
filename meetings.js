const meetings = document.querySelector(".meeting-schedule");

const days = document.querySelector(".meeting-days");

const date = new Date();
const d = date.getDay();

function getTime() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

async function meetingData() {
  try {
    const response = await fetch("data/meetings.json");
    const data = await response.json();

    if (d === 6 || d === 7) {
      meetings.innerHTML = `<div class="weekend-card shade">
      <span class="highlight-text">Este weekend, nu avem ședințe!
      <span class="deep-blue-text">Ne vedem de Luni!</span>
    </div>`;
    }

    for (let x = 0; data.length > x; x++) {
      if (d === x + 1) {
        createButton(data[x].day.first, data[x].day.last, "active");

        const meet = data[x].meeting;
        for (let y = 0; meet.length > y; y++) {
          createCard(
            "PARTICIPĂ",
            meet[y].url,
            meet[y].for,
            meet[y].team,
            meet[y].hour,
            x + 1
          );
        }
      } else {
        createButton(data[x].day.first, data[x].day.last);
      }

      const btn = document.querySelectorAll(".meeting-day");
      for (let z = 0; btn.length > z; z++) {
        btn[z].addEventListener("click", () => {
          btn.forEach((b) => b.classList.remove("active"));
          btn[z].classList.add("active");

          meetings.innerHTML = "";
          const meet = data[z].meeting;
          for (let y = 0; meet.length > y; y++) {
            createCard(
              "PARTICIPĂ",
              meet[y].url,
              meet[y].for,
              meet[y].team,
              meet[y].hour,
              z + 1
            );
          }
        });
      }
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

meetingData();

function createButton(short, long, active = "") {
  const createBTN = document.createElement("button");
  createBTN.className = "meeting-day shade " + active;
  createBTN.innerHTML = `${short}<span>${long}</span>`;

  days.appendChild(createBTN);
}

function createCard(label, url, tag, team, time, button) {
  const [hour, minutes] = time.split(":").map(Number);
  const start = hour * 60 + minutes;
  const end = hour * 60 + minutes + 30;

  const card = document.createElement("a");
  card.dataset.label = label;
  card.href = url;
  card.rel = "noopener noreferrer";
  card.target = "_blank";
  if (d === button) {
    card.className =
      getTime() >= start && end >= getTime()
        ? "meeting-card shade active"
        : "meeting-card shade";
  } else {
    card.className = "meeting-card shade";
  }
  card.innerHTML = `
    <div class="meeting-card__top"> 
        ${tag} 
    </div>
    <div class="meeting-card__middle"> 
        ${team} 
    </div>
    <div class="meeting-card__bottom"> 
        ${time} 
    </div>`;

  setInterval(() => {
    if (d === button) {
      card.className =
        getTime() >= start && end >= getTime()
          ? "meeting-card shade active"
          : "meeting-card shade";
    } else {
      card.className = "meeting-card shade";
    }
  }, 10 * 1000);

  meetings.appendChild(card);
}
