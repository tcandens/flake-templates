import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsConfigPaths from 'vite-plugin-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths({ tsConfigPath: './tsconfig.json' })],
  envPrefix: 'PUBLIC_',
  server: {
    port: Number(process.env.PORT) + 1,
    proxy: {
      '/api/socket.io/': {
        target: `ws://0.0.0.0:${process.env.PORT}`,
        ws: true,
      },
      '^/api/.*': {
        target: `http://0.0.0.0:${process.env.PORT}`,
        ws: false,
      },
    }
  }
})
