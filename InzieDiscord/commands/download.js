const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const os = require("os");
const path = require("path");
const request = require("request");
const archiver = require("archiver");
const { AttachmentBuilder } = require("discord.js");

const downloadPathRoot = path.join(os.homedir(), "Downloads", "comics");

const downloadWebtoon = async (titleId, no, authId, sessionId) => {
  const webtoonUrl = `http://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${no}`;

  try {
    const response = await axios.get(webtoonUrl);

    if (response.status !== 200) {
      throw new Error("Failed to fetch webtoon images.");
    }

    const imageUrls = extractImageUrls(response.data);

    // Create a new directory for this titleId if it doesn't exist
    const downloadPath = path.join(downloadPathRoot, titleId);
    fs.mkdirSync(downloadPath, { recursive: true });

    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const imagePath = path.join(downloadPath, `${no}_${i}.jpg`);

      await downloadImage(imageUrl, imagePath, authId, sessionId);
    }

    return downloadPath;
  } catch (err) {
    console.error(err);
  }
};

const extractImageUrls = (html) => {
  const $ = cheerio.load(html);
  const imageElements = $(".wt_viewer img");

  return imageElements.map((i, el) => $(el).attr("src")).get();
};

const downloadImage = (url, imagePath, authId, sessionId) => {
  return new Promise((resolve, reject) => {
    request
      .get(url, {
        headers: {
          //   Referer: "http://comic.naver.com",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          Cookie: `NID_AUT=${authId}; NID_SES=${sessionId}`,
        },
      })
      .pipe(fs.createWriteStream(imagePath))
      .on("finish", resolve)
      .on("error", reject);
  });
};

async function handleDownloadCommand(interaction) {
  const webtoonId = interaction.options.getString("webtoonid");
  const chapterNo = interaction.options.getString("chapterno");
  const nidAut = interaction.options.getString("nid_aut");
  const nidSes = interaction.options.getString("nid_ses");

  if (!webtoonId || !chapterNo) {
    await interaction.reply("Both webtoonId and chapterNo are required.");
    return;
  }

  // Defer the reply to the interaction
  await interaction.deferReply();

  try {
    const downloadPath = await downloadWebtoon(
      webtoonId,
      chapterNo,
      nidAut,
      nidSes
    );

    // Create a zip file = require the downloaded images
    const zipPath = path.join(
      downloadPathRoot,
      `${webtoonId}_${chapterNo}.zip`
    );
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });
    if (!fs.existsSync(downloadPathRoot)) {
      fs.mkdirSync(downloadPathRoot, { recursive: true });
    }
    archive.directory(downloadPath, false);
    archive.pipe(output);
    await new Promise((resolve, reject) => {
      archive
        .finalize()
        .then(() => resolve())
        .catch((err) => reject(err));
    });

    // Send the zip file as an attachment in a Discord message
    const attachment = new AttachmentBuilder(zipPath, "filename.zip", {
      code: true,
      contentType: "application/zip",
    });

    await interaction.followUp({ files: [attachment] });

    const response = await interaction.followUp({ files: [attachment] });
    console.log(response);

    // // delete the zip file in the download folder locally
    fs.unlinkSync(zipPath);

    // // delete the directory with the downloaded images
    fs.rmdirSync(downloadPath, { recursive: true });

    // // delete the "comics" directory
    fs.rmdirSync(downloadPathRoot, { recursive: true });
  } catch (err) {
    await interaction.followUp(
      `Error downloading chapter ${chapterNo} of webtoon ${webtoonId}: ${err.message}`
    );
  }
}

module.exports = { handleDownloadCommand };
