const path = require('path');
module.exports = {
	module: {
		loaders: [
		  { test: /\.(png|jpg)$/, 
			include: path.resolve(__dirname, "src/assets/photos"),
			loader: 'url-loader?limit=8192' }
		]
	  }
  };