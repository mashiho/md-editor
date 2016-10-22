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
      path: 'Undefined.md',
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
    const path = this.state.path;
    const itemsNonFocusable = [
      {
        key: 'newItem',
        name: 'New File',
        icon: 'Add',
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick() { fileSystem.newFile(); },
      },
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
        onClick() {
          if (path === 'Undefined.md') {
            fileSystem.saveFile(markdown);
          } else {
            fileSystem.saveFile(markdown, path);
          }
        },
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

/**
 * NOTE: メインプロセスで読み込んだファイルのテキストを受信
 * TODO: send-pathと処理を統一する
 */
ipcRenderer.on('setData', (event, data) => {
  console.log(data);
  main.setState({
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
    markdown: main.state.markdown,
    path: main.state.path,
  };
  ipcRenderer.send('setData', data);
});
