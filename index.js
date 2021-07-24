const { compose } = require('ramda')
const crypto = require('crypto')
const faker = require('faker')

const _applyCasing = (opts) => {
  const { casing, output } = opts
  if (!casing) return opts

  switch (casing.toLowerCase()) {
    case 'l':
    case 'lowercase':
      opts.output = output.toString().toLowerCase()
      break
    case 'u':
    case 'uppercase':
      opts.output = output.toString().toUpperCase()
      break
    default:
      break
  }
  return opts
}

const _applyLength = (opts) => {
  const { length, output } = opts
  if (!length) return opts

  opts.output = output.substring(0, length)
  return opts
}

const _applyMask = (opts) => {
  const { mask, output } = opts

  if (!mask) return opts

  let replacement = ''
  for (var maskIndex = 0, subIndex = 0; maskIndex < mask.length && subIndex < output.length; maskIndex++) {
    replacement += mask.charAt(maskIndex) == 'X' ? output.charAt(subIndex++) : mask.charAt(maskIndex)
  }

  opts.output = replacement
  return opts
}

const _randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const _hash = (opts) => {
  const { val, type } = opts
  const lowerType = type.toLowerCase()
  faker.seed(val)
  switch (lowerType) {
    case 'email':
    case 'congregationbranchemail':
    case 'congregationotheremail':
    case 'staffemail':
      opts.output = `${crypto.createHash('sha256').update(val).digest('base64')}@example.com`
      break
    case 'congregationname':
      opts.output = crypto.createHash('sha256').update(val).digest('base64')
      break
    case 'phone':
    case 'mobile':
    case 'staffphone':
    case 'emergencycontactnumber':
      const tempVal = val.toString().replace(/\D/g, '')
      faker.seed(parseInt(tempVal))
      opts.output = faker.phone.phoneNumber().toString().replace(/\D/g, '')
      break
    case 'name':
    case 'lastname':
    case 'firstname':
    case 'applicantvolunteer':
    case 'overseer':
    case 'admin':
    case 'literatureservant':
    case 'correspondencefrom':
    case 'documentowner':
    case 'author':
    case 'staffname':
    case 'volunteer':
    case 'volassigned':
    case 'creator':
    case 'emergencycontact':
    case 'applicantvolunteer':
      opts.output = faker.name.findName()
      break
    case 'username':
      opts.output = faker.internet.userName()
    case 'password':
      opts.output = faker.internet.password()
    case 'birthdate':
      opts.output = faker.date.past(_randomNumber(21, 80))
    case 'pozip':
    case 'zip':
      opts.output = faker.address.zipCode()
    case 'street':
      opts.output = faker.address.streetName()
    case 'address':
      opts.output = faker.address.streetAddress()
    case 'postate':
    case 'state':
      opts.output = faker.address.state()
    case 'poCity':
    case 'city':
      opts.output = faker.address.city()
    case 'notes':
    case 'comments':
      opts.output = faker.lorem.sentences(_randomNumber(1, 7))
    default:
      throw new Error(`Unsupported hash type provided: ${type}`)
  }
  return opts
}

class DeterministicHasher {
  constructor(log = null, shouldThrowErr = true) {
    this.shouldThrowErr = shouldThrowErr
    this.hasLogger = false
    if (log) {
      this.log = log
      this.hasLogger = true
    }
  }

  hash({
    val,
    type,
    mask,
    length,
    casing,
  }) {
    try {
      if (!val) {
        throw new Error('val must be provided')
      }

      if (!type) {
        throw new Error('type must be provided')
      }

      const initialOutput = ''
      const opts = {
        val,
        type,
        mask,
        length,
        casing,
        output: initialOutput
      }

      const applyHashTo = compose(_applyCasing, _applyLength, _applyMask, _hash)

      const { output } = applyHashTo(opts)

      return output
    } catch (ex) {
      if (this.hasLogger) {
        this.log(ex)
      }

      if (this.shouldThrowErr) {
        throw ex
      }
    }
  }
}

module.exports = DeterministicHasher