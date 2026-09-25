import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

function generateBranchPagesPlugin() {
  return {
    name: 'generate-branch-pages',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        const branches = ['bapunagar'];
        branches.forEach((branch) => {
          const branchDir = path.join(distDir, branch);
          if (!fs.existsSync(branchDir)) {
            fs.mkdirSync(branchDir, { recursive: true });
          }
          fs.copyFileSync(indexPath, path.join(branchDir, 'index.html'));
        });
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    generateBranchPagesPlugin()
  ],
  server: {
    port: 3000,
    host: true
  }
});
