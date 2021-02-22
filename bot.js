
const TelegramBot = require('node-telegram-bot-api');
const token = '1548860141:AAHOmadJFCYLoGAhuc9q7WncLX60B0fca7U';
const bot = new TelegramBot(token, {polling:true});
// const fs = require('fs');
const data = require('./db/data.json').data;
let RANDOM_ID = Math.floor(Math.random()*data.length);

bot.on('polling_error', function(error){
    console.log(error);
});


bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    // var nameUser = msg.from.first_name;
    let sticker = './resources/stickers/sticker-times.webp'
    let text = `<b>What a chesnut!...</b> \n
                 Esto serás lo que dirás cuando veas el viaje que te espera. \n
                 Cómo diría el sabio Víctor, fotos no que capturan el alma, y aquí hay mucha alma e historias. \n
                 Si nuncas has viajado en el tiempo, no te preocupes las primeras veces sentiras nauseas y mucha vergüenza ajena. \n
                 !Disfrutad y consumid con moderación!😎🚀 
                `;
    bot.sendMessage(chatId, text, { parse_mode: 'HTML'});
    bot.sendSticker(chatId, sticker, {caption: text, parse_mode: 'HTML'});
});


bot.onText(/^\/travelphotomachine/, (msg) =>{
  const chatId = msg.chat.id;
  
  let randomImg = data[RANDOM_ID].photo_id;
  let arrComments = data[RANDOM_ID].comments;
  const photo = './resources/img/' + randomImg;

  let text = '';
  const l = arrComments.slice(0, 5).length;
  for (let i = 0; i < l; i++) {
    const date = arrComments[i].date;
    let username = Buffer.from(arrComments[i].username, 'utf-8');
    let comment = Buffer.from(arrComments[i].text, 'utf-8');
    text += '<b>' + date + ' - ' + username + '</b>\n' + comment + '\n\n';
  }
 
  const photoText = text;
  bot.sendPhoto(chatId, photo, {caption: photoText, parse_mode:'HTML'});
});



