import React, { Component, PropTypes } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

class Footer extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Toolbar id='footer'>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle style={{color: '#fff'}} text={this.props.path} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

module.exports = Footer;
