import fs from 'fs';
import path from 'path';

const TMDB_KEY = '15d2ea6d0dc1d476efbca3eba2b9bbfb';

// Helper to check HTTP 200
async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(6000) });
    return res.status === 200;
  } catch (e) {
    return false;
  }
}

async function verifyAllUrls(dict) {
  const failed = [];
  for (const [key, url] of Object.entries(dict)) {
    if (!url) {
      failed.push({ key, url, reason: 'NULL_OR_EMPTY' });
      continue;
    }
    const ok = await checkUrl(url);
    if (!ok) {
      failed.push({ key, url, reason: 'NOT_200' });
      console.log('FAIL:', key, '->', url);
    } else {
      // console.log('OK:', key);
    }
  }
  return failed;
}

console.log('Update script initialized.');
