import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class Header extends Component {
  render() {
    return (
      <AppBar
        title="Markdown Editor"
        showMenuIconButton={false}
        zDepth={0}
      />
    );
  }
}

module.exports = Header;
