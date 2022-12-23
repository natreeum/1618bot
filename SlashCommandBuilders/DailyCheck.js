const { SlashCommandBuilder } = require('discord.js');

const dailyCheckBuilder = new SlashCommandBuilder()
  .setName('dailycheck')
  .setDescription('You can use this command only once everyday');

module.exports = dailyCheckBuilder;
