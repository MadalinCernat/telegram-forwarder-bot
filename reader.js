import fetch from 'node-fetch';
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

// Read the tokens from config.json file
const config = JSON.parse(fs.readFileSync('secret.json'));
const telegramToken = config.telegramToken;
const whatsappToken = config.whatsappToken;
const facebookUrl = config.facebookUrl;

const bot = new TelegramBot(telegramToken, { polling: true });

// Event listener for all incoming messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if(messageText == '/start'){
        return;
    } 

    console.log(`${messageText}`);

    const headers = {
    'Authorization': `Bearer ${whatsappToken}`,
    'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
        messaging_product: 'whatsapp',
        to: '40756755437',
        type: 'template',
        template: {
            name: 'todaystip',
            language: {
                code: 'en_US'
            },
            components: [{
                type: "body",
                parameters: [
                    {
                        type: "text",
                        text: `${messageText}`
                    }
                ]
            }]
        }
    });
    
    fetch(facebookUrl, {
    method: 'POST',
    headers: headers,
    body: body
    })
    .then(response => {
    console.log(response.status);
    return response.text();
    })
    .then(text => console.log(text))
    .catch(error => console.error('Error:', error));
    });

// Event listener for errors
bot.on('polling_error', (error) => console.log(error.code));

// Event listener for polling start
bot.on('polling', () => {
    console.log('Bot is running...');
});


