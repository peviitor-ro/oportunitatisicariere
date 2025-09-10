const meetings = document.querySelector(".meeting-schedule");

const toggleWidget = document.querySelector("#widget-toggle");
const widget = document.querySelector(".notification-widget");
const widgetBody = document.querySelector(".notification-widget__body");

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

      widget.style.display = "none";
      widgetBody.innerHTML = "";
    }

    for (let x = 0; data.length > x; x++) {
      if (d === x + 1) {
        createWidget(data[x].day.full, data[x].meeting);
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

// Notification widget section
toggleWidget.addEventListener("click", () => {
  widget.classList.toggle("widget-opened");
  widget.classList.toggle("widget-closed");
});

function createWidget(day, meetings) {
  const meetingHtml = meetings
    .map(
      (meeting, index) => `
        <li data-index="${index}">
          <h2>${meeting.hour} - ${meeting.team}</h2>
          <a class="primary-btn">Participa</a>
        </li>
      `
    )
    .join("");

  widgetBody.innerHTML = `
    <div class="notification-widget__header">
      <h1>${day}:</h1>
    </div>

    <ul class="notification-widget__content">
      ${meetingHtml}
    </ul>
  `;

  const times = meetings.map((m) => {
    const [h, min] = m.hour.split(":").map(Number);
    return h * 60 + min;
  });

  const firstStart = Math.min(...times) - 15;
  const lastEnd = Math.max(...times) + 30;

  function updateWidgetLinks() {
    const links = widgetBody.querySelectorAll("a.primary-btn");
    let hasActiveMeeting = false;

    meetings.forEach((meeting, index) => {
      const [hour, minutes] = meeting.hour.split(":").map(Number);
      const start = hour * 60 + minutes;

      let nextStart = Infinity;
      if (meetings[index + 1]) {
        const [nHour, nMinutes] = meetings[index + 1].hour
          .split(":")
          .map(Number);
        nextStart = nHour * 60 + nMinutes;
      }

      const end = Math.min(start + 30, nextStart);
      const active = getTime() >= start && getTime() < end;

      const link = links[index];
      if (active) {
        link.href = meeting.url;
        link.setAttribute("target", "_blank");
        link.classList.remove("disabled-btn");
        hasActiveMeeting = true;
      } else {
        link.removeAttribute("href");
        link.removeAttribute("target");
        link.classList.add("disabled-btn");
      }
    });

    const now = getTime();
    if (now >= firstStart && now <= lastEnd) {
      widget.style.display = "block";
    } else {
      widget.style.display = "none";
    }

    if (widget.classList.contains("widget-closed") && hasActiveMeeting) {
      toggleWidget.classList.add("ping");
    } else {
      toggleWidget.classList.remove("ping");
    }
  }

  updateWidgetLinks();

  setInterval(updateWidgetLinks, 1000);
}
