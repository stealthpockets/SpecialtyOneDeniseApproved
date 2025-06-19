#!/usr/bin/env node

import { existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const publicDir = join(rootDir, 'public');

console.log('🔍 Verifying build assets...\n');

// Debug information
console.log(`Root directory: ${rootDir}`);
console.log(`Dist directory: ${distDir}`);
console.log(`Public directory: ${publicDir}`);
console.log(`Dist exists: ${existsSync(distDir)}`);
console.log(`Public exists: ${existsSync(publicDir)}`);
console.log('');

// Check if dist directory exists
if (!existsSync(distDir)) {
  console.error('❌ dist directory not found! Run `npm run build` first.');
  process.exit(1);
}

// Check critical assets in dist directory (after Vite build)
const criticalAssets = [
  'assets/logo/logo-horizontal-lightbackground.svg',
  'assets/favicon/favicon.svg',
  'assets/favicon/favicon-32x32.png',
];

// Also check the capitalized paths in case of case sensitivity issues
const criticalAssetsAlternate = [
  'Assets/logo/logo-horizontal-lightbackground.svg',
  'Assets/favicon/favicon.svg',
  'Assets/favicon/favicon-32x32.png',
];

let allAssetsFound = true;

console.log('Checking critical assets in dist directory:');
criticalAssets.forEach((asset, index) => {
  const distPath = join(distDir, asset);
  const alternateAsset = criticalAssetsAlternate[index];
  const alternatePath = join(distDir, alternateAsset);
  
  if (existsSync(distPath)) {
    console.log(`✅ ${asset} - found in dist`);
  } else if (existsSync(alternatePath)) {
    console.log(`✅ ${alternateAsset} - found in dist (case variant)`);
  } else {
    console.log(`❌ ${asset} - NOT found in dist (checked both ${asset} and ${alternateAsset})`);
    allAssetsFound = false;
  }
});

// List all files in dist/assets if it exists
const distAssetsDir = join(distDir, 'assets');
if (existsSync(distAssetsDir)) {
  console.log('\n📁 Files found in dist/assets:');
  const listFiles = (dir, prefix = '') => {
    const items = readdirSync(dir);
    items.forEach(item => {
      const fullPath = join(dir, item);
      const relativePath = prefix + item;
      
      if (statSync(fullPath).isDirectory()) {
        console.log(`   📁 ${relativePath}/`);
        listFiles(fullPath, relativePath + '/');
      } else {
        console.log(`   📄 ${relativePath}`);
      }
    });
  };
  listFiles(distAssetsDir);
} else {
  console.log('\n❌ No assets directory found in dist');
  allAssetsFound = false;
}

console.log('\n' + '='.repeat(50));
if (allAssetsFound) {
  console.log('✅ Build verification PASSED - All assets ready for deployment!');
} else {
  console.log('⚠️  Build verification FAILED - Some assets may be missing');
  console.log('\n💡 Tips:');
  console.log('   - Ensure files are in the public/ directory');
  console.log('   - Check file paths and spelling');
  console.log('   - Run `npm run build` and check again');
}

process.exit(allAssetsFound ? 0 : 1);
