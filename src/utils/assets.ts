const ASSET_BASE_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  let cleanPath = path;
  const devR2Domain = 'https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev';
  if (cleanPath.startsWith(devR2Domain)) {
    cleanPath = cleanPath.slice(devR2Domain.length);
  }
  if (cleanPath.startsWith('http')) return cleanPath;
  // Ensure path doesn't start with slash
  const cleanPathNoSlash = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
  return `${ASSET_BASE_URL}/${cleanPathNoSlash}`;
};

export { assetManifest } from '../data/asset-manifest';

