var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
	entry: [__dirname + "/src/index.js", './src/style.css'],
	output: {
		path: __dirname,
		filename: "bundle.js",
		publicPath: '/'
	},

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: "./node_modules/",
			loader: "babel",
			include: __dirname,
			query: {
				presets: [ 'es2015', 'es2016', 'react', 'react-hmre' ]
			}
		},{
                test: /\.css$/,
                loader: 'style!css-loader'
        }]
	},

	plugins: [
        new ExtractTextPlugin('style/style.css', {
            allChunks: true
        })
    ],
	devServer: {
	    contentBase: __dirname,
	    devtool: 'eval',
	    hot: true,
	    inline: true,
	    port: 8080,
	    historyApiFallback: true,
	},

	resolve: {
        root: path.resolve('./src')
    },

};
