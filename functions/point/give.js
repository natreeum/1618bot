const { givePoint, getPoint } = require(`../../prismaScripts/point`);
const { symbol } = require(`../../valueSettings`);

async function give(interaction) {
  const fromDiscordId = interaction.user.id;
  const toDiscordId = interaction.options.getUser('user').id;
  const amount = interaction.options.getInteger('amount');

  // data:object for prismaScript
  const data = {
    fromDiscordId,
    toDiscordId,
    amount,
  };

  // getPoint
  const getPointRes = await getPoint(fromDiscordId);

  // givePoint
  const givePointRes = await givePoint(data);

  // not enough Point
  if (givePointRes == 'NotEnoughPoint') {
    await interaction.reply({
      content: `You have not enough **${symbol}** to send\n<@${interaction.user.id}> has : **${getPointRes} ${symbol}** `,
      ephemeral: true,
    });
    return;
  }

  await interaction.reply({
    content: `<@${fromDiscordId}> send **${amount} ${symbol}** to <@${toDiscordId}>\n\n<@${fromDiscordId}> has : **${givePointRes.sender.point} ${symbol}**\n<@${toDiscordId}> has : **${givePointRes.receiver.point} ${symbol}**`,
    ephemeral: true,
  });
}

module.exports = give;
