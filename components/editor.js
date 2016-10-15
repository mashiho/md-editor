const React = require('react');
const Codemirror = require('react-codemirror');

const Editor = React.createClass({

  getInitialState() {
    return {
      text: '',
    };
  },

  updateText(newText) {
    this.props.onChange(newText);
  },

  render() {
    const options = {
      theme: 'eclipse',
      mode: 'text/x-markdown',
      autofocus: true,
      lineWrapping: true
    };
    return (
      <Codemirror id="editor" ref="editor" value={this.props.text} onChange={this.updateText} options={options} />
    );
  }

});

module.exports = Editor;
