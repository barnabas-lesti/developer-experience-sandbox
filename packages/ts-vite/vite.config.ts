import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: ["./src/index.ts"],
      formats: ["cjs", "es"],
    },
    minify: true,
    sourcemap: true,
  },
  plugins: [dts({ rollupTypes: true })],
});
