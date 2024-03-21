const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Read the token from config.json file
const config = JSON.parse(fs.readFileSync('secret.json'));
const token = config.token;

const bot = new TelegramBot(token, { polling: true });

// Event listener for all incoming messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    console.log(`Received message from ${chatId}: ${messageText}`);
});

// Event listener for errors
bot.on('polling_error', (error) => console.log(error.code));

// Event listener for polling start
bot.on('polling', () => {
    console.log('Bot is running...');
});
