import react from '@vitejs/plugin-react-swc'
import million from 'million/compiler'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd()))
  
  return {
    server: {
      port: 3000,
      host: true
    },
    
    plugins: [react(), svgr(), million.vite({ optimize: true, mute: true })],
    css: {
      transformer: 'postcss',
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      },
    },
    

    build: {
      outDir: 'build'
    },

    envPrefix: 'REACT_APP_',
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './node_modules/')
      }
    },

    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
  }
})
