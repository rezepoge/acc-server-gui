'use strict';

const resultElems = Array.from(document.getElementsByClassName('result'));
const timetable = document.getElementById('timetable');

resultElems.forEach((elem, index) => {
    elem.addEventListener('click', ev => {
        let timetableHtml = '';
        results[index].sessionResult.leaderBoardLines.forEach((line, position) => {
            timetableHtml += `<div class="timeTable_line">
                <div class="driver">
                    <div class="position">${position+1}</div>
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
    });
});

function getTime(total) {
    const millis = total % 1000;
    const seconds = ((total - millis) / 1000) % 60;
    const minutes = ((((total - millis) / 1000) - seconds) / 60) % 60;

    const minutesStr = minutes >= 10 ? '' + minutes : '0' + minutes;
    const secondsStr = seconds >= 10 ? '' + seconds : '0' + seconds;
    const millisStr = millis >= 100 ? '' + millis : millis >= 10 ? '0' + millis : '00' + millis;

    return minutesStr + ':' + secondsStr + '.' + millisStr;
}