//Requires
const path = require("path");

//Settings and Easy Access
module.exports = {
      entry: './dev/javascript/index.jsx',
      output: {
          filename: 'index.bun.min.js',
          path: path.resolve(__dirname, './www/javascript')
      }
      module:{
          loaders:[
              { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
              { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
          ]
      },
};
