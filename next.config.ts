import { WebpackPluginInstance } from "webpack";
import TerserPlugin from "terser-webpack-plugin";

const nextConfig = {
    // Enable static export
    output: 'export',

    // Enable base path if needed (for non-root deployments, like GitHub Pages)
    basePath: '',

    webpack(config: any, { isServer }: { isServer: boolean }) {
        if (!isServer) {
            config.optimization.splitChunks = {
                cacheGroups: {
                    default: false,
                    vendor: false,
                    main: {
                        chunks: 'all',
                        name: 'main', // Output to a single file
                        test: /pages/, // Only include pages and dependencies
                        priority: 1,
                    },
                },
            };

            // Minify code for production
            config.optimization.minimize = true;
            config.optimization.minimizer = [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true, // Remove console logs
                        },
                    },
                }),
            ];
        }

        return config;
    },

    // Optional: add static export configuration
    trailingSlash: true, // Ensures folders are treated as static
};

export default nextConfig;
