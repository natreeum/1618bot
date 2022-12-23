const { SlashCommandBuilder } = require('discord.js');

const addCommandBuilder = new SlashCommandBuilder()
  .setName('add')
  .setDescription('Add Yellow Corn Point to User')
  .addUserOption((o) =>
    o.setName('user').setDescription('select user').setRequired(true)
  )
  .addIntegerOption((o) =>
    o.setName('amount').setDescription('enter amount').setRequired(true)
  );

module.exports = addCommandBuilder;
