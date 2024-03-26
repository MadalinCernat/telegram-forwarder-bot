# telegram-forwarder-bot

This bot receives messages on telegram and forwards them to whatsapp.


How to run:
- create a secret.json file in the root folder containing this:
```
    {
        "telegramToken": "your telegram bot token",
        "whatsappToken": "your whatsapp cloud api token",
        "facebookUrl": "your facebook url for the post request"
    }
```
- run ```node reader.js```
- or ```docker build -t forwardbot <absolute-project-path>``` then ```docker run -d forwardbot``` to run locally on Docker
