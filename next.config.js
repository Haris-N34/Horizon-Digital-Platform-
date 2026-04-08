/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled because react-leaflet@4 double-initializes the Leaflet
  // map container when React 18 Strict Mode mounts twice in dev.
  reactStrictMode: false,
};

module.exports = nextConfig;
