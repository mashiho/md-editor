const electron = require('electron');
const FileSystem = require('./models/file_system');

const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
} = electron;

let mainWindow;

const menu = Menu.buildFromTemplate([
  {
    label: 'Markdown editor',
    submenu: [
      { label: 'About', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'Command+Q', click() { app.quit(); } },
    ],
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'New File',
        accelerator: 'CmdOrCtrl+N',
        click() {
          FileSystem.newFile();
        },
      },
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click() {
          FileSystem.openFile();
        },
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click() {
          mainWindow.webContents.send('getData', '');
          /**
           * NOTE: レンダラプロセスで読み込んだファイルのテキストとパスを受信
           */
          ipcMain.on('setData', (event, data) => {
            if (data.path === 'Undefined.md') {
              FileSystem.saveFile(data.markdown);
            } else {
              FileSystem.saveFile(data.markdown, data.path);
            }
          });
        },
      },
      {
        label: 'Save As...',
        click() {
          mainWindow.webContents.send('getData', '');
          /**
           * NOTE: レンダラプロセスで読み込んだファイルのテキストとパスを受信
           */
          ipcMain.on('setData', (event, data) => {
            FileSystem.saveFile(data.markdown);
          });
        },
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'CmdOrCtrl+Y', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
    ],
  },
  // {
  //   label: 'Develop',
  //   submenu: [
  //     {
  //       label: 'Toggle Developer Tools',
  //       accelerator: 'Alt+Command+I',
  //       click: function () {
  //         mainWindow.toggleDevTools();
  //       },
  //     },
  //   ],
  // },
]);

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({ left: 0, top: 0, width: width, height: height });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Menu.setApplicationMenu(menu);

  // NOTE: デバッグ用
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
  Menu.setApplicationMenu(menu);
});

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
