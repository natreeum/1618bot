const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  token: process.env.DISCORD_TOKEN,
  webhookUrl: process.env.LOG_WEBHOOK_URL,
};
