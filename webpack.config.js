//Requires
const webpack = require("webpack");
const path = require("path");

//Setup
const extractCommons = new webpack.optimize.CommonsChunkPlugin({
    name:"commons",
    filename:"commons.js",
    minChunks:Infinity
});

//Settings and Easy Access
module.exports = {
      entry:"THIS IS RESPECIFIED IN THE GULP TASK SCRIPTS.JS",
      output: {
          filename: '[name].js'
      },
      module:{
          loaders:[
              { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
              { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
          ]
      },
      plugins:[
          extractCommons,
      ]
};
