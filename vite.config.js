import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: './',
    server: {
        port: 3000
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        cssCodeSplit: true,
        chunkSizeWarningLimit: 1000,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    // Vendor chunk: React core libraries
                    if (id.includes('node_modules/react/') ||
                        id.includes('node_modules/react-dom/') ||
                        id.includes('node_modules/scheduler/')) {
                        return 'vendor-react'
                    }
                    // MUI core chunk
                    if (id.includes('node_modules/@mui/material/') ||
                        id.includes('node_modules/@emotion/')) {
                        return 'vendor-mui'
                    }
                    // MUI icons chunk (large, separate for lazy loading)
                    if (id.includes('node_modules/@mui/icons-material/')) {
                        return 'vendor-mui-icons'
                    }
                    // Per-screen code splitting: each screen gets its own chunk
                    // This preserves lazy loading benefits from React.lazy()
                    if (id.includes('/src/screens/')) {
                        const match = id.match(/\/src\/screens\/([^/]+)\.jsx$/)
                        if (match) {
                            return `screen-${match[1]}`
                        }
                    }
                },
                // Optimize asset naming for caching
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.')
                    const ext = info[info.length - 1]
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                        return `assets/images/[name]-[hash][extname]`
                    }
                    if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
                        return `assets/fonts/[name]-[hash][extname]`
                    }
                    return `assets/[name]-[hash][extname]`
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js'
            }
        },
        // Inline assets smaller than 4KB
        assetsInlineLimit: 4096
    },
    // Optimize dependencies
    optimizeDeps: {
        include: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled']
    }
})
