const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
 
module.exports = {

	devtool: 'source-map',
	// mode: 'production',
	mode: 'development',

	entry: './src/index.jsx',

	output: {
		path: __dirname + '/dist',
		filename: 'index.js',
    library: 'OpenStadComponentChoicesGuide',
    libraryTarget: 'window',
	},

	externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
	},

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/default.css',
      ignoreOrder: false,
    }),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.jsx?$/,
        exclude: /\/core-js/,
        minify(file, sourceMap) {
          const extractedComments = [];
          const { error, map, code, warnings } = require('uglify-js') // Or require('./path/to/uglify-module')
                .minify(
                  file,
                  { /* Your options for minification */ },
                );
          return { error, map, code, warnings, extractedComments };
        }
        
      })
    ]
  },
  
	module: {
		rules: [

			{
				test: /\.json$/,
				loader: "json-loader"
			},

			{
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/openstad-component)/,
        use: {
          loader: "babel-loader"
        }
			},

      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'less-loader',
        ],
      },

		],
	},
	
}

