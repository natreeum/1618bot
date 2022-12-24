const {
  roleId,
  rolePoint,
  symbol,
  monthlyMiningChannel,
} = require(`../valueSettings`);
const { addPoint } = require(`../prismaScripts/point`);

const givePointToRoles = async (client) => {
  const goldUsers = [];
  const ironUsers = [];
  const woodUsers = [];

  const guild = await client.guilds.fetch('1014716934962552982');
  const members = await guild.members.fetch();
  members.forEach((e) => {
    if (e._roles.includes(roleId.gold)) goldUsers.push(e.user.id);
    else if (e._roles.includes(roleId.iron)) ironUsers.push(e.user.id);
    else if (e._roles.includes(roleId.wood)) woodUsers.push(e.user.id);
  });

  let message = [''];
  const addMessage = (content) => {
    if (message[message.length - 1].length + content.length > 2000) {
      message.push(content);
    } else {
      message[message.length - 1] += content;
    }
  };
  // gold
  addMessage(`<@&${roleId.gold}> GOLD Shovel monthly mining!\n`);
  goldUsers.forEach(async (userId) => {
    const data = {
      discordId: userId,
      amount: rolePoint.gold,
    };
    const addRes = await addPoint(data);
    let addResMessage = '';
    if (addRes) {
      addResMessage = `[SUCCESS] <@${userId}> received **${rolePoint.gold} ${symbol}**\n`;
    } else {
      addResMessage = `[Failed] <@${userId}> needs to contact admin\n`;
    }
    addMessage(addResMessage);
  });
  // iron
  addMessage(`<@&${roleId.iron}> IRON Shovel monthly mining!\n`);
  goldUsers.forEach(async (userId) => {
    const data = {
      discordId: userId,
      amount: rolePoint.iron,
    };
    const addRes = await addPoint(data);
    let addResMessage = '';
    if (addRes) {
      addResMessage = `[SUCCESS] <@${userId}> received **${rolePoint.iron} ${symbol}**\n`;
    } else {
      addResMessage = `[Failed] <@${userId}> needs to contact admin\n`;
    }
    addMessage(addResMessage);
  });
  // wood
  addMessage(`<@&${roleId.wood}> WOOD Shovel monthly mining!\n`);
  goldUsers.forEach(async (userId) => {
    const data = {
      discordId: userId,
      amount: rolePoint.wood,
    };
    const addRes = await addPoint(data);
    let addResMessage = '';
    if (addRes) {
      addResMessage = `[SUCCESS] <@${userId}> received **${rolePoint.wood} ${symbol}**\n`;
    } else {
      addResMessage = `[Failed] <@${userId}> needs to contact admin\n`;
    }
    addMessage(addResMessage);
  });

  const channel = await client.channels.fetch(monthlyMiningChannel);
  message.forEach(async (e) => {
    await channel.send(e);
  });
};

module.exports = { givePointToRoles };
