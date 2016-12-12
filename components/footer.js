import React from 'react';
import { Layer } from 'office-ui-fabric-react/lib';

class Footer extends React.Component {

  static propTypes = {
    path: React.PropTypes.string.isRequired,
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
