const React = require('react');
const ReactDOM = require('react-dom');
const Codemirror = require('react-codemirror');
require('codemirror/mode/markdown/markdown');
const marked = require('marked');

const Main = React.createClass({

  getInitialState() {
    return {
        markdown: ""
    };
  },

  updatePreview(markdown) {
    this.setState({
        markdown: markdown
    });
  },

  render() {

    return (
      <div id="main">
        <Editor onChange={this.updatePreview} />
        <Preview markdown={this.state.markdown} />
      </div>
    );
  }

});

const Editor = React.createClass({

  getInitialState() {
    return {
      text: 'テキストを入力してください',
    };
  },

  updateText(newText) {
    this.setState({
      text: newText,
    });
    this.props.onChange(newText);
  },

  render() {
    const options = {
      mode: 'text/x-markdown',
      autofocus: true,
      lineWrapping: true
    };
    return (
      <Codemirror id="editor" ref="editor" value={this.state.code} onChange={this.updateText} options={options} />
    );
  }

});

const Preview = React.createClass({

  render() {
    const html = marked(this.props.markdown);
    return (
      <div id="preview" className="markdown-body" dangerouslySetInnerHTML={{__html: html}} ></div>
    );
  }

});

ReactDOM.render(
  <Main />, document.getElementById('md-editor')
);
