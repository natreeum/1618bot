const { prisma } = require(`../prisma/prisma`);
const { createUser, getUser } = require(`./user`);

// dailycheck
const dailycheck = async (data) => {
  const { discordId, date, dailycheck } = data;
  try {
    // get User Data from user table
    const getUserRes = await getUser(discordId);
    if (!getUserRes) {
      await createUser(discordId);
    }

    // get User Data from dailyMining table
    const getDailyMiningRes = await prisma.dailyMining.findUnique({
      where: { discordId },
    });
    if (!getDailyMiningRes) {
      await prisma.dailyMining.create({
        data: { discordId },
      });
    }

    // update Database_user
    const updateLastCheckRes = await prisma.user.update({
      where: { discordId },
      data: { lastcheck: date },
    });

    // update Database_dailyMining
    const updateDailyMiningRes = await prisma.dailyMining.update({
      where: { discordId },
      data: { dailycheck },
    });

    return { userdata: updateLastCheckRes, dailymining: updateDailyMiningRes };
  } catch (e) {
    console.log(e);
    return null;
  }
};

// getDailyMiningInfo
const getDailyMiningInfo = async (discordId) => {
  try {
    const getDailyMiningInfoRes = await prisma.dailyMining.findUnique({
      where: { discordId },
    });
    return getDailyMiningInfoRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// reset dailyData
const resetDailyData = async () => {
  try {
    const resetRes = await prisma.dailyMining.deleteMany({});
    return resetRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { dailycheck, getDailyMiningInfo, resetDailyData };
