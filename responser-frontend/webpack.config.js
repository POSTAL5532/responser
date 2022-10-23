const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
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
        port: 3000,
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
                            esModule : false
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
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, "build"),
        publicPath: "/"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new webpack.DefinePlugin(getEnvVariables())
    ]
});

const getEnvVariables = () => {
    const env = dotenv.config().parsed;

    if(!env) {
        return {};
    }

    return Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
}
