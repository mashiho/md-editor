import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app';
import { ipcRenderer } from 'electron';

const app = ReactDOM.render(
  <App />, document.getElementById('md-editor')
);

/**
 * NOTE: メインプロセスで読み込んだファイルのテキストを受信
 * TODO: send-pathと処理を統一する
 */
ipcRenderer.on('setData', (event, data) => {
  console.log(data);
  app.setState({
    text: data.text,
    markdown: data.text,
    path: data.path,
  });
});

/**
 * NOTE: メインプロセスでのファイル保存処理用にテキストとファイルパスを送信
 */
ipcRenderer.on('getData', () => {
  const data = {
    markdown: app.state.markdown,
    path: app.state.path,
  };
  ipcRenderer.send('setData', data);
});
