// Set options as a parameter, environment variable, or rc file.

require = require('esm')(module /*, options*/)
require('module-alias/register')
//require('module-alias/register')
module.exports = require('./server/index.js')
