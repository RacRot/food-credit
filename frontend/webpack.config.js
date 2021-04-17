const path = require("path");
const webpack = require("webpack");

const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
 template: "./public/index.html",
 filename: "./index.html",
 contentBase: path.join(__dirname, "public/"),
});

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "bundle.js"
  },
  devServer: {
    port: 5000,
    watchContentBase: true,
    watchOptions: {
      aggregateTimeout: 500, // delay before reloading
      poll: 1000 // enable polling since fsevents are not supported in docker
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    htmlPlugin,
  ]
};
