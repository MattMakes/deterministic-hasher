const assert = require('assert');
const DeterministicHasher = require('./index');

describe('deterministic hashing tests', function() {
  describe('hashing emails', function() {
    it('should hash email should return a value', function() {
      const hasher = new DeterministicHasher()
      const firstHash = hasher.hash({val: 'matt.makes@supersecureemail.com', type: 'email', casing: 'lowercase' })

      assert.notStrictEqual(firstHash, undefined)
    });

    it('should hash same emails with the same hash each time', function() {
      const hasher = new DeterministicHasher()
      const firstHash = hasher.hash({val: 'matt.makes@supersecureemail.com', type: 'email', casing: 'lowercase' })
      const secondHash = hasher.hash({val: 'matt.makes@supersecureemail.com', type: 'email', casing: 'lowercase' })

      assert.strictEqual(firstHash, secondHash, `Values did not match. 1: ${firstHash} 2: ${secondHash}`)
    });

    it('should hash email with @example.com on the end', function() {
      const hasher = new DeterministicHasher()
      const firstHash = hasher.hash({val: 'matt.makes@supersecureemail.com', type: 'email', casing: 'lowercase' })

      const emailSuffix = firstHash.substring(firstHash.length-12, firstHash.length);
      assert.strictEqual(emailSuffix, '@example.com', `Ending of hashed email should have @example.com, instead has ${emailSuffix}`)
    });
  });
  describe('hashing phone numbers', function() {
    it('should hash and mask phone number', function() {
      const hasher = new DeterministicHasher()
      const phoneNumber = '(623) 555-1234'
      const mask = 'XXX-XXX-XXXX'

      const hashedPhoneNumber = hasher.hash({val: phoneNumber, type:'phone', mask })

      assert.strictEqual((hashedPhoneNumber.match(/-/g) || []).length, 2, `Hashed phone number should include two dashes, instead it was: ${hashedPhoneNumber}`)
    })
  });
});
