/// <reference types="vitest" />
import { defineConfig } from "vite";
import p from "./package.json";
import visualizer from "rollup-plugin-visualizer";
export default defineConfig(({ mode }) => {
    return {
        plugins: [
            mode === "analyze" &&
                (visualizer({
                    open: true,
                    filename: "visualizer/stat.html",
                }) as any),
        ],
        define: {
            __version__: JSON.stringify(p.version),
        },
        build: {
            lib: {
                entry: "./src/index.ts",
                name: "index",
            },
        },
    };
});
