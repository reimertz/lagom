const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const autoprefixer = require('autoprefixer')
const path = require('path')

const isProductionMode = ~process.argv.indexOf('-production')
const outputDir = isProductionMode ? 'dist' : '.build'

const commandFiles = ['', '-create', '-server', '-deploy', '-help'].map( command => {
  return `lagom${command}`;
})

const commonOptions = {
  resolve: {
    extensions: ['', '.js', '.sass'],
    modulesDirectories: ['src', 'node_modules']
  }
}

const binConfigs = commandFiles.map(commandFile => {
  return Object.assign({}, commonOptions, {
    entry: `./src/bin/${commandFile}.js`,
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    module: {
      preLoaders: [{
        test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/
      }],
      loaders: [{
        loader: 'babel',
        test: /\.js?$/,
        exclude: /node_modules/
      }]
    },
    plugins: [
      new webpack.BannerPlugin('#!/usr/bin/env node', { raw: true })
    ],
    output: {
      filename: `${outputDir}/bin/${commandFile}`
    },
    externals: [ nodeExternals() ]
  })
})

const starterConfig = Object.assign({}, commonOptions, {
  entry: './src/lagom.js',

  module: {
    preLoaders: [{
      test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/
    }],
    loaders: [{
      test: /\.html$/,
      loader: 'html',
      query:  {
       minimize: false
      }
    },{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract(
        'style', // The backup style loader
        'css-loader!postcss-loader!sass-loader'
      ),
    }]
  },
  output: {
    filename: `${outputDir}/starter/scripts/lagom.js`
  },
  sassLoader: {
    includePaths: [ 'src/styles' ]
  },
  postcss: function () {
    return [autoprefixer({browsers: ['last 5 versions']})];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: `${outputDir}/starter/index.html`,
      inject: false
    }),
    new ExtractTextPlugin(`${outputDir}/starter/styles/lagom.css`),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': isProductionMode ? JSON.stringify('production') : JSON.stringify('development')
      }
    })
  ]
})

module.exports = binConfigs.concat(starterConfig)
