const path = require('path')

module.exports = {
  mode: 'production',
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  }
}
