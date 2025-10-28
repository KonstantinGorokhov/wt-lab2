const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { watchFile } = require('fs');


module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
              test: /\.(scss)$/,
              use: [{
                // inject CSS to page
                loader: 'style-loader'
              }, {
                // translates CSS into CommonJS modules
                loader: 'css-loader'
              }, {
                // Run postcss actions
                loader: 'postcss-loader',
                options: {
                  // `postcssOptions` is needed for postcss 8.x;
                  // if you use postcss 7.x skip the key
                  postcssOptions: {
                    // postcss plugins, can be exported to postcss.config.js
                    plugins: function () {
                      return [
                        require('autoprefixer')
                      ];
                    }
                  }
                }
              }, {
                // compiles Sass to CSS
                loader: 'sass-loader'
              }]
            },
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.(png|jpe?g|gif|svg)$/i,
              type: 'asset/resource',
              generator: {
                filename: 'images/[name][hash][ext]',
              },
            },
        ]
    },
        performance: {
        hints: false, // полностью отключает предупреждения
        maxEntrypointSize: 512000, // 500 KB
        maxAssetSize: 512000,      // 500 KB
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, 'dist')
        },
        open: true,
        watchFiles: ['src/index.html']
    }
}
