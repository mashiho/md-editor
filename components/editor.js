import React from 'react';
import Codemirror from 'react-codemirror';

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  updateText = (newText) => {
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
