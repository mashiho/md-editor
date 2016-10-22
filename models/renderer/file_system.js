// TODO: メインプロセスとレンダラプロセスで共通のファイルシステムを作成
const fs = require('fs');
const electron = require('electron');

const {
  BrowserWindow,
  dialog,
  remote,
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
      const data = {
        text: text.toString(),
        path: currentPath,
      };
      remote.BrowserWindow.getFocusedWindow().webContents.send('setData', data);
    });
  }

  writeFile(path, data) {
    fs.writeFile(path, data, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  newFile() {
    const data = {
      text: '',
      markdown: '',
      path: 'Undefined.md',
    };
    remote.BrowserWindow.getFocusedWindow().webContents.send('setData', data);
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

    remote.dialog.showOpenDialog(
      remote.BrowserWindow.getFocusedWindow(),
      options,
      function (fileNames) {
        if (fileNames) {
          self.readFile(fileNames[0]);
        }
      }
    );
  }

  saveFile(data, path = null) {
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

      const self = this;

      remote.dialog.showSaveDialog(
        remote.BrowserWindow.getFocusedWindow(),
        options,
        function (fileName) {
          if (fileName) {
            self.writeFile(fileName, data);
          }
        }
      );
    }
  }
}

module.exports = FileSystem;
