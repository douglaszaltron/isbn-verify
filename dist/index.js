
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./isbn-verify.cjs.production.min.js')
} else {
  module.exports = require('./isbn-verify.cjs.development.js')
}
