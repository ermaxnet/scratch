const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const WebpackFilterWarningsPlugin = require("webpack-filter-warnings-plugin");

const ModuleFileExtensions = [
    "js",
    "ts",
    "component.ts",
    "json"
];

const PostCssLoader = {
    loader: "postcss-loader",
    options: {
        ident: "postcss",
        plugins: () => [
            require("postcss-flexbugs-fixes"),
            require("postcss-preset-env")({
                autoprefixer: {
                    flexbox: "no-2009"
                },
                stage: 3
            })
        ]
    }
};

const SassLoader = {
    loader: "sass-loader",
    options: {
        implementation: require("sass")
    }
};

module.exports = {
    devtool: "cheap-module-source-map",
    entry: {
        polyfills: path.resolve("src/polyfills.ts"),
        app: path.resolve("src/main.ts")
    },

    output: {
        path: path.resolve("dist"),
        publicPath: "/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    resolve: {
        modules: [ "node_modules" ].concat([
            path.resolve("src/assets"),
            path.resolve("src/content")
        ]),
        extensions: ModuleFileExtensions.map(ext => `.${ext}`)
    },

    module: {
        rules: [
            { parser: { requireEnsure: false } },

            {
                oneOf: [
                    {
                        test: /\.ts$/,
                        loader: "@ngtools/webpack"
                    },

                    {
                        test: /\.scss$/,
                        use: [
                            {
                                loader: "raw-loader"
                            },
                            PostCssLoader,
                            SassLoader
                        ]
                    },

                    {
                        test: /\.html$/,
                        use: [
                            {
                                loader: "html-loader"
                            }
                        ]
                    }
                ]
            }
        ]
    },

    plugins: [
        new WebpackFilterWarningsPlugin({
            exclude: /System.import/
        }),
        new AngularCompilerPlugin({
            tsConfigPath: path.resolve("tsconfig.json"),
            mainPath: path.resolve("src/main.ts"),
            sourceMap: true,
            skipCodeGeneration: true,
            nameLazyFiles: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve("src/index.html")
        })
    ]
};
