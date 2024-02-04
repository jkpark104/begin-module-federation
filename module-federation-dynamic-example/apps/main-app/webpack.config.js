const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:3000/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    fallback: {
      path: false,
    },
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "main_app",
      filename: "remoteEntry.js",
      remotes: {
        dynamic: `promise new Promise(resolve => {
          // 이 부분은 통합 모듈 호스팅 및 버전의 관리 계획에 따라 달라집니다.
          fetch("http://localhost:4000/remote.json").then(res => res.json()).then(({remoteUrl, scope}) => {
            console.log(remoteUrl, scope);
            const script = document.createElement('script')
            script.src = remoteUrl;
            script.onload = () => {
              const proxy = {
                get: (request) => window[scope].get(request),
                init: (arg) => {
                  try {
                    return window[scope].component_app1.init(arg)
                  } catch(e) {
                    console.log('remote container already initialized')
                  }
                }
              }
              resolve(proxy)
            }
            document.head.appendChild(script);
          });
        })
        `,
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
