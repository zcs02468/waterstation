const px2rem = require("postcss-px2rem");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const postcss = px2rem({
    remUnit: 80, //基准大小 baseSize，需要和rem.js中相同
});
module.exports = {
    publicPath:"/water",
    devServer: {
        disableHostCheck: true,
        // baseUrl: "/",
        proxy: {
            "/smartEnergy": {
                target: "http://10.23.1.168:8980/",
                changeOrigin: true,
            },
        },
    },
    productionSourceMap: false,
    // css: {
    //     loaderOptions: {
    //         postcss: {
    //             plugins: [postcss],
    //         },
    //     },
    // },

    lintOnSave: false, // 取消 eslint 验证
    // configureWebpack: {
    //     externals: {
    //         BMap: "BMap",
    //     },
    // },
    configureWebpack: (config) => {
        // if (isProd) {
        // 配置webpack 压缩
        config.plugins.push(
            new CompressionWebpackPlugin({
                test: /\.js$|\.html$|\.css$/,
                // 超过4kb压缩
                threshold: 4096,
            })
        )
        // }
    },
    // // 压缩图片
    // chainWebpack: (config) => {
    //     config.module 
    //         .rule("images")
    //         .use("image-webpack-loader")
    //         .loader("image-webpack-loader")
    //         .options({ bypassOnDebug: true })
    //         .end();
    // },
  outputDir: 'waterstation',
};
