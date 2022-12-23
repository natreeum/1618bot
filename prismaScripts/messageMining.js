const { prisma } = require(`../prisma/prisma`);
const { createUser, getUser } = require(`./user`);
const { getDailyMiningInfo } = require(`./dailycheck`);

const messageMining = async (data) => {
  const { discordId, miningPoint } = data;

  const getMinedInfoRes = await getDailyMiningInfo(discordId);
  let chatMinedPnt;
  if (getMinedInfoRes) {
    chatMinedPnt = getMinedInfoRes.chatminingpoint;
  } else {
    await prisma.dailyMining.create({
      data: {
        discordId,
      },
    });
    chatMinedPnt = 0;
  }

  try {
    const chatMining = await prisma.dailyMining.update({
      where: { discordId },
      data: { chatminingpoint: chatMinedPnt + miningPoint },
    });
    return chatMining;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const updateLastChat = async (data) => {
  const { discordId, lastchat } = data;
  const getUserRes = getUser(discordId);
  if (!getUserRes) createUser(discordId);
  try {
    const updateLastChat = await prisma.user.update({
      where: { discordId },
      data: { lastchat },
    });
    return updateLastChat;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { messageMining, updateLastChat };
