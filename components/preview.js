import React from 'react';
import marked from 'marked';

class Preview extends React.Component {

  render() {
    const html = marked(this.props.markdown);
    return (
      <div id="preview" >
        <div className="preview-wrap markdown-body" dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    );
  }

}

module.exports = Preview;
