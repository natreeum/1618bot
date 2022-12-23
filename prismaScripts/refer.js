const { prisma } = require(`../prisma/prisma`);
const { getDailyMiningInfo } = require(`./dailycheck`);
const { getUser, createUser } = require(`./user`);

//getReferredUser's daily miningInfo
const getInviteData = async (discordId) => {
  const getInviteDataRes = await getDailyMiningInfo(discordId);
  let invitepoint = 0;
  let invitecount = 0;
  if (getInviteDataRes) {
    invitecount = getInviteDataRes.invitecount;
    invitepoint = getInviteDataRes.invitepoint;
  } else await prisma.dailyMining.create({ data: { discordId } });
  return {
    invitecount,
    invitepoint,
  };
};

// update ReferredUser's daily miningInfo
const updateReferredUserData = async (data) => {
  const { discordId, point, count } = data;
  try {
    const updateRefdUsrDataRes = await prisma.dailyMining.update({
      where: { discordId },
      data: { invitepoint: point, invitecount: count },
    });
    return updateRefdUsrDataRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const updateReferStatus = async (discordId) => {
  const referringUserData = getUser(discordId);
  if (!referringUserData) await createUser(discordId);
  try {
    const updateReferStatus = await prisma.user.update({
      where: { discordId },
      data: { referuser: true },
    });
    return updateReferStatus;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  getInviteData,
  updateReferredUserData,
  updateReferStatus,
};
