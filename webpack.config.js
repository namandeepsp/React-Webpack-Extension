import path, { dirname } from "path";
import { fileURLToPath } from "url";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CspHtmlWebpackPlugin from "csp-html-webpack-plugin";
import { clear } from "console";
import { use } from "react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const webpackDevConfiguration = (env) => {
  return {
    mode: "development",
    entry: {
      popup: path.resolve(__dirname, "./src/popup/popup.tsx"),
      background: path.resolve(__dirname, "./src/background/service-worker.ts"),
      content: path.resolve(__dirname, "./src/content_script/content.tsx"),
    },
    module: {
      rules: [
        {
          use: "ts-loader",
          test: /\.tsx$/i,
          exclude: /node_modules/,
        },
        {
          use: ["css-loader", "style-loader"],
          test: /\.css$/i,
        },
      ],
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components/"),
      },
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: (pathData, assetInfo) => {
        console.log("pathData: ", pathData);
        console.log("assetInfo: ", assetInfo);
        // if (pathData.chunk.name === 'main') {
        //   return 'main.bundle.js';
        // }
        return "./js/[name].bundle.js";
      },
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    /* {
      filename: "[name].js",
    }, */
    devtool: "cheap-module-source-map",
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public/manifest.json"),
            to: path.resolve(__dirname, "dist/manifest.json"),
          },
          {
            from: path.resolve(__dirname, "public/assets"),
            to: path.resolve(__dirname, "dist/assets"),
          },
          {
            from: path.resolve(__dirname, "src/index.css"),
            to: path.resolve(__dirname, "dist/css/index.css"),
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: "./src/popup/popup.html",
        filename: "html/popup.html",
        chunks: ["popup"], // Include only the 'main' chunk
        inject: "body",
      }),
      new CspHtmlWebpackPlugin({
        "script-src": ["'self'"],
        "object-src": ["'none'"],
      }),
    ],
  };
};
export default webpackDevConfiguration;
