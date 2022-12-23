const addCommandBuilder = require(`../SlashCommandBuilders/point/AddBuilder`);
const add = require(`../functions/point/add`);
module.exports = {
  data: addCommandBuilder,
  async execute(interaction) {
    await add(interaction);
  },
};
