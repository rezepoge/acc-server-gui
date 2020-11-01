const express = require('express');
const router = express.Router();
const settings = require('../src/Settings').get();
const accConfig = require('../src/ConfigProvider')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Assetto Corsa Competizione Server GUI',
    settings: settings,
    accConfig: accConfig.get()
  });
});

module.exports = router;