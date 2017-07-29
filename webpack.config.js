//Requires
const path = require("path");

//Settings and Easy Access
module.exports = {
      entry: './dev/javascript/index.jsx',
      devtool: 'source-map',
      output: {
          filename: 'index.bun.min.js',
          path: path.resolve(__dirname, './www/javascript')
      },
      module:{
          loaders:[
              { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
              { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
          ]
      },
};
