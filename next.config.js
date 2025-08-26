/* eslint-disable */
const withAntdLess = require("next-plugin-antd-less");

/** @type {import('next').NextConfig} */
const nextConfig = withAntdLess({
  // ถ้าต้องการปรับ theme ของ antd
  modifyVars: { '@primary-color': '#1e3271' }, // หรือ import from less file
  // ปรับ SASS/LESS options ผ่าน sassOptions หรือ modifyVars
  compiler: {
    styledComponents: true, // เปิด support styled-components
  },
  webpack(config) {
    return config;
  },
});

module.exports = nextConfig;
