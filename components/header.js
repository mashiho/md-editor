import React from 'react';
import { Layer } from 'office-ui-fabric-react/lib';

class Header extends React.Component {
  render() {
    return (
      <Layer>
        <div id="header" className="ms-bgColor-black ms-fontColor-white">Markdown editor</div>
      </Layer>
    );
  }
}

module.exports = Header;
