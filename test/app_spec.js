import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app';
import Editor from '../components/editor';
import Preview from '../components/preview';
import { assert, expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

describe('Appコンポーネントのテスト', () => {
  it('<Editor />と<Preview />がレンダリングされていること', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Editor)).to.have.length(1);
    expect(wrapper.find(Preview)).to.have.length(1);
  });
});
