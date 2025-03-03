/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/docs/:path*",
          destination: "http://localhost:3001/docs/:path*", // Proxy to Docusaurus
        },
      ];
    },
  };
  
  export default nextConfig;
  