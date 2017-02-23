const aes128Cbc = require('./')
const Amorph = require('amorph')
const chai = require('chai')
const chaiAmorph = require('chai-amorph')
const crypto = require('crypto')

function random (size) {
  return new Amorph(crypto.randomBytes(size), 'buffer')
}

chai.use(chaiAmorph)
chai.should()

describe('crypto amorph aes128Cbc', () => {

  it('should encrypt and decrypt', () => {
    const plaintext = random(32)
    const key = random(16)
    const iv = random(16)
    const ciphertext = aes128Cbc.encrypt(plaintext, key, iv)
    ciphertext.to('array').should.have.length(32)
    ciphertext.should.not.amorphEqual(plaintext)
    aes128Cbc.decrypt(ciphertext, key, iv).should.amorphEqual(plaintext)
  })

  it('encrypt should throw Error with invalid plaintext length', () => {
    const plaintext = random(31)
    const key = random(16)
    const iv = random(16)
    ;(() => {
      aes128Cbc.encrypt(plaintext, key, iv)
    }).should.throw(Error);
  })

  it('encrypt should throw Error with invalid key length', () => {
    const plaintext = random(32)
    const key = random(15)
    const iv = random(16)
    ;(() => {
      aes128Cbc.encrypt(plaintext, key, iv)
    }).should.throw(Error);
  })

  it('encrypt should throw Error with invalid IV', () => {
    const plaintext = random(32)
    const key = random(16)
    const iv = random(15)
    ;(() => {
      aes128Cbc.encrypt(plaintext, key, iv)
    }).should.throw(Error);
  })

})
