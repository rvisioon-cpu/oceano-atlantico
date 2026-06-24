import fs from 'fs';
import path from 'path';

// Define the assets base URL
const R2_PUBLIC_URL = "https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev";

// Mapping of unit IDs in D1 to their corresponding static asset IDs
const unitAssetMap = {
  'unit_1_101': '101',
  'unit_2_201': 'x01',
  'unit_3_301': 'x01',
  'unit_4_401': 'x01',
  'unit_5_501': 'x01',
  'unit_6_601': 'x01',
  'unit_7_701': 'x01',
  'unit_2_202': 'x02',
  'unit_3_302': 'x02',
  'unit_4_402': 'x02',
  'unit_5_502': 'x02',
  'unit_6_602': 'x02',
  'unit_7_702': 'x02',
  'unit_8_802': 'x02',
  'unit_8_801': '801',
  'unit_9_901': '901',
  'unit_9_terraza': '902'
};

// 1. Read asset manifest to find which assets exist
const manifestPath = path.resolve('./src/data/asset-manifest.ts');
let manifestContent = fs.readFileSync(manifestPath, 'utf8');

// Parse assetManifest array from the typescript file
// Basic extraction of strings between single or double quotes
const assetManifest = [];
const matches = manifestContent.matchAll(/['"]([^'"]+)['"]/g);
for (const match of matches) {
  if (match[1].startsWith('plants/') || match[1].startsWith('amenities/')) {
    assetManifest.push(match[1]);
  }
}

console.log(`Loaded ${assetManifest.length} paths from asset-manifest.ts`);

const sqlUpdates = [];

// Helper to look up file extensions in manifest
const getStaticViewUrl = (assetId, type) => {
  const extensions = ['jpg', 'jpeg', 'png'];
  for (const ext of extensions) {
    const relativePath = `plants/details/${assetId}/${type}.${ext}`;
    if (assetManifest.includes(relativePath)) {
      return `${R2_PUBLIC_URL}/${relativePath}`;
    }
  }
  return null;
};

// Helper to find gallery images in manifest (or use fallback)
const getGalleryUrls = (assetId) => {
  const specificImages = assetManifest
    .filter(p => p.includes(`plants/details/${assetId}/gallery/`))
    .map(p => `${R2_PUBLIC_URL}/${p}`);
  
  if (specificImages.length === 0) {
    // Probe 1..10 as fallback for 902 etc.
    const fallbackUrls = [];
    for (let i = 1; i <= 10; i++) {
      // Look if manifest contains either .jpg or .png format
      const jpgPath = `plants/details/${assetId}/gallery/${i}.jpg`;
      const pngPath = `plants/details/${assetId}/gallery/${i}.png`;
      if (assetManifest.includes(jpgPath)) {
        fallbackUrls.push(`${R2_PUBLIC_URL}/${jpgPath}`);
      } else if (assetManifest.includes(pngPath)) {
        fallbackUrls.push(`${R2_PUBLIC_URL}/${pngPath}`);
      }
    }
    return fallbackUrls;
  }
  
  return specificImages;
};

// 2. Generate update statements
for (const [unitId, assetId] of Object.entries(unitAssetMap)) {
  const furnished = getStaticViewUrl(assetId, 'furnished');
  const unfurnished = getStaticViewUrl(assetId, 'unfurnished');
  const plans = getStaticViewUrl(assetId, 'plans');
  const gallery = getGalleryUrls(assetId);

  const furnishedJson = furnished ? JSON.stringify([furnished]) : '[]';
  const unfurnishedJson = unfurnished ? JSON.stringify([unfurnished]) : '[]';
  const plansJson = plans ? JSON.stringify([plans]) : '[]';
  const galleryJson = JSON.stringify(gallery);

  sqlUpdates.push(`-- Update unit ${unitId} using asset ${assetId}`);
  sqlUpdates.push(
    `UPDATE units SET ` +
    `photos_furnished = '${furnishedJson.replace(/'/g, "''")}', ` +
    `photos_unfurnished = '${unfurnishedJson.replace(/'/g, "''")}', ` +
    `photos_plans = '${plansJson.replace(/'/g, "''")}', ` +
    `gallery = '${galleryJson.replace(/'/g, "''")}' ` +
    `WHERE id = '${unitId}';`
  );
  sqlUpdates.push('');
}

// 3. Write SQL output
const sqlOutputPath = path.resolve('./scripts/populate-fallback-images.sql');
fs.writeFileSync(sqlOutputPath, sqlUpdates.join('\n'), 'utf8');
console.log(`Generated SQL script at ${sqlOutputPath}`);
