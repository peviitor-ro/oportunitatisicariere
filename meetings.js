const meetings = document.querySelector('.meeting-schedule');
const btn = document.querySelectorAll('.meeting-day');

const date = new Date();
const d = date.getDay();

function getTime(){
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

async function meetingData(){
    try{
        const response = await fetch('data/meetings.json');
        const data = await response.json();

        for(let x = 0; data.length > x; x++ ){
            if(d === x + 1){
                btn[x].classList.add('active');
                btn[x].innerHTML = `${data[x].day.first}<span>${data[x].day.last}</span>`;

                const meet = data[x].meeting
                for(let y = 0; meet.length > y; y++){
                    createCard('PARTICIPĂ', meet[y].url,meet[y].for, meet[y].team, meet[y].hour);
                }
            } else{
                btn[x].innerHTML = `${data[x].day.first}<span>${data[x].day.last}</span>`;
            }
        }

        for(let z = 0; btn.length > z; z++){
            btn[z].addEventListener('click', () =>{
                meetings.innerHTML = '';

                const meet = data[z].meeting
                for(let y = 0; meet.length > y; y++){
                    createCard('PARTICIPĂ', meet[y].url,meet[y].for, meet[y].team, meet[y].hour);
                }
            })
        }

    } catch (error) {
        console.log('Error:', error);
    }
}

meetingData();

function createCard(label, url, tag, team, time){
    const [hour, minutes] = time.split(':').map(Number);
    const start = hour * 60 + minutes; 
    const end = hour * 60 + minutes + 30; 
    
    const card = document.createElement('a');
    card.dataset.label = label;
    card.href = url;
    card.className = (getTime() >= start && end >= getTime()) ? 'meeting-card shade active' : 'meeting-card shade';
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
        card.className = (getTime() >= start && end >= getTime()) ? 'meeting-card shade active' : 'meeting-card shade';
    }, 10 * 1000);

    meetings.appendChild(card);
}






