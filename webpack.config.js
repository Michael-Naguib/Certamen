//Requires
const webpack = require("webpack");
const path = require("path");

//Setup
const extractCommons = webpack.optimize.CommonChunkPlugin({
    name:"commons",
    filename:"commons.js"
});

//Settings and Easy Access
module.exports = {
      entry:{
          vendors:['react','jquery'],
          bundle: './dev/javascript/index.jsx',
      },
      devtool: 'source-map',
      output: {
          filename: '[name].bun.min.js',
          path: path.resolve(__dirname, './www/javascript'),
          publicPath:'./'
      },
      module:{
          loaders:[
              { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
              { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
          ]
      },
      plugins:[
          extractCommons,
          new webpack.DllReferencePlugin({
           context: path.join(__dirname, "/dev/javascript/vendors"),
           manifest: require("./dll/vendor-manifest.json")
       }),
      ]
};
