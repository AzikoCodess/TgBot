const TelegramBot = require('node-telegram-bot-api');
const { text } = require('stream/consumers');

const token = "1853587876:AAGM4j4_AYvNszb6yE31GjURwVnyH95UHwM";
const bot = new TelegramBot(token, {polling: true});

const obj = {};

const gameOptions = {
    reply_markup: {
        inline_keyboard: [
            [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}]
        ]
    }
};

const againOptions = {reply_markup: {
    inline_keyboard: [
        [{text: 'Qayta urunib koring', callback_data: '/again'}]
    ]}
};

const startGame = async chatId => {
        await bot.sendMessage(chatId, 'Raqamingizni kiriting faqat 0 dan 9 gacha ');
        const randomNumber = Math.floor(Math.random() * 10);
        console.log(randomNumber)
        obj[chatId] = randomNumber;
        console.log(obj)
        return bot.sendMessage(chatId, 'Tanlang', gameOptions);
}



function nubs() {
    bot.setMyCommands([
        {command: '/start', description: 'Bot haqida va qayta ishga tushurish'},
        {command: '/help', description: 'Yordam'},
        {command: '/game', description: "O'yinda bu"}
    
    ]);
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    if (text == "/start") {
        return bot.sendMessage(chatId, 'Salomat');
    };

    if (text == "/help") {
        return bot.sendMessage(chatId, 'nima gap');
    };
    if (text == "/game") {
       return startGame(chatId);
    };
    

    

    
        bot.sendMessage(chatId, 'Bu kommanda vaqtincha ishlamayabdi yoki sizni tushunmayabman!!! 😕');
    });
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log(data)

        if (data == "/again") {
            return startGame(chatId);
        }

        if (data == obj[chatId]) {
            return bot.sendMessage(
                chatId, `Togri kompyuter => ${obj[chatId]} siz => ${data}`,againOptions
            );
        } else {
            return bot.sendMessage(
                chatId, `xato kompyuter => ${obj[chatId]} siz => ${data} `,againOptions
            );
        }
        

    });
};

nubs();



