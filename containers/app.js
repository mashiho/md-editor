import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app';
import { ipcRenderer } from 'electron';
import { Provider } from 'react-redux';
import configureStore from '../store/configure_store';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('md-editor')
);

/**
 * NOTE: ファイル読み込み
 */
ipcRenderer.on('readFile', (event, data) => {
  store.dispatch({ type: 'READ_FILE', data });
});

/**
 * NOTE: ファイル保存
 */
ipcRenderer.on('saveFile', (event, data) => {
  store.dispatch({ type: 'SAVE_FILE', data });
});

/**
 * NOTE: 新規作成
 */
ipcRenderer.on('clearText', (event, data) => {
  store.dispatch({ type: 'CLEAR_TEXT', data });
});

/**
 * NOTE: メインプロセスでのファイル保存処理用にテキストとファイルパスを送信
 */
ipcRenderer.on('getSaveData', (event, arg) => {
  const data = store.getState();
  event.sender.send('setSaveData', data);
});

/**
 * NOTE: メインプロセスでのファイル保存処理用にテキストとファイルパスを送信
 */
ipcRenderer.on('getSaveAsData', (event, arg) => {
  const data = store.getState();
  event.sender.send('setSaveAsData', data);
});
