const giveCommandBuilder = require(`../SlashCommandBuilders/point/GiveBuilder`);
const give = require(`../functions/point/give`);
module.exports = {
  data: giveCommandBuilder,
  async execute(interaction) {
    await give(interaction);
  },
};
