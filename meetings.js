const ELEMENTS = {
  schedule: document.querySelector(".meeting-schedule"),
  daysContainer: document.querySelector(".meeting-days"),
  widget: document.querySelector(".notification-widget"),
  widgetBody: document.querySelector(".notification-widget__body"),
  widgetToggle: document.querySelector("#widget-toggle"),
};

let allMeetingsData = [];
let widgetInterval = null;
let cardUpdateInterval = null;

const currentDayIndex = new Date().getDay(); 

const getCurrentMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

const parseTime = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

const getFooterMessage = (dayName) => 
  dayName === "Vineri" ? "Ne vedem de Luni!" : "Ne vedem de mâine!";

async function initApp() {
  try {
    const response = await fetch("data/meetings.json");
    allMeetingsData = await response.json();
    renderButtons();

    const isWeekend = currentDayIndex === 0 || currentDayIndex === 6;
    if (isWeekend) {
      renderWeekend();
    } else {
      selectDay(currentDayIndex - 1); 
    }

  } catch (error) {
    console.error("Eroare la încărcarea datelor:", error);
  }
}

function renderButtons() {
  ELEMENTS.daysContainer.innerHTML = "";
  allMeetingsData.forEach((dayData, index) => {
    const btn = document.createElement("button");
    btn.className = "meeting-day shade";
    if (currentDayIndex === index + 1) btn.classList.add("active");
    
    btn.innerHTML = `${dayData.day.first}<span>${dayData.day.last}</span>`;
    
    btn.addEventListener("click", () => {
      document.querySelectorAll(".meeting-day").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectDay(index);
    });

    ELEMENTS.daysContainer.appendChild(btn);
  });
}

function selectDay(dataIndex) {
  const dayData = allMeetingsData[dataIndex];
  const activeMeetings = dayData.meeting.filter(m => m.active);

  if (widgetInterval) clearInterval(widgetInterval);
  if (cardUpdateInterval) clearInterval(cardUpdateInterval);

  ELEMENTS.schedule.innerHTML = "";
  
  if (activeMeetings.length === 0) {
    renderNoMeetings(dayData.day.full);
    hideWidget();
  } else {
    renderCards(activeMeetings, dataIndex);
    if (currentDayIndex === dataIndex + 1) {
       initWidget(dayData.day.full, activeMeetings);
    } else {
       hideWidget();
    }
  }
}

function renderWeekend() {
  ELEMENTS.schedule.innerHTML = `
    <div class="weekend-card shade">
      <span class="highlight-text">Este weekend, nu avem ședințe!
      <span class="deep-blue-text">Ne vedem de Luni!</span></span>
    </div>`;
  hideWidget();
}

function renderNoMeetings(dayName) {
  ELEMENTS.schedule.innerHTML = `
    <div class="weekend-card shade">
      <span class="highlight-text">${dayName} nu avem ședințe!
      <span class="deep-blue-text">${getFooterMessage(dayName)}</span></span>
    </div>`;
}

function renderCards(meetings, dayIndex) {
  meetings.forEach(meet => {
    const start = parseTime(meet.hour);
    const end = start + 30;

    const card = document.createElement("a");
    card.className = "meeting-card shade";
    card.dataset.label = "PARTICIPĂ"; 

    card.href = meet.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.dataset.start = start;
    card.dataset.end = end;

    card.innerHTML = `
      <div class="meeting-card__top">${meet.for}</div>
      <div class="meeting-card__middle">${meet.team}</div>
      <div class="meeting-card__bottom">${meet.hour}</div>
    `;

    ELEMENTS.schedule.appendChild(card);
  });

  if (currentDayIndex === dayIndex + 1) {
    const updateCardsState = () => {
      const now = getCurrentMinutes();
      const cards = ELEMENTS.schedule.querySelectorAll(".meeting-card");
      cards.forEach(c => {
        const start = parseInt(c.dataset.start);
        const end = parseInt(c.dataset.end);
        if (now >= start && now <= end) {
            c.classList.add("active");
        } else {
            c.classList.remove("active");
        }
      });
    };
    
    updateCardsState(); 
    cardUpdateInterval = setInterval(updateCardsState, 10000);
  }
}

function hideWidget() {
  ELEMENTS.widget.style.display = "none";
  ELEMENTS.widgetBody.innerHTML = "";
}

function initWidget(dayName, meetings) {
  ELEMENTS.widgetBody.innerHTML = `
    <div class="notification-widget__header"><h1>${dayName}:</h1></div>
    <ul class="notification-widget__content">
      ${meetings.map((m, i) => `
        <li>
          <h2>${m.hour} - ${m.team}</h2>
          <a class="primary-btn disabled-btn" id="widget-btn-${i}">Participă</a>
        </li>`).join('')}
    </ul>
  `;

  const times = meetings.map(m => parseTime(m.hour));
  const widgetStart = Math.min(...times) - 15;
  const widgetEnd = Math.max(...times) + 30;

  const updateWidget = () => {
    const now = getCurrentMinutes();
    let hasActive = false;

    ELEMENTS.widget.style.display = (now >= widgetStart && now <= widgetEnd) ? "flex" : "none";
    if (ELEMENTS.widget.style.display === "none") return;

    meetings.forEach((m, idx) => {
      const start = parseTime(m.hour);
      const offset = (idx === 0) ? 5 : 0; 
      
      const nextStart = meetings[idx + 1] ? parseTime(meetings[idx + 1].hour) : Infinity;
      const end = Math.min(start + 30, nextStart);

      const isActive = now >= (start - offset) && now < end;
      
      const btn = document.getElementById(`widget-btn-${idx}`);
      if (btn) {
        if (isActive) {
          btn.href = m.url;
          btn.target = "_blank";
          btn.classList.remove("disabled-btn");
          hasActive = true;
        } else {
          btn.removeAttribute("href");
          btn.classList.add("disabled-btn");
        }
      }
    });

    const isClosed = ELEMENTS.widget.classList.contains("widget-closed");
    if (isClosed && hasActive) ELEMENTS.widgetToggle.classList.add("ping");
    else ELEMENTS.widgetToggle.classList.remove("ping");
  };

  updateWidget();
  widgetInterval = setInterval(updateWidget, 1000);
}

ELEMENTS.widgetToggle.addEventListener("click", () => {
  ELEMENTS.widget.classList.toggle("widget-opened");
  ELEMENTS.widget.classList.toggle("widget-closed");
});

initApp();