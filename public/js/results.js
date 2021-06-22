'use strict';

/*global results, basics*/

const MAX_INTEGER = 2147483647;

(() => {
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

        const eventResults = results[index];

        eventResults.sessionResult.leaderBoardLines.forEach((line, position) => {
            const lapsByCar = getLapsByCar(eventResults.laps, line.car.carId);
            const avgLap = getAvgLapTime(lapsByCar, line);
            const isBest = eventResults.sessionResult.bestlap === line.timing.bestLap;

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
                    <div class="${isBest ? ' bestLapAll' : 'bestLap'}" title="Best laptime">${getTime(line.timing.bestLap)}</div>
                    <div class="lastLap${line.timing.bestLap === line.timing.lastLap ? ' bestLap' : ''}" title="Last laptime">${getTime(line.timing.lastLap)}</div>
                    <div class="avgLap" title="Average laptime">${getTime(avgLap)}</div>
                    <div class="totalTime" title="Total time">${getTime(line.timing.totalTime)}</div>
                </div>
            </div>`
        });

        timetable.innerHTML = timetableHtml.trim();

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
        const lapsByCar = getLapsByCar(eventResults.laps, carId);
        const bestLap = eventResults.sessionResult.leaderBoardLines[position].timing.bestLap;
        const bestLapAll = getBestLapOfAllDrivers(eventResults.laps);
        const bestSplits = getBestSplits(lapsByCar, eventResults.laps);

        lapsByCar.forEach((lap, number) => {
            const laptimeAddClass = getBestAddClass(lap.laptime, bestLap, bestLapAll);
            const firstSplitAddClass = getBestAddClass(lap.splits[0], bestSplits[0].own, bestSplits[0].all);
            const secondSplitAddClass = getBestAddClass(lap.splits[1], bestSplits[1].own, bestSplits[1].all);
            const thirdSplitAddClass = getBestAddClass(lap.splits[2], bestSplits[2].own, bestSplits[2].all);

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

        lapsElem.innerHTML = lapTableHtml.trim();
        timetable.insertBefore(lapsElem, elem.nextElementSibling);
    }

    function getLapsByCar(laps, carId) {
        return laps.filter(elem => elem.carId === carId);
    }

    function getBestLapOfAllDrivers(laps) {
        return Math.min(...laps
            .filter(lap => lap.isValidForBest)
            .map(lap => lap.laptime));
    }

    function getBestAddClass(time, ownBest, allBest) {
        return time === allBest ? 'bestLapAll' :
            time === ownBest ? 'bestLap' : '';
    }

    function getAvgLapTime(laps) {
        if (!laps.length) {
            return null;
        }

        laps[0].isValidForBest = false;

        const lapTimesByDriver = laps
            .filter(lap => lap.isValidForBest)
            .map(lap => lap.laptime);

        if (!lapTimesByDriver.length) {
            return null
        }

        const avgLaptime = lapTimesByDriver
            .reduce((sum, val) => sum + val, 0) / lapTimesByDriver.length;

        return Math.round(avgLaptime);
    }

    function getBestSplits(lapsByCar, allLaps) {
        const bestFirstSplitOwn = Math.min(...lapsByCar
            .filter(lap => lap.isValidForBest)
            .map(lap => lap.splits[0]));

        const bestFirstSplitAll = Math.min(...allLaps
            .filter(lap => lap.isValidForBest)
            .map(lap => lap.splits[0]));

        const bestSecondSplitOwn = Math.min(...lapsByCar
            .filter(lap => lap.isValidForBest)
            .map(lap => lap.splits[1]));

        const bestSecondSplitAll = Math.min(...allLaps
            .filter(lap => lap.isValidForBest)
            .map(lap => lap.splits[1]));

        const bestThirdSplitOwn = Math.min(...lapsByCar
            .filter(lap => lap.isValidForBest)
            .map(lap => lap.splits[2]));

        const bestThirdSplitAll = Math.min(...allLaps
            .filter(lap => lap.isValidForBest)
            .map(lap => lap.splits[2]));

        return [{
            own: bestFirstSplitOwn,
            all: bestFirstSplitAll
        }, {
            own: bestSecondSplitOwn,
            all: bestSecondSplitAll
        }, {
            own: bestThirdSplitOwn,
            all: bestThirdSplitAll
        }]
    }

    function getTime(total) {
        if (!total || typeof total !== 'number' || total >= MAX_INTEGER) {
            return '--:--.---';
        }

        total = parseInt(total);

        const millis = total % 1000;
        const seconds = ((total - millis) / 1000) % 60;
        const minutes = ((((total - millis) / 1000) - seconds) / 60) % 60;

        return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(millis, 3)}`;
    }

    function pad(num, size) {
        const s = '0'.repeat(size - 1) + num;
        return s.substr(s.length - size);
    }
})();