/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tesla-cdn.thron.com',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
  reactStrictMode: true,
}
