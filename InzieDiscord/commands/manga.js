const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

/**
 *
 * @param {Object} interaction - Represents a Discord interaction
 */
async function handleRandomMangaCommand(interaction) {
  try {
    // Make a GET request to the specified endpoint
    const response = await axios.get("https://api.jikan.moe/v4/random/manga");
    const data = response.data.data;

    const embed = new EmbedBuilder()
      .setTitle(data.title || "N/A")
      .setURL(data.url || "")
      .setColor(0x0099ff)
      .setDescription(data.synopsis || "N/A")
      .setThumbnail(data.images.jpg.image_url || "")
      .addFields(
        {
          name: "Type",
          value: data.type || "N/A", // Use "N/A" if data.type is null
          inline: true,
        },
        {
          name: "Volumes",
          value: data.volumes ? data.volumes.toString() : "N/A", // Use "N/A" if data.volumes is null
          inline: true,
        },
        {
          name: "Chapters",
          value: data.chapters ? data.chapters.toString() : "N/A", // Use "N/A" if data.chapters is null
          inline: true,
        },
        {
          name: "Start Date",
          value: data.published.from || "N/A", // Use "N/A" if data.published.from is null
          inline: true,
        },
        {
          name: "End Date",
          value: data.published.to || "N/A", // Use "N/A" if data.published.to is null
          inline: true,
        },
        {
          name: "Score",
          value: data.score ? data.score.toString() : "N/A", // Use "N/A" if data.score is null
          inline: true,
        },
        {
          name: "Rated",
          value: data.rating || "N/A", // Use "N/A" if data.rating is null
          inline: true,
        }
      )
      .setImage(data.images.jpg.image_url || "")
      .setTimestamp(new Date())
      .setFooter({
        text: "Powered by Nomekuma",
        iconURL: "https://avatars.githubusercontent.com/u/122863540?v=4",
      });

    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {*} interaction - Represents a Discord interaction
 */
async function handleSearchMangaCommand(interaction) {
  try {
    const query = interaction.options.getString("query");
    if (!query) {
      await interaction.reply("Please provide a valid search query.");
      return;
    }

    const response = await axios.get(
      `https://api.jikan.moe/v4/manga?q=${query}`
    );
    const data = response.data.data[0];
    const embed = new EmbedBuilder()
      .setTitle(data.title || "N/A")
      .setURL(data.url || "")
      .setColor(0x0099ff)
      .setDescription(data.synopsis || "N/A")
      .setThumbnail(data.images.jpg.image_url || "")
      .addFields(
        {
          name: "Type",
          value: data.type || "N/A",
          inline: true,
        },
        {
          name: "Volumes",
          value: data.volumes ? data.volumes.toString() : "N/A",
          inline: true,
        },
        {
          name: "Chapters",
          value: data.chapters ? data.chapters.toString() : "N/A",
          inline: true,
        },
        {
          name: "Start Date",
          value: data.published.from || "N/A",
          inline: true,
        },
        {
          name: "End Date",
          value: data.published.to || "N/A",
          inline: true,
        },
        {
          name: "Score",
          value: data.score ? data.score.toString() : "N/A",
          inline: true,
        },
        {
          name: "Rated",
          value: data.rating || "N/A",
          inline: true,
        }
      )
      .setImage(data.images.jpg.image_url || "")
      .setTimestamp(new Date())
      .setFooter({
        text: "Powered by Nomekuma",
        iconURL: "https://avatars.githubusercontent.com/u/122863540?v=4",
      });

    await interaction.reply({ embeds: [embed] });
    interaction.followUp("This is a follow up message");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleRandomMangaCommand, handleSearchMangaCommand };
