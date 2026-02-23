const { override, adjustWebpackConfig, splitChunks, addBundleVisualizer } = require('customize-cra');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

module.exports = override(
  // 1. 分析打包体积（可选）
  addBundleVisualizer({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: 'bundle-report.html'
  }),

  // 2. 核心优化配置 + 修复 Node.js 模块 polyfill
  adjustWebpackConfig(webpackConfig => {
    // 性能配置
    webpackConfig.performance = {
      hints: false,
      maxAssetSize: 512000,
      maxEntrypointSize: 512000
    };

    // 解析配置：添加 Node.js 核心模块 fallback
    webpackConfig.resolve = {
      ...webpackConfig.resolve,
      extensions: ['.js', '.jsx'],
      modules: [require('path').resolve(__dirname, 'node_modules')],
      cacheWithContext: false,
      symlinks: false,
      // 关键：添加 fallback 配置
      fallback: {
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util"),
        "buffer": require.resolve("buffer"),
        "process": require.resolve("process/browser")
      }
    };

    // 插件配置：注入全局变量（解决 crypto 等模块的运行时依赖）
    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      }),
      // Gzip 压缩插件
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 8192,
        minRatio: 0.8
      })
    ];

    // 优化 loader
    const jsLoader = webpackConfig.module.rules.find(rule => 
      rule.oneOf && rule.oneOf.some(item => item.loader && item.loader.includes('babel-loader'))
    );
    if (jsLoader) {
      jsLoader.oneOf.forEach(loader => {
        if (loader.loader && loader.loader.includes('babel-loader')) {
          loader.exclude = /node_modules/;
          loader.options = {
            ...loader.options,
            cacheDirectory: true,
            cacheCompression: false
          };
        }
      });
    }

    // 生产环境压缩优化
    if (webpackConfig.mode === 'production') {
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true
              },
              mangle: true
            }
          })
        ],
        splitChunks: {
          ...splitChunks(),
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              reuseExistingChunk: true
            },
            common: {
              name: 'common',
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
      };
    }

    // 开发环境缓存
    if (webpackConfig.mode === 'development') {
      webpackConfig.cache = {
        type: 'filesystem',
        cacheDirectory: require('path').resolve(__dirname, 'node_modules/.cache/webpack')
      };
    }

    return webpackConfig;
  })
);