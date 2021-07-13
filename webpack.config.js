const HtmlWebpackPlugin = require('html-webpack-plugin');
const loaderUtils = require('loader-utils');
const path = require('path');
const fs = require('fs');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// [filename]_[classname]__[hash]
function getCSSModuleLocalIdent (context, localIdentName, localName, options) {
  // 使用文件名或文件夹名
  const fileNameOrFolder = context.resourcePath.match(/index\.module\.(css|scss|sass)$/) ? '[folder]' : '[name]';
  // 根据文件位置和类名创建哈希
  const hash = loaderUtils.getHashDigest(
    path.posix.relative(context.rootContext, context.resourcePath) + localName,
    'md5',
    'base64',
    5
  );
  // 使用 loaderUtils 查找文件或文件夹名称
  const className = loaderUtils.interpolateName(
    context,
    fileNameOrFolder + '_' + localName + '__' + hash,
    options
  );
  // 删除类名中的 `.module`，并替换所有 "." with "_"。
  return className.replace('.module_', '_').replace(/\./g, '_');
};

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-react']
            }
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: {
                    compileType: 'icss',
                  },
                }
              }
            ]
          },
          {
            test: cssModuleRegex,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: {
                    compileType: 'module',
                    getLocalIdent: getCSSModuleLocalIdent
                  },
                }
              },
              // require.resolve('postcss-loader'), // 准备支持
            ]
          },
          // 匹配常规的 sass 模块，仅支持 ICSS
          {
            test: /\.(scss|sass)$/,
            exclude: /\.module\.(scss|sass)$/, // 排除 .module.scss 或 .module.sass 扩展文件
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 3, // 3 => postcss-loader, resolve-url-loader, sass-loader
                  modules: {
                    compileType: 'icss',
                  },
                }
              },
              {
                // 帮助 sass-loader 找到对应的 url 资源
                loader: require.resolve('resolve-url-loader'),
                options: {
                  root: resolveApp('src'),
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: true, // 这里不可少
                },
              },
            ],
          },
          // 支持 CSS Modules, 仅匹配 .module.scss 或 .module.sass 扩展文件
          {
            test: /\.module\.(scss|sass)$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 3,
                  modules: {
                    compileType: 'module',
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                }
              },
              {
                loader: require.resolve('resolve-url-loader'),
                options: {
                  root: resolveApp('src'),
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
    })
  ]
};