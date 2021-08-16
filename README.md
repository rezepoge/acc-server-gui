# Assetto Corsa Competizione - Server GUI

Graphical user interface for managing an ACC Server on linux.

Also has an results overview to easily view the leaderboard files.

![image](https://user-images.githubusercontent.com/41818576/126794080-d1836b63-37f5-4d8c-97f3-a8f58f007e59.png)
![image](https://user-images.githubusercontent.com/41818576/126794131-12ae89b6-b867-4e9e-abaa-518aff14b5f4.png)
![image](https://user-images.githubusercontent.com/41818576/126794202-fea86b57-3446-4a86-ae2f-7376ef27d926.png)

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
