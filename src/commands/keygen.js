const crypto = require('crypto')

module.exports = async function keygen ({
  evervault
}) {
  const key = crypto.randomBytes(32).toString('base64')
  const encryptedKey = await evervault.encrypt({ key })

  console.log(JSON.stringify(encryptedKey, null, 2))
}
