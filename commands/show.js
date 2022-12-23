const showCommandBuilder = require(`../SlashCommandBuilders/point/ShowBuilder`);
const show = require(`../functions/point/show`);
module.exports = {
  data: showCommandBuilder,
  async execute(interaction) {
    await show(interaction);
  },
};
