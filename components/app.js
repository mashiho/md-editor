import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Editor from '../components/editor';
import Preview from '../components/preview';
import { Layer } from 'office-ui-fabric-react/lib';
import markdown from 'codemirror/mode/markdown/markdown';
import SplitPane from 'react-split-pane';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      markdown: '',
      path: 'Undefined.md',
    };
  }

  updateText = (text) => {
    this.setState({
      text,
      markdown: text,
    });
  }

  render() {
    return (
      <div id="content">
        <Header />
        <div id="main">
          <SplitPane split="vertical" defaultSize="50%">
            <Editor onChange={this.updateText} text={this.state.text} />
            <Preview markdown={this.state.markdown} />
          </SplitPane>
        </div>
        <Footer path={this.state.path} />
      </div>
    );
  }

}

module.exports = App;
