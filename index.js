const arguguard = require('arguguard')
const aes = require('aes-js')

exports.encrypt = function encrypt(plaintext, key, iv) {
  arguguard('encrypt', ['Amorph', 'Amorph', 'Amorph'], arguments)
  const aesCbc = new aes.ModeOfOperation.cbc(key.to('uint8Array'), iv.to('uint8Array'))
  const Amorph = plaintext.constructor
  return new Amorph(aesCbc.encrypt(plaintext.to('uint8Array')), 'uint8Array')
}

exports.decrypt = function decrypt(ciphertext, key, iv) {
  arguguard('decrypt', ['Amorph', 'Amorph', 'Amorph'], arguments)
  const aesCbc = new aes.ModeOfOperation.cbc(key.to('uint8Array'), iv.to('uint8Array'))
  const Amorph = ciphertext.constructor
  return new Amorph(aesCbc.decrypt(ciphertext.to('uint8Array')), 'uint8Array')
}
