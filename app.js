const React = require('react');
const ReactDOM = require('react-dom');
require('codemirror/mode/markdown/markdown');
const Editor = require('./components/editor');
const Preview = require('./components/preview');

const FileSystem = window.require('./models/renderer/file_system');
const { Layer, CommandBar } = require('office-ui-fabric-react/lib');

const fileSystem = new FileSystem();
/**
 * NOTE: BrowserifyとElectronの相性が悪いので、windowをつけないとモジュール読み込みがうまくいかない
 */
const ipcRenderer = window.require('electron').ipcRenderer;

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.updateText = this.updateText.bind(this);
    this.state = {
      text: '',
      markdown: '',
      path: '名称未設定.md',
    };
  }

  updateText(text) {
    this.setState({
      text,
      markdown: text,
    });
  }

  render() {
    const markdown = this.state.markdown;
    const itemsNonFocusable = [
      {
        key: 'openItem',
        name: 'Open File',
        icon: 'OpenFile',
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick() { fileSystem.openFile(); },
      },
      {
        key: 'saveItem',
        name: 'Save File',
        icon: 'Save',
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick() { fileSystem.saveFile(markdown); },
      },
    ];

    return (
      <div id="content">
        <Layer>
          <div id="header" className="ms-bgColor-black ms-fontColor-white">Markdown editor</div>
        </Layer>
        <CommandBar items={itemsNonFocusable} />
        <div id="main">
          <Editor onChange={this.updateText} text={this.state.text} />
          <Preview markdown={this.state.markdown} />
        </div>
        <Layer>
          <div id="footer" className="ms-bgColor-themeDarkAlt ms-fontColor-white">
            {this.state.path}
          </div>
        </Layer>
      </div>
    );
  }

}

const main = ReactDOM.render(
  <Main />, document.getElementById('md-editor')
);

ipcRenderer.on('send-text', (event, text) => {
  /**
   * NOTE: text: textと書く場合, textと省略して書くことできる
   * @see http://eslint.org/docs/rules/object-shorthand
   */
  main.setState({ text, markdown: text });
});

ipcRenderer.on('send-path', (event, path) => {
  main.setState({ path });
});

ipcRenderer.on('get-data', () => {
  ipcRenderer.send('send-data', main.state.markdown);
});
