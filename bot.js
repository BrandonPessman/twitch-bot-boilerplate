const tmi = require('tmi.js')
require('dotenv').config()

// Define configuration options
const opts = {
  identity: {
    username: process.env.USERNAME,
    password: process.env.OAUTH
  },
  channels: [process.env.CHANNEL]
}
// Create a client with our options
const client = new tmi.client(opts)

// Register our event handlers (defined below)
client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)

// Connect to Twitch:
client.connect()

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) {
    return
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim()
  msg = msg.toLowerCase()
  // If the command is known, let's execute it
  if (msg.includes('shippodo')) {
    const quotes = [
      'Brian, there’s a message in my alphabet [cereal]. It says oooooo. Peter, those are Cheerios.',
      'I got drunk and then got my picture taken. So that way when I get pulled over for drunk driving, I look the same as on my license.',
      'I can be just as non-competitive as anybody. Matter of fact, I’m the most non-competitive. So I win.',
      'How does it feel to be the least cultured person at a bus station?',
      'I guess we’ve learned that no matter who you are or where you come from, life is a terrible thing.',
      'I had such a crush on her… until I met you, Lois. You’re my silver medal.'
    ]

    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    client.say(target, `"${quote}"`)
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}
