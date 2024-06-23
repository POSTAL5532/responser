const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const BASE_PATH = "/console"

const convertToProcessEnvProperties = (object) => {
    if (!object) {
        throw Error("Empty config object");
    }

    return Object.keys(object).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(object[next]);
        return prev;
    }, {});
}

module.exports = (env, args) => {
    console.log("ENV:", env);
    console.log("ARGS:", args);

    const envFileProperties = dotenv.config({path: path.resolve(`../configs/reviewly-console/${env.buildMode}/.env`)}).parsed;
    const configObject = convertToProcessEnvProperties(envFileProperties);
    console.log("configObject:", configObject);

    return {
        mode: "development",
        entry: {app: path.join(__dirname, "src", "index.tsx")},
        target: "web",
        devtool: "source-map",
        devServer: {
            port: 3001,
            compress: true,
            hot: true,
            host: "local-dev-reviewly.space",
            allowedHosts: ["local-dev-reviewly.space"],
            historyApiFallback: {
                index: BASE_PATH
            },
            devMiddleware: {
                writeToDisk: true,
            }
        },
        output: {
            filename: 'reviewly.[chunkhash].js',
            path: path.resolve(__dirname, "build"),
            publicPath: BASE_PATH
        },

        module: {
            rules: [
                {test: /\.(ts|js)x?$/, exclude: /node_modules|test/, use: "babel-loader",},
                {test: /\.css$/i, use: ["style-loader", "css-loader"],},
                {
                    test: /\.less$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "less-loader"
                    ]
                },
                {test: /\.ejs$/, loader: "html-loader"},
                {test: /\.svg$/, use: [{loader: '@svgr/webpack', options: {icon: true}}],},
                {
                    test: /\.(png|jpg|svg|gif|webp)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: '/images',
                                //publicPath: 'images', // sometimes has problems with resources routing (absolute / relative paths)
                                esModule: false
                            }
                        }
                    ],
                    type: 'javascript/auto'
                },
                {
                    test: /\.(woff|woff2|eot|ttf)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: '/fonts',
                                //publicPath: 'fonts', // sometimes has problems with resources routing (absolute / relative paths)
                                esModule: false
                            }
                        }
                    ],
                    type: 'javascript/auto'
                }
            ],
        },
        resolve: {
            modules: [
                path.resolve(__dirname, "node_modules"),
                path.resolve(__dirname, "src/")
            ],
            alias: {"globalsLess": path.resolve("src/styles/globals.less")},
            extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".less", ".ttf"]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebPackPlugin({
                template: "./public/index.html",
                filename: "./index.html",
            }),
            new webpack.DefinePlugin(configObject),
            new FaviconsWebpackPlugin({
                mode: "webapp",
                devMode: "webapp",
                logo: path.resolve(__dirname, "public", "favicon_", "logo_2436.png"),
                inject: true
            })
        ]
    }
};
