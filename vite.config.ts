/// <reference types="vitest" />
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
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

        resolve: {
            alias: {
                // '@cn-ui/sortable': './src/components/sortable/index',
                // viewerjs: 'https://unpkg.com/viewerjs',
            },
        },
        define: {
            __version__: JSON.stringify(p.version),
        },
        optimizeDeps: {
            include: [
                "lodash-es",
                "copy-to-clipboard",
                "viewerjs",
                "@vant/area-data",
                "mitt",
                "zxcvbn",
            ],
            exclude: ["@cn-ui/core"],
        },
    };
});
