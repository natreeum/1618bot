const { prisma } = require(`../prisma/prisma`);

const createUser = async (discordId) => {
  try {
    const getUserRes = await getUser(discordId);
    if (getUserRes) throw new Error('Exist User');
    const createUserRes = await prisma.user.create({
      data: { discordId },
    });
    return createUserRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getUser = async (discordId) => {
  try {
    const getUserRes = await prisma.user.findUnique({
      where: { discordId },
    });
    return getUserRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  createUser,
  getUser,
};
