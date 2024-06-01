const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@Shared": path.join(path.resolve(__dirname, "src/Modules/Shared")),
      "@Modules": path.join(path.resolve(__dirname, "src/Modules")),
      "@": path.join(path.resolve(__dirname, "src")),
    },
  },
};
