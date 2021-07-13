const HtmlWebpackPlugin = require('html-webpack-plugin');
const loaderUtils = require('loader-utils');
const path = require('path');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

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
              require.resolve('postcss-loader'),
            ]
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