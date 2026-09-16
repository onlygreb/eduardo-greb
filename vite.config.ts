// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Pin Nitro to Vercel's Build Output API so `vite build` is deployable on Vercel.
  // Lovable's default Nitro target is Cloudflare; auto-detection still works on Vercel,
  // but pinning avoids a Workers bundle if the platform isn't detected (local/CI).
  nitro: {
    preset: "vercel",
  },
  vite: {
    assetsInclude: ["**/*.pdf", "**/*.docx"],
  },
});
