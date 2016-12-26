const fs = require('fs');
const electron = require('electron');

const {
  BrowserWindow,
  dialog,
} = electron;

class FileSystem {

  static readFile(path) {
    const text = fs.readFileSync(path);

    // ビュー側にファイルから読み込んだテキストを送信
    const data = {
      text: text.toString(),
      path: path,
    };
    BrowserWindow.getFocusedWindow().webContents.send('readFile', data);
  }

  static writeFile(path, text) {
    // TODO: ファイル書き込みが失敗したときのエラーハンドリング追加
    fs.writeFileSync(path, text);

    const data = {
      text,
      path,
    };

    BrowserWindow.getFocusedWindow().webContents.send('saveFile', data);
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
      BrowserWindow.getFocusedWindow().webContents.send('clearText', data);
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

    const fileNames = dialog.showOpenDialog(
      BrowserWindow.getFocusedWindow(),
      options
    );

    if (fileNames) {
      this.readFile(fileNames[0]);
    }
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

      const fileName = dialog.showSaveDialog(
        BrowserWindow.getFocusedWindow(),
        options
      );

      if (fileName) {
        this.writeFile(fileName, data);
      }
    }
  }

  static saveAsFile(data) {
    const options = {
      title: 'Save As file',
      filters: [
        { name: 'Markdown File', extensions: ['md'] },
      ],
      properties: ['openFile'],
    };

    const fileName = dialog.showSaveDialog(
      BrowserWindow.getFocusedWindow(),
      options
    );
    
    // ファイルパスが取得できなかったときのエラーハンドリング追加
    if (fileName) {
      this.writeFile(fileName, data);
    }
  }
}

module.exports = FileSystem;
