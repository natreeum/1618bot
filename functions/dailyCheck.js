const {
  dailycheck,
  getDailyMiningInfo,
} = require(`../prismaScripts/dailycheck`);
const { getUser } = require(`../prismaScripts/user`);
const { addPoint } = require(`../prismaScripts/point`);
const {
  symbol,
  dailyCheckAmount,
  dailyMiningLimit,
} = require(`../valueSettings`);

async function dailyCheck(interaction) {
  const userId = interaction.user.id;

  await interaction.deferReply();

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
    await interaction.editReply(`You already checked today!`);
    return;
  }

  // daily mininglimit check
  const dailyMined = await getDailyMiningInfo(userId);
  let dailyMinedPnt = 0;
  if (dailyMined)
    dailyMinedPnt =
      dailyMined.invitepoint +
      dailyMined.chatminingpoint +
      dailyMined.dailycheck;

  let addAmount = dailyCheckAmount;
  if (dailyMinedPnt + dailyCheckAmount > dailyMiningLimit) {
    addAmount =
      dailyCheckAmount - (dailyMinedPnt + dailyCheckAmount - dailyMiningLimit);
  }

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
  await interaction.editReply(
    `Welcome <@${userId}>\nYou've received **${
      addPointRes.point - curPoint
    } ${symbol}**`
  );
  return;
}

module.exports = dailyCheck;
