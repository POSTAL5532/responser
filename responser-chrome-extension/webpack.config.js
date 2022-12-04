const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const dotenv = require('dotenv');

module.exports = () => ({
    mode: "none",
    entry: {
        app: path.join(__dirname, "src", "index.tsx")
    },
    target: "web",
    devtool: "source-map",
    devServer: {
        port: 3001,
        compress: true,
        hot: true,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules|test/,
                use: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.svg$/,
                use: [{loader: '@svgr/webpack', options: {icon: true}}],
            },
            {
                test: /\.(png|jpg|svg|gif|webp)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'images',
                            publicPath: 'images',
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'fonts',
                            publicPath: 'fonts',
                            esModule: false
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, "src/")
        ],
        alias: {"globalsLess": path.resolve("src/styles/globals.less")},
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".less"]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "build"),
        publicPath: "/"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new webpack.DefinePlugin(getEnvVariables()),
        new CopyPlugin({
            patterns: [
                path.resolve(__dirname, "public", "manifest.json"),
                path.resolve(__dirname, "public", "content.js"),
                path.resolve(__dirname, "public", "background.js"),
                path.resolve(__dirname, "public", "logo192.png")
            ],
        })
    ]
});

const getEnvVariables = () => {
    const env = dotenv.config().parsed;

    if (!env) {
        return {};
    }

    return Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
}
