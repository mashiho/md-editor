import React, { Component, PropTypes } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';

class Preview extends Component {

  static propTypes = {
    markdown: PropTypes.string.isRequired,
  }

  render() {
    marked.setOptions({
      highlight: function(code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      }
    });

    const html = marked(this.props.markdown);
    return (
      <div id="preview" >
        <div className="preview-wrap markdown-body" dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    );
  }

}

module.exports = Preview;
