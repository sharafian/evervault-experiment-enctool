#!/usr/bin/env node

const Evervault = require('@evervault/sdk')
const evervault = new Evervault(process.env.EVERVAULT_API_KEY)
const commands = require('./commands')

async function run () {
  const command = process.argv[2]
  if (!command) {
    throw new Error('usage: npm start <command> [args]')
  }

  const commandFn = commands[command]
  if (!commandFn) {
    throw new Error(`unknown command ${command}.` +
      ` available: ${Object.keys(commands).join(', ')}`)
  }

  await commandFn({
    evervault,
    args: process.argv.slice(3)
  })
}

run()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
