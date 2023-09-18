let hour = document.getElementById('hour-select');
let minutes = document.getElementById('minutes-select');


fillHour(hour);
fillMinutes(minutes);
function fillHour(hour) {
    for (let i = 0; i <= 24; i++) {
        let option = document.createElement('option');
        if(i < 10) {
            option.textContent = '0' + i;
        } else {
            option.textContent = String(i);
        }
        hour.appendChild(option);
    }
}
function fillMinutes(minutes) {
    for (let i = 0; i <= 60; i++) {
        let option = document.createElement('option');
        if(i < 10) {
            option.textContent = '0' + i;
        } else {
            option.textContent = String(i);
        }
        minutes.appendChild(option);
    }
}
