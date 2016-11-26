const { Application } = require('spectron');
const { assert } = require('chai');
const path = require('path');

describe('アプリケーションのテスト', () => {
  beforeEach(() => {
    this.app = new Application({
      path: path.join(__dirname, '../node_modules/.bin/electron'),
      args: [path.join(__dirname, '..')],
    });
    return this.app.start()
  });

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('ウィンドウのタイトルが正しいこと', () => {

    // Check if the window is visible
    return this.app.browserWindow.isVisible()
    .then((isVisible) => {
      // Verify the window is visible
      assert.equal(isVisible, true);
    })
    .then(() => {
      // Get the window's title
      return this.app.client.getTitle();
    })
    .then((title) => {
      // Verify the window's title
      assert.equal(title, 'Markdown Editor');
    });
  });
});
