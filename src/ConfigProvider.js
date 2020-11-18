'use strict';
const fs = require('fs');
const settings = require('./Settings').getSettings();

const files = {
    settings: settings.cfgPath + 'settings.json',
    configuration: settings.cfgPath + 'configuration.json',
    event: settings.cfgPath + 'event.json',
    eventRules: settings.cfgPath + 'eventRules.json',
    assistRules: settings.cfgPath + 'assistRules.json'
}

let config = {};

const load = () => {
    config = {
        settings: fs.existsSync(files.settings) ? JSON.parse(fs.readFileSync(files.settings, {encoding: 'utf16le'}).toString()) : {},
        configuration: fs.existsSync(files.configuration) ? JSON.parse(fs.readFileSync(files.configuration, {encoding: 'utf16le'}).toString()) : {},
        event: fs.existsSync(files.event) ? JSON.parse(fs.readFileSync(files.event, {encoding: 'utf16le'}).toString()) : {},
        eventRules: fs.existsSync(files.eventRules) ? JSON.parse(fs.readFileSync(files.eventRules, {encoding: 'utf16le'}).toString()) : {},
        assistRules: fs.existsSync(files.assistRules) ? JSON.parse(fs.readFileSync(files.assistRules, {encoding: 'utf16le'}).toString()) : {},
    };
}

const save = (newconfig) => {
    config = newconfig;
    newconfig.settings.configVersion = 1;
    newconfig.configuration.configVersion = 1;
    newconfig.event.configVersion = 1;
    fs.writeFileSync(files.settings, JSON.stringify(newconfig.settings, undefined, 4), {encoding: 'utf16le'});
    fs.writeFileSync(files.configuration, JSON.stringify(newconfig.configuration, undefined, 4), {encoding: 'utf16le'});
    fs.writeFileSync(files.event, JSON.stringify(newconfig.event, undefined, 4), {encoding: 'utf16le'});
    fs.writeFileSync(files.eventRules, JSON.stringify(newconfig.eventRules, undefined, 4), {encoding: 'utf16le'});
    fs.writeFileSync(files.assistRules, JSON.stringify(newconfig.assistRules, undefined, 4), {encoding: 'utf16le'});
}

load();

module.exports = {
    get: () => config,
    refresh: load,
    save: save
};