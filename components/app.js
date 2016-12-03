import React from 'react';
import ReactDOM from 'react-dom';
import Editor from '../components/editor';
import Preview from '../components/preview';
import FileSystem from '../models/renderer/file_system';
import { Layer, CommandBar } from 'office-ui-fabric-react/lib';
import markdown from 'codemirror/mode/markdown/markdown';

const fileSystem = new FileSystem();

class App extends React.Component {

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

module.exports = App;
