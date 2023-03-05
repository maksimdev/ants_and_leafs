const path = require('path');

module.exports = {
  entry: './src/main.mjs',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
};