//前端加密主要是为了防止密码明文传输

//使用例子
//var CryptoJS = require("crypto-js");

// Encrypt
//var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// Decrypt
//var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
//var originalText = bytes.toString(CryptoJS.enc.Utf8);

//console.log(originalText); // 'my message'

const SECRETKEY = "dylan";

module.exports={
  SECRETKEY
}