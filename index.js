const seedrandom = require('seedrandom')
const crypto = require('crypto')

const emailToRandomize = seedrandom('firstname.lastname@gmail.com')
console.log(emailToRandomize()) // first seeded execution is always the same
// 0.6648336373678267
// 0.12000885980388516
const phoneNumberToRandomize = seedrandom('999-123-4567')
console.log(phoneNumberToRandomize()) //0.12000885980388516

const NUM_SEEDS = '0123456789'
const HEX_SEEDS = `abcdef${NUM_SEEDS}`
const ALPHABET_SEEDS = 'abcdefghijklmnopqrstuvwxyz'

const generateRandomSeedPickFunc = (seeds) => {
  const sampleIndex = Math.floor(Math.random() * Math.floor(seeds.length))
  return seeds[sampleIndex]
}

const gen = ({
  mask = null,
  casing = null,
}) => {
  let randomFunc
  switch (givenSeedType) {
    case 'email':
      randomFunc = () => Math.floor(Math.random() * Math.floor(10))
      break
    case 'number':
      randomFunc = () => Math.floor(Math.random() * Math.floor(10))
      break
    case 'base64': 
      randomFunc = () => 
    case 'guid':
      randomFunc = () => generateRandomSeedPickFunc(HEX_SEEDS)
      break
    case 'alphabet': {

      break
    }
    default: {

    }
  }
  const generatedToken = Array.from({ length }, randomFunc).join('')
  if (casing === 'u' || casing === 'upper') {
    generatedToken = generatedToken.toUpperCase()
  } else if (casing === 'l' || casing === 'lower') {
    generatedToken = generatedToken.toLowerCase()
  }
  return generatedToken
}

const hash = crypto.createHash('sha256').update('val').digest('base64');
console.log({hash})

module.exports = RandomToken = {
  gen: ({
    length = DEFAULT_TOKEN_SIZE,
    seed = null,
    casing = null,
    friendly = false,
    mask = null,
  }) => genToken({
    length, seed, casing, mask, friendly,
  })
}

// A utility that
// For emails:
// determine({ val: 'first.last@gmail.com', type: 'email', (optional) length: val.length, (optional) casing: 'l' || 'u' })

// For phone numbers:
// determine({ val: '(623) 341-4623', type: 'phone', (optional) mask: '(XXX) XXX-XXXX', (optional) length: val.length, (optional) casing: 'l' || 'u' })
// determine({ val: '(623)341-4623', type: 'phone', (optional) mask: '(XXX) XXX-XXXX', (optional) length: val.length, (optional) casing: 'l' || 'u' })
// determine({ val: '623-341-4623', type: 'phone', (optional) mask: '(XXX) XXX-XXXX', (optional) length: val.length, (optional) casing: 'l' || 'u' })
// determine({ val: '6233414623', type: 'phone', (optional) mask: '(XXX) XXX-XXXX', (optional) length: val.length, (optional) casing: 'l' || 'u' })
// determine({ val: '16233414623', type: 'phone', (optional) mask: '(XXX) XXX-XXXX', (optional) length: val.length, (optional) casing: 'l' || 'u' })

// For any base64:
// determine ({ val: 'any string of any length', type: 'base64', (optional) mask: undefined, (optional) length: val.length, (optional) casing: 'l' || 'u' })

// const determine, { TYPES } from '@ga/determine'
