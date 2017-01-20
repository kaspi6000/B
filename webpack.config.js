var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: __dirname + "/src/index.js",
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
		}, {
			 test: /\.scss$/,
			 loaders: ['style', 'css', 'sass']
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

};
