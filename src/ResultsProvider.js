'use strict';
const fs = require('fs');
const fsp = require('fs').promises;
const async = require('async');
const settings = require('./Settings').getSettings();
const resultsPath = settings.accServerPath + 'results/';
let resultsArr = [];
let cachedResultFilesArr = [];

async function readResults() {
    let resultFilesArr = await fsp.readdir(resultsPath);

    const resultFilesArrLength = resultFilesArr.length;
    const cachedResultFilesArrLength = cachedResultFilesArr.length;

    if (cachedResultFilesArrLength === resultFilesArrLength) {
        return resultsArr;
    }

    if (cachedResultFilesArrLength) {
        resultFilesArr = resultFilesArr
            .filter((elem, index) => elem !== cachedResultFilesArr[index]);
    }

    cachedResultFilesArr = cachedResultFilesArr.concat(resultFilesArr);

    await async.forEach(resultFilesArr, async resultFile => {
        const resultDataJson = await fsp.readFile(resultsPath + resultFile, {
            encoding: 'utf16le'
        });
        const resultDataObj = JSON.parse(resultDataJson.toString().trim());
        resultDataObj['datetime'] = fileNameToDateTime(resultFile);
        resultsArr.push(resultDataObj);
    });


    resultsArr = resultsArr
        .filter(elem => elem.sessionResult.leaderBoardLines.length > 0 && elem.laps.length > 0)
        .sort((a, b) => b.datetime.getTime() - a.datetime.getTime());

    return resultsArr;
}

module.exports = {
    readResults
}

function fileNameToDateTime(filename) {
    if (!filename || typeof filename !== 'string') {
        return;
    }

    const [dateStr, timeStr] = filename.split('_');

    return new Date('20' + splitNChars(dateStr, 2).join('-') + 'T' + splitNChars(timeStr, 2).join(':'));
}

function splitNChars(txt, num) {
    const result = [];

    for (let i = 0; i < txt.length; i += num) {
        result.push(txt.substr(i, num));
    }

    return result;
}