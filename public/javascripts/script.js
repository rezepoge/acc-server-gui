'use strict';

const elems = {
    addSessionButton: document.getElementById('addSession'),
    removeSessionButton: document.getElementById('removeSession'),
    sessionsWrapper: document.getElementById('sessions'),
    sessions: document.getElementsByClassName('session'),
    saveButton: document.getElementById('save'),
    restartButton: document.getElementById('restart'),
    startButton: document.getElementById('start'),
    stopButton: document.getElementById('stop'),
    status: document.getElementById('status'),
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

elems.addSessionButton.addEventListener('click', ev => {
    const sessionElem = document.createElement('div');
    sessionElem.className = 'session';
    sessionElem.innerHTML = elems.sessions[0].innerHTML
        .replace(/_[\d+$]/g, `_${elems.sessions.length}`);
    elems.sessionsWrapper.append(sessionElem);
});

elems.removeSessionButton.addEventListener('click', ev => {
    if (elems.sessions.length > 1) {
        elems.sessionsWrapper.removeChild(elems.sessionsWrapper.lastChild)
    }
});

elems.saveButton.addEventListener('click', ev => {
    fetch('save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mapElementValues())
        })
        .then(() => {
            document.body.style.cursor = 'progress';
            setTimeout(() => {
                document.body.style.cursor = 'default';
                window.location.href = '/';
            }, 500);
        })
        .catch(console.error);
});

elems.restartButton.addEventListener('click', ev => {
    fetch('/service/restart');
});

elems.startButton.addEventListener('click', ev => {
    fetch('/service/start');
});

elems.stopButton.addEventListener('click', ev => {
    fetch('/service/stop');
});

const getStatus = () => {
    elems.status.style.color = '#CCCCCC';
    fetch('/service/status')
        .then(response => response.json())
        .then(json => {
            elems.status.innerText = json.status;
            elems.status.style.color = '#FFFFFF';
        });
};

getStatus();
setInterval(getStatus, 15000);

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

            sessions: Array.from(elems.sessions).map((elem, index) => ({
                sessionType: document.getElementById('sessionType_' + index).value,
                dayOfWeekend: parseInt(document.getElementById('dayOfWeekend_' + index).value),
                hourOfDay: parseInt(document.getElementById('hourOfDay_' + index).value),
                timeMultiplier: parseInt(document.getElementById('timeMultiplier_' + index).value),
                sessionDurationMinutes: parseInt(document.getElementById('sessionDurationMinutes_' + index).value)
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