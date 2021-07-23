# Assetto Corsa Competizione - Server GUI

Graphical user interface for managing an ACC Server on linux.

Also has an results overview to easily view the leaderboard files. 

## Installation

```bash
git clone https://github.com/rezepoge/acc-server-gui.git
cd acc-server-gui
cp settings.default.json settings.json
```
  
 change "./" at "accServerPath" in settings.json to the path where your acc server is located
 
```bash
npm i
```

## Usage

The default port is 3000 if you dont want to change this, you can start the app with:

```bash
npm start
```

if you prefer an other port you have to set the PORT env var

for example like this:
```bash
PORT=8080;npm start
```
