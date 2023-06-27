import crypto from 'crypto';
import fs from 'fs';

const generateKey = () => {
  const key = crypto.randomBytes(32).toString('hex');
  const algo = 'aes-256-cbc';
  fs.writeFileSync('./config/cipherKey.json', JSON.stringify({ key, algo }));
};

// <<<<<<< develop
// =======
// generateKey();

// >>>>>>> develop
export default generateKey;
