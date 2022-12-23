const { SlashCommandBuilder } = require('discord.js');

const giveCommandBuilder = new SlashCommandBuilder()
  .setName('give')
  .setDescription('Give Yellow Corn Point to User')
  .addUserOption((o) =>
    o.setName('user').setDescription('select user').setRequired(true)
  )
  .addIntegerOption((o) =>
    o.setName('amount').setDescription('enter amount').setRequired(true)
  );

module.exports = giveCommandBuilder;
