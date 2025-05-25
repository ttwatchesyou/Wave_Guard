/* eslint-disable */
const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  lessVarsFilePath: "./styles/antd-custom.less",
  cssLoaderOptions: {},
  // Other Config Here...
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    return config;
  },
});
