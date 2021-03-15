const Discord = require("discord.js");
require("dotenv").config();

const WEBHOOK_ID = process.env.WEBHOOK_ID;
const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN;

const EMBED_COLOR = "#58b9ff";

let webHookClient = null;

function notifyServer(product, message) {
  const client = getWebhookClient();
  const embed = createEmbed(product, message);
  webHookClient.send("", {
    username: "change-notifier",
    avatarURL: "https://i.imgur.com/wSTFkRM.png",
    embeds: [embed],
  });
}

function createEmbed(product, message) {
  return new Discord.MessageEmbed()
    .setAuthor("Market Change Notifier")
    .setColor(EMBED_COLOR)
    .setURL(product.pageURL)
    .setTitle(message.title)
    .setDescription(message.description)
    .setThumbnail(product.image)
    .setTimestamp();
}

function sendTestMessage() {
  const embed = new Discord.MessageEmbed()
    .setAuthor(
      "E-Commerce Monitor",
      "https://static.footshop.com/463402-full_product/110986.jpg"
    )
    .setTitle("Price Change For ${name}")
    .setDescription("Price is now 4300czk")
    .setURL("https://static.footshop.com/463402-full_product/110986.jpg")
    .setColor("#58b9ff")
    .setThumbnail("https://static.footshop.com/463402-full_product/110986.jpg")
    .setTimestamp();

  getWebhookClient().send("", {
    username: "Market Change Notifier",
    avatarURL: "https://static.footshop.com/463402-full_product/110986.jpg",
    embeds: [embed],
  });
}

function getWebhookClient() {
  if (webHookClient == null) {
    webHookClient = new Discord.WebhookClient(WEBHOOK_ID, WEBHOOK_TOKEN);
  }
  return webHookClient;
}

module.exports = { notifyServer, sendTestMessage };
