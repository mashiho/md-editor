const React = require('react');
const ReactDOM = require('react-dom');
const marked = require('marked');

const Preview = React.createClass({

  render() {
    const html = marked(this.props.markdown);
    return (
      <div id="preview" className="markdown-body" dangerouslySetInnerHTML={{__html: html}} ></div>
    );
  }

});
