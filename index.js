const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');
const { timeParser } = require('./time');
const moment = require('moment');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`No arguments provided, ${message.author}!`);
		}

		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
	else if (command === 'sesh') {
		if (!args.length) {
			return message.channel.send(`No arguments provided, ${message.author}!`);
		}

		let game;
		let date;
		let time;
		let timeDiff;
		let usersToMention;

		try {
			game = args[0];
			date = args[1];
			time = args[2];
			timeDiff = timeParser(date, time);
			usersToMention = [];
		}
		catch {
			return message.channel.send(`enter command as follows: !sesh gametitle date time @user1 @user2 etc.. 
		accepted date: MM-DD, MM/DD, today or dayofweek 
		accepted time: HH:mm, HHmm, MUST BE MILITARY TIME
		ie: !sesh civ today 13:30 @boogerfart @poophead`);
		}

		message.mentions.users.forEach(user => {
			usersToMention.push(`<@${user.id}>`);
		});

		console.log('TIME DIFF: ', timeDiff);
		console.log('DATE now ', moment().format('LT'));

		// If more than 15 minutes away set another reminder
		if (timeDiff >= 900000) {
			setTimeout(function() {
				message.channel.send(` 15 mins till ${game} sesh ${usersToMention}`);
			}, timeDiff - 900000);
		}
		setTimeout(function() {
			message.channel.send(`${game} sesh ${usersToMention}`);
		}, timeDiff);
	}
	else if (command === 'help') {
		return message.channel.send(`enter command as follows: !sesh gametitle date time @user1 @user2 etc.. 
	accepted date: MM-DD, MM/DD, today or dayofweek 
	accepted time: HH:mm, HHmm, MUST BE MILITARY TIME
	ie: !sesh civ today 13:30 @boogerfart @poophead`);
	}
});

client.login(process.env.BOT_TOKEN);