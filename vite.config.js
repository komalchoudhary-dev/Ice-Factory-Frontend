import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
 // This auto-imports React
    // jsxInject: `import React from 'react'`, // This auto-imports React
    jsx: 'automatic',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
})