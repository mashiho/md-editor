import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from '../components/header';
import Footer from '../components/footer';
import Editor from '../components/editor';
import Preview from '../components/preview';
import markdown from 'codemirror/mode/markdown/markdown';
import SplitPane from 'react-split-pane';
import * as Actions from '../actions/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { darkBlack, indigo500 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: darkBlack,
    accent2Color: indigo500,
  },
});

class App extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  onChange = (text) => {
    this.props.inputText(text);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div id="content">
          <Header />
          <div id="main">
            <SplitPane split="vertical" defaultSize="50%">
              <Editor onChange={this.onChange} text={this.props.text} defaultValue={this.props.text} />
              <Preview markdown={this.props.text} />
            </SplitPane>
          </div>
          <Footer path={this.props.path} />
        </div>
      </MuiThemeProvider>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    'text': state.text,
    'path': state.path,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputText: (text) => dispatch(Actions.inputText(text)),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
