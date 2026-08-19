/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // No trailing slashes — matches the URL convention in the master plan.
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Common mistyped / legacy paths. Add 301s here whenever a URL changes,
      // so shared and indexed links never rot.
      { source: '/courses', destination: '/learn/courses', permanent: true },
      { source: '/bootcamp', destination: '/learn/bootcamp', permanent: true },
      { source: '/tools', destination: '/learn/tools', permanent: true },
      { source: '/insights', destination: '/learn/insights', permanent: true },
      { source: '/blog', destination: '/learn/insights', permanent: true },
    ];
  },
};

export default nextConfig;
