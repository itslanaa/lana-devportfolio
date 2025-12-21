import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexHtml = path.join(distDir, 'index.html');
const notFoundHtml = path.join(distDir, '404.html');

console.log('Creating 404.html for GitHub Pages SPA support...');

try {
  fs.copyFileSync(indexHtml, notFoundHtml);
  console.log('Successfully created 404.html');
} catch (error) {
  console.error('Error creating 404.html:', error);
  process.exit(1);
}
