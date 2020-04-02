import path from 'path';
import { Configuration } from 'webpack';

require('dotenv').config();

const env = process.env.NODE_ENV == null ? 'development' : process.env.NODE_ENV;

const config: Configuration = {
  mode: env as 'development' | 'production',
  watchOptions: {
    aggregateTimeout: 500,
    ignored: ['node_modules']
  },
  entry: {
    index: path.resolve(__dirname, 'src', 'index.ts')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      }
    ]
  }
};

export default config;
