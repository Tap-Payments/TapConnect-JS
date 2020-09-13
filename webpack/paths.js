const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),

  entryPath: path.resolve(__dirname, '../', 'src/index.js'),

  outputPath: path.resolve(__dirname, '../', 'build'),

  demoPath: path.resolve(__dirname, '../', 'demo/src/index.js'),

  templatePath: path.resolve(__dirname, '../', 'demo/src/index.html'),

  imgsFolder: 'imgs',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',

};
