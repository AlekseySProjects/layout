const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/assets/index.html',
        meta: {
          viewport: 'width=device-width, initial-scale=1.0'
        },
      }),
    ],
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        scriptType: 'module',
        publicPath: ''
    },
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
              ],
              
            },
            {
              test: /\.(?:js|mjs|cjs)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['@babel/preset-env', { targets: 'defaults' }]
                  ]
                }
              }
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',
            },
        ]
    },
    optimization: {
      minimizer: [
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
    devServer: {
      watchFiles: {
        paths: ['src/assets/index.html']
      },
      static: {
        directory: path.join(__dirname, 'public'),
      },
    },
};