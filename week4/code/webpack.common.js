const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "output")
  },
  devServer: {
    contentBase: "/public",
    hot: true
  },
  devtool: "cheap-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      //   enforce: "pre"
      // },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.png$/,
        use: "file-loader"
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // new HTMLWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
