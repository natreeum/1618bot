const { getUser, createUser } = require(`../prismaScripts/user`);
const { addPoint } = require(`../prismaScripts/point`);
const {
  getLinkMiningCount,
  getMemeMiningCount,
  addLinkMiningCount,
  addMemeMiningCount,
} = require(`../prismaScripts/memeAndLinkMining`);
const {
  symbol,
  memeMiningAmount,
  memeMiningChannel,
  memeMiningMessage,
  linkMiningAmount,
  linkMiningChannel,
  memeMiningLimit,
  linkMiningLimit,
} = require(`../valueSettings`);

async function readMessage(message) {
  if (message.author.bot) return;
  const messageChannel = message.channelId;
  const messageContent = message.content;
  const userId = message.author.id;
  const addData = {
    discordId: userId,
  };
  if (
    messageChannel !== linkMiningChannel &&
    messageChannel !== memeMiningChannel
  )
    return;

  let getUserRes = await getUser(userId);
  if (!getUserRes) getUserRes = await createUser(userId);
  const emoji = message.guild.emojis.cache.find((e) => e.name === 'goldshovel');

  // linkMining
  if (messageChannel === linkMiningChannel) {
    const slicedMessage = messageContent.slice(0, 4);
    if (slicedMessage === 'http') {
      const linkCnt = await getLinkMiningCount(userId);
      if (linkCnt >= linkMiningLimit) return;
      addData['amount'] = linkMiningAmount;
      const addRes = await addPoint(addData);
      await addLinkMiningCount(userId);
      // await message.channel.send(
      //   `Link Mining Success! **${linkMiningAmount} ${symbol}** Added\n<@${userId}> Balance : **${addRes.point} ${symbol}**`
      // );
      message.react(emoji);
    } else return;
    return;
  }
  // memeMining
  // if (messageChannel === memeMiningChannel) {
  //   const messageAttachmentsCnt = message.attachments.size;
  //   if (
  //     messageAttachmentsCnt === 0 ||
  //     !memeMiningMessage.includes(messageContent)
  //   )
  //     return;
  //   const memeCnt = await getMemeMiningCount(userId);
  //   if (memeCnt >= memeMiningLimit) return;
  //   addData['amount'] = memeMiningAmount;
  //   const addRes = await addPoint(addData);
  //   await addMemeMiningCount(userId);
  //   message.react(emoji);
  //   return;
  // }
}

module.exports = { readMessage };
