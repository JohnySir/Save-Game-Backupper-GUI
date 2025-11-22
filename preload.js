
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog'),
  applySettings: (settings) => ipcRenderer.send('settings-applied', settings),
  togglePauseResume: () => ipcRenderer.send('pause-resume-toggle'),
  onTimerUpdate: (callback) => ipcRenderer.on('timer-update', (event, ...args) => callback(...args)),
  onTimerState: (callback) => ipcRenderer.on('timer-state', (event, ...args) => callback(...args)),
  onBackupStatus: (callback) => ipcRenderer.on('backup-status', (event, ...args) => callback(...args)),
});
