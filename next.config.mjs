/** @type {import('next').NextConfig} */

import nextra from "nextra";

const nextConfig = {};
const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
});
export default withNextra(nextConfig);
