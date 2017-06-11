var path = require('path');

module.exports = {
    module:{
        loaders : [{
            test : /\.jsx?/,
            include : path.resolve(__dirname, './'),
            loader:'babel-loader'
        }]
    }
    
};

/*

//Not necessary since it is supplied the entry via gulp files...

module.exports = {
    entry: ['./bar.jsx','./test.jsx'],
    output: {
        filename: 'test.js',
        path: path.resolve(__dirname, './')
    },
    module:{
        loaders : [{
            test : /\.jsx?/,
            include : path.resolve(__dirname, './'),
            loader:'babel-loader'
        }]
    }
    
};

*/