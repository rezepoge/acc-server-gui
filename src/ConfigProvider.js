'use strict';
const fs = require('fs');
const settings = require('./Settings').getSettings();
const cfgPath = settings.accServerPath + 'cfg/';

const files = {
    settings: cfgPath + 'settings.json',
    configuration: cfgPath + 'configuration.json',
    event: cfgPath + 'event.json',
    eventRules: cfgPath + 'eventRules.json',
    assistRules: cfgPath + 'assistRules.json'
}

let config = {};

const load = () => {
    const settingsData = fs.existsSync(files.settings) ? fs.readFileSync(files.settings, {
        encoding: 'utf16le'
    }).toString().trim() : '';

    const configurationData = fs.existsSync(files.configuration) ? fs.readFileSync(files.configuration, {
        encoding: 'utf16le'
    }).toString().trim() : '';

    const eventData = fs.existsSync(files.event) ? fs.readFileSync(files.event, {
        encoding: 'utf16le'
    }).toString().trim() : '';

    const eventRulesData = fs.existsSync(files.eventRules) ? fs.readFileSync(files.eventRules, {
        encoding: 'utf16le'
    }).toString().trim() : '';

    const assistRulesData = fs.existsSync(files.assistRules) ? fs.readFileSync(files.assistRules, {
        encoding: 'utf16le'
    }).toString().trim() : '';

    try {
        config = {
            settings: JSON.parse(settingsData),
            configuration: JSON.parse(configurationData),
            event: JSON.parse(eventData),
            eventRules: JSON.parse(eventRulesData),
            assistRules: JSON.parse(assistRulesData),
        };
    } catch (ex) {
        console.info(cfgPath);
        console.error(ex.stack);
    }
}

const save = (newconfig) => {
    config = newconfig;
    newconfig.settings.ignorePrematureDisconnects = 0;
    newconfig.settings.configVersion = 1;
    newconfig.configuration.lanDiscovery = 1;
    newconfig.configuration.configVersion = 1;
    newconfig.event.configVersion = 1;
    fs.writeFileSync(files.settings, JSON.stringify(newconfig.settings, undefined, 4), {
        encoding: 'utf16le'
    });
    fs.writeFileSync(files.configuration, JSON.stringify(newconfig.configuration, undefined, 4), {
        encoding: 'utf16le'
    });
    fs.writeFileSync(files.event, JSON.stringify(newconfig.event, undefined, 4), {
        encoding: 'utf16le'
    });
    fs.writeFileSync(files.eventRules, JSON.stringify(newconfig.eventRules, undefined, 4), {
        encoding: 'utf16le'
    });
    fs.writeFileSync(files.assistRules, JSON.stringify(newconfig.assistRules, undefined, 4), {
        encoding: 'utf16le'
    });
}

load();

module.exports = {
    get: () => config,
    refresh: load,
    save: save
};