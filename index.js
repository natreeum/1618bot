const fs = require('node:fs');
const path = require('node:path');
const cron = require('node-cron');

// cronJob
const { checkIsNewDay } = require('./cronjob/checkEveryDay');

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const { readMessage } = require('./events/isLinkOrPic');
const { givePointToRoles } = require(`./cronjob/givePoint`);

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('ready', () => {
  cron.schedule('*/1 * * * *', () => {
    checkIsNewDay();
    givePointToRoles(client);
  });
});

client.on('messageCreate', (message) => {
  readMessage(message);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.login(token);
