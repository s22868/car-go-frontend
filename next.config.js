/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cargo2137.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
  reactStrictMode: true,
}
