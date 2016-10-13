const React = require('react');
const ReactDOM = require('react-dom');
require('codemirror/mode/markdown/markdown');
const Editor = require('./components/editor');
const Preview = require('./components/preview');

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

ReactDOM.render(
  <Main />, document.getElementById('md-editor')
);
