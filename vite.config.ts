import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  // Configure public directory to match Git case-sensitivity
  publicDir: 'Public',
  
  plugins: [
    react(),
    // Bundle analyzer - only in analyze mode
    process.env.NODE_ENV !== 'production' && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js'
    ],
  },
  
  build: {
    // Enable source maps for better debugging
    sourcemap: false,
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {          // Core React libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          
          // Heavy visualization libraries
          'vendor-maps': ['leaflet', 'react-leaflet'],
          'vendor-content': ['react-markdown', 'remark-gfm'],
          
          // UI and utilities
          'vendor-ui': ['lucide-react', '@cloudinary/react', '@cloudinary/url-gen'],
          'vendor-data': ['@supabase/supabase-js'],
        },
        
        // Better chunk naming for caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop().replace('.tsx', '').replace('.ts', '') : 'chunk';
          return `js/[name]-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  
  // Performance optimizations
  server: {
    fs: {
      strict: false,
    },
  },
});
