import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neith-topics.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: 'rewardimages.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    nextScriptWorkers: false,
  },
}

export default withNextIntl(nextConfig)
