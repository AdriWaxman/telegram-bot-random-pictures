
const TelegramBot = require('node-telegram-bot-api');
const token = '1548860141:AAHOmadJFCYLoGAhuc9q7WncLX60B0fca7U';
const bot = new TelegramBot(token, {polling:true});


bot.on('polling_error', function(error){
    console.log(error);
});

bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    
    bot.sendMessage(chatId, "Bienvenido a mi bot " + nameUser);
});


bot.onText(/^\/chatid/, function (msg) {
  const chatId = msg.chat.id;
  const myId = msg.from.id;
  bot.sendMessage(chatId, 'El id del chat es: ' + chatId);
});

const apiImg = {
  imgUrl1:"./resources/img/2008-09-18-15-41-14.jpg",
  imgUrl2:"./resources/img/2008-09-18-21-19-22.jpg",
  imgUrl3:"./resources/img/2008-11-19-21-45-14.jpg",
  imgUrl4:"./resources/img/2008-11-22-18-37-01.jpg",
  imgUrl5:"./resources/img/2008-12-17-23-03-45.jpg",
  imgUrl6:"./resources/img/2009-01-07-01-57-18.jpg",

};

const randomImg = (apiImg) =>{
  let keys = Object.keys(apiImg);
  return apiImg[keys[ keys.length * Math.random() << 0]]
};

bot.onText(/^\/nostalgiapic/, (msg, randomImg) =>{
  const chatId = msg.chat.id;
  
  
  bot.sendPhoto(chatId, randomImg);
});

// bot.onText(/^\/clean/, (msg) => {
//   var chatId = msg.chat.id;
//   var messageId = msg.message_id;
  
//   if (msg.reply_to_message == undefined){
//       return; 
//   }
  
//   bot.deleteMessage(chatId, messageId);
// });

