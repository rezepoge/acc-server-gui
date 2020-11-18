const express = require('express');
const router = express.Router();
const settingsProvider = require('../src/Settings');
const accConfig = require('../src/ConfigProvider')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Assetto Corsa Competizione Server GUI',
    settings: settingsProvider.getSettings(),
    basics: settingsProvider.getBasics(),
    accConfig: accConfig.get()
  });
});

module.exports = router;