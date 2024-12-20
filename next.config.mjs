/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '1146890965.rsc.cdn77.org',
          },
        ],
      },
  
};

export default nextConfig;
