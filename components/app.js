import React from 'react';
import ReactDOM from 'react-dom';
import Editor from '../components/editor';
import Preview from '../components/preview';
import { Layer, CommandBar } from 'office-ui-fabric-react/lib';
import markdown from 'codemirror/mode/markdown/markdown';
import SplitPane from 'react-split-pane';
const electron = require('electron-connect').client.create();

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

    return (
      <div id="content">
        <Layer>
          <div id="header" className="ms-bgColor-black ms-fontColor-white">Markdown editor</div>
        </Layer>
        <div id="main">
          <SplitPane split="vertical" defaultSize="50%">
            <Editor onChange={this.updateText} text={this.state.text} />
            <Preview markdown={this.state.markdown} />
          </SplitPane>
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
