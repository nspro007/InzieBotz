const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { registerCommands } = require("../VileonaDiscord/routes/route.js");
const {
  handleRandomAnimeCommand,
  handleSearchAnimeCommand,
} = require("../VileonaDiscord/commands/anime.js");
const {
  handleRandomMangaCommand,
  handleSearchMangaCommand,
} = require("../VileonaDiscord/commands/manga.js");
const { handleRankCommand } = require("../VileonaDiscord/commands/rank.js");
const { handleHelpCommand } = require("../VileonaDiscord/commands/help.js");
const { handleDownloadCommand } = require("../VileonaDiscord/commands/download.js");

const app = express();
app.get("/", (req, res) => res.send("Hello World!"));
app.use(cors());
app.listen(3000, () => console.log("Server is running..."));

// load env variables
dotenv.config();


  
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// load registered commands
registerCommands(client, process.env.CLIENT_ID);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case "randomanime":
      await handleRandomAnimeCommand(interaction);
      break;
    case "randommanga":
      await handleRandomMangaCommand(interaction);
      break;
    case "searchanime":
      await handleSearchAnimeCommand(interaction);
      break;
    case "searchmanga":
      await handleSearchMangaCommand(interaction);
      break;
    case "rank":
      await handleRankCommand(interaction);
      break;
    case "help":
      await handleHelpCommand(interaction);
      break;
    // case "search":
    //   await handleSearchCommand(interaction);
    //   break;
    // case "download":
    //   await handleDownloadCommand(interaction);
    //   break;
    default:
      break;
  }
});

client.login(process.env.TOKEN);
