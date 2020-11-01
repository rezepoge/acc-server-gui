const express = require('express');
const router = express.Router();
const accConfig = require('../src/ConfigProvider');

router.post('/', function(req, res, next) {
  accConfig.save(req.body);
  res.status(200).send();
});

module.exports = router;
