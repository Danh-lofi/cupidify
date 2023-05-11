/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['res.cloudinary.com', 'asset.cloudinary.com', 'example.com'],
    },
    experimental: {
        appDir: true,
    },
    env: {
        MAX_IMAGES_ALBUMS: process.env.MAX_IMAGES_ALBUMS,
        API_PUBLIC: process.env.API_PUBLIC,
        FIREBASE_KEY: process.env.FIREBASE_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    },
};

module.exports = nextConfig;
