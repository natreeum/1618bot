const { getPoint } = require(`../../prismaScripts/point`);
const { symbol } = require('../../valueSettings');

async function show(interaction) {
  let selectedUserId = interaction.options.getUser('user');
  if (!selectedUserId) selectedUserId = interaction.user.id;
  else selectedUserId = selectedUserId.id;

  const getPointRes = await getPoint(selectedUserId);

  if (getPointRes === null) {
    await interaction.reply({
      content: `<@${selectedUserId}> is not registered. If you are not registered, Use \`/register\` command`,
      ephemeral: true,
    });
    return;
  }

  await interaction.reply({
    content: `<@${selectedUserId}> has : **${getPointRes} ${symbol}**`,
    ephemeral: true,
  });
}

module.exports = show;
