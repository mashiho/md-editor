import React, { Component, PropTypes } from 'react';
import { Layer } from 'office-ui-fabric-react/lib';

class Footer extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Layer>
        <div id="footer" className="ms-bgColor-themeDarkAlt ms-fontColor-white">
          {this.props.path}
        </div>
      </Layer>
    );
  }
}

module.exports = Footer;
