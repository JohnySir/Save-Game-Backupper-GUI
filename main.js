
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs-extra');

let mainWindow;
let backupIntervalId;
let timerId;
let remainingTime;
let isPaused = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 755,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.setMenu(null);

  let isResizing = false;
  const aspectRatio = 755 / 650;

  mainWindow.on('resize', () => {
    if (isResizing) {
      isResizing = false;
      return;
    }

    const [width, height] = mainWindow.getSize();
    const newHeight = Math.round(width / aspectRatio);

    if (height !== newHeight) {
      isResizing = true;
      mainWindow.setSize(width, newHeight, false);
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('open-folder-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  });
  return result.filePaths[0];
});

ipcMain.on('settings-applied', (event, settings) => {
  clearInterval(backupIntervalId);
  clearInterval(timerId);
  isPaused = false;
  mainWindow.webContents.send('timer-state', 'resumed');


  const intervalMilliseconds =
    settings.intervalUnit === 'seconds'
      ? settings.interval * 1000
      : settings.interval * 60 * 1000;

  remainingTime = intervalMilliseconds;
  
  const performBackup = () => {
    const source = settings.source;
    const destination = settings.destination;

    if (!source || !destination) {
      return;
    }
    
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupFolderName = `${path.basename(source)}_${timestamp}`;
    const backupFolderPath = path.join(destination, backupFolderName);

    fs.copy(source, backupFolderPath)
      .then(() => {
        mainWindow.webContents.send('backup-status', { success: true, path: backupFolderPath });
      })
      .catch(err => {
        mainWindow.webContents.send('backup-status', { success: false, error: err.message });
      });
  };

  backupIntervalId = setInterval(() => {
    if (!isPaused) {
      performBackup();
      remainingTime = intervalMilliseconds;
    }
  }, intervalMilliseconds);

  timerId = setInterval(() => {
    if (!isPaused) {
      remainingTime -= 1000;
      if (remainingTime < 0) {
        remainingTime = intervalMilliseconds;
      }
      mainWindow.webContents.send('timer-update', remainingTime);
    }
  }, 1000);
  
  performBackup();
});

ipcMain.on('pause-resume-toggle', () => {
  isPaused = !isPaused;
  const state = isPaused ? 'paused' : 'resumed';
  mainWindow.webContents.send('timer-state', state);
});


