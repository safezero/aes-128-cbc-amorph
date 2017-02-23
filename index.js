const arguguard = require('arguguard')
const Amorph = require('amorph')
const amorphBufferPlugin = require('amorph-buffer')
const aes = require('aes-js')

Amorph.loadPlugin(amorphBufferPlugin)
Amorph.ready()

exports.encrypt = function encrypt(plaintext, key, iv) {
  arguguard('encrypt', [Amorph, Amorph, Amorph], arguments)
  const aesCbc = new aes.ModeOfOperation.cbc(key.to('uint8Array'), iv.to('uint8Array'))
  return new Amorph(aesCbc.encrypt(plaintext.to('uint8Array')), 'uint8Array')
}

exports.decrypt = function decrypt(ciphertext, key, iv) {
  arguguard('decrypt', [Amorph, Amorph, Amorph], arguments)
  const aesCbc = new aes.ModeOfOperation.cbc(key.to('uint8Array'), iv.to('uint8Array'))
  return new Amorph(aesCbc.decrypt(ciphertext.to('uint8Array')), 'uint8Array')
}
