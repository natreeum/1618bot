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

  // addPoint
  const addPointRes = await addPoint(data);
  if (addPointRes) {
    const userBalance = addPointRes.point;
    await interaction.reply({
      content: `**${addAmount} ${symbol}** added to <@${selectedUserId}>\n<@${selectedUserId}> has : **${userBalance} ${symbol}**`,
      ephemeral: true,
    });
    return;
  } else {
    await interaction.reply({ content: 'add failed', ephemeral: true });
  }
}

module.exports = add;
