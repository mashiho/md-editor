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

  updatePreview(markdown) {
    this.setState({
      markdown: markdown,
    });
  },

  render() {
    return (
      <div id="main">
        <Editor onChange={this.updatePreview} text={this.state.text} />
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
