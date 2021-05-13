'use strict';

const resultElems = Array.from(document.getElementsByClassName('result'));
const timetable = document.getElementById('timetable');

resultElems.forEach((elem, index) => {
    elem.addEventListener('click', ev => renderTimetable(ev, elem, index));
});

function renderTimetable(ev, elem, index) {
    elem.classList.add('active');
    resultElems.forEach(elem2 => {
        if (elem !== elem2) {
            elem2.classList.remove('active');
        }
    });
    let timetableHtml = '';
    results[index].sessionResult.leaderBoardLines.forEach((line, position) => {
        timetableHtml += `<div class="timeTableLine${line.timing.totalTime <= line.timing.bestLap ? ' noValidLap' : ''}">
                <div class="driver">
                    <div class="position">${pad(position+1, 2)}</div>
                    <div class="shortName" title="${line.currentDriver.firstName} ${line.currentDriver.lastName}">${line.currentDriver.shortName}</div>
                </div>
                <div class="car">
                    <div class="raceNumber">${line.car.raceNumber}</div>
                    <div class="carModel">${basics.cars.find(car => car.id === line.car.carModel).name}</div>
                </div>
                <div class="timing">
                    <div class="bestLap">${getTime(line.timing.bestLap)}</div>
                    <div class="lastLap${line.timing.bestLap === line.timing.lastLap ? ' bestLap' : ''}">${getTime(line.timing.lastLap)}</div>
                    <div class="totalTime">${getTime(line.timing.totalTime)}</div>
                </div>
            </div>`
    });

    timetable.innerHTML = timetableHtml;
    timetable.scrollIntoView({
        behavior: 'smooth'
    });
}

function getTime(total) {
    const millis = total % 1000;
    const seconds = ((total - millis) / 1000) % 60;
    const minutes = ((((total - millis) / 1000) - seconds) / 60) % 60;

    return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(millis, 3)}`;
}

function pad(num, size) {
    const s = '0'.repeat(size - 1) + num;
    return s.substr(s.length - size);
}