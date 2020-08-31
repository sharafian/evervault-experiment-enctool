const crypto = require('crypto')
const fs = require('fs').promises

module.exports = async function decrypt ({
  evervault,
  args
}) {
  if (!args.length === 2) {
    throw new Error('usage: npm start decrypt <key> <ciphertext>')
  }
  
  const encKey = await fs.readFile(args[0], 'utf8')
  const { cipherText, authTag, iv } = JSON.parse(await fs.readFile(args[1], 'utf8'))
  const { result: { key } } = await evervault.run(
    'evervault-experiment-decrypt-key',
    JSON.parse(encKey)
  )

  const decipher = crypto.createDecipheriv('aes-256-gcm',
    Buffer.from(key, 'base64'),
    Buffer.from(iv, 'base64')
  )

  decipher.setAuthTag(Buffer.from(authTag, 'base64'))

  let plainText = decipher.update(Buffer.from(cipherText, 'base64'))
  plainText = Buffer.concat([ plainText, decipher.final() ])

  console.log(plainText.toString('utf8'))
}
