const React = require('react');
const Codemirror = require('react-codemirror');

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

module.exports = Editor;
