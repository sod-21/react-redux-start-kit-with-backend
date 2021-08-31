var webpack = require('webpack');
var path = require('path');
const tailwindcss = require("tailwindcss");

var BUILD_DIR = path.resolve(__dirname, '..', 'static', 'js');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  mode: "development",
  devtool: 'inline-sourcemap',
  entry: [APP_DIR + '/index.jsx'],
  output: {
    path: BUILD_DIR,
    filename: 'myapp.js'
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['@babel/react', '@babel/preset-env'],
          plugins: ['react-html-attrs', 'transform-class-properties'],
        }
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                  tailwindcss("./tailwind.config.js")
                  ],
                  [require('autoprefixer')]
                ],
              },              
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
     new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
};

module.exports = config;
