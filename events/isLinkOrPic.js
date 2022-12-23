const { getUser, createUser } = require(`../prismaScripts/user`);
const { addPoint } = require(`../prismaScripts/point`);
const {
  symbol,
  memeMiningAmount,
  memeMiningChannel,
  memeMiningMessage,
  linkMiningAmount,
  linkMiningChannel,
} = require(`../valueSettings`);

async function readMessage(message) {
  if (message.author.bot) return;
  const messageChannel = message.channelId;
  const messageContent = message.content;
  const userId = message.author.id;
  const addData = {
    discordId: userId,
  };
  let getUserRes = await getUser(userId);
  if (!getUserRes) getUserRes = await createUser(userId);

  // linkMining
  if (messageChannel === linkMiningChannel) {
    const slicedMessage = messageContent.slice(0, 4);
    if (slicedMessage === 'http') {
      console.log('1');
      addData['amount'] = linkMiningAmount;
      console.log(addData);
      // TODO : add point
      const addRes = await addPoint(addData);
      await message.channel.send(
        `Link Mining Success! **${linkMiningAmount} ${symbol}** Added\n<@${userId}> Balance : ${addRes.point}`
      );
    } else return;
    return;
  }
  // memeMining
  if (messageChannel === memeMiningChannel) {
    const messageAttachmentsCnt = message.attachments.size;
    if (
      messageAttachmentsCnt === 0 ||
      !memeMiningMessage.includes(messageContent)
    )
      return;
    addData['amount'] = memeMiningAmount;
    console.log(addData);
    // TODO : add point
    const addRes = await addPoint(addData);
    await message.channel.send(
      `Meme Mining Success! **${memeMiningAmount} ${symbol}** Added\n<@${userId}> Balance : ${addRes.point}`
    );
    return;
  }
}

module.exports = { readMessage };
