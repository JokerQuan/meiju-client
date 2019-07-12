const { override, fixBabelImports, addLessLoader } = require('customize-cra');

//编译时不生成map文件
process.env.GENERATE_SOURCEMAP = "false";

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A'
        },
    }),
);