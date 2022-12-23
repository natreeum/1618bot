const {
  getInviteData,
  updateReferredUserData,
  updateReferStatus,
} = require(`../prismaScripts/refer`);
const { getUser, createUser } = require(`../prismaScripts/user`);
const {
  symbol,
  referMiningPoint,
  dailyInviteLimit,
} = require(`../valueSettings`);
const { addPoint } = require('../prismaScripts/point');

const refer = async (interaction) => {
  const referredUserId = interaction.options.getUser('user').id;
  const userId = interaction.user.id;

  if (referredUserId === userId) {
    await interaction.reply({
      content: `You cannot refer yourself!`,
      ephemeral: true,
    });
    return;
  }

  await interaction.deferReply();

  // check if user referred someone
  const getUserRes = await getUser(userId);
  if (getUserRes) {
    if (getUserRes.referuser) {
      await interaction.editReply(`You already referred someone!`);
      return;
    }
  } else await createUser(userId);
  // check referredUser's dailyMiningInfo : minedPoint, inviteCount
  const refdUserInviteData = await getInviteData(referredUserId);

  // if invited more than 3 users
  if (refdUserInviteData.invitecount >= dailyInviteLimit) {
    const data = {
      discordId: referredUserId,
      point: refdUserInviteData.invitepoint,
      count: refdUserInviteData.invitecount + 1,
    };
    await updateReferredUserData(data);
    await updateReferStatus(userId);
    await interaction.editReply(
      `<@${referredUserId}> already invited more than ${dailyInviteLimit} users today!`
    );
    return;
  }

  // if invited less than 3 users
  // check dailymining Amount, calc Minable point
  let availableReferMiningPoint = referMiningPoint;

  // add point to referred user
  const data = {
    discordId: referredUserId,
    amount: availableReferMiningPoint,
  };
  const addPointRes = await addPoint(data);
  // updateReferresUserData
  const miningUpdateData = {
    discordId: referredUserId,
    point: refdUserInviteData.invitepoint + availableReferMiningPoint,
    count: refdUserInviteData.invitecount + 1,
  };
  await updateReferredUserData(miningUpdateData);
  // updateReferStatus
  const referUserData = await getUser(userId);
  if (!referUserData) await createUser(userId);
  updateReferStatus(userId);

  await interaction.editReply(
    `<@${referredUserId}> received **${availableReferMiningPoint} ${symbol}** by inviting <@${userId}>\n<@${referredUserId}> has **${addPointRes.point} ${symbol}**`
  );
  return;
};

module.exports = refer;
