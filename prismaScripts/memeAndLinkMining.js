const { prisma } = require(`../prisma/prisma`);

const getMemeMiningCount = async (discordId) => {
  try {
    const getMemeCnt = await prisma.dailyMining.findUnique({
      where: { discordId },
    });
    if (!getMemeCnt) return 0;
    return getMemeCnt.memeMining;
  } catch (e) {
    console.log(e);
    return null;
  }
};
const addMemeMiningCount = async (discordId) => {
  const memeCnt = await getMemeMiningCount(discordId);
  if (!memeCnt) await prisma.dailyMining.create({ data: { discordId } });
  try {
    const addMemeCntRes = await prisma.dailyMining.update({
      where: { discordId },
      data: {
        memeMining: memeCnt + 1,
      },
    });
    return addMemeCntRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};
const getLinkMiningCount = async (discordId) => {
  try {
    const getLinkCnt = await prisma.dailyMining.findUnique({
      where: { discordId },
    });
    if (!getLinkCnt) return 0;
    return getLinkCnt.linkMining;
  } catch (e) {
    console.log(e);
    return null;
  }
};
const addLinkMiningCount = async (discordId) => {
  const linkCnt = await getLinkMiningCount(discordId);
  if (!linkCnt) await prisma.dailyMining.create({ data: { discordId } });
  try {
    const addLinkCntRes = await prisma.dailyMining.update({
      where: { discordId },
      data: { linkMining: linkCnt + 1 },
    });
    return addLinkCntRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  getMemeMiningCount,
  addMemeMiningCount,
  getLinkMiningCount,
  addLinkMiningCount,
};
