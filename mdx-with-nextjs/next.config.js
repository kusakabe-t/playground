const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
  withMDX: withMDX({
    pageExtensions: ["ts", "tsx", "md", "mdx"],
  }),
}
