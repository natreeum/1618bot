const { SlashCommandBuilder } = require('discord.js');

const showCommandBuilder = new SlashCommandBuilder()
  .setName('register')
  .setDescription('Register your data on DB');

module.exports = showCommandBuilder;
