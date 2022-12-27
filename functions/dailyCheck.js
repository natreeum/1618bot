const { dailycheck } = require(`../prismaScripts/dailycheck`);
const { getUser } = require(`../prismaScripts/user`);
const { addPoint } = require(`../prismaScripts/point`);
const { symbol, dailyCheckAmount } = require(`../valueSettings`);

async function dailyCheck(interaction) {
  const userId = interaction.user.id;

  //get user data
  const getUserRes = await getUser(userId);
  let lastcheck;
  let curPoint;
  if (getUserRes) {
    lastcheck = getUserRes.lastcheck;
    curPoint = getUserRes.point;
  } else {
    lastcheck = '';
    curPoint = 0;
  }

  // get Current date
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const curDate = '' + year + month + date;

  // if checked
  if (lastcheck == curDate) {
    await interaction.reply({
      content: `You already checked today!`,
      ephemeral: true,
    });
    return;
  }

  let addAmount = dailyCheckAmount;

  const data = {
    discordId: userId,
    date: curDate,
    dailycheck: addAmount,
  };
  const addPointData = {
    discordId: userId,
    amount: addAmount,
  };
  await dailycheck(data);
  const addPointRes = await addPoint(addPointData);
  await interaction.reply({
    content: `Welcome <@${userId}>\nYou've received **${
      addPointRes.point - curPoint
    } ${symbol}**`,
    ephemeral: true,
  });
  return;
}

module.exports = dailyCheck;
