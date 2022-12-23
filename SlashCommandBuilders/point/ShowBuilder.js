const { SlashCommandBuilder } = require('discord.js');

const showCommandBuilder = new SlashCommandBuilder()
  .setName('show')
  .setDescription('Show Yellow Corn Point')
  .addUserOption((o) => o.setName('user').setDescription('select user'));

module.exports = showCommandBuilder;
