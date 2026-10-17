const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(__dirname, '..', 'assets', 'images');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

let totalBefore = 0;
let totalAfter = 0;

console.log('Optimizing JPEG images with MozJPEG progressive (82% quality)...');

files.forEach(f => {
  const fullPath = path.join(dir, f);
  const tempPath = path.join(dir, 'opt_' + f);
  const sizeBefore = fs.statSync(fullPath).size;
  totalBefore += sizeBefore;

  execSync(`npx sharp-cli -i "${fullPath}" -o "${tempPath}" -q 82 --mozjpeg -p`, { stdio: 'pipe' });
  const sizeAfter = fs.statSync(tempPath).size;
  totalAfter += sizeAfter;

  fs.copyFileSync(tempPath, fullPath);
  fs.unlinkSync(tempPath);
  console.log(`✓ ${f}: ${(sizeBefore/1024).toFixed(1)} KB -> ${(sizeAfter/1024).toFixed(1)} KB (-${((1 - sizeAfter/sizeBefore)*100).toFixed(1)}%)`);
});

console.log('==============================================');
console.log(`TOTAL BEFORE: ${(totalBefore/1024/1024).toFixed(2)} MB`);
console.log(`TOTAL AFTER : ${(totalAfter/1024/1024).toFixed(2)} MB`);
console.log(`TOTAL SAVED : ${((totalBefore - totalAfter)/1024/1024).toFixed(2)} MB (-${((1 - totalAfter/totalBefore)*100).toFixed(1)}%)`);
console.log('==============================================');
