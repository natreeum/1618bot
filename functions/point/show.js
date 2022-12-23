const { getPoint } = require(`../../prismaScripts/point`);
const { symbol } = require('../../valueSettings');

async function show(interaction) {
  let selectedUserId = interaction.options.getUser('user');
  if (!selectedUserId) selectedUserId = interaction.user.id;
  else selectedUserId = selectedUserId.id;

  await interaction.deferReply();
  const getPointRes = await getPoint(selectedUserId);

  if (getPointRes === null) {
    await interaction.editReply(
      `<@${selectedUserId}> is not registered. If you are not registered, Use \`/register\` command`
    );
    return;
  }

  await interaction.editReply(
    `<@${selectedUserId}> has : **${getPointRes} ${symbol}**`
  );
}

module.exports = show;
