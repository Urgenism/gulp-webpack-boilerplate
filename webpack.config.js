
module.exports = {
  entry: {
    App: "./src/assets/js/App.js",
    Vendor: "./src/assets/js/Vendors.js"
  },
  mode: "production",
  output: {
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader"
      }
    ]
  }
};
