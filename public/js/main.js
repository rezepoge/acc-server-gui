'use strict';

const elems = {
    addSessionButton: document.getElementById('addSession'),
    sessionsWrapper: document.getElementById('sessions'),
    sessions: document.getElementsByClassName('session'),
    saveButton: document.getElementById('save'),
    restartButton: document.getElementById('restart'),
    startButton: document.getElementById('start'),
    stopButton: document.getElementById('stop'),
    status: document.getElementById('status'),
    logs: document.getElementById('logs'),
    showPasswordButtons: document.getElementsByClassName('showPassword'),
};

const inputElems = {
    serverName: document.getElementById('serverName'),
    password: document.getElementById('password'),
    adminPassword: document.getElementById('adminPassword'),
    spectatorPassword: document.getElementById('spectatorPassword'),
    centralEntryListPath: document.getElementById('centralEntryListPath'),

    carGroup: document.getElementById('carGroup'),
    maxCarSlots: document.getElementById('maxCarSlots'),
    trackMedalsRequirement: document.getElementById('trackMedalsRequirement'),
    safetyRatingRequirement: document.getElementById('safetyRatingRequirement'),
    racecraftRatingRequirement: document.getElementById('racecraftRatingRequirement'),
    maxConnections: document.getElementById('maxConnections'),
    udpPort: document.getElementById('udpPort'),
    tcpPort: document.getElementById('tcpPort'),

    registerToLobby: document.getElementById('registerToLobby'),
    isRaceLocked: document.getElementById('isRaceLocked'),
    shortFormationLap: document.getElementById('shortFormationLap'),
    dumpLeaderboards: document.getElementById('dumpLeaderboards'),
    dumpEntryList: document.getElementById('dumpEntryList'),
    randomizeTrackWhenEmpty: document.getElementById('randomizeTrackWhenEmpty'),
    allowAutoDQ: document.getElementById('allowAutoDQ'),
    formationLapType: document.getElementById('formationLapType'),

    track: document.getElementById('track'),
    preRaceWaitingTimeSeconds: document.getElementById('preRaceWaitingTimeSeconds'),
    sessionOverTimeSeconds: document.getElementById('sessionOverTimeSeconds'),
    postQualySeconds: document.getElementById('postQualySeconds'),
    postRaceSeconds: document.getElementById('postRaceSeconds'),

    pitWindowLengthSec: document.getElementById('pitWindowLengthSec'),
    driverStintTimeSec: document.getElementById('driverStintTimeSec'),
    mandatoryPitstopCount: document.getElementById('mandatoryPitstopCount'),
    maxTotalDrivingTime: document.getElementById('maxTotalDrivingTime'),
    maxDriversCount: document.getElementById('maxDriversCount'),
    isRefuellingAllowedInRace: document.getElementById('isRefuellingAllowedInRace'),
    isRefuellingTimeFixed: document.getElementById('isRefuellingTimeFixed'),
    isMandatoryPitstopRefuellingRequired: document.getElementById('isMandatoryPitstopRefuellingRequired'),
    isMandatoryPitstopTyreChangeRequired: document.getElementById('isMandatoryPitstopTyreChangeRequired'),
    isMandatoryPitstopSwapDriverRequired: document.getElementById('isMandatoryPitstopSwapDriverRequired'),

    ambientTemp: document.getElementById('ambientTemp'),
    cloudLevel: document.getElementById('cloudLevel'),
    rain: document.getElementById('rain'),
    weatherRandomness: document.getElementById('weatherRandomness'),

    disableIdealLine: document.getElementById('disableIdealLine'),
    disableAutosteer: document.getElementById('disableAutosteer'),
    disableAutoPitLimiter: document.getElementById('disableAutoPitLimiter'),
    disableAutoGear: document.getElementById('disableAutoGear'),
    disableAutoEngineStart: document.getElementById('disableAutoEngineStart'),
    disableAutoWiper: document.getElementById('disableAutoWiper'),
    disableAutoLights: document.getElementById('disableAutoLights'),
    disableAutoClutch: document.getElementById('disableAutoClutch'),
    stabilityControlLevelMax: document.getElementById('stabilityControlLevelMax'),
}

const sessions = Array.from(elems.sessions);

elems.addSessionButton.addEventListener('click', ev => {
    const sessionElem = elems.sessions[0].cloneNode(true);
    prepareControlButtonEvents(sessionElem)
    elems.sessionsWrapper.append(sessionElem);
});

sessions.forEach((elem) => {
    prepareControlButtonEvents(elem);
});

const showPasswordButtonsArr = Array.from(elems.showPasswordButtons);

showPasswordButtonsArr.forEach(elem => {
    elem.addEventListener('click', ev => {
        const currType = inputElems[elem.getAttribute('data-id')].type;
        inputElems[elem.getAttribute('data-id')].type = currType === 'password' ? 'text' : 'password';
    });
});

elems.saveButton.addEventListener('click', ev => {
    document.body.style.cursor = 'progress';
    fetch('save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mapElementValues())
        })
        .then(() => {
            setTimeout(() => {
                document.body.style.cursor = 'default';
                window.location.href = '/';
            }, 500);
        })
        .catch(console.error);
});

elems.restartButton.addEventListener('click', ev => {
    document.body.style.cursor = 'progress';
    elems.restartButton.classList.add('active');
    fetch('/service/restart').then(() => {
        document.body.style.cursor = 'default';
        elems.restartButton.classList.remove('active');
    });
});

elems.startButton.addEventListener('click', ev => {
    document.body.style.cursor = 'progress';
    elems.startButton.classList.add('active');
    fetch('/service/start').then(() => {
        document.body.style.cursor = 'default';
        elems.startButton.classList.remove('active');
    });
});

elems.stopButton.addEventListener('click', ev => {
    document.body.style.cursor = 'progress';
    elems.stopButton.classList.add('active');
    fetch('/service/stop').then(() => {
        document.body.style.cursor = 'default';
        elems.stopButton.classList.remove('active');
    });
});

function prepareControlButtonEvents(elem) {
    elem.getElementsByClassName('moveUpSession')[0]
        .addEventListener('click', ev => {
            const elemBefore = elem.previousElementSibling;
            elems.sessionsWrapper.insertBefore(elem, elemBefore);
        });

    elem.getElementsByClassName('moveDownSession')[0]
        .addEventListener('click', ev => {
            const elemAfter = elem.nextElementSibling;
            if (elemAfter) {
                elems.sessionsWrapper.insertBefore(elem, elemAfter.nextElementSibling);
            } else {
                elems.sessionsWrapper.insertBefore(elem, elems.sessionsWrapper.firstChild);
            }
        });

    elem.getElementsByClassName('removeSession')[0]
        .addEventListener('click', ev => {
            elems.sessionsWrapper.removeChild(elem);
        });
}

const getStatus = () => {
    elems.status.style.color = 'var(--font-dark-clr)';
    fetch('/service/status')
        .then(response => response.text())
        .then(status => {
            if (!status) return;
            elems.status.innerText = status;
            elems.status.style.color = 'var(--font-clr)';
        }).catch(console.error);
};

const getLogs = () => {
    elems.logs.style.color = 'var(--font-dark-clr)';
    fetch('/service/log')
        .then(response => response.text())
        .then(logs => {
            if (!logs) return;
            const scrollToBottom = elems.logs.scrollTop == elems.logs.scrollHeight - elems.logs.offsetHeight;

            logs = logs
                .replace(/(==ERR:.*?<\/?br>)/g, '<span style="color:#ff433d">$1</span>')
                .replace(/(systemd\[\d\]+:)(.*?<\/?br>)/g, '$1<span style="color:#ff843d">$2</span>')
                .replace(/(RegisterToLobby succeeded|Lobby accepted connection<\/?br>)/g, '<span style="color:#64ff3d">$1</span>');

            elems.logs.innerHTML = logs;
            if (scrollToBottom) {
                elems.logs.scrollTop = elems.logs.scrollHeight;
            }
            elems.logs.style.color = 'var(--font-clr)';
        }).catch(console.error);
};

getStatus();
setInterval(getStatus, 7500);

getLogs();
setInterval(getLogs, 15000);

function mapElementValues() {
    return {
        settings: {
            serverName: inputElems.serverName.value,
            password: inputElems.password.value,
            adminPassword: inputElems.adminPassword.value,
            spectatorPassword: inputElems.spectatorPassword.value,
            centralEntryListPath: inputElems.centralEntryListPath.value,

            carGroup: inputElems.carGroup.value,
            maxCarSlots: parseInt(inputElems.maxCarSlots.value),
            trackMedalsRequirement: parseInt(inputElems.trackMedalsRequirement.value),
            safetyRatingRequirement: parseInt(inputElems.safetyRatingRequirement.value),
            racecraftRatingRequirement: parseInt(inputElems.racecraftRatingRequirement.value),

            isRaceLocked: inputElems.isRaceLocked.checked === true ? 1 : 0,
            shortFormationLap: inputElems.shortFormationLap.checked === true ? 1 : 0,
            dumpLeaderboards: inputElems.dumpLeaderboards.checked === true ? 1 : 0,
            dumpEntryList: inputElems.dumpEntryList.checked === true ? 1 : 0,
            randomizeTrackWhenEmpty: inputElems.randomizeTrackWhenEmpty.checked === true ? 1 : 0,
            allowAutoDQ: inputElems.allowAutoDQ.checked === true ? 1 : 0,
            formationLapType: parseInt(inputElems.formationLapType.value)
        },
        event: {
            track: inputElems.track.value,
            preRaceWaitingTimeSeconds: parseInt(inputElems.preRaceWaitingTimeSeconds.value),
            sessionOverTimeSeconds: parseInt(inputElems.sessionOverTimeSeconds.value),
            postQualySeconds: parseInt(inputElems.postQualySeconds.value),
            postRaceSeconds: parseInt(inputElems.postRaceSeconds.value),

            ambientTemp: parseInt(inputElems.ambientTemp.value),
            cloudLevel: parseFloat(inputElems.cloudLevel.value),
            rain: parseFloat(inputElems.rain.value),
            weatherRandomness: parseInt(inputElems.weatherRandomness.value),

            sessions: Array.from(elems.sessions).map((elem) => ({
                sessionType: elem.getElementsByClassName('sessionType')[0].value,
                dayOfWeekend: parseInt(elem.getElementsByClassName('dayOfWeekend')[0].value),
                hourOfDay: parseInt(elem.getElementsByClassName('hourOfDay')[0].value),
                timeMultiplier: parseInt(elem.getElementsByClassName('timeMultiplier')[0].value),
                sessionDurationMinutes: parseInt(elem.getElementsByClassName('sessionDurationMinutes')[0].value)
            })),
        },
        eventRules: {
            pitWindowLengthSec: parseInt(inputElems.pitWindowLengthSec.value),
            driverStintTimeSec: parseInt(inputElems.driverStintTimeSec.value),
            mandatoryPitstopCount: parseInt(inputElems.mandatoryPitstopCount.value),
            maxTotalDrivingTime: parseInt(inputElems.maxTotalDrivingTime.value),
            maxDriversCount: parseInt(inputElems.maxDriversCount.value),
            isRefuellingAllowedInRace: inputElems.isRefuellingAllowedInRace.checked === true ? 1 : 0,
            isRefuellingTimeFixed: inputElems.isRefuellingTimeFixed.checked === true ? 1 : 0,
            isMandatoryPitstopRefuellingRequired: inputElems.isMandatoryPitstopRefuellingRequired.checked === true ? 1 : 0,
            isMandatoryPitstopTyreChangeRequired: inputElems.isMandatoryPitstopTyreChangeRequired.checked === true ? 1 : 0,
            isMandatoryPitstopSwapDriverRequired: inputElems.isMandatoryPitstopSwapDriverRequired.checked === true ? 1 : 0,
        },
        assistRules: {
            disableIdealLine: inputElems.disableIdealLine.checked === false ? 1 : 0,
            disableAutosteer: inputElems.disableAutosteer.checked === false ? 1 : 0,
            disableAutoPitLimiter: inputElems.disableAutoPitLimiter.checked === false ? 1 : 0,
            disableAutoGear: inputElems.disableAutoGear.checked === false ? 1 : 0,
            disableAutoEngineStart: inputElems.disableAutoEngineStart.checked === false ? 1 : 0,
            disableAutoWiper: inputElems.disableAutoWiper.checked === false ? 1 : 0,
            disableAutoLights: inputElems.disableAutoLights.checked === false ? 1 : 0,
            disableAutoClutch: inputElems.disableAutoClutch.checked === false ? 1 : 0,
            stabilityControlLevelMax: parseInt(inputElems.stabilityControlLevelMax.value),
        },
        configuration: {
            registerToLobby: inputElems.registerToLobby.checked === true ? 1 : 0,
            maxConnections: parseInt(inputElems.maxConnections.value),
            udpPort: parseInt(inputElems.udpPort.value),
            tcpPort: parseInt(inputElems.tcpPort.value)
        }
    };
}