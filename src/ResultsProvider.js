'use strict';
const fs = require('fs');
const fsp = require('fs').promises;
const async = require('async');
const settings = require('./Settings').getSettings();
const resultsPath = settings.accServerPath + 'results/';

async function readResults() {
    const results = [];
    const resultFiles = await fsp.readdir(resultsPath);

    await async.forEach(resultFiles, async resultFile => {
        const resultDataJson = await fsp.readFile(resultsPath + resultFile, {
            encoding: 'utf16le'
        });
        const resultDataObj = JSON.parse(resultDataJson.toString().trim());
        resultDataObj['datetime'] = fileNameToDateTime(resultFile);
        results.push(resultDataObj);
    });


    const resultsFiltered = results.filter(elem => elem.sessionResult.leaderBoardLines.length > 0);
    resultsFiltered.sort((a, b) => b.datetime.getTime() - a.datetime.getTime());

    return resultsFiltered;
}

function fileNameToDateTime(filename) {
    if (!filename || typeof filename !== 'string') {
        return;
    }

    const [dateStr, timeStr] = filename.split('_');

    const datetimeStr = '20' + splitNChars(dateStr, 2).join('-') + 'T' + splitNChars(timeStr, 2).join(':');

    return new Date(datetimeStr);
}

function splitNChars(txt, num) {
    const result = [];

    for (let i = 0; i < txt.length; i += num) {
        result.push(txt.substr(i, num));
    }

    return result;
}

module.exports = {
    readResults
}