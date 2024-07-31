const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

/**
 * Handles the /randomanime command
 * @param {Interaction} interaction - Represents a Discord interaction
 * @param {Object} interaction - Represents a Discord interaction
 */
async function handleRandomAnimeCommand(interaction) {
  try {
    // Make a GET request to the specified endpoint
    const response = await axios.get("https://api.jikan.moe/v4/random/anime");
    const data = response.data.data;

    // Check if there's a YouTube trailer available
    let trailerUrl = "No trailer available";
    if (data.trailer?.youtube_id) {
      trailerUrl = `https://www.youtube.com/watch?v=${data.trailer.youtube_id}`;
    }
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
          name: "Episodes",
          value: data.episodes ? data.episodes.toString() : "N/A", // Use "N/A" if data.episodes is null
          inline: true,
        },
        {
          name: "Start Date",
          value: data.aired.from || "N/A", // Use "N/A" if data.aired.from is null
          inline: true,
        },
        {
          name: "End Date",
          value: data.aired.to || "N/A", // Use "N/A" if data.aired.to is null
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
        },
        {
          name: "Trailer",
          value: trailerUrl || "N/A", // Use "N/A" if trailerUrl is null
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
 *  Handles the /randommanga command
 * @param {Object} interaction - Represents a Discord interaction
 */
async function handleSearchAnimeCommand(interaction) {
  try {
    const query = interaction.options.getString("query");
    if (!query) {
      await interaction.reply("Please provide a valid search query.");
      return;
    }

    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${query}`
    );
    let data = response.data.data[0]; // Using 'let' to allow reassignment

    // Check if the data exists, if not, provide empty values
    if (!data) {
      data = {
        title: "N/A",
        url: "",
        synopsis: "N/A",
        type: "N/A",
        episodes: "N/A",
        aired: { from: "N/A", to: "N/A" },
        score: "N/A",
        rating: "N/A",
        images: { jpg: { image_url: "" } },
        trailer: { youtube_id: "" },
      };
    }

    let trailerUrl = "No trailer available";
    if (data.trailer?.youtube_id) {
      trailerUrl =
        `https://www.youtube.com/watch?v=${data.trailer.youtube_id} ` || `N/A`;
    }
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
          name: "Episodes",
          value: data.episodes ? data.episodes.toString() : "N/A",
          inline: true,
        },
        {
          name: "Start Date",
          value: data.aired.from || "N/A",
          inline: true,
        },
        {
          name: "End Date",
          value: data.aired.to || "N/A",
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
        },
        {
          name: "Trailer",
          value: trailerUrl || "N/A",
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

module.exports = { handleRandomAnimeCommand, handleSearchAnimeCommand };
