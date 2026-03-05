/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '**.signa.app' },
            { protocol: 'http', hostname: 'localhost' },
        ],
    },
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.API_URL ?? 'http://localhost:8000'}/api/:path*`,
            },
        ]
    },
}

export default nextConfig
