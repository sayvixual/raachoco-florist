const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');

const CRYPTO_SALT = 'raachoco_florist_atelier_k3y_2026_bdl!pine#ultra';

function computeSaltedHash(password) {
  let hash = crypto.createHash('sha256').update(CRYPTO_SALT + password + CRYPTO_SALT).digest('hex');
  for (let i = 0; i < 5000; i++) {
    hash = crypto.createHash('sha256').update(hash + CRYPTO_SALT).digest('hex');
  }
  return hash;
}

function applyNewPin(pin) {
  const cleanPin = (pin || '').trim();

  if (!cleanPin) {
    console.log('\n❌ PIN tidak boleh kosong!');
    process.exit(1);
  }

  if (cleanPin.length < 6) {
    console.log('\n⚠️ Demi keamanan, PIN minimal 6 karakter!');
    console.log('   Contoh: Raachoco#8899 atau BungaCantik#2026\n');
    process.exit(1);
  }

  const newHash = computeSaltedHash(cleanPin);
  const adminJsPath = path.join(__dirname, '..', 'js', 'admin.js');

  let content = fs.readFileSync(adminJsPath, 'utf8');
  const regex = /const MASTER_KEY_HASH = '[a-f0-9]{64}';/;

  if (!regex.test(content)) {
    console.error('❌ Gagal menemukan MASTER_KEY_HASH di js/admin.js');
    process.exit(1);
  }

  content = content.replace(regex, `const MASTER_KEY_HASH = '${newHash}';`);
  fs.writeFileSync(adminJsPath, content, 'utf8');

  console.log('\n======================================================');
  console.log('  BERHASIL MENGUBAH MASTER PIN ADMIN RAACHOCO FLORIST ');
  console.log('======================================================');
  console.log(`🔑 PIN Baru Anda : ${cleanPin}`);
  console.log(`🛡️ Hash Tersimpan: ${newHash}`);
  console.log('📁 File Terupdate: js/admin.js');
  console.log('======================================================');
  console.log('Catatan: PIN baru sudah aktif langsung! Simpan dan ingat baik-baik.\n');
  process.exit(0);
}

const args = process.argv.slice(2);
const cliPin = args[0] ? args[0].trim() : '';

if (cliPin) {
  applyNewPin(cliPin);
} else {
  // Mode Interaktif: pengguna cukup jalankan "npm run change-pin"
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n======================================================');
  console.log('   GANTI MASTER PIN ADMIN — RAACHOCO FLORIST         ');
  console.log('======================================================');
  console.log('Masukkan PIN yang ingin Anda ketik saat login di web.');
  console.log('Contoh: Raachoco#8899 atau BungaMawar#2026');
  console.log('------------------------------------------------------');

  rl.question('👉 Masukkan PIN Baru: ', (answer) => {
    rl.close();
    applyNewPin(answer);
  });
}
