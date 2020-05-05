require('dotenv').config();
const webpack = require('webpack');

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const publidDir = path.join(__dirname, '/public');
module.exports = {
  entry: './src/index.tsx',
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
    new webpack.DefinePlugin({
      'process.env': {
        SITEINFO_API_URL: JSON.stringify(process.env.SITEINFO_API_URL),
        GA_TRACKING_ID: JSON.stringify(process.env.GA_TRACKING_ID)
      }
    }),
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
