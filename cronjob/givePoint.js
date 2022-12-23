const { roleId } = require(`../valueSettings`);

const givePointToRoles = async (client) => {
  const goldUsers = [];
  const ironUsers = [];
  const woodUsers = [];

  const guild = await client.guilds.fetch('1004397816552116275');
  const members = await guild.members.fetch();
  members.forEach((e) => {
    if (e._roles.includes(roleId.gold)) goldUsers.push(e.user.id);
    else if (e._roles.includes(roleId.iron)) ironUsers.push(e.user.id);
    else if (e._roles.includes(roleId.wood)) woodUsers.push(e.user.id);
  });
};

module.exports = { givePointToRoles };
