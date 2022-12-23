const { prisma } = require(`../prisma/prisma`);
const { createUser, getUser } = require(`./user`);
const { symbol } = require(`../valueSettings`);

const log = require(`../utils/webhookLogger`);

// addPoint
const addPoint = async (data) => {
  const { discordId, amount } = data;
  try {
    // load Current UserData
    const getUserRes = await getUser(discordId);

    // Get Current Point from UserData
    let curPoint;
    if (getUserRes) curPoint = getUserRes.point;
    else {
      await createUser(discordId);
      curPoint = 0;
    }

    // update Database
    const addPointRes = await prisma.user.update({
      where: { discordId },
      data: { point: curPoint + amount },
    });

    const message = `**[ADD Success]** **${amount} ${symbol}** added to <@${discordId}>`;
    log(message);

    // return type : updated User Data
    return addPointRes;
  } catch (e) {
    console.log(e);
    const message = `**[ADD Failed]** **${amount} ${symbol}** added to <@${discordId}>`;
    log(message);
    return null;
  }
};

// givePoint
const givePoint = async (data) => {
  const { fromDiscordId, toDiscordId, amount } = data;

  // load sender data
  const getSenderData = await getUser(fromDiscordId);
  let senderCurPoint;
  if (getSenderData) senderCurPoint = getSenderData.point;
  else {
    await createUser(fromDiscordId);
    senderCurPoint = 0;
  }

  // load receiver data
  const getReceiverData = await getUser(toDiscordId);
  let receiverCurPoint;
  if (getReceiverData) receiverCurPoint = getReceiverData.point;
  else {
    await createUser(toDiscordId);
    receiverCurPoint = 0;
  }

  // send Point amount check
  if (amount > senderCurPoint) return 'NotEnoughPoint';

  try {
    // update database : sender
    const senderRes = await prisma.user.update({
      where: { discordId: fromDiscordId },
      data: { point: senderCurPoint - amount },
    });

    // update database : receiver
    const usersCnt = await prisma.user.count();
    console.log(usersCnt);
    const receiverRes = await prisma.user.update({
      where: { discordId: toDiscordId },
      data: { point: receiverCurPoint + amount },
    });
    if (senderRes && receiverRes) {
      const message = `**[GIVE Success]** <@${fromDiscordId}> send **${amount} ${symbol}** to <@${toDiscordId}>`;
      log(message);
      return { sender: senderRes, receiver: receiverRes };
    }
  } catch (e) {
    console.log(e);
    const message = `**[GIVE Failed]** <@${fromDiscordId}> send **${amount} ${symbol}** to <@${toDiscordId}>`;
    log(message);
    return null;
  }
};

// getPoint
const getPoint = async (discordId) => {
  const getPointRes = await prisma.user.findUnique({
    where: { discordId },
  });
  if (getPointRes) return getPointRes.point;
  else {
    await createUser(discordId);
    return 0;
  }
};

module.exports = {
  addPoint,
  givePoint,
  getPoint,
};
