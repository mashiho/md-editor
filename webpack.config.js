module.exports = {
  entry: ['./containers/app.js'],
  output: {
    filename: './public/bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  target: 'electron',
};
