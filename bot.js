
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
  console.log(arrComments[0].text);
  const photo = './resources/img/' + randomImg;
  const photoText = '<i>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam eos inventore enim odit voluptatum asperiores dolores repellendus veniam architecto delectus?</i> \n <b>pene</b>';
  

  bot.sendPhoto(chatId, photo, {caption: photoText, parse_mode:'HTML'});
 
});



