const dailyCheckBuilder = require('../SlashCommandBuilders/DailyCheck');
const dailycheck = require(`../functions/dailyCheck`);

module.exports = {
  data: dailyCheckBuilder,
  async execute(interaction) {
    await dailycheck(interaction);
  },
};
