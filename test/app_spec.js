import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app';
import Editor from '../components/editor';
import Preview from '../components/preview';
import { assert, expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import marked from 'marked';

describe.skip('Appコンポーネントのテスト', () => {
  it('<Editor />と<Preview />がレンダリングされていること', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Editor)).to.have.length(1);
    expect(wrapper.find(Preview)).to.have.length(1);
  });

  it('<Editor />で入力した文字を取得できること', () => {
    const updateText = sinon.spy(Editor.prototype, 'updateText');
    const wrapper = shallow(<Editor onChange={updateText} text={'Hello World!'} />);
    expect(wrapper.props('text').value).to.equal('Hello World!');
  });

  it('<Preview />でマークダウン記法の文字列をHTMLに変換できること', () => {
    const wrapper = mount(<Preview markdown={'**Hello World!**'} />);
    expect(marked(wrapper.prop('markdown'))).to.match(/<strong>Hello World!<\/strong>/);
  });
});
