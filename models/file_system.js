const fs = require('fs');
const electron = require('electron');

const {
  BrowserWindow,
  dialog,
} = electron;

class FileSystem {
  constructor() {

  }

  readFile(path) {
    const currentPath = path;

    fs.readFile(path, function (error, text) {
      if (error) {
        console.log(error);
        return;
      }

      BrowserWindow.getFocusedWindow().webContents.send('send-text', text.toString());

    });
  }

  openFile() {
    const options = {
      title: 'ファイルを開く',
      filters: [
        { name: 'Markdown File', extensions: ['md'] },
      ],
      properties: ['openFile'],
    };
    const self = this;

    dialog.showOpenDialog(
      BrowserWindow.getFocusedWindow(),
      options,
      function (fileNames) {
        if (fileNames) {
          self.readFile(fileNames[0]);
        }
      }
    );
  }
}

module.exports = FileSystem;
