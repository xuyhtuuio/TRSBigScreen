import CryptoJS from './crypto-js';
const cryptkey = CryptoJS.enc.Utf8.parse('d7b85f6e214abcda');
export function Encrypt(word) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, cryptkey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString()
}

export function Decrypt(word) {
  const decrypt = CryptoJS.AES.decrypt(word, cryptkey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
