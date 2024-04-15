/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
                port: '',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'daisyui.com',
                port: '',
                pathname: '**'
            },
        ]
    }
};

export default nextConfig;
