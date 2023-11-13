// vite.config.ts
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
import vue from "file:///app/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { internalIpV4 } from "file:///app/node_modules/internal-ip/index.js";
var mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);
var vite_config_default = defineConfig(async () => ({
  plugins: [vue()],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    host: "0.0.0.0",
    port: 1420,
    strictPort: true,
    hmr: mobile ? {
      protocol: "ws",
      host: await internalIpV4(),
      port: 1420,
      clientPort: 1420
    } : {
      clientPort: 1420
    },
    watch: {
      usePolling: true
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IHsgaW50ZXJuYWxJcFY0IH0gZnJvbSBcImludGVybmFsLWlwXCI7XHJcblxyXG4vLyBAdHMtZXhwZWN0LWVycm9yIHByb2Nlc3MgaXMgYSBub2RlanMgZ2xvYmFsXHJcbmNvbnN0IG1vYmlsZTogYm9vbGVhbiA9ICEhL2FuZHJvaWR8aW9zLy5leGVjKHByb2Nlc3MuZW52LlRBVVJJX0VOVl9QTEFURk9STSk7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoYXN5bmMgKCkgPT4gKHtcclxuICBwbHVnaW5zOiBbdnVlKCldLFxyXG4gIC8vIFZpdGUgb3B0aW9ucyB0YWlsb3JlZCBmb3IgVGF1cmkgZGV2ZWxvcG1lbnQgYW5kIG9ubHkgYXBwbGllZCBpbiBgdGF1cmkgZGV2YCBvciBgdGF1cmkgYnVpbGRgXHJcbiAgLy9cclxuICAvLyAxLiBwcmV2ZW50IHZpdGUgZnJvbSBvYnNjdXJpbmcgcnVzdCBlcnJvcnNcclxuICBjbGVhclNjcmVlbjogZmFsc2UsXHJcbiAgLy8gMi4gdGF1cmkgZXhwZWN0cyBhIGZpeGVkIHBvcnQsIGZhaWwgaWYgdGhhdCBwb3J0IGlzIG5vdCBhdmFpbGFibGVcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgIHBvcnQ6IDE0MjAsXHJcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxyXG4gICAgaG1yOiBtb2JpbGVcclxuICAgICAgICA/XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm90b2NvbDogJ3dzJyxcclxuICAgICAgICAgICAgaG9zdDogYXdhaXQgaW50ZXJuYWxJcFY0KCksXHJcbiAgICAgICAgICAgIHBvcnQ6IDE0MjAsXHJcbiAgICAgICAgICAgIGNsaWVudFBvcnQ6IDE0MjBcclxuICAgICAgICB9XHJcbiAgICAgICAgOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xpZW50UG9ydDogMTQyMFxyXG4gICAgICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICB1c2VQb2xsaW5nOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxufSkpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThMLFNBQVMsb0JBQW9CO0FBQzNOLE9BQU8sU0FBUztBQUNoQixTQUFTLG9CQUFvQjtBQUc3QixJQUFNLFNBQWtCLENBQUMsQ0FBQyxjQUFjLEtBQUssUUFBUSxJQUFJLGtCQUFrQjtBQUczRSxJQUFPLHNCQUFRLGFBQWEsYUFBYTtBQUFBLEVBQ3ZDLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlmLGFBQWE7QUFBQTtBQUFBLEVBRWIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osS0FBSyxTQUVEO0FBQUEsTUFDSSxVQUFVO0FBQUEsTUFDVixNQUFNLE1BQU0sYUFBYTtBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLFlBQVk7QUFBQSxJQUNoQixJQUVBO0FBQUEsTUFDSSxZQUFZO0FBQUEsSUFDaEI7QUFBQSxJQUNKLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
