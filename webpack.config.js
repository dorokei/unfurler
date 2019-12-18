const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const publidDir = path.join(__dirname, '/public');
module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'bundle.css' })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    historyApiFallback: true,
    contentBase: publidDir
  }
};
