// webpack.config.js
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./script.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
