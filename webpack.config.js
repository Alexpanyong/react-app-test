var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.ogg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'asset/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    proxy: [
      { context: ['/previews/new­wave­kit.ogg', '/previews/synth­organ.ogg'],
        target: 'https://static.bandlab.com/soundbanks/',
        secure: false
      }
    ]
  }
};