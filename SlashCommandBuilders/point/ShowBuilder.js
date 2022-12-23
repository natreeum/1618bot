const { SlashCommandBuilder } = require('discord.js');

const showCommandBuilder = new SlashCommandBuilder()
  .setName('show')
  .setDescription('Show Point Balance')
  .addUserOption((o) => o.setName('user').setDescription('select user'));

module.exports = showCommandBuilder;
