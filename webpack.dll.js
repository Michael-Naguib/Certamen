var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        vendor: [path.join(__dirname,"/dev/javascript/vendors/", "vendors.js")]
    },
    output: {
        path: path.join(__dirname, "dist", "dll"),
        filename: "dll.[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "dll", "[name]-manifest.json"),
            name: "[name]",
            context: path.resolve(__dirname, "client")
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        root: path.resolve(__dirname, "./www"),
        modulesDirectories: ["node_modules"]
    }
};
