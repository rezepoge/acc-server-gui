const express = require('express');
const router = express.Router();
const shell = require('shelljs');
const isWin = process.platform === "win32";
const DEBUG_STATUS = 'active (running) since Wed 2021-04-21 13:54:48 CEST; 1h 17min ago';
const DEBUG_LOGS = 'Apr 21 13:39:18 RezeServer wine[6854]: Udp message count (0 clients): 23=7,</br>Apr 21 13:40:09 RezeServer wine[6854]: Udp message count (0 clients): 23=3,</br>Apr 21 13:54:38 RezeServer systemd[1]: Stopping ACC Server...</br>Apr 21 13:54:38 RezeServer systemd[1]: acc-server.service: Main process exited, code=killed, status=15/TERM</br>Apr 21 13:54:48 RezeServer systemd[1]: acc-server.service: State \'stop-final-sigterm\' timed out. Killing.</br>Apr 21 13:54:48 RezeServer systemd[1]: acc-server.service: Killing process 6909 (winedevice.exe) with signal SIGKILL.</br>Apr 21 13:54:48 RezeServer wine[6854]: Server was running late for 1 step(s), not enough CPU p</br>Apr 21 13:54:48 RezeServer systemd[1]: acc-server.service: Failed with result \'timeout\'.</br>Apr 21 13:54:48 RezeServer systemd[1]: Stopped ACC Server.</br>Apr 21 13:54:48 RezeServer systemd[1]: Started ACC Server.</br>Apr 21 13:54:53 RezeServer wine[27965]: Server starting with version 255</br>Apr 21 13:54:53 RezeServer wine[27965]: Starting server [DE] RezeRacing | Discord: reze.li/dc</br>Apr 21 13:54:53 RezeServer wine[27965]: ==ERR: dumpEntryList is set to true, but is a public server. Will not dump entry lists</br>Apr 21 13:54:53 RezeServer wine[27965]: Joining during race is allowed</br>Apr 21 13:54:53 RezeServer wine[27965]: FileToStruct cfg/eventRules.json</br>Apr 21 13:54:53 RezeServer wine[27965]: Translated realtime interval hzToMiliseconds(18)=54</br>Apr 21 13:54:53 RezeServer wine[27965]: [1B blob data]</br>Apr 21 13:54:53 RezeServer wine[27965]: SessionManager::randomizeGreenFlagTriggers: s:0.890000 e:0.950000 r:0.949573</br>Apr 21 13:54:53 RezeServer wine[27965]: Track oulton_park_2019 was set and updated</br>Apr 21 13:54:53 RezeServer wine[27965]: Event changed</br>Apr 21 13:54:53 RezeServer wine[27965]: ==ERR: Ignoring special event rules for public Multiplayer<br>Apr 21 13:54:53 RezeServer wine[27965]: ==ERR: Ignoring special assist rules for public Multiplayer</br>Apr 21 13:54:53 RezeServer wine[27965]: SessionManager::randomizeGreenFlagTriggers: s:0.890000 e:0.950000 r:0.897339</br>Apr 21 13:54:53 RezeServer wine[27965]: Significant change detected, updating lobby (1|1)</br>Apr 21 13:54:53 RezeServer wine[27965]: Resetting weekend to friday night</br>Apr 21 13:54:53 RezeServer wine[27965]: Reset time to friday night: 0 -> 0</br>Apr 21 13:55:02 RezeServer wine[27965]: Reset time to first session: 0 -> 126000</br>Apr 21 13:55:02 RezeServer wine[27965]: SessionManager::randomizeGreenFlagTriggers: s:0.890000 e:0.950000 r:0.892247</br>Apr 21 13:55:02 RezeServer wine[27965]: Listening to TCP 9232 | UDP 9231</br>Apr 21 13:55:02 RezeServer wine[27965]: Trying to connect to lobby (0 times, interval 10000 s)</br>Apr 21 13:55:02 RezeServer wine[27965]: Session changed: Practice -> Practice 0</br>Apr 21 13:55:02 RezeServer wine[27965]: Detected sessionPhase -> (Practice)</br>Apr 21 13:55:56 RezeServer wine[27965]: TCP connect returns: -1</br>Apr 21 13:55:56 RezeServer wine[27965]: TCP connect returns: 0</br>Apr 21 13:55:56 RezeServer wine[27965]: ==ERR: RegisterToLobby TCP connection failed, couldn\'t connect to the lobby server</br>Apr 21 13:55:56 RezeServer wine[27965]: Trying to connect to lobby (1 times, interval 10000 s)</br>Apr 21 13:55:56 RezeServer wine[27965]: RegisterToLobby succeeded</br>Apr 21 13:55:56 RezeServer wine[27965]: ==ERR: This server is only supported on Windows operating systems. Running WINE may work dependent on your settings, but there are differences that affect the user\'s experience negatively.</br>Apr 21 13:55:56 RezeServer wine[27965]: Sent lobby registration request for oulton_park_2019</br>Apr 21 13:55:56 RezeServer wine[27965]: Lobby accepted connection</br>Apr 21 13:55:56 RezeServer wine[27965]: TCPQueue now: 4</br>Apr 21 13:55:56 RezeServer wine[27965]: New TCP incoming pakSizeMax, 0 => 2</br>Apr 21 13:55:56 RezeServer wine[27965]: Updated lobby with 0 drivers</br>Apr 21 13:55:56 RezeServer wine[27965]: Udp message count (0 clients): 23=2,</br>Apr 21 13:57:01 RezeServer wine[27965]: Udp message count (0 clients): 23=5,</br>Apr 21 13:57:56 RezeServer wine[27965]: Udp message count (0 clients): 23=6,</br>Apr 21 13:59:01 RezeServer wine[27965]: Udp message count (0 clients): 23=5,</br>Apr 21 14:00:00 RezeServer wine[27965]: Udp message count (0 clients): 23=9,';

router.get('/restart', function (req, res, next) {
  if (isWin) {
    res.status(204).send();
    return;
  }

  shell.exec('systemctl restart acc-server.service', {
    silent: true
  });

  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    .status(200).send();
});

router.get('/start', function (req, res, next) {
  if (isWin) {
    res.status(204).send();
    return;
  }

  shell.exec('systemctl start acc-server.service', {
    silent: true
  });

  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    .status(200).send();
});

router.get('/stop', function (req, res, next) {
  if (isWin) {
    res.status(204).send();
    return;
  }

  shell.exec('systemctl stop acc-server.service', {
    silent: true
  });

  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    .status(200).send();
});

router.get('/status', function (req, res, next) {
  if (isWin) {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .send(DEBUG_STATUS);
    return;
  }

  const status = shell.exec('systemctl status acc-server.service | grep -Po \'(?<=Active: ).*\'', {
    silent: true
  }).stdout.replace(/(\r\n|\n|\r)/gm, '');

  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    .send(status);
});

router.get('/log', function (req, res, next) {
  if (isWin) {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .send(DEBUG_LOGS);
    return;
  }

  const logs = shell.exec('journalctl -u acc-server.service -n 1999 | grep -vP \'not enough CPU power|-- Logs begin at\'', {
    silent: true
  }).stdout.replace(/(\r\n|\n|\r)/gm, '</br>');

  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    .send(logs);
});

module.exports = router;