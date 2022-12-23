const { SlashCommandBuilder } = require('discord.js');

const dailyCheckBuilder = new SlashCommandBuilder()
  .setName('도굴')
  .setDescription('You can use this command only once everyday');

module.exports = dailyCheckBuilder;
