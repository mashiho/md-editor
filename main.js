const electron = require('electron');

const {
  app,
  BrowserWindow,
  Menu,
} = electron;

let mainWindow;

const menu = Menu.buildFromTemplate([
  {
    label: 'Markdown editor',
    submenu: [
      { label: 'About' },
      { label: 'Quit' },
    ],
  },
  {
    label: 'File',
    submenu: [
      { label: 'New File' },
      { label: 'Save' },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Copy', accelerator: 'Command+C', selector: 'copy' },
      { label: 'Paste', accelerator: 'Command+V', selector: 'paste' },
    ],
  },
  {
    label: 'Develop',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: function () {
          mainWindow.toggleDevTools();
        },
      },
    ],
  },
]);

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({ left: 0, top: 0, width: width, height: height });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  Menu.setApplicationMenu(menu);

  // NOTE: デバッグ用
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
