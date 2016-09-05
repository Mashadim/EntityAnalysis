module.exports = {
	entry: {
		javascript: './src/index.js',
		html: './client/index.html',
	},
	output: {
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/',
		path: __dirname + '/dist'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel']
			},
			{
				test: /\.html$/,
				loader: 'file?name=[name].[ext]'
			},
			{
				test:/\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	}
};