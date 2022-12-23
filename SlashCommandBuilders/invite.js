const { SlashCommandBuilder } = require('discord.js');

const inviteCommandBuilder = new SlashCommandBuilder()
  .setName('invite')
  .setDescription('Choose a user who invited you to this server!')
  .addUserOption((o) =>
    o
      .setName('user')
      .setDescription('Choose a user who invited you to this Server!')
      .setRequired(true)
  );

module.exports = inviteCommandBuilder;
