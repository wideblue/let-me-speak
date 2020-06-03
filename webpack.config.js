const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const glob = require('glob');

module.exports = {
  entry: {
    app: './scripts/app.js',
  },
  output: {
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      // NOTE: html-loader doesn't play well with HtmlWebpackPlugin
      // {
      //   test: /\.html$/,
      //   use: [{ loader: 'html-loader', options: { minimize: true } }]
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    port: 8000
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new MiniCssExtractPlugin({
      // note that styles.css is bundled only through index.js
      filename: 'styles.css'
    }),
    // I need this so that PWA manifest with start_url gets injected
    new HtmlWebpackPlugin({
      hash: false,
      title: 'Let me speak',
      myPageHeader: 'Let me speak',
      template: 'index.html',
      minify: true,
      chunks: ['app'],
      inject: false,
      filename: 'index.html'
    }),
    // new ImageminPlugin({
    //   // test: /\.(jpe?g|png|gif|svg)$/i,
    //   plugins: [
    //     imageminMozjpeg({
    //       quality: 5,
    //       progressive: true
    //     })
    //   ],
    //   externalImages: {
    //     context: 'slovar/slike', // Important! This tells the plugin where to "base" the paths at
    //     sources: glob.sync('slovar/slike/*.png'),
    //     destination: 'dist/slovar/slike'
    //   }
    // }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './styles/', to: 'styles/' },
        { from: './slovar/', to: 'slovar/' },
        { from: './scripts/', to: 'scripts/' },
        { from: './views/', to: 'views/' },
        { from: './index.html', to: 'index.html' },
        { from: './bower_components/', to: 'bower_components/' }
      ]
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 60,
          progressive: true
        })
      ]
    }),
    new WebpackPwaManifest({
      name: 'Let me speak',
      short_name: 'I speak',
      description: 'Personal communicator app ',
      background_color: '#3a3f42',
      theme_color: '#58595c',
      'theme-color': '#01579b',
      start_url: '/let-me-speak/index.html',
      icons: [
        {
          src: path.resolve('styles/icon-173-tile.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        }
      ]
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    })
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: './service-worker.js'
    // })
  ]
};
