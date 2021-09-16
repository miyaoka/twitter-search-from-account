const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  entry: {
    hotReload: path.resolve(
      __dirname,
      "../node_modules/crx-hotreload/hot-reload.js"
    ),
  },
});
