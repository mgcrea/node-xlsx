import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/bin/cli.ts"],
  format: ["esm", "cjs"],
  // Old bundlers (webpack 4) cannot parse class fields and other ES2022 syntax
  target: "es2019",
  platform: "node",
  dts: { resolver: "tsc" },
  clean: true,
  // SheetJS is no longer published on npm: ship it, and its types, inside the package
  // rather than as a CDN tarball dependency
  deps: {
    alwaysBundle: ["xlsx"],
    onlyBundle: ["xlsx"],
    dts: { alwaysBundle: ["xlsx"] },
  },
});
