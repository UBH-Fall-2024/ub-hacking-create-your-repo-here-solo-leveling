/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only run ESLint during development
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',  // For Google auth profile pictures
      'avatars.githubusercontent.com',  // For GitHub auth profile pictures
    ],
  },
};

export default nextConfig;
