var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot

var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});





// Helper Functions!!
const availableCommands = ['ping', 'pong', 'help'];

const help = function () {
  let str = '**NO ONE IS HERE TO HELP YOU ( ͡° ͜ʖ ͡°)**\n\n*Anyways*, these are the commands I know:'
  for (let i = 0; i < availableCommands.length; i++) {
    str += '\n';
    str += (i + 1) + ': ' + availableCommands[i];
  }
  return str;
}





// On Message
bot.on('message', function (user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  console.log(arguments);
  console.log('@' + bot.username);
  if (message.substring(0, 1) === '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);

    if(cmd === 'ping') {
      bot.sendMessage({
        to: channelID,
        message: 'Pong!'
      });
    } else if (cmd === 'pong') {
      bot.sendMessage({
        to: channelID,
        message: 'Ping!'
      });
    } else if (cmd === 'help') {
      bot.sendMessage({
        to: channelID,
        message: help()
      });
    }
  } else if (message.includes('@' + bot.username) > -1 && userID !== bot.id) {
    bot.sendMessage({
      to: channelID,
      message: '**WHO DARES TO SUMMON ME**'
    });

  } else {
    if (userID !== bot.id) {
      bot.sendMessage({
        to: channelID,
        message: "What did you say? ( ͡° ͜ʖ ͡°)"
      });
    }
  }
});