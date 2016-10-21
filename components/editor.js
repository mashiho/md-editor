const React = require('react');
const Codemirror = require('react-codemirror');

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.updateText = this.updateText.bind(this);
    this.state = {
      text: '',
    };
  }

  updateText(newText) {
    this.props.onChange(newText);
  }

  render() {
    const options = {
      theme: 'eclipse',
      mode: 'text/x-markdown',
      autofocus: true,
      lineWrapping: true,
      fixedGutter: true,
      coverGutterNextToScrollbar: true,
    };
    return (
      <Codemirror
        id="editor"
        value={this.props.text}
        onChange={this.updateText}
        options={options}
      />
    );
  }

}

module.exports = Editor;
