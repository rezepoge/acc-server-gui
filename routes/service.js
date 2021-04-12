const express = require('express');
const router = express.Router();
const shell = require('shelljs');

router.get('/restart', function (req, res, next) {
  shell.exec('systemctl restart acc-server.service', {
    silent: true
  });
  res.status(200).send();
});

router.get('/start', function (req, res, next) {
  shell.exec('systemctl start acc-server.service', {
    silent: true
  });
  res.status(200).send();
});

router.get('/stop', function (req, res, next) {
  shell.exec('systemctl stop acc-server.service', {
    silent: true
  });
  res.status(200).send();
});

router.get('/status', function (req, res, next) {
  const status = shell.exec('systemctl status acc-server.service | grep -Po \'(?<=Active: ).*\'', {
    silent: true
  }).stdout.replace(/(\r\n|\n|\r)/gm, '');
  res.json({
    status
  });
});

router.get('/log', function (req, res, next) {
  const logs = shell.exec('journalctl -u acc-server.service -n 1999 | grep -vP \'not enough CPU power|-- Logs begin at\'', {
    silent: true
  }).stdout.replace(/(\r\n|\n|\r)/gm, '</br>');
  res.json({
    logs
  });
});

module.exports = router;