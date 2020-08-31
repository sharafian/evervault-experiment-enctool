const crypto = require('crypto')
const fs = require('fs').promises

module.exports = async function encrypt ({
  evervault,
  args
}) {
  if (!args.length === 2) {
    throw new Error('usage: npm start encrypt <key> <data> > <ciphertext>')
  }
  
  const encKey = await fs.readFile(args[0], 'utf8')
  const data = await fs.readFile(args[1], 'utf8')
  const { result: { key } } = await evervault.run(
    'evervault-experiment-decrypt-key',
    JSON.parse(encKey)
  )

  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm',
    Buffer.from(key, 'base64'),
    iv
  )

  let cipherText = cipher.update(data)
  cipherText = Buffer.concat([ cipherText, cipher.final() ])

  console.log(JSON.stringify({
    cipherText: cipherText.toString('base64'),
    authTag: cipher.getAuthTag().toString('base64'),
    iv: iv.toString('base64'),
  }, null, 2))
}
