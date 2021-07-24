const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

function getArgValue(key) {
  for (let i = 0; i < process.argv.length; i++) {
    const paramKey = process.argv[i];
    if (paramKey === key) {
      return process.argv[i + 1] || null;
    }
  }
  return null;
}

const buildTarget = getArgValue('--target') || 'web';
const buildOutPath = path.resolve(__dirname, `dist/${buildTarget}`);

module.exports = {
  target: buildTarget,
  entry: './src/index.ts',
  output: {
    filename: 'jschecker.js',
    path: buildOutPath,
    libraryTarget: 'umd',
    globalObject: 'this',
    library: "Checker",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'package.publish.json', to: '../package.json' },
      ],
    }),
  ],
};