/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    /* Advanced optimization for dashboard data rendering */
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client'],
    },
};

module.exports = nextConfig;
