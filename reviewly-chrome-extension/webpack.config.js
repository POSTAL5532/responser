const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const dotenv = require('dotenv');

let ENV_FILE_PROPERTIES;
let CONFIGS_PATH;

const convertToProcessEnvProperties = (object) => {
    if (!object) {
        throw Error("Empty config object");
    }

    return Object.keys(object).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(object[next]);
        return prev;
    }, {});
}

/**
 * Populate the env properties in input.
 *
 * @param input input content {@link Buffer} (required)
 * @param absoluteFilename absolute filename (optional)
 * @returns {string} transformed content string
 */
const populateEnvProperties = (input, absoluteFilename) => {
    let fileContent = input.toString();
    const set = new Set([...fileContent.matchAll(/(?<={{)[A-Z\d_]+(?=}})/g)]);

    for (const property of set.keys()) {
        fileContent = fileContent.replaceAll(`{{${property}}}`, ENV_FILE_PROPERTIES[property]);
    }

    return fileContent;
}

module.exports = (env, args) => {
    console.log("ENV:", env);
    console.log("ARGS:", args);

    CONFIGS_PATH = `../configs/reviewly-chrome-extension/${env.buildMode}`;
    ENV_FILE_PROPERTIES = dotenv.config({path: path.resolve(`${CONFIGS_PATH}/.env`)}).parsed;
    const configObject = convertToProcessEnvProperties(ENV_FILE_PROPERTIES);
    console.log("configObject:", configObject);

    return {
        // mode: (env.buildMode === "prod") ? "production" : "development",
        mode: "production",
        entry: {app: path.join(__dirname, "src", "index.tsx")},
        target: "web",
        devtool: env.buildMode === "prod" ? undefined : "source-map",
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    exclude: ["background.js", "content.js", "index.html"],
                }),
            ],
        },

        module: {
            rules: [
                {
                    test: /\.(tsx|ts)$/,
                    exclude: /node_modules|test/,
                    use: "babel-loader"
                },
                {test: /\.css$/i, use: ["style-loader", "css-loader"]},
                {
                    test: /\.less$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "less-loader"
                    ]
                },
                {test: /\.html$/, use: [{loader: "html-loader", options: {minimize: false}}]},
                {test: /\.svg$/, use: [{loader: '@svgr/webpack', options: {icon: true}}]},
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
                filename: "./index.html",
                minify: false
            }),
            new webpack.DefinePlugin(configObject),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "public", "logo"),
                        to: path.resolve(__dirname, "build")
                    },
                    {
                        from: path.resolve(`${CONFIGS_PATH}/manifest.json`),
                        to: "manifest.json"
                    },
                    {
                        from: path.resolve(__dirname, "public", "background.js"),
                        transform: populateEnvProperties
                    },
                    {
                        from: path.resolve(__dirname, "public", "content.js"),
                        transform: populateEnvProperties
                    },
                    {
                        from: path.resolve(__dirname, "public", "content-styles.css")
                    },
                    {
                        from: path.resolve(__dirname, "public", "fonts"),
                        to: path.resolve(__dirname, "build", "fonts")
                    }
                ],
            })
        ]
    }
};
