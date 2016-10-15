const React = require('react');
const ReactDOM = require('react-dom');
require('codemirror/mode/markdown/markdown');
const Editor = require('./components/editor');
const Preview = require('./components/preview');
const FileSystem = window.require('./models/file_system');
const { Layer, CommandBar } = require('office-ui-fabric-react/lib');

const fileSystem = new FileSystem();
/**
 * NOTE: BrowserifyとElectronの相性が悪いので、windowをつけないとモジュール読み込みがうまくいかない
 */
const ipcRenderer = window.require('electron').ipcRenderer;

const Main = React.createClass({

  getInitialState() {
    return {
      text: '',
      markdown: '',
      path: 'Undefined',
    };
  },

  updateText(text) {
    this.setState({
      text: text,
      markdown: text,
    });
  },

  render() {
    const itemsNonFocusable = [
      {
        key: 'openItem',
        name: 'Open File',
        icon: 'OpenFile',
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: function () { return; },
      },
      {
        key: 'saveItem',
        name: 'Save File',
        icon: 'Save',
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: function () { return; },
      },
    ];

    return (
      <div id="content">
        <Layer>
          <div id='header' className='ms-bgColor-black ms-fontColor-white'>Markdown editor</div>
        </Layer>
        <CommandBar items={ itemsNonFocusable } >
        </CommandBar>
        <div id="main">
          <Editor onChange={this.updateText} text={this.state.text} />
          <Preview markdown={this.state.markdown} />
        </div>
        <Layer>
          <div id='footer' className='ms-bgColor-themeDarkAlt ms-fontColor-white'>{this.state.path}</div>
        </Layer>
      </div>
    );
  },

});

const main = ReactDOM.render(
  <Main />, document.getElementById('md-editor')
);

ipcRenderer.on('send-text', (event, text) => {
  main.setState({ text: text, markdown: text });
});

ipcRenderer.on('send-path', (event, path) => {
  main.setState({ path: path });
});

ipcRenderer.on('get-data', (event, text) => {
  ipcRenderer.send('send-data', main.state.markdown);
});
