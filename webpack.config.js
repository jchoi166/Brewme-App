const path = require("path")
const MiniCssExtractPLugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

let mode = "development"

if (process.env.NODE_ENV === "production") {
    mode = "production"
}

module.exports = {
    mode: mode,
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(html)$/,
                use: {
                  loader: "html-loader",
                }
            },
            {
                test: /\.s?scss$/i,
                use: [
                    MiniCssExtractPLugin.loader, 
                    "css-loader", 
                    "postcss-loader", 
                    "sass-loader"
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/, // exclude node modules because babel transpilation is expensive and will slow down. 
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPLugin(),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
    ],

    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
        hot: true
    },

    stats: {
        children: true,
      },
}