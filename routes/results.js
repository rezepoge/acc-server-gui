const express = require('express');
const router = express.Router();
const settingsProvider = require('../src/Settings');
const resultsProvider = require('../src/ResultsProvider');
const version = require('../package.json').version;


router.get('/', async function (req, res, next) {
  const results = await resultsProvider.readResults();
  res.render('results', {
    title: 'Assetto Corsa Competizione Server GUI',
    basics: settingsProvider.getBasics(),
    results,
    version
  });
});

module.exports = router;