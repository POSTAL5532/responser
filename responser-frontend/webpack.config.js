const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require('dotenv');

const LOCAL_BUILD_MODE = "local";
const DEV_TEST_BUILD_MODE = "dev-test";
const PRODUCTION_BUILD_MODE = "production";

let ENV_FILE_PROPERTIES;
let CURRENT_BUILD_MODE;

/**
 * Init ENV_FILE_PROPERTIES
 */
const initEnvFileProperties = () => {
    const envDir = "env";

    switch (CURRENT_BUILD_MODE) {
        case LOCAL_BUILD_MODE:
            ENV_FILE_PROPERTIES = dotenv.config({path: path.resolve(__dirname, envDir, "local.env")}).parsed;
            break;
        case DEV_TEST_BUILD_MODE:
            ENV_FILE_PROPERTIES = dotenv.config({path: path.resolve(__dirname, envDir, "dev.env")}).parsed;
            break;
        case PRODUCTION_BUILD_MODE:
            ENV_FILE_PROPERTIES = dotenv.config({path: path.resolve(__dirname, envDir, "prod.env")}).parsed;
            break;
        default:
            throw new Error("Bad buildMode:", buildMode);
    }
}

const convertTpProcessEnvProperties = (object) => {
    if (!object) {
        return {};
    }

    return Object.keys(object).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(object[next]);
        return prev;
    }, {});
}

module.exports = (env, args) => {
    console.log("ENV:", env);
    console.log("ARGS:", args);

    CURRENT_BUILD_MODE = env.buildMode;
    initEnvFileProperties();

    return {
        mode: "none",
        entry: {app: path.join(__dirname, "src", "index.tsx")},
        target: "web",
        devtool: "source-map",
        devServer: {
            port: 3000,
            compress: true,
            hot: true,
            historyApiFallback: true,
            host: "127.0.0.1"
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
                {test: /\.html$/, loader: "html-loader"},
                {test: /\.svg$/, use: [{ loader: '@svgr/webpack', options: { icon: true } }],},
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
            new webpack.DefinePlugin(convertTpProcessEnvProperties(ENV_FILE_PROPERTIES))
        ]
    }
};
