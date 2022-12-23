const { WebhookClient } = require(`discord.js`);

const { webhookUrl } = require(`../config`);

const webhookLog = new WebhookClient({
  url: webhookUrl,
});

async function log(text, wh = webhookLog) {
  try {
    const message = await wh.send({
      content: text,
    });
    return message;
  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = log;
