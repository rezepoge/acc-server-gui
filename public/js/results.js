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
    let timetableHtml = `<div class="timeTableLine_header">
        <div class="driver">
            Driver
        </div>
        <div class="car">
            Car
        </div>
        <div class="timing">
            <div>Best</div>
            <div>Last</div>
            <div>Avg</div>
            <div>Total</div>
        </div>
    </div>`;

    results[index].sessionResult.leaderBoardLines.forEach((line, position) => {
        const lapTimesByDriver = results[index].laps
            .filter(lap => lap.carId === line.car.carId)
            .filter(lap => lap.isValidForBest)
            .map(lap => lap.laptime);
        const avgLap = lapTimesByDriver.length ? parseInt((lapTimesByDriver.reduce((sum, val) => sum + val, 0) / lapTimesByDriver.length)) : null;

        timetableHtml += `<div class="timeTableLine${line.timing.totalTime <= line.timing.bestLap ? ' noValidLap' : ''}" data-carId="${line.car.carId}" data-position="${position}">
                <div class="driver">
                    <div class="position">${position+1}</div>
                    <div class="shortName" title="${line.currentDriver.firstName} ${line.currentDriver.lastName}">${line.currentDriver.shortName}</div>
                </div>
                <div class="car">
                    <div class="raceNumber">${line.car.raceNumber}</div>
                    <div class="carModel">${basics.cars.find(car => car.id === line.car.carModel).name}</div>
                </div>
                <div class="timing">
                    <div class="${position === 0 ? ' bestLapAll' : 'bestLap'}" title="Best laptime">${getTime(line.timing.bestLap)}</div>
                    <div class="lastLap${line.timing.bestLap === line.timing.lastLap ? ' bestLap' : ''}" title="Last laptime">${getTime(line.timing.lastLap)}</div>
                    <div class="avgLap" title="Average laptime">${getTime(avgLap)}</div>
                    <div class="totalTime" title="Total time">${getTime(line.timing.totalTime)}</div>
                </div>
            </div>`
    });

    timetable.innerHTML = timetableHtml;

    Array.from(timetable.querySelectorAll('.timeTableLine:not(.noValidLap)'))
        .forEach(elem => elem.addEventListener('click', ev => renderLaps(ev, elem, index, timetable)));

    timetable.scrollIntoView({
        behavior: 'smooth'
    });
}

function renderLaps(ev, elem, index, timetable) {
    const carId = parseInt(elem.getAttribute('data-carId'));
    const position = parseInt(elem.getAttribute('data-position'));

    const oldLapsElem = document.querySelector(`#laps_${carId}.laps`);

    if (oldLapsElem) {
        oldLapsElem.remove();
        return;
    }

    const lapsElem = document.createElement('div');
    lapsElem.className = 'laps';
    lapsElem.id = 'laps_' + carId;

    let lapTableHtml = `<div class="lapTableLine_header">
        <div>
            Lap
        </div>
        <div>
            Laptime
        </div>
        <div class="splits">
            <div>S1</div>
            <div>S2</div>
            <div>S3</div>
        </div>
    </div>`;

    const eventResults = results[index];
    const leaderBoardLines = eventResults.sessionResult.leaderBoardLines;
    const lapsByDriver = eventResults.laps
        .filter(elem => elem.carId === carId);

    const bestLap = leaderBoardLines[position].timing.bestLap;
    const bestLapAll = Math.min(...eventResults.laps
        .filter(lap => lap.isValidForBest)
        .map(lap => lap.laptime));

    const bestFirstSplit = Math.min(...lapsByDriver
        .filter(lap => lap.isValidForBest)
        .map(lap => lap.splits[0]));
    const bestFirstSplitAll = Math.min(...eventResults.laps
        .filter(lap => lap.isValidForBest)
        .map(lap => lap.splits[0]));

    const bestSecondSplit = Math.min(...lapsByDriver
        .filter(lap => lap.isValidForBest)
        .map(lap => lap.splits[1]));
    const bestSecondSplitAll = Math.min(...eventResults.laps
        .filter(lap => lap.isValidForBest)
        .map(lap => lap.splits[1]));

    const bestThirdSplit = Math.min(...lapsByDriver
        .filter(lap => lap.isValidForBest)
        .map(lap => lap.splits[2]));
    const bestThirdSplitAll = Math.min(...eventResults.laps
        .filter(lap => lap.isValidForBest)
        .map(lap => lap.splits[2]));

    lapsByDriver.forEach((lap, number) => {
        const laptimeAddClass = lap.laptime === bestLapAll ? 'bestLapAll' :
            lap.laptime === bestLap ? 'bestLap' : '';
        const firstSplitAddClass = lap.splits[0] === bestFirstSplitAll ? 'bestLapAll' :
            lap.splits[0] === bestFirstSplit ? 'bestLap' : '';
        const secondSplitAddClass = lap.splits[1] === bestSecondSplitAll ? 'bestLapAll' :
            lap.splits[1] === bestSecondSplit ? 'bestLap' : '';
        const thirdSplitAddClass = lap.splits[2] === bestThirdSplitAll ? 'bestLapAll' :
            lap.splits[2] === bestThirdSplit ? 'bestLap' : '';

        lapTableHtml += `<div class="lapTableLine${!lap.isValidForBest ? ' noValidLap' : ''}">
                <div class="lap">${number+1}</div>
                <div class="laptime ${laptimeAddClass}">${getTime(lap.laptime)}</div>
                <div class="splits">
                    <div class="laptime ${firstSplitAddClass}">${getTime(lap.splits[0])}</div>
                    <div class="laptime ${secondSplitAddClass}">${getTime(lap.splits[1])}</div>
                    <div class="laptime ${thirdSplitAddClass}">${getTime(lap.splits[2])}</div>
                </div>
            </div>`
    });

    lapsElem.innerHTML = lapTableHtml;
    timetable.insertBefore(lapsElem, elem.nextElementSibling);
}

function getTime(total) {
    if (!total) {
        return '--:--.---';
    }
    const millis = total % 1000;
    const seconds = ((total - millis) / 1000) % 60;
    const minutes = ((((total - millis) / 1000) - seconds) / 60) % 60;

    return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(millis, 3)}`;
}

function pad(num, size) {
    const s = '0'.repeat(size - 1) + num;
    return s.substr(s.length - size);
}