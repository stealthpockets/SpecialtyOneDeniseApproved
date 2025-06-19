#!/usr/bin/env node

/**
 * Build verification script for Specialty One website
 * Ensures all critical assets are properly copied to dist folder
 */

import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

const distPath = 'dist';
const criticalAssets = [
  'assets/logo/logo-horizontal-lightbackground.svg',
  'assets/logo/logo-horizontal-blackbackground.svg',
  'assets/favicon/favicon.svg',
  'robots.txt',
  'sitemap.xml'
];

console.log('🔍 Verifying build assets...');

if (!existsSync(distPath)) {
  console.error('❌ dist folder not found. Run npm run build first.');
  process.exit(1);
}

let allAssetsFound = true;

criticalAssets.forEach(asset => {
  const fullPath = join(distPath, asset);
  if (existsSync(fullPath)) {
    console.log(`✅ ${asset}`);
  } else {
    console.error(`❌ Missing: ${asset}`);
    allAssetsFound = false;
  }
});

// Check if assets directory exists
const assetsDir = join(distPath, 'assets');
if (existsSync(assetsDir)) {
  const assetFolders = readdirSync(assetsDir);
  console.log(`📁 Asset folders found: ${assetFolders.join(', ')}`);
} else {
  console.error('❌ No assets directory found in dist');
  allAssetsFound = false;
}

if (allAssetsFound) {
  console.log('✅ All critical assets verified successfully!');
  process.exit(0);
} else {
  console.error('❌ Some assets are missing from the build');
  process.exit(1);
}
