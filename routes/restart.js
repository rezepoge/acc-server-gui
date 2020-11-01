const express = require('express');
const router = express.Router();
const shell = require('shelljs');

router.get('/', function(req, res, next) {
    shell.exec('systemctl restart acc-server', {
        silent: true
    }).stdout.replace(/(\r\n|\n|\r)/gm, '')
  res.status(200).send();
});

module.exports = router;
