// TODO: メインプロセスとレンダラプロセスで共通のファイルシステムを作成
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
      // ビュー側にファイルから読み込んだテキストを送信
      BrowserWindow.getFocusedWindow().webContents.send('send-text', text.toString());
      BrowserWindow.getFocusedWindow().webContents.send('send-path', currentPath);
    });
  }

  writeFile(path, data) {
    fs.writeFile(path, data, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  openFile() {
    const options = {
      title: 'Open file',
      filters: [
        { name: 'Markdown File', extensions: ['md'] },
      ],
      properties: ['openFile'],
    };

    /**
     * NOTE: 同クラスのメソッドを使うためにthisをバインド
     */
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

  saveFile(data) {
    const options = {
      title: 'Save file',
      filters: [
        { name: 'Markdown File', extensions: ['md'] },
      ],
      properties: ['openFile'],
    };

    const self = this;

    dialog.showSaveDialog(
      BrowserWindow.getFocusedWindow(),
      options,
      function (fileName) {
        if (fileName) {
          self.writeFile(fileName, data);
        }
      }
    );
  }
}

module.exports = FileSystem;
