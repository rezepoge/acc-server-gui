const express = require('express');
const router = express.Router();
const settingsProvider = require('../src/Settings');
const accConfig = require('../src/ConfigProvider');
const version = require('../package.json').version;

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'ACC Server GUI',
    settings: settingsProvider.getSettings(),
    basics: settingsProvider.getBasics(),
    accConfig: accConfig.get(),
    version
  });
});

module.exports = router;