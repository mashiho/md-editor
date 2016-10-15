const React = require('react');
const ReactDOM = require('react-dom');
require('codemirror/mode/markdown/markdown');
const Editor = require('./components/editor');
const Preview = require('./components/preview');
/**
 * NOTE: BrowserifyとElectronの相性が悪いので、windowをつけないとモジュール読み込みがうまくいかない
 */
const ipcRenderer = window.require('electron').ipcRenderer;

const Main = React.createClass({

  getInitialState() {
    return {
      text: '',
      markdown: '',
    };
  },

  updateText(text) {
    this.setState({
      text: text,
      markdown: text,
    });
  },

  render() {
    return (
      <div id="main">
        <Editor onChange={this.updateText} text={this.state.text} />
        <Preview markdown={this.state.markdown} />
      </div>
    );
  }

});

const main = ReactDOM.render(
  <Main />, document.getElementById('md-editor')
);

ipcRenderer.on('send-text', (event, text) => {
  main.setState({ text: text, markdown: text });
});

ipcRenderer.on('get-data', (event, text) => {
  ipcRenderer.send('send-data', main.state.markdown);
});
