import React, { Component, PropTypes } from 'react';
import Codemirror from 'react-codemirror';

class Editor extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  onChange = (text) => {
    this.props.onChange(text);
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
        onChange={this.onChange}
        options={options}
        defaultValue={this.props.defaultValue}
      />
    );
  }

}

module.exports = Editor;
