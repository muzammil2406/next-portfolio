/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ['res.cloudinary.com', 'firebasestorage.googleapis.com', 'img.icons8.com', 'raw.githubusercontent.com', 'i.imgur.com', 'img.freepik.com','media.geeksforgeeks.org', 'i.postimg.cc', 'uxwing.com', 'assets.vercel.com', 'cdn.worldvectorlogo.com', 'cdn.jsdelivr.net', 'cdn.simpleicons.org', 'image.thum.io']
  }
}

module.exports = nextConfig
