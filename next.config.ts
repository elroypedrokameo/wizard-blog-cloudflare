/** @type {import('next').NextConfig} */
const nextConfig = {
  // Baris di bawah ini WAJIB ada agar tampilan (CSS/JS) tidak rusak
  assetPrefix: 'https://wizard-blog.vercel.app/',

  // Jika Anda menggunakan komponen <Image /> dari Next.js
  images: {
    unoptimized: true,
  },
  
  // Opsional: Jika Anda ingin memastikan trailing slash konsisten
  trailingSlash: true,
};

module.exports = nextConfig;
import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
