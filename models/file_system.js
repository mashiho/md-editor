const fs = require('fs');
const electron = require('electron');

const {
  BrowserWindow,
  dialog,
} = electron;

class FileSystem {

  static readFile(path) {
    const currentPath = path;

    fs.readFile(path, (error, text) => {
      if (error) {
        console.log(error);
        return;
      }
      // ビュー側にファイルから読み込んだテキストを送信
      const data = {
        text: text.toString(),
        path: currentPath,
      };
      BrowserWindow.getFocusedWindow().webContents.send('setData', data);
    });
  }

  static writeFile(path, data) {
    fs.writeFile(path, data, (error) => {
      if (error) {
        console.log(error);
      }
      const completeData = {
        text: data,
        markdown: data,
        path,
      };
      BrowserWindow.getFocusedWindow().webContents.send('setData', completeData);
    });
  }

  static newFile() {
    const options = {
      type: 'info',
      title: 'Information',
      message: 'Creating a new file. Is it to abandon all edits?',
      buttons: ['Yes', 'No'],
    };

    const index = dialog.showMessageBox(BrowserWindow.getFocusedWindow(), options);
    if (index === 0) {
      const data = {
        text: '',
        path: 'Undefined.md',
      };
      BrowserWindow.getFocusedWindow().webContents.send('setData', data);
    }
  }

  static openFile() {
    const options = {
      title: 'Open file',
      filters: [
        { name: 'Markdown File', extensions: ['md'] },
      ],
      properties: ['openFile'],
    };

    dialog.showOpenDialog(
      BrowserWindow.getFocusedWindow(),
      options,
      (fileNames) => {
        if (fileNames) {
          this.readFile(fileNames[0]);
        }
      }
    );
  }

  static saveFile(data, path = null) {
    if (path) {
      this.writeFile(path, data);
    } else {
      const options = {
        title: 'Save file',
        filters: [
          { name: 'Markdown File', extensions: ['md'] },
        ],
        properties: ['openFile'],
      };

      dialog.showSaveDialog(
        BrowserWindow.getFocusedWindow(),
        options,
        (fileName) => {
          if (fileName) {
            this.writeFile(fileName, data);
          }
        }
      );
    }
  }
}

module.exports = FileSystem;
