const { Application } = require('spectron');
const assert = require('assert');
const path = require('path');

const app = new Application({
  path: path.join(__dirname, '../node_modules/.bin/electron'),
  args: [path.join(__dirname, '..')],
});

app.start()
.then(() => {
  // Check if the window is visible
  return app.browserWindow.isVisible();
})
.then((isVisible) => {
  // Verify the window is visible
  assert.equal(isVisible, true);
})
.then(() => {
  // Get the window's title
  return app.client.getTitle();
})
.then((title) => {
  // Verify the window's title
  assert.equal(title, 'Markdown Editor');
})
.then(() => {
  // Stop the application
  return app.stop();
})
.catch((error) => {
  // Log any failures
  console.error('Test failed', error.message);
});
