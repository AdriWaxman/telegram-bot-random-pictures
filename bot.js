
const TelegramBot = require('node-telegram-bot-api');
const token = '1548860141:AAHOmadJFCYLoGAhuc9q7WncLX60B0fca7U';
const bot = new TelegramBot(token, {polling:true});
// const fs = require('fs');
const data = require('./db/data.json').data;


bot.on('polling_error', function(error){
    console.log(error);
});


bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    
    bot.sendMessage(chatId, `Bienvenido a mi bot ${nameUser}`);
});


bot.onText(/^\/nostalgiapic/, (msg) =>{
  const chatId = msg.chat.id;
  let randomId = Math.floor(Math.random()*data.length);
  let randomImg = data[randomId].photo_id;
  let arrComments = data[randomId].comments;
  const photo = './resources/img/' + randomImg;

  var text = '';
  const l = arrComments.slice(0, 5).length;
  for (let index = 0; index < l; index++) {
    const date = arrComments[index].date;
    var username = Buffer.from(arrComments[index].username, 'utf-8');
    var comment = Buffer.from(arrComments[index].text, 'utf-8');
    text += '<b>' + date + ' - ' + username + '</b>\n' + comment + '\n\n';
  }

  const photoText = text;
  bot.sendPhoto(chatId, photo, {caption: photoText, parse_mode:'HTML'});
});



