const inviteCommandBuilder = require(`../SlashCommandBuilders/invite`);
const refer = require(`../functions/refer`);
module.exports = {
  data: inviteCommandBuilder,
  async execute(interaction) {
    await refer(interaction);
  },
};
