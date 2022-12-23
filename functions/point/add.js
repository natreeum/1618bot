const { addPoint } = require('../../prismaScripts/point');
const { symbol } = require(`../../valueSettings`);

async function add(interaction) {
  const selectedUserId = interaction.options.getUser('user').id;
  const addAmount = interaction.options.getInteger('amount');

  // data:object for prismaScript
  const data = {
    discordId: selectedUserId,
    amount: addAmount,
  };

  await interaction.deferReply();

  // addPoint
  const addPointRes = await addPoint(data);
  if (addPointRes) {
    const userBalance = addPointRes.point;
    await interaction.editReply(
      `**${addAmount} ${symbol}** added to <@${selectedUserId}>\n<@${selectedUserId}> has : **${userBalance} ${symbol}**`
    );
    return;
  } else {
    await interaction.editReply('add failed');
  }
}

module.exports = add;
