const esbuild = require("esbuild");
const alias = require("esbuild-plugin-alias");

esbuild
  .build({
    entryPoints: ["./src/index.ts"], // Adjust as needed
    bundle: true,
    outfile: "./dist/index.js",
    minify: true,
    sourcemap: false,
    platform: "node", // Change to 'browser' if applicable
    target: ["node14"], // Specify your target environment
    plugins: [
      alias({
        "@": "./src", // This matches your path alias
      }),
    ],
  })
  .catch(() => process.exit(1));
