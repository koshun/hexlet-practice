import crypto from 'crypto';
import fs from 'fs';

const readKey = () => {
  const data = fs.readFileSync('./config/cipherKey.json', 'utf8');
  return JSON.parse(data);
};

const encrypt = (data) => {
  const { key, algo } = readKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algo, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (data) => {
  const { key, algo } = readKey();
  const [ivHex, encryptedHex] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(algo, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// <<<<<<< develop
// =======
// const data = 'AbraCodeAbra';
// for (let i = 1; i <= 10; i += 1) {
//   const encData = encrypt(data);
//   console.log(encData);
//   console.log(decrypt(encData));
// }
// >>>>>>> develop
export { encrypt, decrypt };
