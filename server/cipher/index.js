let crypto = require('crypto');

module.exports = {
  cryptoCipher: (password) => {
    let cipher = crypto.createCipher('aes256', 'password');
    cipher.update(password, 'ascii', 'hex');
    return cipher.final('hex');
  },

  cryptoDecipher: (password) => {
    let decipher = crypto.createDecipher('aes256', 'password');
    decipher.update(password, 'hex', 'ascii');
    return decipher.final('ascii');
  },

  cryptoGenerateHash: (id) => {
    let sha = crypto.createHash('sha256');
    sha.update(id);
    return sha.digest('hex');
  }
}
