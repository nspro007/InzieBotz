require("../settings")
const {
    Telegraf,
    Context
} = require('telegraf')
const {
    message,
    editedMessage,
    channelPost,
    editedChannelPost,
    callbackQuery
} = require("telegraf/filters");
const axios = require("axios")
const chalk = require('chalk')
const fs = require('fs')
const fetch = require('node-fetch')
const os = require('os')
const speed = require('performance-now')
const util = require('util')
const yts = require('yt-search')

const {
    simple
} = require('../lib/telefunc')

module.exports = InzieOfc = async (InzieOfc, bot) => {
    //console.log(InzieOfc)
    try {
        const body = InzieOfc.message.text || InzieOfc.message.caption || ''
        const budy = (typeof InzieOfc.message.text == 'string' ? InzieOfc.message.text : '')
        const {
            isUrl
        } = simple
        const isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? body[0] : ''
        const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(" ")
        const user = simple.getUserName(InzieOfc.message.from)
        const pushname = user.full_name;
        const user_id = InzieOfc.message.from.id + " "
        const username = InzieOfc.message.from.username ? InzieOfc.message.from.username : "atzmus";
        const isCreator = OWNER[0].replace("https://t.me/", '') == InzieOfc.update.message.from.username
        const from = InzieOfc.message.chat.id

        const isGroup = InzieOfc.chat.type.includes('group')
        const groupName = isGroup ? InzieOfc.chat.title : ''

        const isImage = InzieOfc.message.hasOwnProperty('photo')
        const isVideo = InzieOfc.message.hasOwnProperty('video')
        const isAudio = InzieOfc.message.hasOwnProperty('audio')
        const isSticker = InzieOfc.message.hasOwnProperty('sticker')
        const isContact = InzieOfc.message.hasOwnProperty('contact')
        const isLocation = InzieOfc.message.hasOwnProperty('location')
        const isDocument = InzieOfc.message.hasOwnProperty('document')
        const isAnimation = InzieOfc.message.hasOwnProperty('animation')
        const isMedia = isImage || isVideo || isAudio || isSticker || isContact || isLocation || isDocument || isAnimation
        const quotedMessage = InzieOfc.message.reply_to_message || {}
        const isQuotedImage = quotedMessage.hasOwnProperty('photo')
        const isQuotedVideo = quotedMessage.hasOwnProperty('video')
        const isQuotedAudio = quotedMessage.hasOwnProperty('audio')
        const isQuotedSticker = quotedMessage.hasOwnProperty('sticker')
        const isQuotedContact = quotedMessage.hasOwnProperty('contact')
        const isQuotedLocation = quotedMessage.hasOwnProperty('location')
        const isQuotedDocument = quotedMessage.hasOwnProperty('document')
        const isQuotedAnimation = quotedMessage.hasOwnProperty('animation')
        const isQuoted = InzieOfc.message.hasOwnProperty('reply_to_message')
        const timestampi = speed();
        const latensii = speed() - timestampi

        const reply = async (text) => {
            for (var x of simple.range(0, text.length, 4096)) { //maks 4096 character, jika lebih akan eror
                return await InzieOfc.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                })
            }
        }
        const getStyle = (style_, style, style2) => {
            listt = `${lang.getStyle(style, style2)}`
            for (let i = 0; i < 250; i++) {
                listt += '» `' + style_[i] + '`\n'
            }
            reply(listt)
        }

        //get type message 
        var typeMessage = body.substr(0, 50).replace(/\n/g, '')
        if (isImage) typeMessage = 'Image'
        else if (isVideo) typeMessage = 'Video'
        else if (isAudio) typeMessage = 'Audio'
        else if (isSticker) typeMessage = 'Sticker'
        else if (isContact) typeMessage = 'Contact'
        else if (isLocation) typeMessage = 'Location'
        else if (isDocument) typeMessage = 'Document'
        else if (isAnimation) typeMessage = 'Animation'

        //push message to console
        if (InzieOfc.message) {
            console.log(chalk.black(chalk.bgWhite('[ CMD ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(body || typeMessage)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname) + '\n' + chalk.blueBright('=> In'), chalk.green(isGroup ? groupName : 'Private Chat', InzieOfc.message.chat.id))
        }
        switch (command) {
            case "tes": {
                reply("`I'm here`")
            }
            break
            case 'owner':
            case 'creator': {
                await InzieOfc.sendContact(OWNER_NUMBER, OWNER_NAME)
                reply(`My lord [${OWNER_NAME}](${OWNER[0]}) 👑`)
            }
            break
            case 'sc':
            case 'script':
            case 'scrip': {
                InzieOfc.reply("Source code this bot", {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: 'Github',
                                url: "https://github.com/lorenzxz/telebot"
                            }, {
                                text: 'YouTube',
                                url: "https://www.youtube.com/@InzieOfc"
                            }]
                        ]
                    }
                })
            }
            break
            case "privacy":
            case "snk": {
                reply(lang.snk)
            }
            break
            case 'menu':
            case 'panel':
            case 'help': {
                hitall = `-`
                let dnew = new Date(new Date + 3600000)
                let week = dnew.toLocaleDateString('en', {
                    weekday: 'long'
                })
                let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(dnew / 84600000) % 5]
                let date = dnew.toLocaleDateString('en', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })
                let dateIslamic = Intl.DateTimeFormat('en' + '-TN-u-ca-islamic', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }).format(dnew)
                lang.menu(InzieOfc, THUMBNAIL, pushname, OWNER_NAME, OWNER, prefix, hitall, latensii, os, simple, week, date, dateIslamic, username, isCreator, InzieOfc.message.from.id.toString())
            }
            break
            //anime
            case "akame":
            case "anna":
            case "asuna-yuki":
            case "ayuzawa":
            case "chitoge":
            case "emilia":
            case "erza":
            case "hinata":
            case "inori":
            case "kaga-kouko":
            case "kaori-miyazono":
            case "kotori-minami":
            case "killua":
            case "mikasa":
            case "mio-akiyama":
            case "mizore-sirayuki":
            case "nakiri-alice":
            case "naruto":
            case "riyas-gremori":
            case "sakura":
            case "sento-isuzu":
            case "shana":
            case "shiina":
            case "shinka":
            case "winry":
            case "yukino":
            case "yuzuki":
            case "mikosiba":
            case "luffy":
            case "zoro":
            case "ussop":
            case "sanji":
            case "minato":
            case "boruto":
            case "sarada":
            case "mitsuki":
            case "orochimaru":
            case "tsunade":
            case "kakashi":
            case "rimuru":
            case "sagiri":
            case "natsu":
            case "tanjirou":
            case "loli": {
                reply(lang.wait)
                let ini_url = global.api('alfa', '/api/anime/' + command, {}, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
                        case "picre": {
                reply(lang.wait)
                let ini_url = `https://pic.re/image`
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            case "cosplay": {
                reply(lang.wait)
                let ini_url = `https://fantox-cosplay-api.onrender.com/`
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            case 'rule34': {
    async function rule34Random() {
        try {
            let response = await axios.get('https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1')
            let results = response.data

            if (!Array.isArray(results) || results.length === 0) {
                throw new Error('No images found')
            }

            let randomImage = results[Math.floor(Math.random() * results.length)]
            let imageUrl = randomImage.file_url

            if (!imageUrl) {
                throw new Error('Image URL not found')
            }

            return { status: 200, imageUrl }
        } catch (error) {
            console.error('Error:', error)
            return { status: 500, error: error.message }
        }
    }

    async function sendRandomRule34Image(chat) {
        reply(lang.wait)
        try {
            let response = await rule34Random()
            if (response.status !== 200) {
                throw new Error(response.error)
            }

            let imageUrl = response.imageUrl

            InzieOfc.replyWithPhoto({
                url: imageUrl
            }, {
                caption: lang.ok
            })
        } catch (e) {
            console.error(e)
            reply(e.message)
        }
    }

    sendRandomRule34Image();
}
break
            case 'danboorudl': {
        if (!args[0]) return reply(`Contoh penggunaan: ${prefix + command} url`);
        if (!/danbooru\.donmai\.us\/posts\/[0-9]+$/i.test(args[0])) throw 'Invalid URL';
        
        await reply(lang.wait)

        async function danbooruDl(url) {
            let html = (await axios.get(url)).data;
            let $ = cheerio.load(html), obj = {};
            $('#post-information > ul > li').each((idx, el) => {
                let str = $(el).text().trim().replace(/\n/g, '').split(': ');
                obj[str[0]] = str[1].replace('»', '').trim().split(' .')[0];
            });
            obj.url = $('#post-information > ul > li[id="post-info-size"] > a').attr('href');
            return obj;
        }

        let data = await danbooruDl(args[0]);
        let img = data.url;
        delete data.url;
        let capt = Object.keys(data).map((x) => `${x}: ${data[x]}`).join('\n');

        await InzieOfc.replyWithPhoto({
            url: img
        }, {
            caption: lang.ok
        }, m);
    }
    break
    
            //Asupan
            case 'chika':
            case 'rikagusriani':
            case 'bocil':
            case 'geayubi':
            case 'santuy':
            case 'ukhty':
            case 'asupan':
            case 'delvira':
            case 'ayu':
            case 'bunga':
            case 'aura':
            case 'nisa':
            case 'ziva':
            case 'yana':
            case 'viona':
            case 'syania':
            case 'riri':
            case 'syifa':
            case 'mama-gina':
            case 'alcakenya':
            case 'mangayutri': {
                reply(lang.wait)
                let ini_url = global.api('alfa', '/api/asupan/' + command, {}, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithVideo({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            //cecan
            case 'china':
            case 'indonesia':
            case 'malaysia':
            case 'thailand':
            case 'korea':
            case 'japan':
            case 'vietnam':
            case 'jenni':
            case 'jiiso':
            case 'lisa':
            case 'rose': {
                reply(lang.wait)
                let ini_url = global.api('alfa', '/api/cecan/' + command, {}, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            //cogan
            case "wuyifan":
            case "suga":
            case "parkchanyeol":
            case "ohsehun":
            case "luhan":
            case "kimtaehyung":
            case "kimseok":
            case "kimnanjoon":
            case "kimminseok":
            case "kimjunmyeon":
            case "kimjong":
            case "kimjondae":
            case "jungkook":
            case "jimin":
            case "jhope":
            case "huangzitao":
            case "dohkyungsoo":
            case "baekhyung": {
                reply(lang.wait)
                let ini_url = global.api('alfa', '/api/cogan/' + command, {}, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            //download
            case 'youtube':
            case 'yt':
            case 'ytv':
            case 'mp4':
            case 'ytmp4':
            case 'ytshorts':
            case 'ytshort': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} link youtube\`\n\nContoh penggunaan:\n\`${prefix+command} https://youtu.be/kwop2Eg5QY4\``)
                if (!isUrl(args[0])) return reply(`Kirim perintah:\n\`${prefix+command} link youtube\`\n\nContoh penggunaan:\n\`${prefix+command} https://youtu.be/kwop2Eg5QY4\``)
                if (!args[0].includes('youtu.be') && !args[0].includes('youtube.com')) return reply(`Kirim perintah:\n\`${prefix+command} link youtube\`\n\nContoh penggunaan:\n\`${prefix+command} https://youtu.be/kwop2Eg5QY4\``)
                reply(lang.wait)
                let res = await fetch(global.api('alfa', '/api/downloader/youtube-video', {
                    url: args[0]
                }, 'apikey'))
                if (!res.ok) throw await res.text()
                var result = await res.json()
                var {
                    id,
                    thumbnail,
                    title,
                    quality,
                    filesize,
                    size,
                    download
                } = result.result
                var getdl = await axios.get(`https://tinyurl.com/api-create.php?url=${download}`)
                let key = "「 YOUTUBE VIDEO 」\n\n"
                key += `• Id: ${id}\n`
                key += `• Title: ${title}\n`
                key += `• Quality: ${quality}\n`
                key += `• Size: ${filesize}\n`
                key += `• Download: ${getdl.data}\n\n`
                key += `Ukuran media melebihi batas, silahkan download sendiri melalui link di atas.`
                if (size.replace("MB","") > 50 || size.replace("GB","") >= 1 ) { //batas download 50mb, tamabahin jika kurang (misal 100mb = 100000)
                    await InzieOfc.replyWithPhoto({
                        url: thumbnail
                    }, {
                        caption: key
                    })
                } else {
                    await InzieOfc.replyWithPhoto({
                        url: thumbnail
                    }, {
                        caption: key
                    })
                    InzieOfc.replyWithVideo({
                        url: download
                    }, {
                        caption: lang.ok
                    })

                }
            }
            break
            case 'ytshortsmp3':
            case 'ytshortmp3':
            case 'mp3':
            case 'ytmp3': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} link youtube\`\n\nContoh penggunaan:\n\`${prefix+command} https://youtu.be/kwop2Eg5QY4\``)
                if (!isUrl(args[0])) return reply(`Kirim perintah:\n\`${prefix+command} link youtube\`\n\nContoh penggunaan:\n\`${prefix+command} https://youtu.be/kwop2Eg5QY4\``)
                if (!args[0].includes('youtu.be') && !args[0].includes('youtube.com')) return reply(`Kirim perintah:\n\`${prefix+command} link youtube\`\n\nContoh penggunaan:\n\`${prefix+command} https://youtu.be/kwop2Eg5QY4\``)
                reply(lang.wait)
                let res = await fetch(global.api('alfa', '/api/downloader/youtube-audio', {
                    url: args[0]
                }, 'apikey'))
                if (!res.ok) throw await res.text()
                var result = await res.json()
                var {
                    id,
                    thumbnail,
                    title,
                    quality,
                    filesize,
                    size,
                    download
                } = result.result
                var getdl = await axios.get(`https://tinyurl.com/api-create.php?url=${download}`)
                let key = "「 YOUTUBE AUDIO 」\n\n"
                key += `• Id: ${id}\n`
                key += `• Title: ${title}\n`
                key += `• Quality: ${quality}\n`
                key += `• Size: ${filesize}\n`
                key += `• Download: ${getdl.data}\n\n`
                key += `Ukuran media melebihi batas, silahkan download sendiri melalui link di atas.`
                if (size.replace("MB","") > 50 || size.replace("GB","") >= 1 ) { //batas download 50mb, tamabahin jika kurang (misal 100mb = 100000)
                    await InzieOfc.replyWithPhoto({
                        url: thumbnail
                    }, {
                        caption: key
                    })
                } else {
                    await InzieOfc.replyWithPhoto({
                        url: thumbnail
                    }, {
                        caption: key
                    })
                    await InzieOfc.replyWithAudio({
                        url: download,
                        filename: title
                    })
                }
            }
            break
            case 'play': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} judul lagu\`\n\nContoh penggunaan:\n\`${prefix+command} bot WhatsApp InzieOfc\``)
                //if (isUrl(text)) return reply(`Kirim perintah:\n\`${prefix+command} judul lagu\`\n\nContoh penggunaan:\n\`${prefix+command} bot WhatsApp InzieOfc\``)
                reply(lang.wait)
                let res = await fetch(global.api('alfa', '/api/downloader/youtube-search', {
                    query: text
                }, 'apikey'))
                if (!res.ok) throw await res.text()
                var result = await res.json()
                var {
                    videoId,
                    image,
                    title,
                    views,
                    duration,
                    author,
                    ago,
                    url,
                    description
                } = result.result.videos[0]
                let thumbInfo = `*「 YOUTUBE PLAY 」*

🆔 ID : ${videoId}
💬 Title : ${title}
📺 Views : ${views}
⏰ Duration : ${duration.timestamp}
▶️ Channel : ${author.name}
📆 Upload : ${ago}
🔗 URL Video : ${url}
📝 Description : ${description}

Kirim berikut perintah untuk mendownload media
${prefix}ytmp3 ${url}
${prefix}ytmp4 ${url}`
                InzieOfc.replyWithPhoto({
                    url: image
                }, {
                    caption: thumbInfo,
                    parse_mode: 'MARKDOWN',
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                    text: '🎻 Audio',
                                    callback_data: 'ytmp3 ' + user_id + url
                                },
                                {
                                    text: 'Video 🎦',
                                    callback_data: 'ytmp4 ' + user_id + url
                                }
                            ]
                        ]
                    }
                })
            }
            break
            case 'yts':
            case 'ytsearch': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} judul lagu/video\`\n\nContoh penggunaan:\n\`${prefix+command} bot WhatsApp InzieOfc\``)
                reply(lang.wait)
                let res = await fetch(global.api('alfa', '/api/downloader/youtube-search', {
                    query: text
                }, 'apikey'))
                if (!res.ok) throw await res.text()
                var result = await res.json()
                let dapet = result.result.videos
                var tbuff = dapet[0].image
                cap = "「 YOUTUBE SEARCH 」\n\n"
                for (let v = 0; v < 2; v++) {
                    cap += `🆔 ID : ${dapet[v].videoId}
💬 Title : ${dapet[v].title}
📺 Views : ${dapet[v].views}
⏰ Duration : ${dapet[v].timestamp}
▶️ Channel : ${dapet[v].type == 'video' ? dapet[v].author.name : dapet[v].name}
📆 Upload : ${dapet[v].ago}
🔗 URL Video : ${dapet[v].url}
📝 Description : ${dapet[v].description}\n\n---------------------------\n\n`
                }
                InzieOfc.replyWithPhoto({
                    url: tbuff
                }, {
                    caption: cap
                })
            }
            break
            break
            case 'igphoto':
            case 'instaphoto':
            case 'instafoto':
            case 'igfoto':
            case "ig":
            case "igdl": {
                if (!args[0]) return reply(`Kirim perintah:\n\`${prefix+command} link Instagram\`\n\nContoh penggunaan:\n\`${prefix+command} https://www.instagram.com/p/ClU74LNpgaw/?igshid=YmMyMTA2M2Y=\``)
                if (!isUrl(args[0])) return reply(`Kirim perintah:\n\`${prefix+command} link Instagram\`\n\nContoh penggunaan:\n\`${prefix+command} https://www.instagram.com/p/ClU74LNpgaw/?igshid=YmMyMTA2M2Y=\``)
                reply(lang.wait)
                let res = await fetch(global.api('alfa', '/api/downloader/instagram-photo', {
                    url: args[0]
                }, 'apikey'))
                if (!res.ok) throw await res.text()
                var result = await res.json()
                var result = result.result
                //for (let i = 0; i < result.url.length; i++) {
                for (let i of result.url) {
                    if (!i.includes("cdninstagram")) {
                        InzieOfc.replyWithVideo({
                            url: i
                        }, {
                            caption: lang.ok
                        })
                    } else {
                        InzieOfc.replyWithPhoto({
                            url: i
                        }, {
                            caption: lang.ok
                        })
                    }
                }
            }
            break
            case 'igvideo':
            case 'instavideo':
            case 'instavid':
            case 'igreels':
            case 'instareels':
            case 'instareel': {
                if (!args[0]) return reply(`Kirim perintah:\n\`${prefix+command} link Instagram video/reels\`\n\nContoh penggunaan:\n\`${prefix+command} https://www.instagram.com/reel/CnVwm3KrQRl/?igshid=YmMyMTA2M2Y=\``)
                if (!isUrl(args[0])) return reply(`Kirim perintah:\n\`${prefix+command} link Instagram video/reels\`\n\nContoh penggunaan:\n\`${prefix+command} https://www.instagram.com/reel/CnVwm3KrQRl/?igshid=YmMyMTA2M2Y=\``)
                reply(lang.wait)
                let res = await fetch(global.api('alfa', '/api/downloader/instagram-video', {
                    url: args[0]
                }, 'apikey'))
                if (!res.ok) throw await res.text()
                var result = await res.json()
                var result = result.result
                for (let i of result.url) {
                    InzieOfc.replyWithVideo({
                        url: i
                    }, {
                        caption: lang.ok
                    })
                }
            }
            break
            case "pinterest": {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} query\`\n\nContoh penggunaan:\n\`${prefix+command} sakura\``)
                //if (isUrl(text)) return reply(`Kirim perintah:\n\`${prefix+command} query\`\n\nContoh penggunaan:\n\`${prefix+command} sakura\``)
                reply(lang.wait)
                let ini_url = global.api('alfa', '/api/downloader/pinterest2', {
                    query: text
                }, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            case "mf":
            case "mediafire": {
                if (!args[0]) return reply(`Kirim perintah:\n\`${prefix+command} link mediafire\`\n\nContoh penggunaan:\n\`${prefix+command} https://www.mediafire.com/file/eb14v8x4oz7ok3h/InzieOfcbot-Mdv17.5-withModule.zip/file\``)
                if (!isUrl(args[0]) && !args[0].includes("mediafire.com")) return reply(`Kirim perintah:\n\`${prefix+command} link MediaFire\`\n\nContoh penggunaan:\n\`${prefix+command} https://www.mediafire.com/file/eb14v8x4oz7ok3h/InzieOfcbot-Mdv17.5-withModule.zip/file\``)
                reply(lang.wait)
                let res = await fetch(global.api('alfa', '/api/downloader/mediafire', {
                    url: args[0]
                }, 'apikey'))
                if (!res.ok) throw await res.text()
                var result = await res.json()
                var {
                    nama,
                    size,
                    link
                } = result.result[0]
                console.log(size)
                if (size.replace('MB', '') >= 100 || size.replace('GB', '') >= 1) { //size edit sendiri jika mau download yang lebih media yang lebih besar
                    var key = `「 Mediafire Download 」\n\n`
                    key += `Nama: ${nama}\n`
                    key += `Tipe: ${result.result[0].mime}\n`
                    key += `Size: ${size}\n`
                    key += `Link: ${link}\n\n`
                    key += `Untuk size lebih dari batas, silahkan download melalui link diatas.`
                    reply(key)
                } else {
                    var key = `「 Mediafire Download 」\n\n`
                    key += `Nama: ${nama}\n`
                    key += `Tipe: ${result.result[0].mime}\n`
                    key += `Size: ${size}\n`
                    key += `Link: ${link}\n\n`
                    key += `Media dalam proses pengiriman, membutuhkan waktu sekitar 5,9 jam silahkan di tunggu.`
                    await reply(key)
                    if (nama.includes(".zip")) {
                        InzieOfc.replyWithDocument({
                            url: link,
                            filename: nama
                        })
                    } else if (nama.includes(".mp4")) {
                        InzieOfc.replyWithVideo({
                            url: link
                        }, {
                            caption: lang.ok
                        })
                    } else if (nama.includes(".mp3")) {
                        InzieOfc.replyWithAudio({
                            url: link,
                            filename: name
                        })
                    } else {
                        reply("Invalid media type")
                    }
                }
            }
            break
            case "tiktoknowm":
            case "tiktok": {
                if (!args[0]) return reply(`Kirim perintah:\n\`${prefix+command} link tiktok video\`\n\nContoh penggunaan:\n\`${prefix+command} https://www.tiktok.com/@InzieOfc.official/video/7210229439744003355?_r=1&u_code=e44201c8bfkd30®ion=ID&mid=7202111782981913370&preview_pb=0&language=id&_d=e0cah74j08m7c7&share_item_id=7210229439744003355&source=h5_t×tamp=1679216331&user_id=7148061777321133083&sec_user_id=MS4wLjABAAAA50SieLfP2YD-R-gqSE3svcPxaPqr_53pA6RKyJUkQo_AreOGrLDiVRnajBVglVIk&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7160625938232592154&share_link_id=6b2fea89-b038-4919-8d58-38b4efba5b9c&share_app_id=1180&ugbiz_name=Main&ug_btm=b8727%2Cb2878\``)
                if (!isUrl(args[0]) && !args[0].includes("tiktok.com")) return reply(`Kirim perintah:\n\`${prefix+command} link tiktok video\`\n\nContoh penggunaan:\n\`${prefix+command} https://www.tiktok.com/@InzieOfc.official/video/7210229439744003355?_r=1&u_code=e44201c8bfkd30®ion=ID&mid=7202111782981913370&preview_pb=0&language=id&_d=e0cah74j08m7c7&share_item_id=7210229439744003355&source=h5_t×tamp=1679216331&user_id=7148061777321133083&sec_user_id=MS4wLjABAAAA50SieLfP2YD-R-gqSE3svcPxaPqr_53pA6RKyJUkQo_AreOGrLDiVRnajBVglVIk&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7160625938232592154&share_link_id=6b2fea89-b038-4919-8d58-38b4efba5b9c&share_app_id=1180&ugbiz_name=Main&ug_btm=b8727%2Cb2878\``)
                reply(lang.wait)
                let res = await fetch(global.api('alfa', '/api/downloader/tiktok', {
                    url: args[0]
                }, 'apikey'))
                if (!res.ok) throw await res.text()
                var result = await res.json()
                var result = result.result
                InzieOfc.replyWithVideo({
                    url: result.nowm
                }, {
                    caption: lang.ok
                })
            }
            break
            case "tiktokaudio": {
                if (!args[0]) return reply(`Kirim perintah:\n\`${prefix+command} link tiktok video\`\n\nContoh penggunaan:\n\`${prefix+command} https://www.tiktok.com/@InzieOfc.official/video/7210229439744003355?_r=1&u_code=e44201c8bfkd30®ion=ID&mid=7202111782981913370&preview_pb=0&language=id&_d=e0cah74j08m7c7&share_item_id=7210229439744003355&source=h5_t×tamp=1679216331&user_id=7148061777321133083&sec_user_id=MS4wLjABAAAA50SieLfP2YD-R-gqSE3svcPxaPqr_53pA6RKyJUkQo_AreOGrLDiVRnajBVglVIk&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7160625938232592154&share_link_id=6b2fea89-b038-4919-8d58-38b4efba5b9c&share_app_id=1180&ugbiz_name=Main&ug_btm=b8727%2Cb2878\``)
                if (!isUrl(args[0]) && !args[0].includes("tiktok.com")) return reply(`Kirim perintah:\n\`${prefix+command} link tiktok video\`\n\nContoh penggunaan:\n\`${prefix+command} https://www.tiktok.com/@InzieOfc.official/video/7210229439744003355?_r=1&u_code=e44201c8bfkd30®ion=ID&mid=7202111782981913370&preview_pb=0&language=id&_d=e0cah74j08m7c7&share_item_id=7210229439744003355&source=h5_t×tamp=1679216331&user_id=7148061777321133083&sec_user_id=MS4wLjABAAAA50SieLfP2YD-R-gqSE3svcPxaPqr_53pA6RKyJUkQo_AreOGrLDiVRnajBVglVIk&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7160625938232592154&share_link_id=6b2fea89-b038-4919-8d58-38b4efba5b9c&share_app_id=1180&ugbiz_name=Main&ug_btm=b8727%2Cb2878\``)
                reply(lang.wait)
                let res = await fetch(global.api('alfa', '/api/downloader/tiktok', {
                    url: args[0]
                }, 'apikey'))
                if (!res.ok) throw await res.text()
                var result = await res.json()
                var result = result.result
                InzieOfc.replyWithAudio({
                    url: result.audio,
                    filename: "Tiktok Audio.mp3"
                })
            }
            break
            //semoji
            /*   case "apple":
               case "aubykddi":
               case "docomo":
               case "softbank":
               case "mozilla":
               case "htc":
               case "lg":
               case "messenger":
               case "emojidex":
               case "openmoji":
               case "joypixels":
               case "facebook2":
               case "twitter2":
               case "whatsapp":
               case "microsoft":
               case "samsung":
               case "google": {
                   reply(lang.wait)
                   let res = await fetch(global.api('alfa', '/api/emoji/' + command, {
                       emoji: args[0]
                   }, 'apikey'))
                   if (!res.ok) throw await res.text()
                   let img = await res.buffer()
                   let savestik = await InzieOfc.sendImageAsSticker(m.chat, img, m, {
                       packname: packname,
                       author: author
                   })
                   await fs.unlinkSync(savestik)
               }
               break*/
            //ephoto360
            case "1917text":
            case "angelwing":
            case "announofwin":
            case "birthdaycake":
            case "capercut":
            case "cardhalloween":
            case "christmascard":
            case "christmasseason":
            case "covergamepubg":
            case "covergraffiti":
            case "dragonfire":
            case "embroider":
            case "fabrictext":
            case "facebookgold":
            case "facebooksilver":
            case "funnyanimations":
            case "funnyhalloween":
            case "galaxybat":
            case "galaxywallpaper":
            case "generalexam":
            case "glowingtext":
            case "graffiti3d":
            case "graffititext":
            case "graffititext2":
            case "graffititext3":
            case "greetingcardvideo":
            case "halloweenbats":
            case "heartcup":
            case "heartflashlight":
            case "horrorletter":
            case "icetext":
            case "instagramgold":
            case "instagramsilver":
            case "lightningpubg":
            case "lovecard":
            case "lovelycute":
            case "masteryavatar":
            case "merrycard":
            case "messagecoffee":
            case "metalstar":
            case "milkcake":
            case "modengold3":
            case "moderngold":
            case "moderngold2":
            case "moderngoldsilver":
            case "nameonheart":
            case "noeltext":
            case "projectyasuo":
            case "pubgbirthday":
            case "pubgglicthvideo":
            case "pubgmascotlogo":
            case "puppycute":
            case "realembroidery":
            case "retrotext":
            case "rosebirthday":
            case "snowontext":
            case "starsnight":
            case "summerbeach":
            case "sunglightshadow":
            case "textcakes":
            case "texthalloween":
            case "textonglass":
            case "textsky":
            case "thundertext":
            case "twittergold":
            case "twittersilver":
            case "viettel":
            case "vintagetelevision":
            case "watercolor2":
            case "womansday":
            case "writeblood":
            case "writegalaxy":
            case "writehorror":
            case "youtubegold":
            case "youtubesilver":
            case "zombie3d": {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                if (text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                reply(lang.wait)
                let ini_url = global.api('alfa', '/api/ephoto360/' + command, {
                    text: text
                }, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            case "shirtclub":
            case 'steellettering':
            case 'letterstext':
            case 'barcashirt':
            case 'premiercup':
            case 'stylepoligon':
            case 'lifebuoys':
            case 'juventusshirt': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2\`\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                mm = args.join(' ')
                m1 = mm.split("|")[0];
                m2 = mm.split("|")[1];
                reply(lang.wait)
                let ini_url = global.api('alfa', '/api/ephoto360/' + command, {
                    text: m1,
                    text2: m2
                }, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break

            //logo maker
            case 'coverbannerlol': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|heroes\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|pyke-7\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|heroes\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|pyke-7\``)
                var arg = args.join(' ')
                atas = arg.split('|')[0]
                bawah = arg.split('|')[1]
                const style = ['jinx7', 'jinx-8', 'kassadin-5', 'nissfortune-5', 'pyke-7', 'riven-8', 'sylas-5', 'vayne-9', 'kassadin-4', 'qiyana-5', 'renataglasc', 'shen-5', 'heimerdinger-3', 'nunu-5', 'orianna-4', 'ziggs-4', 'soraka-9', 'soraka-10', 'xayah-3', 'zeri-2', 'ahri-9', 'akshan-2', 'amumu-4', 'annie-3', 'bard-3', 'brand-5', 'diana-4', 'draven-3', 'ekko-6', 'elise-4', 'ezreal-7', 'gwen-3', 'janna-6', 'kindred-3', 'leblanc-7', 'leona-7', 'lissandra-4', 'lux-8', 'lux-9', 'nalzahar-4', 'nasteryi-7', 'reksai-3', 'sett-3', 'sivir-6', 'teemo-5', 'tristana-6', 'vladimir-5', 'xinzhao-5', 'zed-7', 'zeri', 'caitlyn-6', 'caitlyn-7', 'caitlyn-8', 'caitlyn-9', 'caitlyn-10', 'caitlyn-11', 'jayce-5', 'kaisa-8', 'karma-7', 'thresh-6', 'vi-5', 'yasuo-8', 'yasuo-9', 'fiora-8', 'norgana-7', 'nami-5', 'poppy-4', 'syndra-5', 'yuumi-4', 'jarvaniv-6', 'kayn-4', 'kayle-5', 'lillia-2', 'norgana-6', 'tryndamere-3', 'vex', 'vex-2', 'yone-4', 'tristana-5', 'viego-2', 'akali-10', 'anivia-4', 'darius-5', 'graves-6', 'seraphine-5', 'shaco-2', 'twistedfate-4', 'xayah-2', 'zyra-5', 'ahri-8', 'ashe-6', 'cassiopeia-4', 'evelynn-6', 'leblanc-6', 'nalphite-4', 'warwick-5', 'akshan', 'graves-5', 'nissfortune-5', 'pyke-6', 'rengar-6', 'thresh-5', 'diana-3', 'relia-11', 'olaf-3', 'pantheon-6', 'pantheon-7', 'riven-7', 'vayne-8', 'corki-4', 'naokai-2', 'rammus-4', 'veigar-4', 'zed-6', 'camille-4', 'drmundo-3', 'lucian-6', 'nordekaiser-4', 'renekton-4', 'sejuani-5', 'senna-3', 'sylas-4', 'varus-5', 'xerath-3', 'damwon', 'galio-3', 'gwen', 'gwen-2', 'jax-5', 'jinx-6', 'kayle-5', 'sion-2', 'twitch-4', 'velkoz-4', 'blitzcrank-3', 'leona-6', 'lulu-3', 'lulu-4', 'lux-7', 'nasus-5', 'nunu-4', 'rumble-2', 'samira-3', 'aphelios-2', 'blitzcrank-2', 'caitlyn-5', 'garen-6', 'kogmaw-4', 'leona-5', 'alzahar-3', 'syndra-4', 'wukong-4', 'yone-3', 'yuumi-3', 'zyra-4', 'alistar-4', 'chogath-2', 'draven-2', 'fiora-7', 'jarvan-5', 'jhin-5', 'karma-6', 'nautilus-2', 'neeko-5', 'shyvana-3', 'viego', 'azir-4', 'diana-4', 'gragas-2', 'janna-5', 'kalista-3', 'katarina-6', 'ornn-2', 'qiyana-4', 'quinn-3', 'rell', 'xinzhao-4', 'anivia-3', 'hecarim-4', 'illaoi-2', 'jayce-4', 'lissandra-3', 'nami-4', 'nasus-4', 'nidalee-5', 'seraphine-4', 'singed-2', 'skarner-2', 'soraka-7', 'varus-4', 'vladimir-4', 'yorick-4', 'zac', 'riven-8', 'ahri-7', 'akali-9', 'evelynn-5', 'kaisa-7', 'lucian-5', 'seraphine', 'seraphine-2', 'seraphine-3', 'aatrox-6', 'amumu-3', 'lise-3', 'fizz-5', 'karma-5', 'zeri-2', 'kassadin-3', 'khazix-4', 'sivir-5', 'twistedfate-3', 'ashe-5', 'brand-4', 'leesin-5', 'olaf-2', 'sett-2', 'kayle-4', 'leblanc-5', 'pyke-5', 'samira', 'samira-2', 'viktor-2', 'yasuo-7', 'zed-5', 'ezreal-6', 'nasteryi-6', 'shen-4', 'sona-4', 'vi-4', 'yone', 'yone-2', 'ziggs-3', 'ahri-6', 'cassiopeia-3', 'kindred-2', 'riven-6', 'kennen-2', 'kogmaw-3', 'lillia', 'syndra-3', 'teemo-4', 'thresh-4', 'vayne-7', 'velkoz-3', 'yasuo-6', 'zoe-4', 'bard-2', 'gnar-3', 'irelia-10', 'nocturne-4', 'poppy-3', 'enna-2', 'volibear-3', 'volibear-4', 'ekko-5', 'fiora-6', 'lucian-4', 'pantheon-5', 'leblanc-4', 'norgana-5', 'urgot-4', 'zyra-3', 'jinx-5', 'sett', 'alistar-3', 'katarina-5', 'lux-5', 'lux-6', 'nasteryi-5', 'nalphite-3', 'nordekaiser-3', 'reksai-2', 'sejuani-4', 'tryndamere-2', 'xerath-2', 'aphelios', 'garen-5', 'jax-4', 'karma-4', 'leesin-4', 'leona-4', 'nidalee-4', 'rengar-5', 'soraka-5', 'soraka-6', 'swain-4', 'sylas-3', 'trundle-2', 'vladimir-3', 'aatrox-5', 'akali-8', 'ekko-4', 'qiyana-3', 'senna', 'yasuo-5', 'ashe-4', 'darius-4', 'hecarim-3', 'norgana-4', 'nami-3', 'riven-4', 'riven-5', 'ryze-3', 'neeko-3', 'eeko-4', 'xayahrakan', 'zoe-3', 'airi-6', 'noctune-3', 'pantheon-3', 'pantheon-4', 'rammus-3', 'udyr-2', 'veigar-3', 'akali-7', 'garen-4', 'irelia-8', 'irelia-9', 'jinx-4', 'lucian-3', 'pyke-4', 'warwick-4', 'caitlyn-3', 'caitlyn-4', 'kaisa-6', 'qiyana', 'qiyana-2', 'yasuo-4', 'jhin-3', 'karma-3', 'nordekaiser-2', 'tristana-4', 'nami', 'poppy-3', 'aatrox', 'lulu', 'braum', 'camille', 'karma', 'kindred', 'hecarim', 'norgana', 'renekton', 'kennen', 'akali', 'varus', 'orianna', 'blitzcrank', 'bloodmoonjhin', 'bloodmoontalon', 'arcaderiven', 'udyr', 'rumble', 'gnar', 'shaco', 'twitch', 'veigar', 'tryndamere', 'viktor', 'trundle', 'ezreal', 'poppy', 'lissandra', 'jax', 'vi', 'vellkoz', 'darius', 'diana', 'corki', 'sivir', 'ryze', 'azir', 'tristana', 'kled', 'volibear', 'twisterfate', 'anivia', 'zyra', 'quinn', 'nissfortune', 'kalista', 'ezrealandshen', 'gangplank', 'hextachannie', 'elementalistlux', 'xinzhao', 'vayne', 'jhin', 'reksai', 'graves', 'kogmaw', 'garen', 'porojinx', 'warwick', 'fizz', 'caitlyn', 'rengar', 'talon', 'nidalee', 'lux', 'jinx', 'thresh', 'wukong', 'sona', 'ahri', 'riven', 'zed', 'leesin', 'janna', 'katarina', 'leblanc', 'leona', 'fiora', 'lucian', 'shen', 'ziggs', 'yasuo', 'ekko', 'draven', 'ashe', 'ekko-5', 'teemo', 'khazix', 'nasteryi', 'brand', 'taliyah', 'nocturne', 'cassiopeia', 'xayah', 'rakan', 'syndra', 'irelia', 'leesingf', 'yasuobm', 'aurelionsol', 'pantheon', 'bard', 'singed', 'soraka', 'taric', 'naokai', 'xerath', 'gragas', 'jayce', 'riven3', 'nalphite', 'naster_yi2', 'chogath', 'zed2', 'darius2', 'talon2', 'kayle', 'drmundo', 'rammus', 'vladimir', 'ahri-2', 'karma-2', 'jarvan', 'nidalee-2', 'vayner-2', 'warwick-2', 'rengar-2', 'yasuo-3', 'galio', 'pantheon-2', 'jinx-2', 'nalzahar', 'olaf', 'shyvana', 'thresh-2', 'sion', 'caitlyn-2', 'swain', 'kassadin', 'heimerdinger', 'amumu', 'alistar', 'nasus', 'sejuani', 'ezreal3', 'nautilus', 'fiddlesticks', 'sona2', 'karthus', 'ekko2', 'orianna2', 'velkoz-2', 'xinzhao2', 'garen2', 'annie-2', 'yasuonb', 'rivendb', 'kayn', 'kaisa', 'veigar-2', 'vayne-3', 'twitch-2', 'tristana-2', 'rhaast', 'nalzahar-2', 'kayle-2', 'illaoi', 'fizz-2', 'elise', 'brand-2', 'syndra-2', 'soraka-2', 'nissfortune-2', 'hecarim-2', 'ezreal-2', 'ahri-3', 'yorick', 'z-2', 'tahmkench', 'shen-2', 'ornn', 'cassiopeia-2', 'renekton-2', 'nasus-2', 'jarvan-2', 'fiora-2', 'alistar-2', 'taric-2', 'zac-2', 'yorick-2', 'varus-2', 'nordekaiser', 'nasteryi-3', 'katarina-2', 'janna-2', 'fiora-3', 'evelynn', 'elise-2', 'ashe-2', 'annie', 'zoe', 'vi-2', 'vayne-4', 'rengar-3', 'jhin-2', 'graves-2', 'xayahrakan', 'warwick-3', 'nissfortune-3', 'lux-2', 'kaisa', 'jarvaniv', 'zoe-2', 'swain-2', 'sivir-2', 'nissfortune-4', 'jax-2', 'galio-2', 'varus-3', 'urgot', 'twistedfate-2', 'taric-3', 'swain-3', 'shen-3', 'rammus-2', 'pyke-2', 'pyke', 'nasus-3', 'talon', 'khazix-2', 'kayn-2', 'irelia-2', 'evelynn-2', 'akali-2', 'vladimir-2', 'jayce-2', 'janna-3', 'irelia-4', 'irelia-3', 'diana-2', 'zed-3', 'teemo-2', 'taliyah-2', 'shyvana-2', 'poppy-2', 'katarina-3', 'jax-3', 'garen-3', 'darius-3', 'chogath-2', 'aatrox-2', 'soraka-3', 'sona-3', 'sivir-3', 'kaisa-2', 'akali-4', 'akali-3', 'xinzhao-3', 'urgot-3', 'urgot-2', 'tristana-3', 'talon-3', 'sejuani-2', 'nunu-2', 'lulu-2', 'lucian-2', 'irelia-6', 'irelia-5', 'ashe-3', 'ziggs-2', 'yasuo-2', 'sona-4', 'nalphite-2', 'khazix-3', 'kayn-3', 'jinx-3', 'orianna-3', 'kaisa-4', 'kaisa-3', 'heimerdinger-2', 'ezreal-4', 'evelynn-3', 'akali-5', 'ahri-4', 'thresh-3', 'ryze-2', 'kled-2', 'janna-4', 'graves-3', 'fiddlesticks-2', 'ekko-3', 'amumu-2', 'nami-2', 'lulusoraka', 'lissandra-2', 'leona-3', 'leona-2', 'leblanc-2', 'ezrealmissfortune', 'camille-2', 'twitch-3', 'soraka-4', 'renekton-3', 'neeko-2', 'neeko', 'nasteryi-4', 'drmundo-2', 'akali-6', 'zyra-2', 'zilean', 'wukong-3', 'wukong-2', 'teemo-3', 'skarner', 'sivir-4', 'riven-2', 'quinn-2', 'pyke-3', 'nocturne-2', 'nidalee-3', 'norgana-2', 'leesin-3', 'kogmaw-2', 'kassadin-2', 'karthus-2', 'kalista-2', 'gnar-2', 'gangplank-2', 'corki-2', 'azir-3', 'azir-2', 'aatrox-4', 'aatrox-3', 'vi-3', 'vayne-6', 'vayne-5', 'tahmkench-2', 'sylas-2', 'sylas', 'sejuani-3', 'fiora-4', 'nunu-3', 'norgana-3', 'kayle-3', 'brand-3', 'anivia-2', 'ahri-5', 'yorick-3', 'rengar-4', 'fizz-4', 'fizz-3', 'corki-3', 'zed-4', 'rakan-2', 'leblanc-3', 'kaisa-5', 'jarvaniv', 'ivern', 'irelia-7', 'fiora-5', 'evelynn-4', 'camille-3', 'yuumi-2', 'yuumi', 'lux-4', 'lux-3', 'katarina-4', 'jayce-3', 'graves-4', 'ezreal-5']
                if (!style.includes(bawah)) {
                    getStyle(style, style.length, "heroes")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: atas,
                        heroes: bawah
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'pubglogomaker': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|women\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|women\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['women', 'nen']
                if (!style.includes(bawah)) {
                    getStyle(style, style.length, "style")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        style: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'colorfulpubg': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|color\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|green-yellow\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|color\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|green-yellow\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['gold', 'green-blue', 'pink-yellow', 'green-yellow', 'cyan-purple', 'orange-red']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "color")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        color: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'astronotspace': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|panther\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|panther\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['anubis', 'dragon', 'duck', 'gorilla', 'panda', 'panther', 'shark', 'squirrel', 'tiger', 'wolf', 'bull', 'rhino', 'rooster', 'pikachu', 'parrot', 'boar', 'bee', 'hurricane', 'deer', 'horse', 'crocodile', 'pitbull']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "style")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        style: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'wallpaperaov': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|heroes\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|preyta-2\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|heroes\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|preyta-2\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['allain', 'allain-2', 'kahlii-3', 'nakroth-4', 'preyta-2', 'skud-2', 'taara-4', 'valhein-4', 'arum-4', 'butterfly-6', 'capheny-3', 'elandorr-2', 'ilumia-3', 'ishar-4', 'lauriel-6', 'laville', 'liliana-5', 'nurad-8', 'quillen-5', 'rouie', 'rouie-2', 'taara-3', 'telannas-5', 'yena-4', 'yena-5', 'zata', 'ata', 'lauriel-5', 'qi-3', 'roxie-3', 'wukong-5', 'aleister-2', 'amily-3', 'arthur-3', 'arum-3', 'astrid-2', 'dirak', 'dirak-2', 'grakk-5', 'hayate-4', 'ishar-2', 'ishar-3', 'jinna-2', 'keera', 'keera-3', 'lauriel-4', 'nax', 'natalya-5', 'quillen-4', 'raz-3', 'richter-2', 'ryoma-4', 'telannas-4', 'ulen-6', 'valhein-3', 'violet-7', 'yorn-4', 'zill-3', 'ignis-2', 'lubu-2', 'naloch-2', 'sephera-3', 'butterfly-5', 'diaochan-4', 'elandoor', 'krizzix-2', 'nina-2', 'natalya-3', 'veera-3', 'violet-6', 'yena-2', 'yena-3', 'krizziz', 'nurad-7', 'volkath', 'volkath-2', 'airi-4', 'arduin-3', 'enzo-3', 'hayate-3', 'krixi-3', 'nurad-6', 'quillen-3', 'telannas-3', 'wisp-2', 'zip-2', 'gildur-2', 'ishar', 'tulen-5', 'amily-2', 'annette-3', 'arthur-2', 'butterfly-4', 'errol-2', 'joker', 'kahlii-2', 'kilgroth', 'lauriel-3', 'nurad-5', 'arduin-2', 'darcy-2', 'florentino-3', 'noren', 'quillen-2', 'ryoma-5', 'sephera-3', 'violet-5', 'airi-3', 'diaochan-3', 'diaochanlubu', 'elsuroxie', 'lindis-3', 'taara-2', 'toro-2', 'tulen-4', 'violet-4', 'wonderwoman', 'ybneth', 'zill-2', 'arum-2', 'florentino-2', 'liliana-4', 'nurad-4', 'yorn-3', 'zip', 'annette-2', 'qi', 'qi-2', 'celica', 'capheny-2', 'diaochan-2', 'elsu-2', 'ilumia-2', 'krixi-2', 'narja-2', 'nurad-3', 'preyta', 'telannas-2', 'valhein', 'veera-2', 'veres-2', 'yorn-2', 'zephys-2', 'airi-2', 'annette', 'baldum', 'butterfly-3', 'elsu-2', 'errol', 'fennik', 'lauriel-2', 'liliana-2', 'liliana-3', 'lindis-2', 'nurad-2', 'nakroth-2', 'nakroth-3', 'natalya-2', 'raz-2', 'ryoma-2', 'slimz', 'teemee', 'tulen-2', 'tulen-3', 'violet-3', 'wiro', 'wukong-3', 'wukong-4', 'zill', 'aleister', 'alice', 'arduin', 'arthur', 'azzenka', 'batman', 'butterfly-2', 'cresh', 'darcy', 'diaochan', 'enzo-2', 'hayate-2', 'jinna', 'lubu', 'nganga', 'violet-2', 'wukong-2', 'zanis-2', 'florentino', 'gildur', 'ignis', 'naloch', 'narja', 'nakroth', 'omen', 'payna', 'raz', 'rourke', 'roxie', 'ryoma', 'skud', 'taara', 'toro', 'valhein', 'veres', 'violet', 'wisp', 'wukong', 'wonderwoman', 'xeniel', 'yorn', 'zanis', 'elsu', 'flash', 'hayate', 'ilumia', 'kahlii', 'krixi', 'lauriel', 'liliana', 'lindis', 'nina', 'nurad', 'natalya', 'quillen', 'richter', 'sephera', 'superman', 'telannas', 'thane', 'airi', 'amily', 'arum', 'astrid', 'butterfly', 'capheny', 'enzo', 'tulen', 'veera', 'yena', 'ryoma-4', 'zephys', 'zuka']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "heroes")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        heroes: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'maketeamlogo': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|panda\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|panda\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['anubis', 'cowgirl', 'dragon', 'duck', 'ghost', 'gorilla', 'panda', 'panther', 'shark', 'squirrel', 'tiger', 'wolf', 'bee', 'crocodile', 'deer', 'pitbull', 'horse', 'hurricane', 'indian', 'assassin', 'boar', 'rapid', 'raven', 'warrior', 'pikachu', 'pubg', 'ninja', 'drift', 'yasuo', 'rhino', 'phoenix', 'bull', 'hornet', 'eagle', 'hunter', 'parrot', 'rooster', 'lion', 'skull', 'wolver', 'wolf', 'cobra', 'dragon', 'panther', 'owl', 'tiger', 'reaper', 'warrior']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "style")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        style: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'circlemarcotteam': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|bear\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|bear\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['panther', 'rhino', 'squirrel', 'unicorn', 'zebra', 'lionsnake', 'bear', 'bull', 'dragon', 'eagle', 'fox', 'griffin', 'hawk', 'lion', 'peacock', 'phoenix', 'tiger', 'wolver']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "logo")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        logo: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'wallpaperml': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|heroes\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|chou\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|heroes\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|chou\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['aldous', 'alice-2', 'angela-2', 'argus-2', 'chou', 'chou-2', 'estes', 'eudora', 'eudora-2', 'granger', 'granger-2', 'gusion-3', 'hanabi-2', 'hanzo', 'helcurt', 'layla-3', 'lesley-4', 'lunox-2', 'odette-3', 'saber', 'thamuz', 'vexana', 'argus', 'dyrroth', 'esmeralda-2', 'kadita-2', 'lancelot', 'leomord-2', 'lylia', 'vale', 'valir', 'xborg', 'zhask', 'alice', 'InzieOfc', 'athena', 'badang', 'balmond', 'bane', 'diggie', 'trunks', 'fanny-2', 'fanny-3', 'freya', 'guinevere', 'gusion', 'gusion-2', 'hanabi', 'harith', 'harith-2', 'hayabusa-2', 'kadita', 'kagura-2', 'kagura-3', 'karina-2', 'kimmy', 'layla-2', 'leomord', 'lesley-2', 'lesley-3', 'lunox', 'nartis', 'niya-2', 'nana', 'nana-2', 'natalia', 'natalia-2', 'odette-2', 'pharsa', 'rafaela-2', 'selena-2', 'zilong', 'alucard', 'angela', 'bruno', 'change', 'claude', 'fanny', 'hayabusa', 'hilda', 'hylos', 'kagura', 'karina', 'karrie', 'layla', 'lesley', 'lolita', 'ninotaur', 'ninsittar', 'niya', 'noskov', 'odette', 'rafaela', 'selena']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "heroes")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        heroes: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'dragonballfb': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|kale\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|kale\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['cabba', 'caulifla', 'cooler', 'cumber', 'hit', 'kale', 'kaminoren', 'gokuui', 'xenogokuss3', 'xenogokuss4', 'xenovegeta', 'xenovegito', 'android-18', 'blackgoku', 'bulma', 'frieza', 'gotenks-2', 'kaio', 'krillinandroid-18', 'launch', 'nutenroshi-2', 'oldkai', 'oolong', 'pilaf', 'tienshinhan', 'trunks-3', 'bardock', 'gotenks', 'nutenroshi', 'piccolo', 'songoku-2', 'songoku-3', 'songoten', 'trunks-2', 'vegeta-2', 'vegito', 'krillin', 'najinbuu', 'songohan', 'songoku', 'trunks', 'vegeta']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "character")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        character: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'bannerofaov': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|swain\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|swain\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['peura', 'rouie-5', 'roxie-2', 'sinestrea-4', 'tachi', 'telannas-7', "tulen-7", "veera-3", "veera-4", "veres-6", "violet-7", "wukong-3", "annette-6", "astrid-5", "bright-2", "butterfly-4", "butterfly-5", "diao-chan", "enzo-4", "helen", "iggy-3", "ilumia-4", "ishar-5", "lauriel-7", "mina-4", "annette-5", "aoi-3", "arum-3", "azzenka", "bright", "capheny-6", "celica-2", "elsu-3", "ilumia-3", "ishar-4", "kahlii-2", "lauriel-6", "laville-4", "liliana-6", "mina-3", "paine", "rouie-4", "veres5", "murad-6", "veres-2", "tulen-5", "lindis-2", "dextra", "nakroth-6", "sephera3", "darcy2", "capheny4", "astrid4", "yorn2", "airi4", "sinestrea2", "sinestrea1", "zephys2", "yena4", "volkath3", "tulen4", "thorne", "quillen5", "nakroth5", "laville3", "hayate4", "florentino3", "butterfly3", "amily3", "annette4", "allain", "arum2", "astrid3", "ata2", "ata", "butterfly2", "capheny3", "dirak", "elandorr2", "elandorr", "florentino2", "hayate3", "ilumia2", "ishar3", "jinna2", "keera", "lauriel4", "laville2", "laville", "liliana4", "lubu2", "mganga2", "murad5", "nakroth4", "omen2", "paine", "preyta", "qi2", "quillen4", "rouie2", "rouie", "skud2", "taara", "telannas4", "valhein3", "valhein2", "violet5", "violet4", "yena3", "yena2", "zata", "zata2", "enzo", "hayate2", "krixi2", "krizziz", "murad4", "volkath2", "volkath", "wukong2", "arduin2", "mina2", "zuka2", "wisp2", "errol2", "ishar2", "lubu&diaochan", "maloch", "ormarr", "thane", "tulen&butterfly", "ishar", "tulen3", "butterfly", "lauriel3", "liliana3", "nakroth3", "baldum", "lauriel2", "celica", "annette3", "capheny2", "gildur2", "quillen2", "sephera2", "ryoma2", "tulen2", "tulen1", "qi", "liliana2", "murad3", "zephys", "zip2", "airi3", "amily2", "astrid2", "lauriel", "nakroth2", "violet3", "airi2", "alice3", "arduin", "elsu2", "ignis", "jinna", "joker", "kilgroth", "lubu", "marja", "moren", "payna", "ryoma", "skud", "superman", "valhein", "xeniel", "zill", "yena", "zip", "sephera", "aleister", "alice2", "annette2", "arthur", "arum", "astrid", "darcy", "batman", "errol", "fennik", "flash", "florentino", "gildur", "grakk", "hayate", "kahlii", "mganga", "mina", "murad2", "omen", "richter", "rourke", "telannas2", "toro", "violet2", "wonderwomen", "roxie", "natalya", "airi", "amily", "annette", "elsu", "ilumia", "alice", "zuka", "wisp", "wiro", "veres", "quillen", "lindis", "krixi", "murad", "liliana", "enzo", "diaochan", "capheny", "veera", "tulen", "slimz", "yorn", "violet", "telannas", "raz", "wukong", "nakroth"]
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "character")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        character: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'effect3donbeach': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|beach-5\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|beach-5\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['beach-1', 'beach-2', 'beach-3', 'beach-4', 'beach-5', 'beach-6']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "background")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        background: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'cutegirlgamer': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|style-3\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|style-3\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['style-1', 'style-2', 'style-3', 'style-4', 'style-5', 'style-6', 'style-7', 'style-8', 'style-9', 'style-10', 'style-11', 'style-12']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "logo")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        logo: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'footballteam': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|nau-5\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|nau-5\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['nau-1', 'nau-2', 'nau-3', 'nau-4', 'nau-5', 'nau-6']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "logo")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        logo: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'beautifulshimmering': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|champion\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|nina\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|champion\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|nina\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['aleister', 'alice', 'butterfly', 'diaochan', 'kahlii', 'krixi', 'nina', 'nakroth', 'natalya', 'taara', 'thane', 'violet', 'zanis', 'zata', 'airi', 'annette', 'arthur', 'arum', 'astrid', 'elandorr', 'gildur', 'gildur', 'hayate', 'ilumia', 'ishar', 'lauriel', 'lindis', 'nurad', 'quillen', 'rouie', 'sephera', 'yena', 'yorn']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "champion")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        champion: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'pubgcutelogo': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|chicken\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|chicken\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['chicken', 'soldier']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "logo")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        logo: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'elegantrotation': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|dragon\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|dragon\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['bull', 'dragon', 'eagle', 'lion', 'rhino', 'tiger']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "logo")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        logo: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'logogamingassasin': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|style-1\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|style-1\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['style-1', 'style-2', 'style-3', 'style-4', 'style-5', 'style-6', 'style-7', 'style-8', 'style-9', 'style-10', 'style-11', 'style-12', 'style-13', 'style-14', 'style-15', 'style-16', 'style-17', 'style-18', 'style-19', 'style-20', 'style-21', 'style-22', 'style-23', 'style-24']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "logo")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        logo: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'introvideomaker': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|dragon\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|dragon\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['bull', 'dragon', 'eagle', 'lion', 'tiger', 'skull']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "logo")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        logo: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'gaminglogo4fvs': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|soldier\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|soldier\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['girl', 'ghost', 'soldier-2', 'swat', 'woman', 'soldier', 'sniper', 'raccoon', 'rabbit', 'panda', 'chicken']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "logo")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        logo: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'blueneon': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|lion\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|lion\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['tiger', 'shark', 'dugong', 'bull', 'cheetah', 'lion']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "logo")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        logo: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'metalmascot': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|lion\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|logo\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|lion\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['snakelion', 'dragon', 'ragon-2', 'eagle', 'falcon', 'fox', 'lion', 'panther', 'phoenix', 'phoenix', 'rhino', 'squirrel', 'tiger', 'unicorn', 'wolf', 'zebra']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "logo")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        logo: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'anonymous2': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|style1\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|style1\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['style1', 'style2', 'style3']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "style")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/anonymous', {
                        text: m1,
                        style: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'lolpentakill': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|nocturne\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|nocturne\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['jhin', 'syndra', 'olaf', 'nocturne', 'chogath', 'kassadin', 'nidalee', 'fiora', 'fiddlesticks', 'garen', 'irelia-2', 'janna', 'lissandra', 'ezreal', 'riven', 'nalphite', 'khazix', 'nasteryi', 'irelia', 'alista', 'jayce', 'singed', 'galio', 'velkoz', 'yi', 'yasuo', 'sona', 'nidalee-2', 'teemo', 'leesin', 'jinx', 'zed', 'camille', 'brand', 'warwick', 'rengar', 'vayne', 'leona', 'ashe', 'ezreal', 'annie', 'xerath', 'ahri', 'kayle', 'nissfortune', 'caitlyn', 'vi', 'leesin', 'darius', 'fizz', 'bloodyasuo', 'ekko', 'lucian', 'rakanandayah']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "style")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        style: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'avatarleagueofking': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|ilumia-5\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|ilumia-5\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['arum-6', 'baldum-3', 'elandorr-3', 'hayate-5', 'ilumia-5', 'ishar-4', 'lauriel-8', 'nax-5', 'nurad-9', 'quillen-6', 'teemee-3', 'telannas-8', 'volkath-3', 'yena-4', 'yena-5', 'butterfly-10', 'laville', 'laville-2', 'nakroth-7', 'omen-6', 'rouie-2', 'taara-4', 'zanis-8', 'zata', 'zata-2', 'elsu-6', 'fennik-5', 'liliana-7', 'paine', 'paine-2', 'rouie', 'astrid-4', 'ata', 'ata-2', 'lauriel-8', 'omen-5', 'qi-3', 'roxie-5', 'taara-5', 'violet-12', 'wukong-7', 'wukong-8', 'hayate-4', 'ishar-3', 'jinna-5', 'keera-2', 'lauriel-7', 'quillen-5', 'richter-4', 'ryoma-6', 'telannas-8', 'tulen-9', 'yorn-8', 'aleister-4', 'dirak-2', 'grakk-5', 'kerra', 'raz-5', 'amily-5', 'athur-7', 'arum-5', 'ishar-2', 'nax-4', 'natalya-6', 'natalya-7', 'zill-5', 'diaochan-6', 'ignis-4', 'lubu-8', 'naloch-7', 'sephera-4', 'elandorr', 'elandorr-2', 'krizziz-2', 'violet-11', 'yena-3', 'arduin-4', 'enzo-3', 'errol-3', 'hayate-3', 'krixi-7', 'krizziz', 'nurad-8', 'volkath', 'volkath-2', 'wisp-4', 'wukong-6', 'celica', 'gildur-4', 'ishar', 'nurad-7', 'quillen-4', 'tulen-8', 'lauriel-6', 'qi', 'qi-2', 'darcy-3', 'florentino-3', 'noren-3', 'ryoma-5', 'sephera-3', 'annette-4', 'capheny-3', 'elsu-5', 'narja', 'veres-3', 'violet-10', 'zip', 'zip-2', 'diaochan-5', 'enzo-2', 'lubu-7', 'nganga-4', 'payna-3', 'roxie-4', 'violet-9', 'zanis-7', 'zephys-6', 'enzo', 'liliana-6', 'lindis-5', 'xeniel-5', 'airi-9', 'errol-2', 'yena-2', 'zuka-8', 'notos', 'chaugnar', 'kahlii', 'lubo', 'nina', 'krixi', 'zanis-3', 'jinna', 'fennik', 'airi', 'ormarr', 'toro', 'butterfly', 'nakroth', 'gildur', 'omega', 'natalya', 'lumburr', 'yorn', 'dieu-thuyen', 'nganga', 'grankk-2', 'azzenka', 'alice', 'violet', 'violet2', 'butterfly2', 'krixi2', 'natalya2', 'taara', 'ormarr2', 'valhein', 'zephys', 'nakroth2', 'aleister', 'payna', 'wukong', 'naloch', 'kricnak', 'slimz2', 'cresht', 'slimz', 'dieu-thuyen2', 'thane-2', 'preyta', 'fennik-2', 'raz', 'preyta-2', 'payna-2', 'illumia', 'nortos-2', 'yorn-2', 'violet-3', 'valhein-2', 'taara-2', 'skud-1', 'skud', 'natalya-3', 'lu-bu', 'jinna-2', 'illumia-2', 'butterfly-4', 'batman', 'zuka-2', 'airi-2', 'zanis', 'nurad', 'nurad-2', 'nina-2', 'lauriel-2', 'ignis-2', 'ignis', 'grakk', 'airi-3', 'zill-2', 'zill', 'zanis-2', 'yorn-3', 'veera-3', 'veera-2', 'telannas', 'superman', 'naloch-2', 'krixi-3', 'butterfly-5', 'violet-5', 'veera-4', 'telannas-2', 'illumia-3', 'batman-2', 'arduin-2', 'arduin', 'wukong-2', 'nakroth-3', 'arthur', 'ryoma-2', 'ryoma', 'raz-2', 'nganga-2', 'astrid-2', 'astrid', 'zanis-4', 'xeniel', 'wukong-3', 'noren', 'lauriel-3', 'joker', 'xeniel-2', 'telannas-3', 'nurad-3', 'lubu-4', 'lubu-3', 'kriknak-2', 'kahlii-2', 'diaochanlubu', 'chaugnar-2', 'azzenka-2', 'alice-2', 'aleister-2', 'noren-2', 'lubu-5', 'lauriel-4', 'kilgoth', 'gildur-2', 'fennik-3', 'zephys-3', 'wonderwoman', 'superman-2', 'slimz-3', 'natalya-4', 'krixi-5', 'krixi-4', 'zephys-2', 'zanis-5', 'yorn-4', 'xeniel-3', 'wonderwoman-2', 'violet-4', 'naloch-3', 'airi-4', 'telannas-4', 'ormarr-4', 'ormarr-3', 'nakroth-4', 'kilgroth-2', 'kahlii-3', 'grakk-3', 'natalya-5', 'fennik-4', 'valhein-3', 'teemee-2', 'teemee', 'lindis', 'zuka-3', 'tulen', 'toro-2', 'nina-3', 'naloch-4', 'lumburr-2', 'lindis-2', 'joker-2', 'grakk-4', 'gildur-3', 'aleister-3', 'tulen-2', 'toro-3', 'taara-3', 'omen-2', 'omen', 'zill-3', 'arthurtelannas', 'zuka-4', 'nakroth-5', 'nax', 'liliana', 'raz-3', 'liliana-2', 'nax-2', 'krixnak-3', 'joker-3', 'chaugnar-3', 'wisp', 'ryoma-3', 'batman-3', 'airi-6', 'tulen-3', 'cresht-3', 'cresht-2', 'astris-3', 'flash', 'arum-2', 'arum', 'butterfly-6', 'alice-3', 'xeniel-4', 'valhein-4', 'tulen-4', 'rourke-2', 'rourke', 'nurad-4', 'nax-3', 'wisp-2', 'narja-2', 'narja', 'zuka-5', 'jinna-3', 'butterfly-7', 'arthur-5', 'valhein-5', 'superman-3', 'liliana-3', 'kilgroth', 'wirosabaleng', 'roxie-2', 'roxie', 'wukong-4', 'baldum-2', 'baldum', 'zephys-4', 'annette-2', 'annette', 'telannas-6', 'raz-4', 'nurad-6', 'nurad-5', 'jinna-4', 'amily', 'ybneth-2', 'ybneth', 'ilumia-4', 'amily-2', 'xeniel-5', 'veera-5', 'liliana-4', 'flash-2', 'arthur-2', 'omen-3', 'lindis-3', 'elsu-2', 'elsu', 'richter-2', 'richter', 'nina-4', 'thane-3', 'ryoma-4', 'quillen-2', 'quillen', 'lauriel-5', 'arum-3', 'wisp-3', 'violet-7', 'sephera-2', 'sephera', 'naloch-5', 'krixi-6', 'alice-4', 'tulen-5', 'skud-3', 'rourke-3', 'nakroth-6', 'florentino-2', 'florentino', 'elsu-3', 'butterfly-8', 'amily-3', 'zuka-7', 'zuka-6', 'yorn-7', 'yorn-6', 'veres-2', 'veres', 'naloch-6', 'cresht-4', 'azzenka-3', 'airi-7', 'zephys-5', 'yorn-5', 'violet-8', 'valhein-6', 'thane-4', 'roxie-3', 'nakroth-7', 'kahlii-4', 'elsu-4', 'darcy-2', 'darcy', 'capheny', 'zill-4', 'hayate-2', 'hayate', 'cresht-5', 'annette-3', 'amily-4', 'tulen-7', 'telannas-7', 'omen-4', 'lindis-4', 'liliana-5', 'ignis-3', 'errol', 'capheny-2', 'arum-4', 'zanis-6', 'wukong-5', 'thane-5', 'slimz-4', 'skud-4', 'richter-3', 'quillen-3', 'azzenka-4', 'arduin-3', 'airi-8']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "style")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        style: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'avatarff': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|alok\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|alok\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['a124', 'alok', 'alvaro', 'andrew', 'antonio', 'caroline', 'ford', 'hayato', 'joseph', 'kelly', 'kla', 'laura', 'naxim', 'niguel', 'nisa', 'noco', 'nikita', 'notora', 'olivia', 'paloma', 'rafael', 'shani', 'steffie', 'wukong']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "character")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        character: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'overwatchwallpaper': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|lucio\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|lucio\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['ana', 'ashe', 'ashe-2', 'baptiste', 'baptiste-2', 'brigitte', 'dva', 'dva-2', 'genji', 'hanzo', 'junkrat', 'lucio', 'nccree', 'nei', 'nercy', 'nercy-2', 'nercy-3', 'noira', 'pharah', 'reaper', 'roadhog', 'soldier-76', 'sombra', 'sombra-2', 'symmetra', 'tracer', 'tracer-2', 'widowmaker', 'widowmaker-2', 'zarya']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "character")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        character: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'rovwallpaperhd': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|hero\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|keera\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|hero\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|keera\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['alice-5', 'arthur-8', 'dirak-3', 'errol', 'grakk-6', 'keera', 'lorion', 'nina-6', 'tulen-10', 'yena', 'zip-3', 'zuka-9', 'arum-6', 'baldum-3', 'elandorr-3', 'hayate-5', 'ilumia-5', 'ishar-4', 'lauriel-8', 'nax-5', 'nurad-9', 'quillen-6', 'teemee-3', 'telannas-8', 'yena-4', 'yena-5', 'butterfly-10', 'laville', 'laville-2', 'nakroth-7', 'omen-6', 'rouie-2', 'taara-5', 'zanis-8', 'zata', 'zata-2', 'capheny-4', 'elsu-6', 'fennik-5', 'liliana-7', 'paine', 'paine-2', 'rouie', 'astrid-4', 'ata', 'ata-2', 'lauriel-8', 'omen-5', 'qi-3', 'roxie-5', 'taara-5', 'violet-12', 'wukong-7', 'wukong-8', 'hayate-4', 'ishar-3', 'jinna-5', 'lauriel-7', 'quillen-5', 'richter-4', 'ryoma-6', 'telannas-8', 'tulen-9', 'yorn-7', 'aleister-4', 'dirak', 'dirak-2', 'grakk-5', 'kerra', 'raz-4', 'athur-7', 'arum-5', 'ishar-2', 'nax-4', 'natalya-7', 'valhein-7', 'zill-5', 'diaochan-6', 'ignis-4', 'lubu-8', 'naloch-7', 'sephera-4', 'elandorr', 'elandorr-2', 'krizzix', 'krizzix-2', 'violet-11', 'yena-3', 'arduin-4', 'enzo-3', 'errol-3', 'hayate-3', 'krixi-7', 'nurad-8', 'volkath', 'volkath-2', 'wisp-4', 'wukong-6', 'gildur-4', 'ishar', 'nurad-7', 'quillen-4', 'tulen-8', 'lauriel-6', 'qi', 'qi-2', 'darcy-3', 'florentino-3', 'noren-3', 'ryoma-5', 'sephera-3', 'annette-4', 'capheny-3', 'elsu-5', 'narja-3', 'veres-3', 'violet-10', 'zip-2', 'zip-3', 'diaochan-5', 'enzo-2', 'lubu-7', 'payna-4', 'roxie-4', 'violet-9', 'zanis-7', 'zephys-6', 'enzo', 'liliana-6', 'lindis-5', 'xeniel-5', 'airi-9', 'errol-2', 'yena-2', 'zuka-8', 'zephys-3', 'zephys-2', 'zephys', 'zanis-5', 'zanis-4', 'zanis-3', 'zanis-2', 'zanis', 'violet-5', 'violet-4', 'violet-3', 'violet-2', 'violet', 'veera-4', 'veera-3', 'veera-2', 'valhein-3', 'valhein-2', 'valhein', 'thane-2', 'thane', 'nina-3', 'nina-2', 'nina', 'nganga-2', 'nganga', 'lubu-5', 'lubu-4', 'lubu-3', 'lubu-2', 'lubu', 'krixi-5', 'krixi-4', 'krixi-3', 'krixi-2', 'krixi', 'kahlii-3', 'kahlii-2', 'kahlii', 'diaochan-3', 'diaochan-2', 'diaochan', 'chaugnar', 'butterfly-5', 'butterfly-4', 'butterfly-2', 'butterfly', 'yorn-4', 'yorn-3', 'yorn-2', 'yorn', 'wukong-3', 'wukong-2', 'wukong', 'toro-2', 'toro', 'taara-2', 'taara', 'slimz-3', 'slimz-2', 'slimz', 'payna-2', 'payna', 'ormarr-4', 'ormarr-3', 'ormarr-2', 'kaisa-2', 'ormarr', 'natalya-5', 'natalya-4', 'natalya-3', 'natalya-2', 'natalya', 'nakroth-4', 'nakroth-3', 'nakroth-2', 'nakroth', 'naloch-3', 'naloch-2', 'naloch', 'lumburr', 'kriknak-2', 'kriknak', 'jinna-2', 'jinna', 'grakk-3', 'grakk-2', 'grakk', 'gildur-2', 'gildur', 'fennik-4', 'fennik-3', 'fennik-2', 'fennik', 'cresht', 'azzenka-2', 'azzenka', 'arthur-3', 'arthur-2', 'arthur', 'alice-2', 'alice', 'aleister-2', 'aleister', 'zuka-2', 'zuka', 'zill-2', 'zill', 'xeniel-2', 'xeniel', 'wonderwoman-2', 'wonderwoman', 'telannas-4', 'telannas-3', 'telannas-2', 'telannas', 'superman-2', 'superman', 'skud-2', 'skud', 'ryoma-2', 'ryoma', 'preyta-3', 'preyta-2', 'preyta', 'nurad-3', 'nurad-2', 'nurad', 'noren-2', 'noren', 'lauriel-4', 'lauriel-3', 'lauriel-2', 'lauriel', 'kilgroth-2', 'kilgroth', 'joker', 'illumia-3', 'illumia-2', 'illumia', 'ignis-2', 'ignis', 'batman-2', 'batman', 'astrid-2', 'astrid', 'arduin-2', 'arduin', 'airi-5', 'airi-4', 'airi-3', 'airi-2', 'airi', 'teemee-2', 'teemee', 'zuka-3', 'tulen', 'raz-2', 'raz', 'naloch-4', 'lumburr-2', 'lindis-2', 'joker-2', 'grakk-4', 'gildur-3', 'toro-3', 'omen-2', 'omen', 'zuka-4', 'tulen-2', 'nakroth-5', 'nax', 'liliana', 'zill-3', 'raz-3', 'liliana-2', 'tulen-3', 'telannas-5', 'taara-3', 'ryoma-3', 'nax-2', 'kriknak-3', 'flash', 'cresht-3', 'cresht-2', 'arthur-4', 'aleister-3', 'airi-6', 'arum-2', 'arum', 'wisp-2', 'wisp', 'rourke-2', 'rourke', 'narja-2', 'narja', 'butterfly-6', 'batman-3', 'astris-3', 'jinna-3', 'butterfly-7', 'arthur-5', 'valhein-4', 'superman-3', 'liliana-3', 'kilgroth-3', 'roxie-2', 'roxie', 'wukong-4', 'baldum-2', 'baldum', 'zephys-4', 'annette-2', 'annette', 'alice-3', 'telannas6', 'raz-4', 'nurad-6', 'nurad-5', 'jinna-4', 'amily', 'ybneth-2', 'ybneth', 'ilumia-4', 'amily-2', 'xeniel-3', 'veera-5', 'liliana4', 'flash-2', 'arthur-6', 'omen-3', 'lindis-3', 'elsu-2', 'elsu', 'richter-2', 'richter', 'nina-4', 'wirosableng', 'thane-3', 'ryoma-4', 'quillen-2', 'quillen', 'lauriel-5', 'arum-3', 'wisp-3', 'violet-7', 'sephera-2', 'sephera', 'naloch-5', 'krixi-6', 'alice-4', 'tulen-5', 'skud-3', 'rourke-3', 'nakroth-6', 'florentino-2', 'florentino', 'elsu-3', 'butterfly-8', 'amily-3', 'zuka-7', 'zuka-6', 'yorn-6', 'yorn-5', 'veres-2', 'veres', 'naloch-6', 'cresht-4', 'azzenka-3', 'airi-7', 'zephys-5', 'yorn-7', 'violet-8', 'valhein-5', 'tulen-6', 'thane-4', 'roxie-3', 'nakroth-7', 'kahlii-4', 'elsu-4', 'darcy-2', 'darcy', 'capheny', 'zill-4', 'hayate-2', 'hayate', 'cresht-5', 'annette-3', 'amily-4', 'tulen-7', 'telannas-7', 'omen-4', 'lindis-4', 'liliana-5', 'ignis-3', 'errol', 'capheny-2', 'arum-4', 'zanis-6', 'wukong-5', 'thane-5', 'slimz-4', 'skud-4', 'richter-3', 'quillen-3', 'azzenka-4', 'arduin-3', 'airi-8']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "hero")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        hero: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'rovwallpaper': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|avatar\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|grakk-6\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|avatar\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|grakk-6\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['alice-5', 'arthur-8', 'dirak-3', 'errol', 'grakk-6', 'keera-2', 'lorion', 'grakk-6', 'keera-2', 'lorion', 'nina-6', 'tulen-10', 'yena', 'zip-3', 'zuka-9', 'dextra', 'dextra-2', 'lindis-6', 'nurad-10', 'nakroth-9', 'quillen-7', 'sephera-5', 'yorn-8', 'airi-10', 'amily-6', 'astrid-6', 'ata-3', 'capheny-5', 'darcy-4', 'diaochan-8', 'hayate-6', 'lauriel-10', 'laville-3', 'rourke-4', 'ryoma-7', 'sinestrea', 'sinestrea-2', 'telannas-9', 'thorne', 'thorne-2', 'veres-4', 'yena-6', 'zephys-7', 'allain', 'allain-2', 'butterfly-12', 'kahlii-6', 'nakroth-8', 'preyta-4', 'taara-7', 'valhein-8', 'arum-6', 'baldum-3', 'elandorr-3', 'hayate-5', 'ilumia-5', 'ishar-4', 'lauriel-8', 'nax-5', 'nurad-9', 'quillen-6', 'teemee-3', 'telannas-8', 'yena-4', 'yena-5', 'butterfly-10', 'laville', 'laville-2', 'nakroth-7', 'omen-6', 'rouie-2', 'taara-6', 'zanis-8', 'zata', 'zata-2', 'capheny-4', 'elsu-6', 'fennik-5', 'liliana-7', 'paine', 'paine-2', 'rouie', 'astrid-4', 'ata', 'ata-2', 'lauriel-8', 'omen-5', 'qi-3', 'taara-5', 'violet-12', 'wukong-7', 'wukong-8', 'hayate-4', 'ishar-3', 'jinna-5', 'kerra-2', 'lauriel-7', 'quillen-5', 'richter-4', 'ryoma-6', 'telannas-8', 'tulen-9', 'yorn-7', 'aleister-4', 'dirak', 'dirak-2', 'grakk-5', 'keera', 'raz-4', 'ishar-2', 'nax-4', 'valhein-7', 'zill-5', 'arthur-7', 'rum-5', 'lubu-8', 'naloch-7', 'sephera-4', 'diaochan-6', 'ignis-4', 'elandorr', 'elandorr-2', 'krizzix', 'krizzix-2', 'violet-11', 'yena-3', 'arduin-4', 'enzo-3', 'errol-3', 'hayate-3', 'nurad-8', 'volkath', 'volkath-2', 'wisp-4', 'wukong-6', 'celica', 'gildur-4', 'ishar', 'nurad-7', 'quillen-4', 'tulen-8', 'qi', 'qi-2', 'darcy-3', 'florentino-3', 'noren-3', 'ryoma-5', 'sephera-3', 'elsu-5', 'narja-3', 'annette-4', 'capheny-3', 'veres-3', 'zip-2', 'zip', 'diaochan-5', 'enzo-2', 'lubu-7', 'payna-3', 'roxie-4', 'violet-9', 'zanis-7', 'zephys-6', 'enzo', 'liliana-6', 'lindis-5', 'xeniel-5', 'errol', 'yena-2', 'zuka-8', 'valhein', 'violet', 'airi', 'skud', 'zanis', 'zephis', 'butterfly', 'wukong', 'taara', 'nakroth', 'prayta', 'yorn', 'natalya', 'thane', 'toro', 'ormarr', 'omega', 'nina', 'nganga', 'lubu2', 'lubu', 'kahlii-2', 'kahlii', 'fennik-2', 'fennik', 'diaochan', 'cresht', 'azzenka', 'aleister', 'zuka2', 'zuka', 'payna-2', 'payna', 'nakroth-2', 'nortos-2', 'nortos', 'kriknak', 'jinna-2', 'jinna', 'batman', 'airi-2', 'violet-3', 'violet-2', 'skud-2', 'raz-2', 'raz', 'ignis-2', 'ignis', 'gildur', 'butterfly-4', 'butterfly-3', 'zanis-2', 'nurad', 'yorn-2', 'slimz', 'ormarr-2', 'nurad-2', 'nina-2', 'lauriel-2', 'grakk-2', 'grakk', 'diaochan-2', 'airi-3', 'zill-2', 'zill', 'zanis-3', 'yorn-3', 'veera-3', 'veera-2', 'thane-2', 'telannas', 'superman', 'naloch-2', 'krixi-3', 'butterfly-5', 'violet-5', 'veera-4', 'telannas-2', 'taara-2', 'joker', 'ilumia-2', 'batman-2', 'arduin-2', 'arduin', 'wukong-2', 'nakroth-3', 'ilumia-3', 'arthur', 'ryoma-2', 'ryoma', 'astrid-2', 'astrid', 'zephis-2', 'natalya-3', 'natalya-2', 'ubu-3', 'chaugnar', 'azzenka-2', 'zanis-4', 'wukong-3', 'noren', 'lubu-4', 'lauriel-3', 'aleister-2', 'nurad-3', 'noren-2', 'lubu-5', 'kilgroth', 'gildur-2', 'fennik-3', 'lauriel-4', 'zephys-3', 'xeniel-2', 'wonderwomen', 'superman-2', 'slimz-2', 'natalya-4', 'krixi-5', 'krixi-4', 'zanis-5', 'yorn-4', 'xeniel', 'wonderwoman-2', 'violet-4', 'preyta2', 'diaochan-3', 'airi-4', 'valhein-4', 'preyta-3', 'nina-3', 'alice-2', 'airi-5', 'telannas-3', 'ormarr-4', 'ormarr-3', 'nakroth-4', 'kilgroth-2', 'kahlii-3', 'grakk-3', 'natalya-5', 'fennik-4', 'teemee-2', 'teemee', 'lindis', 'zuka-3', 'valhein-2', 'tulen', 'toro-2', 'naloch-4', 'naloch-3', 'lumburr', 'lindis-2', 'grakk-4', 'gildur-3', 'toro-3', 'omen-2', 'omen', 'zill-3', 'telannas-', 'athur-4', 'zuka-4', 'tulen-2', 'nakroth-5', 'nax', 'liliana', 'raz-3', 'liliana-2', 'tulen-3', 'nax-2', 'flash', 'cresht-3', 'cresht-2', 'chaugnar-2', 'aleister-3', 'ryoma-3', 'kriknak-3', 'airi-6', 'wisp-2', 'wisp', 'batman-3', 'arum-2', 'arum', 'butterfly-6', 'rourke-2', 'rourke', 'narja-2', 'narja', 'taara-3', 'jinna-3', 'butterfly-7', 'arthur-4', 'arthur-3', 'arthur-2', 'valhein-3', 'superman-3', 'liliana-3', 'kilgroth-3', 'roxie-2', 'roxie', 'wukong-4', 'baldum-2', 'baldum', 'zephys-4', 'annette-2', 'annette', 'alice-3', 'telannas6', 'raz-4', 'nurad-6', 'nurad-5', 'jinna-4', 'amily', 'ybneth-2', 'ybneth', 'ilumia-4', 'astrid-3', 'amily-2', 'liliana-4', 'xeniel-5', 'veera-5', 'flash-2', 'athur-5', 'omen-3', 'lindis-3', 'elsu-2', 'elsu', 'richter-2', 'richter', 'nina-4', 'wirosableng', 'thane-3', 'ryoma-4', 'quillen-2', 'quillen', 'lauriel-5', 'arum-3', 'wisp-3', 'violet-7', 'sephera-2', 'sephera', 'naloch-5', 'krixi-6', 'alice-4', 'tulen-5', 'skud-3', 'rourke-3', 'nakroth-6', 'florentino-2', 'florentino', 'elsu-3', 'utterfly-8', 'amily-3', 'zuka-7', 'zuka-6', 'yorn-6', 'yorn-5', 'veres-2', 'veres', 'naloch-6', 'cresht-4', 'azzenka-3', 'airi-7', 'zephys-5', 'yorn-7', 'violet-8', 'valhein-5', 'tulen-6', 'thane-4', 'roxie-3', 'nakroth-7', 'kahlii-4', 'elsu-4', 'darcy2', 'darcy', 'capheny', 'zill-4', 'hayate-2', 'hayate', 'cresht-5', 'annette-3', 'amily-4', 'tulen-7', 'telannas-7', 'omen-4', 'lindis-4', 'liliana-5', 'ignis-3', 'errol', 'capheny-2', 'arum-4', 'zanis-6', 'wukong-5', 'thane-5', 'slimz-4', 'skud-4', 'richter-3', 'quillen-3', 'azzenka-4', 'arduin-3', 'airi-8']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "avatar")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        avatar: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'beautifulgalaxylol': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|khazix-2\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|khazix-2\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['ashe-2', 'darius-2', 'hecarim-2', 'akali-2', 'jhin-2', 'jinx-2', 'kaisa-2', 'khazix-2', 'nordekaiser-2', 'pantheon-2', 'qiyana', 'rammus-2', 'renekton-2', 'tahmkench-2', 'teemo-2', 'udyr-2', 'yasuo-2', 'yuumi', 'drmundo', 'zyra', 'zoe', 'zilean', 'ziggs', 'zed', 'zac', 'yorick', 'yasuo', 'xinzhao', 'xerath', 'xayah', 'wukong', 'warwick', 'volibear', 'vladimir', 'viktor', 'vi', 'velkoz', 'veigar', 'vayne', 'varus', 'urgot', 'udyr', 'twitch', 'twistedfate', 'tryndamere', 'trundle', 'tristana', 'thresh', 'teemo', 'taric', 'talyah', 'talon', 'tahmkench', 'syndra', 'swain', 'soraka', 'sona', 'skarner', 'sivir', 'sion', 'singed', 'shyvana', 'shen', 'shaco', 'sejuani', 'ryze', 'rumble', 'riven', 'rengar', 'renekton', 'reksai', 'rammus', 'rakan', 'quinn', 'poppy', 'pantheon', 'ornn', 'orianna', 'olaf', 'nunu', 'nocturne', 'nidalee', 'nautilus', 'nasus', 'nami', 'norgana', 'norderkaiser', 'nissfortune', 'nasteryi', 'nalzahar', 'nalphite', 'lux', 'lulu', 'lucian', 'lissandra', 'leona', 'leesin', 'leblanc', 'kogmaw', 'kled', 'kindred', 'khazix', 'kennen', 'kayn', 'kayle', 'katarina', 'kassadin', 'karthus', 'karma', 'kalista', 'kaisa', 'jinx', 'jhin', 'jayce', 'jax', 'jarvaniv', 'janna', 'ivern', 'irelia', 'illaoi', 'heimerdinger', 'hecarim', 'graves', 'gragas', 'gnar', 'garen', 'gangplank', 'galio', 'fizz', 'fiora', 'fiddlesticks', 'ezreal', 'evelynn', 'elise', 'ekko', 'draven', 'diana', 'darius', 'corki', 'chogath', 'cassiopeia', 'camille', 'caitlyn', 'braum', 'brand', 'blitzcrank', 'bard', 'azir', 'aurelionsol', 'ashe', 'annie', 'anivia', 'amumu', 'alistar', 'akali', 'ahri', 'aatrox', 'sylas', 'pyke', 'nunuwillump', 'neeko', 'norgana-2', 'kayle-2', 'akali-2', 'aatrox-2']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "style")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        style: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'crossfirecover': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|natahari\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|natahari\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['spop', 'swat', 'switcher', 'redpower', 'whitenurse', 'blthefates', 'jns', 'natahari', 'dx', 'nursezombie', 'omohswat', 'sfg', 'fox', 'bllaswat', 'bljtf', 'grjtf', 'blarch', 'hero-4', 'gsg9', 'hero-3', 'opes', 'abf', 'shadows', 'devilhunter']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "character")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        character: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'lolwallpaper': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|wallpaper\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|fizz\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|wallpaper\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|fizz\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['aatrox-2', 'arhi-2', 'akali-3', 'akali-2', 'braum', 'camille', 'evelynn-5', 'ezreal-2', 'fizz', 'graves-2', 'irelia-3', 'irelia-2', 'jayce-2', 'jhin-2', 'jinx-2', 'kaisa', 'katarina-2', 'lux-2', 'neeko', 'orianna-2', 'pantheon', 'pyke', 'qiyana', 'riven-2', 'sylas', 'teemo-2', 'viktor', 'vladimir', 'warwick-2', 'yasuo-3', 'yasuo-2', 'zoe', 'nasteryi', 'lux', 'lulu', 'leesin', 'jinx', 'jhin', 'ezreal', 'janna', 'ashe', 'arhi', 'poppy', 'nissfortune', 'soraka', 'syndra', 'zyra', 'yasuo', 'vi', 'vayne', 'taliyah', 'sona', 'sivir', 'shyvana', 'riven', 'quinn', 'nidalee', 'norgana', 'leblanc', 'kennen', 'karma', 'irelia', 'fiora', 'elise', 'diana', 'caitlyn', 'zed', 'xayah', 'tristana', 'talon', 'shen', 'rakan', 'orianna', 'nami', 'kayn', 'kayle', 'katarina', 'kalista', 'ekko', 'azir', 'udyr', 'thresh', 'tf', 'teemo', 'ryze', 'nocturne', 'lucian', 'khazik', 'graves', 'darius', 'annie', 'akali', 'zilean', 'ziggs', 'yorick', 'warwick', 'nasteryi-2', 'janna-2', 'hecarim', 'gangplank', 'fiora-2', 'draven', 'brand', 'aatrox', 'velkoz', 'shaco', 'rengar', 'reksai', 'ornn', 'leona', 'kindred', 'jayce', 'jax', 'jarvan-iv', 'garen', 'xinzhao', 'nasus', 'kled', 'evelynn-4', 'evelynn-3', 'evelynn-2', 'evelynn', 'cassiopeia', 'zac', 'xerath', 'wukong', 'velkoz-2', 'veigar', 'varus', 'urgot', 'twich', 'kassadin', 'elise-2', 'annie-2', 'alistar']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "wallpaper")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        wallpaper: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'coverdota2': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|heroes\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|luna\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|heroes\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|luna\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['void', 'riki', 'lycan', 'ursa', 'zeus', 'dragonkinght', 'warlord', 'phantomassassin', 'bountyhunter', 'antimage', 'spectre', 'luna', 'vengerfulspirit', 'undying', 'tusk', 'tinker', 'shadowfiend', 'sandking', 'nightstalker', 'nagasiren', 'nirana', 'neepo', 'lina', 'juggernaut', 'huskar', 'emberspirit', 'emberspirit', 'emberspirit', 'earthshaker', 'drowranger', 'clockwerk', 'bristleback', 'bloodseeker', 'axe']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "heroes")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        heroes: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'coverleagueofking': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|nina\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|nina\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['thane', 'orrmarr', 'omega', 'nakroth', 'nina', 'ngangar', 'gildur', 'dieuthuyen', 'chaugnar', 'butterfly', 'azzenka', 'alice', 'lubo', 'kriknak-2', 'natalya-2', 'trieu-van', 'taara-2', 'naloch', 'kriknak', 'natalya', 'taara', 'ngo-khong', 'airi', 'butterfly-2', 'butterfly-3', 'kahlii', 'krixi', 'toro', 'grakk', 'ilumia', 'zephys', 'veera-2', 'violet', 'preyta-2', 'violet-2', 'valhein', 'yorn', 'veera', 'notos', 'valhein-2', 'preyta', 'illumia-2', 'fennik-2', 'lumburr', 'fennik', 'nakroth-2', 'krixi-2', 'gildur2']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "character")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        character: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'avatar3q360': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|avatar\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|truong_phi\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|avatar\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|truong_phi\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['tieu_kieu', 'luu_bi', 'truong_oanh_oanh', 'truong_phi', 'tu_ma_y', 'van_uong', 'hoang_nguyet_anh', 'hoang_nguyet_anh2', 'hoang_trung', 'hua_chu', 'truong_giac', 'dieu_thuyen']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "avatar")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        avatar: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'coverofwarface': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|warface\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|warface\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['warface-4', 'warface-3', 'warface-2', 'warface', 'sniper-3', 'sniper-2', 'sniper', 'rifleman', 'nedic-2', 'nedic', 'exosuit', 'engineer']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "character")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        character: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'newlolavatar': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|avatar\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|shyvana\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|avatar\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|shyvana\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['udyr', 'twitch', 'twistedfate', 'trundle', 'teemo', 'swain', 'shyvana', 'shen', 'sejuani', 'renekton', 'reksai', 'rammus', 'zyra', 'zilean', 'ziggs', 'zac', 'xerath', 'warwick', 'vladimir', 'viktor', 'vi', 'velkoz', 'veigar', 'vayne', 'volibear', 'tristana', 'taliyah', 'shaco', 'leblanc', 'jinx', 'graves', 'fizz', 'ekko', 'corki', 'cassiopeia', 'caitlyn', 'blitzcrank', 'bard', 'alistar', 'akali', 'aatrox', 'janna', 'wukong', 'thresh', 'taric', 'talon', 'ryze', 'nordekaiser', 'karma', 'kalista', 'irelia', 'gnar', 'garen', 'galio', 'soraka', 'sona', 'sivir', 'riven', 'quinn', 'nocturne', 'nami', 'lux', 'kindred', 'khazix', 'katarina', 'jarvan', 'fiora', 'diana', 'aurelionsol', 'ashe', 'ahri', 'varus', 'syndra', 'nidalee', 'kennen', 'jhin', 'zed', 'yasuo', 'rengar', 'lucian', 'ezreal', 'azir', 'annie', 'leesin', 'nasteryi', 'poppy', 'pantheon', 'orianna', 'nasus', 'norgana', 'nissfortune', 'naokai', 'nalzaha', 'lulu', 'lissandra', 'leona', 'kled', 'jayce', 'jax', 'illaoi', 'xayah', 'rakan', 'gangplank', 'naster_yi2', 'riven2', 'elise', 'darius', 'xayah_rakan', 'katarina2', 'nauthilus', 'hecarim', 'thresh2', 'ashe2', 'xinzhao', 'tryndamere', 'syndra-2', 'sivir-2', 'lissandra2', 'karma-2', 'draven']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "avatar")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        avatar: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'csgocover': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|negev\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|negev\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['ump45', 'tec9', 'n4a1', 'xm1014', 'famas', 'np9', 'pp-bizon', 'p2000', 'negev', 'usps', 'dualberettas', 'np5', 'karambit', 'awpdragonlore', 'np7', 'galilar', 'ak-47', 'glock', 'sg-553', 'ak47', 'r8revolver', 'aug', 'butterflyknife', 'deserteagle', 'gsg9', 'p90asiimov', 'awphawking', 'n4a4', 'sas', 'awpasiimov', 'ssg08bitw', 'sg553ds', 'r8fade', 'p90ed', 'n4a1sdecimator', 'n4a1howl', 'karambitds', 'flipknifemf', 'awmmedusa', 'augaa', 'ak47vulcan', 'ak47fs']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "background")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        background: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'coverloknew': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|hero\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|ilumia-5\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|hero\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|ilumia-5\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['arum-6', 'baldum-3', 'elandorr-3', 'hayate-5', 'ilumia-5', 'ishar-4', 'lauriel-8', 'nax-5', 'nurad-9', 'quillen-5', 'teemee-3', 'telannas-6', 'volkath-3', 'yena-4', 'yena-5', 'butterfly-10', 'laville', 'laville-2', 'nakroth-7', 'omen-6', 'rouie-2', 'taara-4', 'zanis-8', 'zata', 'zata-2', 'capheny-4', 'lsu-6', 'fennik-5', 'liliana-7', 'paine', 'paine-2', 'rouie', 'astrid-4', 'ata', 'ata-2', 'lauriel-8', 'omen-5', 'qi-3', 'roxie-5', 'taara-5', 'violet-12', 'wukong-7', 'wukong-8', 'hayate-4', 'ishar-4', 'jinna-5', 'kerra-2', 'lauriel-7', 'nina-5', 'quillen-5', 'richter-4', 'ryoma-6', 'telannas-8', 'tulen-9', 'yorn-8', 'aleister-4', 'dirak', 'dirak-2', 'grakk-5', 'kerra', 'raz-4', 'amily-5', 'athur-7', 'arum-5', 'ishar-2', 'nax-4', 'natalya-7', 'valhein-7', 'zill-5', 'diaochan-6', 'ignis-4', 'lubu-8', 'naloch-7', 'sephera-4', 'elandorr', 'elandorr-2', 'krizzix', 'krizzix-2', 'violet-11', 'yena-3', 'arduin-4', 'enzo-3', 'errol-3', 'hayate-3', 'krixi-7', 'nurad-7', 'volkath', 'volkath', 'volkath-2', 'wisp-4', 'wukong-6', 'celica', 'gildur-4', 'ishar', 'nurad-7', 'quillen-4', 'tulen-8', 'lauriel-6', 'qi', 'qi-2', 'darcy', 'florentino-3', 'noren-3', 'ryoma-5', 'sephera-3', 'annettte-4', 'capheny-3', 'elsu-5', 'narja-3', 'vilolet-10', 'violet-10', 'zip-2', 'zip-2a', 'airi-9', 'diaochan-5', 'enzo-2', 'lubu-7', 'nganga-4', 'payna-3', 'roxie-4', 'violet-9', 'zanis-7', 'zephys-6', 'enzo', 'liliana-6', 'lindis-5', 'xeniel-5', 'airi-9', 'errol-2', 'yena', 'yena-2', 'zuka-8', 'yorn', 'violet', 'zanis', 'thane', 'slimz', 'skud', 'preyta', 'payna', 'nakroth', 'nina', 'naloch', 'illumia', 'krixi', 'diaochan', 'butterfly', 'veera', 'valhein', 'toro', 'taara', 'raz', 'ormarr', 'nganga', 'lubu', 'kriknak', 'kahlil', 'grakk', 'gildur', 'alice', 'omega', 'wukong', 'natalya', 'nortos', 'cresht', 'airi', 'aleister', 'lumburr', 'zephis', 'violet-2', 'jinna', 'chaugnar', 'azzenka', 'valhein-2', 'zanis-2', 'skud-2', 'payna-2', 'natalya-3', 'natalya-2', 'nortos-2', 'krixi-2', 'jinna-2', 'illumia-2', 'butterfly-3', 'butterfly-2', 'yorn-2', 'taara-2', 'nakroth-2', 'lubu2', 'lauriel', 'kahlii-2', 'zuka-2', 'zuka', 'batman', 'airi-2', 'airi-3', 'butterfly-4', 'diaochan-2', 'grakk-2', 'ignis', 'ignis-2', 'lauriel2', 'nina-2', 'nurad', 'nurad-2', 'ormarr-2', 'raz-2', 'slimz2', 'violet-3', 'zill-2', 'zill', 'zanis-3', 'yorn-3', 'veera-3', 'veera-2', 'thane-2', 'telannas', 'superman', 'naloch-2', 'krixi-3', 'butterfly-5', 'violet-5', 'veera-4', 'telannas-2', 'joker', 'illumia-3', 'batman-2', 'arduin-2', 'arduin', 'zephis-2', 'wukong-2', 'ryoma-2', 'ryoma', 'nakroth-3', 'nganga-2', 'azzenka-2', 'astrid-2', 'astrid', 'arthur', 'zanis-4', 'wukong-3', 'noren', 'lubu-4', 'lauriel-3', 'lubu-3', 'chaugnar-2', 'aleister-2', 'xeniel', 'telannas-3', 'preyta-2', 'nurad-3', 'kriknak-2', 'fennik-2', 'diaochanlubu', 'alice-2', 'noren-2', 'lubu-5', 'lauriel-4', 'kilgroth', 'gildur-2', 'fennik-3', 'zephys-3', 'xeniel-2', 'xeniel-2', 'wonderwoman', 'supeman-2', 'slimz-3', 'natalya-4', 'krixi-5', 'krixi-4', 'zanis-5', 'yorn-4', 'wonderwoman-2', 'violet-4', 'prayta-3', 'naloch-3', 'airi-4', 'telannas-4', 'ormarr-4', 'ormarr-3', 'nakroth-4', 'kilgroth-2', 'kahlii-3', 'grakk-3', 'airi-5', 'natalya-5', 'fennik-4', 'valhein-4', 'teemee-2', 'teemee', 'lindis', 'zuka-3', 'tulen', 'toro-2', 'nina-3', 'naloch-4', 'lumburr-2', 'lindis-2', 'joker-2', 'grakk-4', 'gildur-3', 'aleister-3', 'tulen-2', 'toro-3', 'taara-3', 'omen-2', 'omen', 'zill-3', 'telannas-5', 'athur-2', 'zuka-4', 'nakroth-5', 'nax', 'liliana', 'raz-3', 'liliana-2', 'nax-2', 'kriknak-3', 'joker-3', 'chaugnar-3', 'wisp', 'ryoma-3', 'batman-3', 'airi-6', 'tulen-3', 'flash', 'cresht-3', 'cresht-2', 'astris-3', 'arum-2', 'arum', 'butterfly-6', 'lice-3', 'xeniel-3', 'valhein-4', 'tulen-4', 'rourke-2', 'rourke', 'nurad-4', 'nax-3', 'wisp-2', 'narja-2', 'narja', 'zuka-5', 'jinna-3', 'butterfly-7', 'arthur-2', 'violet-6', 'valhein-5', 'superman-3', 'liliana-3', 'kilgroth-3', 'diaochan-3', 'wirosabaleng-3', 'roxie-2', 'roxie', 'wukong-4', 'baldum-2', 'baldum', 'zephys-4', 'annette-2', 'annette', 'telannas-6', 'raz-4', 'nurad-6', 'nurad-5', 'jinna-4', 'amily', 'ybneth-2', 'ybneth', 'ilumia-4', 'amily-2', 'xeniel-4', 'veera-5', 'liliana-4', 'flash-2', 'arthur-3', 'omen-3', 'lindis-3', 'elsu-2', 'elsu', 'richter-2', 'richter', 'nina-4', 'thane-3', 'ryoma-4', 'quillen-2', 'quillen', 'lauriel-5', 'arum-3', 'wisp-3', 'violet-7', 'sephera-2', 'sephera', 'naloch-5', 'krixi-6', 'alice-4', 'tulen-5', 'skud-3', 'rourke-3', 'nakroth-6', 'florentino-2', 'florentino', 'elsu-3', 'butterfly-8', 'amily-3', 'zuka-7', 'zuka-6', 'yorn-6', 'yorn-5', 'veres-2', 'veres', 'naloch-6', 'cresht-4', 'azzenka-3', 'airi-7', 'zephys-5', 'yorn-7', 'violet-8', 'valhein-6', 'tulen-6', 'thane-4', 'roxie-3', 'nakroth-7', 'kahlii-4', 'elsu-4', 'darcy-2', 'darcy', 'capheny', 'zill-4', 'hayate-2', 'hayate', 'cresht-5', 'annette-3', 'amily-4', 'veera-6', 'tulen-7', 'telannas-7', 'omen-4', 'lindis-4', 'liliana-5', 'ignis-3', 'errol', 'capheny-2', 'arum-4', 'zanis-6', 'wukong-5', 'thane-5', 'slimz-4', 'skud-4', 'richter-3', 'quillen-3', 'azzenka-4', 'arduin-3', 'airi-8']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "hero")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        hero: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'coverfblol': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|letters\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|nami\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|letters\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|nami\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['yasuo', 'shen', 'riven', 'pantheon', 'orianna', 'nocturne', 'nami', 'norgana', 'naster-yi', 'lux', 'lucian', 'katarina', 'kalista', 'jinx', 'jhin', 'irelia', 'hecarim', 'graves', 'garen', 'fizz', 'fiora', 'ezreal', 'ekko', 'diana', 'darius', 'cassiopeia', 'caitlyn', 'braum', 'azir', 'ashe', 'warwick', 'thresh', 'leblanc', 'khazix', 'kayn', 'draven', 'zyra', 'zed', 'xayah', 'taric', 'talon', 'sona', 'sivir', 'rengar', 'rakan', 'leesin', 'gnar', 'elise']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "letters")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        letters: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'overwatchcover': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|hero\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|zsymmetra\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|hero\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|zsymmetra\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['zwinston', 'zjunkrat', 'zwidowmaker', 'ztracer', 'ztorbjorn', 'zsymmetra', 'zsombra', 'zsoldier76', 'zroadhog', 'zreinhardt', 'zreaper', 'zpharah', 'zorisa', 'zmercy', 'zmei', 'zmccree', 'zlucio', 'zhanzo', 'zgenji', 'zenyatta', 'zdva', 'zbastion', 'zarya', 'zana', 'yzenyatta', 'yzarya', 'ywinston', 'ywidowmaker', 'ytracer', 'ytorbjorn', 'ysymmetra', 'ysombra', 'ysoldier76', 'yroadhog', 'yreinhardt', 'yreaper', 'ypharah', 'yorisa', 'ymercy', 'ymei', 'ymccree', 'ylucio', 'yjunkrat', 'yhanzo', 'ygenji', 'ydva', 'ybastion', 'yana', 'xzenyatta', 'xzarya', 'xwinston', 'xwidowmaker', 'xtracer', 'xtorbjorn', 'xsymmetra', 'xsombra', 'xsoldier76', 'xroadhog', 'xreinhardt', 'xreaper', 'xpharah', 'xorisa', 'xmercy', 'xmei', 'xmccree', 'xlucio', 'xjunkrat', 'xhanzo', 'xgenji', 'xdva', 'xbastion', 'xana', 'wzenyatta', 'wzarya', 'wtracer', 'wtorbjorn', 'wsymmetra', 'wsombra', 'wsoldier76', 'wroadhog', 'wreinhardt', 'wreaper', 'wpharah', 'worisa', 'wmercy', 'wmei', 'wmccree', 'wlucio', 'wjunkrat', 'winston', 'widowmaker', 'whanzo', 'wgenji', 'wdva', 'wbastion', 'wana', 'vzenyatta', 'vzarya', 'vwinston', 'vwidowmaker', 'vtracer', 'vtorbjorn', 'vsymmetra', 'vsombra', 'vsoldier76', 'vroadhog', 'vreinhardt', 'vreaper', 'vpharah', 'vorisa', 'vmercy', 'vmei', 'vmccree', 'vlucio', 'vjunkrat', 'vhanzo', 'vgenji', 'vdva', 'vbastion', 'vana', 'uzenyatta', 'uzarya', 'uwinston', 'uwidowmaker', 'utracer', 'utorbjorn', 'usymmetra', 'usombra', 'usoldier76', 'uroadhog', 'ureinhardt', 'ureaper', 'upharah', 'uorisa', 'umercy', 'umei', 'umccree', 'ulucio', 'ujunkrat', 'uhanzo', 'ugenji', 'udva', 'ubastion', 'uana', 'tzenyatta', 'tzarya', 'twinston', 'twidowmaker', 'tsymmetra', 'tsombra', 'tsoldier76', 'troadhog', 'treinhardt', 'treaper', 'tracer', 'tpharah', 'torisa', 'torbjorn', 'tmercy', 'tmei', 'tmccree', 'tlucio', 'tjunkrat', 'thanzo', 'tgenji', 'tdva', 'tbastion', 'tana', 'szenyatta', 'szarya', 'symmetra', 'swinston', 'swidowmaker', 'stracer', 'storbjorn', 'sroadhog', 'sreinhardt', 'sreaper', 'spharah', 'sorisa', 'sombra', 'soldier76', 'smercy', 'smei', 'smccree', 'slucio', 'sjunkrat', 'shanzo', 'sgenji', 'sdva', 'sbastion', 'sana', 'rzenyatta', 'rzarya', 'rwinston', 'rwidowmaker', 'rtracer', 'rtorbjorn', 'rsymmetra', 'rsombra', 'rsoldier76', 'rrmei', 'rpharah', 'rorisa', 'roadhog', 'rmercy', 'rmccree', 'rlucio', 'rjunkrat', 'rhanzo', 'rgenji', 'reinhardt', 'reaper', 'rdva', 'rbastion', 'rana', 'qzenyatta', 'qzarya', 'qwinston', 'qwidowmaker', 'qtracer', 'qtorbjorn', 'qsymmetra', 'qsombra', 'qsoldier76', 'qroadhog', 'qreinhardt', 'qreaper', 'qpharah', 'qorisa', 'qmercy', 'qmei', 'qmccree', 'qlucio', 'qjunkrat', 'qhanzo', 'qgenji', 'qdva', 'qbastion', 'qana', 'pzenyatta', 'pzarya', 'pwinston', 'pwidowmaker', 'ptracer', 'ptorbjorn', 'psymmetra', 'psombra', 'psoldier76', 'proadhog', 'preinhardt', 'preaper', 'porisa', 'pmercy', 'pmei', 'pmccree', 'plucio', 'pjunkrat', 'pharah', 'phanzo', 'pgenji', 'pdva', 'pbastion', 'pana', 'ozenyatta', 'ozarya', 'owinston', 'owidowmaker', 'otracer', 'otorbjorn', 'osymmetra', 'osombra', 'osoldier76', 'oroadhog', 'orisa', 'oreinhardt', 'oreaper', 'opharah', 'omercy', 'omei', 'omccree', 'olucio', 'ojunkrat', 'ohanzo', 'ogenji', 'odva', 'obastion', 'oana', 'nzenyatta', 'nzarya', 'nwinston', 'nwidowmaker', 'ntracer', 'ntorbjorn', 'nsymmetra', 'nsombra', 'nsoldier76', 'nroadhog', 'nreinhardt', 'nreaper', 'npharah', 'norisa', 'nmercy', 'nmei', 'nmccree', 'nlucio', 'njunkrat', 'nhanzo', 'ngenji', 'ndva', 'nbastion', 'nana', 'mzenyatta', 'mzarya', 'mwinston', 'mwidowmaker', 'mtracer', 'mtorbjorn', 'msymmetra', 'msombra', 'msoldier76', 'mroadhog', 'mreinhardt', 'mreaper', 'mpharah', 'morisa', 'mlucio', 'mjunkrat', 'mhanzo', 'mgenji', 'mercy', 'mei', 'mdva', 'mccree', 'mbastion', 'mana', 'lzenyatta', 'lzarya', 'lwinston', 'lwidowmaker', 'lucio', 'ltracer', 'ltorbjorn', 'lsymmetra', 'lsombra', 'lsoldier76', 'lroadhog', 'lreinhardt', 'lreaper', 'lpharah', 'lorisa', 'lmercy', 'lmei', 'lmccree', 'ljunkrat', 'lhanzo', 'lgenji', 'ldva', 'lbastion', 'lana', 'kzenyatta', 'kzarya', 'kwinston', 'kwidowmaker', 'ktracer', 'ktorbjorn', 'ksymmetra', 'ksombra', 'ksoldier76', 'kroadhog', 'kreinhardt', 'kreaper', 'kpharah', 'korisa', 'kmercy', 'kmei', 'kmccree', 'klucio', 'kjunkrat', 'khanzo', 'kgenji', 'kdva', 'kbastion', 'kana', 'jzenyatta', 'jzarya', 'jwinston', 'jwidowmaker', 'junkrat', 'jtracer', 'jtorbjorn', 'jsymmetra', 'jsombra', 'jsoldier76', 'jroadhog', 'jreinhardt', 'jreaper', 'jpharah', 'jorisa', 'jmercy', 'jmei', 'jmccree', 'jlucio', 'jhanzo', 'jgenji', 'jdva', 'jbastion', 'jana', 'izenyatta', 'izarya', 'iwinston', 'iwidowmaker', 'itracer', 'itorbjorn', 'isymmetra', 'isombra', 'isoldier76', 'iroadhog', 'ireinhardt', 'ireaper', 'ipharah', 'iorisa', 'imercy', 'imei', 'imccree', 'ilucio', 'ijunkrat', 'ihanzo', 'igenji', 'idva', 'ibastion', 'iana', 'hzenyatta', 'hzarya', 'hwinston', 'hwidowmaker', 'htracer', 'htorbjorn', 'hsymmetra', 'hsombra', 'hsoldier76', 'hroadhog', 'hreinhardt', 'hreaper', 'hpharah', 'horisa', 'hmercy', 'hmei', 'hmccree', 'hlucio', 'hjunkrat', 'hgenji', 'hdva', 'hbastion', 'hanzo', 'hana', 'gzenyatta', 'gzarya', 'gwinston', 'gwidowmaker', 'gtracer', 'gtorbjorn', 'gsymmetra', 'gsombra', 'gsoldier76', 'groadhog', 'greinhardt', 'greaper', 'gpharah', 'gorisa', 'gmercy', 'gmei', 'gmccree', 'glucio', 'gjunkrat', 'genji', 'gdva', 'gbastion', 'ganafzenyatta', 'fzarya', 'fwinston', 'fwidowmaker', 'ftracer', 'ftorbjorn', 'fsymmetra', 'fsombra', 'fsoldier76', 'froadhog', 'freinhardt', 'freaper', 'fpharah', 'forisa', 'fmercy', 'fmei', 'fmccree', 'flucio', 'fjunkrat', 'fhanzo', 'fgenji', 'fdva', 'fbastion', 'fana', 'ezenyatta', 'ezarya', 'ewinston', 'ewidowmaker', 'etracer', 'etorbjorn', 'esymmetra', 'esombra', 'esoldier76', 'eroadhog', 'ereinhardt', 'ereaper', 'epharah', 'eorisa', 'emercy', 'emei', 'emccree', 'elucio', 'ejunkrat', 'ehanzo', 'egenji', 'edva', 'ebastion', 'eana', 'dzenyatta', 'dzarya', 'dwinston', 'dwidowmaker', 'dva', 'dtracer', 'dtorbjorn', 'dsymmetra', 'dsombra', 'dsoldier76', 'droadhog', 'dreinhardt', 'dreaper', 'dpharah', 'dorisa', 'dmercy', 'dmei', 'dmccree', 'dlucio', 'djunkrat', 'dhanzo', 'dgenji', 'dbastion', 'dana', 'czenyatta', 'czarya', 'cwinston', 'cwidowmaker', 'ctracer', 'ctorbjorn', 'csymmetra', 'csombra', 'csoldier76', 'croadhog', 'creinhardt', 'creaper', 'cpharah', 'corisa', 'cmercy', 'cmei', 'cmccree', 'clucio', 'cjunkrat', 'chanzo', 'cgenji', 'cdva', 'cbastion', 'cana', 'bzenyatta', 'bzarya', 'bwinston', 'bwidowmaker', 'btracer', 'btorbjorn', 'bsymmetra', 'bsombra', 'bsoldier76', 'broadhog', 'breinhardt', 'breaper', 'bpharah', 'borisa', 'bmercy', 'bmei', 'bmccree', 'blucio', 'bjunkrat', 'bhanzo', 'bgenji', 'bdva', 'bastion', 'bana', 'azenyatta', 'azarya', 'awinston', 'awidowmaker', 'atracer', 'atorbjorn', 'asymmetra', 'asombra', 'asoldier76', 'aroadhog', 'areinhardt', 'areaper', 'apharah', 'aorisa', 'ana', 'amercy', 'amei', 'amccree', 'alucio', 'ajunkrat', 'ahanzo', 'agenji', 'adva', 'abastion', 'zdoomfist', 'ydoomfist', 'xdoomfist', 'wdoomfist', 'vdoomfist', 'udoomfist', 'tdoomfist', 'sdoomfist', 'rdoomfist', 'qdoomfist', 'pdoomfist', 'odoomfist', 'ndoomfist', 'mdoomfist', 'ldoomfist', 'kdoomfist', 'jdoomfist', 'idoomfist', 'hdoomfist', 'gdoomfist', 'fdoomfist', 'edoomfist', 'doomfist', 'cdoomfist', 'bdoomfist', 'adoomfist']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "hero")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        hero: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'crossfirestyle': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|avatar\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|thefates\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|avatar\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|thefates\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['spop', 'switcher', 'switcher-2', 'switcher-3 ', 'thefates', 'thefates-2', 'thefates-3', 'swat', 'fox', 'star', 'omoh', 'sabel', 'sas', 'sia', 'navy-seals', 'jtf', 'jns', 'laswat', 'sraf', 'shadow', 'nemesis', 'nocha', 'ixions', 'gsg-9', 'ghosty', 'hermes', 'foxu', 'dh', 'angelapt', 'ac']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "avatar")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        avatar: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'avatarlolbyname': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|zyra-4\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|zyra-4\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['katarina-0', 'zyra-4', 'zyra-3', 'zyra-2', 'zyra-1', 'zyra-0', 'zilean-5', 'zilean-4', 'zilean-3', 'zilean-2', 'zilean-1', 'zilean-0', 'ziggs-5', 'ziggs-4', 'ziggs-3', 'ziggs-2', 'ziggs-1', 'ziggs-0', 'zed-3', 'zed-2', 'zed-10', 'zed-1', 'zed-0', 'zac-2', 'zac-1', 'zac-0', 'yorick-2', 'yorick-1', 'yorick-0', 'yasuo-4', 'yasuo-3', 'yasuo-2', 'yasuo-1', 'yasuo-0', 'xinzhao-6', 'xinzhao-13', 'xinzhao-5', 'xinzhao-4', 'xinzhao-3', 'xinzhao-2', 'xinzhao-1', 'xinzhao-0', 'xerath-4', 'xerath-3', 'xerath-2', 'xerath-1', 'xerath-0', 'xayah-1', 'xayah-0', 'warwick-8', 'warwick-7', 'warwick-6', 'warwick-5', 'warwick-4', 'warwick-3', 'warwick-2', 'warwick-1', 'warwick-0', 'volibear-5', 'volibear-4', 'volibear-3', 'volibear-2', 'volibear-1', 'volibear-0', 'vladimir-7', 'vladimir-6', 'vladimir-5', 'vladimir-4', 'vladimir-3', 'vladimir-2', 'vladimir-1', 'vladimir-0', 'viktor-2', 'viktor-1', 'viktor-0', 'vi-5', 'vi-4', 'vi-3', 'vi-2', 'vi-1', 'vi-0', 'velkoz-3', 'velkoz-2', 'velkoz-1', 'velkoz-0', 'veigar-8', 'veigar-7', 'veigar-6', 'veigar-5', 'veigar-4', 'veigar-3', 'veigar-2', 'veigar-1', 'veigar-0', 'vayne-6', 'vayne-5', 'vayne-4', 'vayne-3', 'vayne-2', 'vayne-1', 'vayne-0', 'vayne-10', 'varus-6', 'varus-5', 'varus-4', 'varus-3', 'varus-2', 'varus-1', 'varus-0', 'urgot-3', 'urgot-2', 'urgot-1', 'urgot-0', 'udyr-4', 'udyr-3', 'udyr-2', 'udyr-1', 'udyr-0', 'twitch-7', 'twitch-6', 'twitch-5', 'twitch-4', 'twitch-3', 'twitch-2', 'twitch-1', 'twitch-0', 'twistedfate-9', 'twistedfate-10', 'twistedfate-8', 'twistedfate-7', 'twistedfate-6', 'twistedfate-5', 'twistedfate-4', 'twistedfate-3', 'twistedfate-2', 'twistedfate-1', 'twistedfate-0', 'tryndamere-9', 'tryndamere-8', 'tryndamere-7', 'tryndamere-6', 'tryndamere-5', 'tryndamere-4', 'tryndamere-3', 'tryndamere-2', 'tryndamere-1', 'tryndamere-0', 'trundle-5', 'trundle-4', 'trundle-3', 'trundle-2', 'trundle-1', 'trundle-0', 'tristana-6', 'tristana-5', 'tristana-4', 'tristana-3', 'tristana-2', 'tristana-1', 'tristana-0', 'tristana-10', 'tristana-11', 'thresh-5', 'thresh-4', 'thresh-3', 'thresh-2', 'thresh-1', 'thresh-0', 'teemo-8', 'teemo-7', 'teemo-6', 'teemo-5', 'teemo-4', 'teemo-3', 'teemo-2', 'teemo-1', 'teemo-0', 'teemo-14', 'taric-4', 'taric-3', 'taric-2', 'taric-1', 'taric-0', 'talon-5', 'talon-4', 'talon-3', 'talon-2', 'talon-1', 'talon-0', 'taliyah-1', 'taliyah-0', 'tahmkench-2', 'tahmkench-1', 'tahmkench-0', 'syndra-4', 'syndra-3', 'syndra-2', 'syndra-1', 'syndra-0', 'swain-3', 'swain-2', 'swain-1', 'swain-0', 'soraka-6', 'soraka-5', 'soraka-4', 'soraka-3', 'soraka-2', 'soraka-1', 'soraka-0', 'sona-6', 'sona-5', 'sona-4', 'sona-3', 'sona-2', 'sona-1', 'sona-0', 'skarner-4', 'skarner-3', 'skarner-2', 'skarner-1', 'skarner-0', 'sivir-7', 'sivir-6', 'sivir-5', 'sivir-4', 'sivir-3', 'sivir-2', 'sivir-1', 'sivir-0', 'sion-5', 'sion-4', 'sion-3', 'sion-2', 'sion-1', 'sion-0', 'singed-8', 'singed-7', 'singed-6', 'singed-5', 'singed-4', 'singed-3', 'singed-2', 'singed-1', 'singed-0', 'shyvana-6', 'shyvana-5', 'shyvana-4', 'shyvana-3', 'shyvana-3', 'shyvana-2', 'shyvana-1', 'shyvana-0', 'shen-6', 'shen-5', 'shen-4', 'shen-3', 'shen-2', 'shen-1', 'shen-0', 'shaco-7', 'shaco-6', 'shaco-5', 'shaco-4', 'shaco-3', 'shaco-2', 'shaco-1', 'shaco-0', 'sejuani-7', 'sejuani-6', 'sejuani-5', 'sejuani-4', 'sejuani-3', 'sejuani-2', 'sejuani-1', 'sejuani-0', 'ryze-10', 'ryze-9', 'ryze-8', 'ryze-7', 'ryze-6', 'ryze-5', 'ryze-4', 'ryze-3', 'ryze-2', 'ryze-1', 'ryze-0', 'rumble-3', 'rumble-2', 'rumble-1', 'rumble-0', 'riven-8', 'riven-7', 'riven-6', 'riven-5', 'riven-4', 'riven-3', 'riven-2', 'riven-1', 'riven-0', 'rengar-3', 'rengar-2', 'rengar-1', 'rengar-0', 'renekton-9', 'renekton-8', 'renekton-7', 'renekton-6', 'renekton-5', 'renekton-4', 'renekton-3', 'renekton-2', 'renekton-1', 'renekton-0', 'reksai-1', 'reksai-2', 'reksai-0', 'rammus-7', 'rammus-6', 'rammus-5', 'rammus-4', 'rammus-3', 'rammus-2', 'rammus-1', 'rammus-0', 'rakan-1', 'rakan-0', 'quinn-4', 'quinn-3', 'quinn-2', 'quinn-1', 'quinn-0', 'poppy-7', 'poppy-6', 'poppy-5', 'poppy-4', 'poppy-3', 'poppy-2', 'poppy-1', 'poppy-0', 'pantheon-8', 'pantheon-7', 'pantheon-6', 'pantheon-5', 'pantheon-4', 'pantheon-3', 'pantheon-2', 'pantheon-1', 'pantheon-0', 'orianna-7', 'orianna-6', 'orianna-5', 'orianna-4', 'orianna-3', 'orianna-2', 'orianna-1', 'orianna-0', 'olaf-6', 'olaf-5', 'olaf-4', 'olaf-3', 'olaf-2', 'olaf-1', 'olaf-0', 'nunu-7', 'nunu-6', 'nunu-5', 'nunu-4', 'nunu-3', 'nunu-2', 'nunu-1', 'nunu-0', 'nocturne-6', 'nocturne-5', 'nocturne-4', 'nocturne-3', 'nocturne-2', 'nocturne-1', 'nocturne-0', 'nidalee-8', 'nidalee-7', 'nidalee-6', 'nidalee-5', 'nidalee-4', 'nidalee-3', 'nidalee-2', 'nidalee-1', 'nidalee-0', 'nautilus-5', 'nautilus-4', 'nautilus-3', 'nautilus-2', 'nautilus-1', 'nautilus-0', 'nasus-6', 'nasus-5', 'nasus-4', 'nasus-3', 'nasus-2', 'nasus-1', 'nasus-0', 'nasus-10', 'nami-7', 'nami-6', 'nami-5', 'nami-4', 'nami-3', 'nami-2', 'nami-1', 'nami-0', 'norgana-6', 'norgana-5', 'norgana-4', 'norgana-3', 'norgana-2', 'norgana-1', 'norgana-0', 'norgana-10', 'norgana-11', 'nordekaiser-4', 'nordekaiser-3', 'nordekaiser-2', 'nordekaiser-1', 'nordekaiser-0', 'nonkeyking-5', 'nonkeyking-4', 'nonkeyking-3', 'nonkeyking-2', 'nonkeyking-1', 'nonkeyking-0', 'nissfortune-9', 'nissfortune-8', 'nissfortune-7', 'nissfortune-6', 'nissfortune-5', 'nissfortune-4', 'nissfortune-3', 'nissfortune-2', 'nissfortune-1', 'nissfortune-0', 'nasteryi-3', 'nasteryi-2', 'nasteryi-1', 'nasteryi-0', 'nasteryi-9', 'nasteryi-5', 'nasteryi-4', 'nasteryi-10', 'naokai-7', 'naokai-6', 'naokai-5', 'naokai-4', 'naokai-3', 'naokai-2', 'naokai-1', 'naokai-0', 'nalzahar-5', 'nalzahar-4', 'nalzahar-3', 'nalzahar-2', 'nalzahar-1', 'nalzahar-0', 'nalphite-7', 'nalphite-6', 'nalphite-5', 'nalphite-4', 'nalphite-3', 'nalphite-2', 'nalphite-1', 'nalphite-0', 'lux-7', 'lux-6', 'lux-5', 'lux-4', 'lux-3', 'lux-2', 'lux-1', 'lux-0', 'lulu-6', 'lulu-5', 'lulu-4', 'lulu-3', 'lulu-2', 'lulu-1', 'lulu-0', 'lucian-6', 'lucian-7', 'lucian-2', 'lucian-1', 'lucian-0', 'lissandra-3', 'lissandra-2', 'lissandra-1', 'lissandra-0', 'leona-9', 'leona-8', 'leona-7', 'leona-6', 'leona-5', 'leona-4', 'leona-3', 'leona-2', 'leona-1', 'leona-0', 'leesin-6', 'leesin-5', 'leesin-4', 'leesin-3', 'leesin-2', 'leesin-1', 'leesin-0', 'leesin-10', 'leesin-11', 'leblanc-5', 'leblanc-4', 'leblanc-3', 'leblanc-2', 'leblanc-1', 'leblanc-0', 'kogmaw-9', 'kogmaw-8', 'kogmaw-7', 'kogmaw-6', 'kogmaw-5', 'kogmaw-4', 'kogmaw-3', 'kogmaw-2', 'kogmaw-1', 'kogmaw-0', 'kled-1', 'kled-0', 'kindred-2', 'kindred-1', 'kindred-0', 'khazix-4', 'khazix-3', 'khazix-2', 'khazix-1', 'khazix-0', 'kennen-7', 'kennen-6', 'kennen-5', 'kennen-4', 'kennen-3', 'kennen-2', 'kennen-1', 'kennen-0', 'kayle-8', 'kayle-7', 'kayle-6', 'kayle-5', 'kayle-4', 'kayle-3', 'kayle-2', 'kayle-1', 'kayle-0', 'katarina-9', 'katarina-8', 'katarina-7', 'katarina-5', 'katarina-6', 'katarina-4', 'katarina-3', 'katarina-2', 'katarina-1', 'kassadin-4', 'kassadin-3', 'kassadin-2', 'kassadin-1', 'kassadin-0', 'karthus-9', 'karthus-5', 'karthus-4', 'karthus-3', 'karthus-2', 'karthus-1', 'karthus-0', 'karma-7', 'karma-6', 'karma-5', 'karma-4', 'karma-3', 'karma-2', 'karma-1', 'karma-0', 'kalista-3', 'kalista-2', 'kalista-1', 'kalista-0', 'jinx-4', 'jinx-3', 'jinx-2', 'jinx-1', 'jinx-0', 'jayce-4', 'jayce-3', 'jayce-2', 'jayce-1', 'jayce-0', 'jax-9', 'jax-8', 'jax-7', 'jax-6', 'jax-5', 'jax-4', 'jax-3', 'jax-2', 'jax-1', 'jax-0', 'jarvaniv-6', 'jarvaniv-5', 'jarvaniv-4', 'jarvaniv-3', 'jarvaniv-2', 'jarvaniv-1', 'jarvaniv-0', 'janna-7', 'janna-6', 'janna-5', 'janna-4', 'janna-3', 'janna-2', 'janna-1', 'ivern-1', 'ivern-0', 'irelia-5', 'irelia-4', 'irelia-3', 'irelia-2', 'irelia-1', 'irelia-0', 'illaoi-1', 'illaoi-0', 'heimerdinger-5', 'heimerdinger-4', 'heimerdinger-3', 'heimerdinger-2', 'heimerdinger-1', 'heimerdinger-0', 'hecarim-6', 'hecarim-5', 'hecarim-4', 'hecarim-3', 'hecarim-2', 'hecarim-1', 'hecarim-0', 'graves-7', 'graves-6', 'graves-5', 'graves-4', 'graves-3', 'graves-2', 'graves-1', 'graves-0', 'gragas-9', 'gragas-8', 'gragas-7', 'gragas-6', 'gragas-5', 'gragas-4', 'gragas-3', 'gragas-3', 'gragas-2', 'gragas-1', 'gragas-0', 'gnar-4', 'gnar-3', 'gnar-2', 'gnar-1', 'gnar-0', 'garen-6', 'garen-5', 'garen-4', 'garen-3', 'garen-2', 'garen-1', 'garen-0', 'garen-10', 'garen-11', 'gangplank-8', 'gangplank-7', 'gangplank-6', 'gangplank-5', 'gangplank-4', 'gangplank-3', 'gangplank-2', 'gangplank-1', 'gangplank-0', 'galio-5', 'galio-4', 'galio-3', 'galio-2', 'galio-1', 'galio-0', 'fizz-9', 'fizz-8', 'fizz-4', 'fizz-3', 'fizz-2', 'fizz-1', 'fizz-0', 'fiora-5', 'fiora-4', 'fiora-3', 'fiora-2', 'fiora-1', 'fiora-0', 'fiddlesticks-7', 'fiddlesticks-6', 'fiddlesticks-5', 'fiddlesticks-4', 'fiddlesticks-3', 'fiddlesticks-2', 'fiddlesticks-1', 'fiddlesticks-0', 'ezreal-9', 'ezreal-8', 'ezreal-7', 'ezreal-6', 'ezreal-5', 'ezreal-4', 'ezreal-3', 'ezreal-2', 'ezreal-1', 'ezreal-0', 'evelynn-4', 'evelynn-3', 'evelynn-2', 'evelynn-1', 'evelynn-0', 'elise-4', 'elise-3', 'elise-2', 'elise-1', 'elise-0', 'ekko-3', 'ekko-2', 'ekko-1', 'ekko-0', 'draven-6', 'draven-5', 'draven-4', 'draven-3', 'draven-2', 'draven-1', 'draven-0', 'drmundo-9', 'drmundo-8', 'drmundo-7', 'drmundo-6', 'drmundo-5', 'drmundo-4', 'drmundo-3', 'drmundo-2', 'drmundo-1', 'drmundo-0', 'diana-3', 'diana-2', 'diana-1', 'diana-0', 'diana-11', 'darius-8', 'darius-4', 'darius-3', 'darius-2', 'darius-1', 'darius-0', 'darius-14', 'corki-8', 'corki-7', 'corki-6', 'corki-5', 'corki-4', 'corki-3', 'corki-2', 'corki-1', 'corki-0', 'chogath-6', 'chogath-5', 'chogath-4', 'chogath-3', 'chogath-2', 'chogath-1', 'chogath-0', 'cassiopeia-4', 'cassiopeia-3', 'cassiopeia-2', 'cassiopeia-1', 'cassiopeia-0', 'camille-1', 'camille-0', 'caitlyn-6', 'caitlyn-5', 'caitlyn-4', 'caitlyn-3', 'caitlyn-2', 'caitlyn-1', 'caitlyn-0', 'caitlyn-10', 'caitlyn-11', 'braum-3', 'braum-2', 'braum-1', 'braum-0', 'braum-10', 'brand-5', 'brand-4', 'brand-3', 'brand-2', 'brand-1', 'brand-0', 'blitzcrank-7', 'blitzcrank-6', 'blitzcrank-5', 'blitzcrank-4', 'blitzcrank-3', 'blitzcrank-2', 'blitzcrank-1', 'blitzcrank-0', 'blitzcrank-11', 'bard-6', 'bard-5', 'bard-4', 'bard-3', 'bard-2', 'bard-1', 'bard-0', 'azir-4', 'azir-3', 'azir-2', 'azir-1', 'azir-0', 'aurelionsol-1', 'aurelionsol-0', 'ashe-8', 'ashe-7', 'ashe-6', 'ashe-5', 'ashe-4', 'ashe-3', 'ashe-2', 'ashe-1', 'ashe-0', 'annie-9', 'annie-8', 'annie-7', 'annie-6', 'annie-5', 'annie-4', 'annie-3', 'annie-2', 'annie-1', 'annie-0', 'annie-10', 'anivia-7', 'anivia-6', 'anivia-5', 'anivia-4', 'anivia-3', 'anivia-2', 'anivia-1', 'anivia-0', 'amumu-8', 'amumu-7', 'amumu-6', 'amumu-5', 'amumu-4', 'amumu-3', 'amumu-2', 'amumu-1', 'amumu-0', 'alistar-9', 'alistar-8', 'alistar-7', 'alistar-6', 'alistar-5', 'alistar-4', 'alistar-3', 'alistar-2', 'alistar-1', 'alistar-0', 'akali-8', 'akali-7', 'akali-6', 'akali-5', 'akali-4', 'akali-3', 'akali-2', 'akali-1', 'akali-0', 'ahri-7', 'ahri-6', 'ahri-5', 'ahri-4', 'ahri-3', 'ahri-2', 'ahri-1', 'ahri-0', 'aatrox-3', 'aatrox-2', 'aatrox-1', 'aatrox-0', 'zacskt', 'teemoskt', 'olafskt', 'namiskt', 'syndraskt', 'jhinskt', 'ekkoskt', 'urgot-8', 'urgot-7', 'urgot-6', 'urgot-5', 'kayn-2', 'kayn', 'sona-8', 'veigaros', 'twitchos', 'tristanaos', 'fizzos', 'zigg', 'nalzah01', 'kayle', 'hecarim', 'brand', 'ornn2', 'ornn', 'syndra', 'soraka', 'nissfortune', 'ezreal', 'ahri', 'yorick', 'singed', 'nasteryi', 'janna', 'fiora', 'cassiopeia', 'ashe', 'zed', 'viktor', 'nidalee', 'katarina', 'gnar', 'evelynn-7', 'evelynn-6', 'evelynn-5', 'evelynn', 'elise', 'annie', 'rengar', 'blitzcrank-9', 'blitzcrank-8', 'zoe-2', 'zoe', 'vi', 'vayne', 'varus', 'poppy', 'kogmaw', 'jinx', 'jhin', 'jax', 'graves', 'draven', 'xinzhao', 'warwick', 'swain-8', 'swain-7', 'swain-6', 'swain-5', 'swain-4', 'rakan', 'nasus', 'nissfortune-15', 'nissfortune-14', 'nissfortune-13', 'nissfortune-12', 'nissfortune-11', 'nissfortune-10', 'lux', 'kaisa-2', 'kaisa', 'jarvan-iv', 'illaoi', 'gragas', 'wukong', 'sivir', 'nissfortune-16', 'irelia-11', 'irelia-10', 'irelia-9', 'irelia-8', 'irelia-7', 'irelia-6', 'galio', 'alistar', 'varus-7', 'twistedfate', 'teemo', 'shen', 'rumble', 'riven', 'evelynn-8', 'zoe3', 'xinzhao-7', 'urgot', 'thresh', 'talon', 'taliya', 'pyke-2', 'pyke', 'poppy-8', 'nunu-15', 'nunu-14', 'nunu-13', 'nunu-12', 'nunu-11', 'nunu-10', 'nunu-9', 'nunu-8', 'lulu', 'lucian', 'jarvan-iv-7', 'irelia-12', 'garen', 'gangplank', 'darius', 'caitlyn', 'braum', 'aurelionsol-2', 'ashe-9', 'akali-18', 'akali-17', 'akali-16', 'akali-15', 'akali-14', 'akali-13', 'akali-12', 'akali-11', 'akali-10', 'akali-9', 'aatrox-7', 'aatrox-6', 'aatrox-5', 'aatrox-4', 'ziggs-6', 'yasuo', 'sona', 'nalphite', 'khazix', 'kayn-3', 'jinx-5']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "style")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        style: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'lolcoverbyname': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|avatar\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|xinzhao\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|avatar\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|xinzhao\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['zyra', 'zilean', 'ziggs', 'zed', 'zac', 'yorick', 'yasuo', 'xinzhao', 'xerath', 'xayah', 'wukong', 'warwick', 'volibear', 'vladimir', 'viktor', 'vi', 'velkoz', 'veigar', 'vayne', 'varus', 'urgot', 'udyr', 'twictch', 'tryndamere', 'trundle', 'tristana', 'thresh', 'twistedfate', 'teemo', 'taric', 'talon', 'taliyah', 'tahmkench', 'syndra', 'swain', 'soraka', 'sona', 'skarner', 'sivir', 'sion', 'singed', 'shyvana', 'shen', 'shaco', 'sejuani', 'ryze', 'rumble', 'riven', 'rengar', 'renekton', 'reksai', 'rammus', 'rakan', 'quinn', 'poppy', 'pantheon', 'orianna', 'olaf', 'nunu', 'nasteryi', 'naokai', 'nalzahar', 'nalphite', 'lux', 'lulu', 'lucian', 'nocturne', 'nedalee', 'nautilus', 'nasus', 'nami', 'norgana', 'noderkaiser', 'nissfortune', 'lissandra', 'leona', 'leesin', 'leblanc', 'kogmaw', 'kled', 'kindred', 'khazix', 'kennen', 'kayn', 'kayle', 'katarina', 'kassadin', 'karthus', 'karma', 'kalista', 'jinx', 'jhin', 'jayce', 'jax', 'jarvan', 'janna', 'ivern', 'irelia', 'illaoi', 'heimerdinger', 'hecarim', 'graves', 'gragas', 'gnar', 'garen', 'gangplank', 'galio', 'fizz', 'fiora', 'fiddlesticks', 'ezreal', 'drmundo', 'evelynn', 'elise', 'ekko', 'draven', 'diana', 'darius', 'corki', 'chogath', 'cassiopeia', 'camille', 'caitlyn', 'braum', 'brand', 'blitzcrank', 'bard', 'azir', 'aurelionsol', 'ashe', 'annie', 'anivia', 'amumu', 'alistar', 'akali', 'ahri', 'aatrox', 'zoe', 'sylas', 'swain-2', 'pyke', 'nunu-2', 'neeko', 'norgana2', 'kayle-2', 'kaisa', 'evelynn-2', 'aatrox-2']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "avatar")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        avatar: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'cyberhunterfb': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|1\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|1\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "character")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        character: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'coverfreefirefb': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|laura\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|laura\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['a124', 'alok', 'alvaro', 'andrew', 'antonio', 'caroline', 'hayato', 'kapella', 'kelly', 'kla', 'laura', 'naxim', 'niguel', 'nisa', 'noco', 'nikita', 'notora', 'olivia', 'paloma', 'rafael', 'shani', 'steffie']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "character")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        character: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'gamingmascot': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|bear\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|style\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|bear\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['bear-2', 'dragon-2', 'hydra', 'lion', 'reaper', 'wolf-2', 'bear', 'eagle', 'iguana', 'shark', 'snake', 'spartan', 'griffin', 'owl', 'wolf', 'tiger', 'wolver', 'dragon']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "style")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        style: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'coveronepiecefb': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|ace\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|character\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|ace\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['ace', 'brook', 'chopper', 'franky', 'garp', 'jinbei', 'law', 'luffy', 'nerry', 'nami', 'rayleigh', 'robin', 'sabo', 'sanji', 'shanks', 'sunny', 'usopp', 'zoro']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "character")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        character: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'bannerytcsgo': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|template\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|banner-7\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|template\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|banner-7\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['banner-1', 'banner-2', 'banner-3', 'banner-4', 'banner-5', 'banner-6', 'banner-7']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "banner")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        banner: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'fbgamepubgcover': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks|template\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|cover-4\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks|template\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|cover-4\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                const style = ['cover-1', 'cover-2', 'cover-3', 'cover-4', 'cover-5', 'cover-6', 'cover-7', 'cover-8', 'cover-9', 'cover-10', 'cover-11', 'cover-12']
                if (!style.includes(m2)) {
                    getStyle(style, style.length, "template")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        template: m2
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'banneroflol': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|banner\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|neeko\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|banner\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|neeko\``)
                var memek = args.join(" ").split("|")
                var m1 = memek[0]
                var m2 = memek[1]
                var m3 = memek[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|banner\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|neeko\``)
                const style = ['ahri-2', 'neeko', 'nocturne', 'shen-2', 'veigar', 'rakanayah-2', 'zoe-2', 'pantheon-2', 'rammus', 'udyr', 'darius-2', 'ekko-2', 'lablanc', 'leona', 'nissfotune', 'poppy', 'quinn', 'talon-2', 'akali-2', 'irelia-2', 'jinx-2', 'nordekaiser', 'pyke-2', 'renekton', 'rengar', 'sivir', 'sona', 'soraka', 'tristana', 'warwick', 'yuumi', 'ziggs', 'leesin', 'lulu', 'lux', 'naster-yi', 'norgana', 'nasus', 'pantheon', 'pyke', 'qiyana', 'rakan', 'rakanxayah', 'riven', 'shen', 'sylas', 'talon', 'teemo', 'thresh', 'tryndamere', 'varus', 'vayne', 'velkoz', 'vladimir', 'yasuo', 'zed', 'zoe', 'hecarim', 'heimerdinger', 'illaoi', 'irelia', 'ivern', 'janna', 'jarvan-iv', 'jax', 'jayce', 'jhin', 'jinx', 'kaisa', 'kalista', 'karma', 'karthus', 'kassadin', 'katarina', 'kayle', 'kayn', 'kennen', 'khazix', 'kindred', 'kled', 'kogmaw', 'aatrox', 'ahri', 'akali', 'alistar', 'amumu', 'anivia', 'annie', 'ashe', 'aurelionsol', 'azir', 'bard', 'blitzcrank', 'brand', 'braum', 'caitlyn', 'camille', 'cassiopeia', 'chogath', 'corki', 'darius', 'diana', 'drmundo', 'draven', 'ekko', 'elise', 'evelynn', 'ezreal', 'fiddlesticks', 'fiora', 'fizz', 'galio', 'gangplank', 'garen', 'gnar', 'gragas', 'graves']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "banner")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        banner: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'bannerofaov2': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|banner\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|ishar\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|banner\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|ishar\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|banner\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|ishar\``)
                const style = ['airi-2', 'aleister', 'astrid-2', 'ata', 'butterfly-2', 'dirak', 'ignis-2', 'ishar', 'jinna', 'lauriel-3', 'nina-2', 'natalya-2', 'omen-2', 'qi-2', 'quillen3', 'raz', 'roxie-2', 'ryoma-2', 'taara-2', 'violet-3', 'wukong-4', 'wukong-3', 'krixi-2', 'krizziz', 'nurad-5', 'volkath', 'wisp-2', 'wukong-2', 'enzo-2', 'hayate-2', 'annette-2', 'capheny-2', 'celica', 'gildur-2', 'lauriel-2', 'nurad-4', 'quillen-2', 'sephera-2', 'qi', 'nurad-3', 'nurad-2', 'nakroth-2', 'zip', 'diao-chan-2', 'enzo', 'errol', 'joker', 'payna', 'slimz', 'thane', 'toro', 'veres', 'violet-2', 'wisp', 'yena', 'zill', 'arduin', 'arthur', 'batman', 'capheny', 'darcy', 'elsu', 'florentino', 'gildur', 'ignis', 'wukong', 'yena', 'zanis', 'violet', 'tulen', 'sephera', 'nurad', 'nina', 'lindis', 'liliana', 'lauriel', 'krixi', 'kahlii', 'hayate', 'diao-chan', 'butterfly', 'astrid', 'arum', 'annette', 'amily', 'airi', 'zuka', 'zephys', 'zanis', 'yorn', 'xeniel', 'veres', 'veera', 'tel-annas', 'taara', 'superman', 'skud', 'ryoma', 'roxie', 'quillen', 'omen', 'natalya', 'nakroth', 'lubu']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "banner")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        banner: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'teamlogo': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|buffalo\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|buffalo\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|buffalo\``)
                const style = ['cobra', 'dragon', 'eagle2', 'falcon', 'lion2', 'tiger2', 'bear', 'buffalo', 'eagle', 'lion', 'tiger', 'wolf']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "background")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        background: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'companylogo2': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|3\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|3\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|3\``)
                const style = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "background")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        background: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'companylogo': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|3\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|3\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|3\``)
                const style = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "background")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        background: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'gradientlogo': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|3\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|3\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|3\``)
                const style = ['1', '2', '3', '4', '5', '6']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "background")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        background: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'pencilsketch': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|icon\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|panda\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|icon\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|panda\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|icon\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|panda\``)
                const style = ['bird', 'butterfly', 'coffee', 'dove', 'leaf', 'like', 'lotus', 'milk-tea', 'panda', 'tree', 'woman', 'bear', 'bull', 'dragon', 'eagle', 'hawk', 'ninja', 'paw', 'rooster', 'sabertooth', 'skull', 'warrior', 'zebra']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "icon")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        icon: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'gunlogogaming': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|m14ebr\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|m14ebr\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|m14ebr\``)
                const style = ['ak47', 'ak47-s', 'an94', 'ar15', 'aug', 'awm', 'g36k', 'm4a1', 'm4-s', 'm14ebr', 'm16', 'm60', 'm82a1', 'mp5', 'scar', 'svd', 'xm8', 'xm1014']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "background")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        background: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'banneroffreefire': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|misha\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|misha\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|misha\``)
                const style = ['andrew', 'caroline', 'kelly', 'laura', 'maxim', 'miguel', 'misha', 'moco', 'nikita', 'notora', 'olivia', 'steffi']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "background")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        background: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'letterlogos': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|z\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|z\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|z\``)
                const style = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'z']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "thumb")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        thumb: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'bannerofoverwatch': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|reinhardt\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|reinhardt\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|reinhardt\``)
                const style = ['widowmaker', 'tracer', 'symmetra', 'sombra', 'soldier76', 'reinhardt', 'reaper', 'orisa', 'mercy', 'mei', 'genji', 'dva', 'doomfist', 'ashe', 'ana']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "background")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        background: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'bannerofapex': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|bg3\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|bg3\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|bg3\``)
                const style = ['bg6', 'bg5', 'bg4', 'bg3', 'bg2', 'bg1']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "background")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        background: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'bannerofpubg': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|bg2\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|bg2\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|background\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|bg2\``)
                const style = ['bg11', 'bg10', 'bg9', 'bg8', 'bg7', 'bg6', 'bg5', 'bg4', 'bg3', 'bg2', 'bg1']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "background")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        background: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'mascotstyle': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|kitsune\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|kitsune\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|kitsune\``)
                const style = ['dragon-5', 'jet', 'knight', 'skull-3', 'skull-cyborg', 'tiger-4', 'bee-3', 'dragon-4', 'fox-3', 'goat-2', 'kitsune', 'octopus-2', 'piranha', 'wolf', 'bear-2', 'cat', 'ceberus', 'crocodile', 'dinosaur', 'dragon-3', 'eagle-3', 'horse-2', 'husky', 'kraken', 'lynx', 'sabertooh', 'assassin', 'bee', 'cat2', 'demon', 'fox', 'gorilla', 'horus', 'octopus', 'rounin', 'scorpion', 'skull2', 'tiger3', 'tiger2', 'tiger', 'shark', 'sabertooth', 'rooster', 'rhino', 'puma', 'phoenix', 'panther', 'owl', 'lion', 'horse', 'hornet', 'griffin', 'goat', 'fox', 'eagle', 'dragon2', 'dragon', 'devil', 'cobra', 'bull', 'bear', 'monkey', 'warrior', 'rabbit', 'pirates', 'owl2', 'neonwolf', 'lionking', 'godzilla', 'flashwolf', 'fire', 'eagle2', 'dog', 'mask', 'team', 'pubg', 'drift', 'bee2']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "thumb")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        thumb: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'logoaccording': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|lynx\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|lynx\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|lynx\``)
                const style = ['bear2', 'cat2', 'ceberus', 'crocodile', 'dinosaur', 'dragon3', 'eagle3', 'horse2', 'husky', 'kraken', 'lynx', 'sabertooh', 'assassin', 'bee', 'cat', 'demon', 'fox-2', 'gorilla', 'horus', 'octopus', 'rounin', 'scorpion', '-2', 'tiger-3', 'bg-tiger', 'bg-buffalo', 'chicken', 'bull', 'bg-wolf', 'jaguar', 'horse', 'eagle', 'dragon', 'wolver', 'shark', 'sabertooth', 'rhino', 'phoenix', 'lion', 'hornet', 'griffin', 'bear', 'tiger2', 'panther', 'owl', 'monkey', 'goat', 'fox', 'dragon2', 'devil', 'cobra', 'reaper', 'pirates', 'owl2', 'mask', 'fire', 'eagle2', 'chamois', 'neptune', 'parrots', 'samurai']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "thumb")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        thumb: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            case 'avataroverwatch': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|zenyatta\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|zenyatta\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var m3 = mon.split("|")[2]
                if (!m3) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2|thumb\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc|zenyatta\``)
                const style = ['mccree', 'mercy', 'zenyatta', 'zarya', 'winston', 'widowmaker', 'tracer', 'torbjorn', 'symmetra', 'sombra', 'soldier76', 'soldier_76', 'roadhog', 'reinhardt', 'reaper2', 'reaper', 'pharah', 'orisa', 'mei', 'lucio', 'junkrat', 'hanzo', 'genji', 'dva', 'bastion', 'ana2', 'ana', 'doomfist', 'bg-1']
                if (!style.includes(m3)) {
                    getStyle(style, style.length, "thumb")
                } else {
                    reply(lang.wait)
                    let ini_url = api('alfa', '/api/ephoto360/' + command, {
                        text: m1,
                        text2: m2,
                        thumb: m3
                    }, 'apikey')
                    let textpro2 = await fetch(ini_url)
                    if (!textpro2.ok) throw await textpro2.text()
                    InzieOfc.replyWithPhoto({
                        url: ini_url
                    }, {
                        caption: lang.ok
                    })
                }

            }
            break
            //islamic
            case 'asmaulhusna': {
                var asma = await fetch(api('alfa', '/api/islam/' + command, {}, 'apikey'))
                if (!asma.ok) throw asma.text()
                var data = await asma.json()
                let key = 'Asmaul Husna\n\n'
                key += `• Latin : ${data.result.latin}\n`
                key += `• Arabic : ${data.result.arabic}\n`
                key += `• Tr id : ${data.result.translation_id}\n`
                key += `• Tr en : ${data.result.translation_en}`
                reply(key)
            }
            break
            case 'kisahnabi': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} nama nabi\`\n\nContoh penggunaan:\n\`${prefix+command} Adam\``)
                var asma = await fetch(api('alfa', '/api/islam/' + command, {
                    nabi: q
                }, 'apikey'))
                if (!asma.ok) throw asma.text()
                var data = await asma.json()
                let key = 'Kisah Nabi\n\n'
                key += `• Name : ${data.result.name}\n`
                key += `• Birth : ${data.result.birth}\n`
                key += `• Death Age : ${data.result.death_age}\n`
                key += `• Country : ${data.result.country_from}\n`
                key += `• Story : ${data.result.story}\n`
                reply(key)
            }
            break
            case 'jadwalshalat': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} nama daerah\`\n\nContoh penggunaan:\n\`${prefix+command} Makassar\``)
                var asma = await fetch(api('alfa', '/api/islam/' + command, {
                    daerah: q
                }, 'apikey'))
                if (!asma.ok) throw asma.text()
                var data = await asma.json()
                let key = 'Jadwal Shalat \n\n'
                key += `• Daerah : ${q}\n\n`
                key += `• Date : ${moment(new Date()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss DD/MM/YYYY')}\n`
                key += `• Subuh : ${data.result.today.Shubuh}\n`
                key += `• Zuhur : ${data.result.today.Dzuhur}\n`
                key += `• Ashr : ${data.result.today.Ashr}\n`
                key += `• Magrib : ${data.result.today.Maghrib}\n`
                key += `• Isya : ${data.result.today.Isya}\n`
                reply(key)
            }
            break
            case 'randomquran': {
                var asma = await fetch(api('alfa', '/api/islam/' + command, {}, 'apikey'))
                if (!asma.ok) throw asma.text()
                var data = await asma.json()
                let short = data.result.resources
                let key = 'Random Quran\n\n'
                key += `• Surah : ${short.nameOfSurah.short} (${short.nameOfSurah.transliteration.en})\n`
                key += `• Surah ke : ${short.numberOfSurah}\n`
                key += `• Total ayat : ${short.totalAyah}\n`
                key += `• Ayat ke : ${short.numberOfAyah}\n`
                key += `• Arab : ${short.ayah.text.arab}\n`
                key += `• Latin : ${short.ayah.text.transliteration.en}\n`
                key += `• Tr en : ${short.ayah.translation.en}\n`
                key += `• Tr id : ${short.ayah.translation.id}\n\n`
                key += `_Audio sedang dalam di proses pengiriman_`
                reply(key)
                InzieOfc.replyWithAudio({
                    url: short.ayah.audio.primary,
                    filename: short.nameOfSurah.short
                })
            }
            break
            case 'randomquran2': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} juz 1-30\`\n\nContoh penggunaan:\n\`${prefix+command} 1\``)
                var asma = await fetch(api('alfa', '/api/islam/' + command, {
                    juz: q
                }, 'apikey'))
                if (!asma.ok) throw asma.text()
                var data = await asma.json()
                let short = data.result.resources
                let key = 'Random Quran\n\n'
                key += `• Surah : ${short.nameOfSurah.short} (${short.nameOfSurah.transliteration.en})\n`
                key += `• Surah ke : ${short.numberOfSurah}\n`
                key += `• Total ayat : ${short.totalAyah}\n`
                key += `• Ayat ke : ${short.numberOfAyah}\n`
                key += `• Arab : ${short.ayah.text.arab}\n`
                key += `• Latin : ${short.ayah.text.transliteration.en}\n`
                key += `• Tr en : ${short.ayah.translation.en}\n`
                key += `• Tr id : ${short.ayah.translation.id}\n\n`
                key += `_Audio sedang dalam di proses pengiriman_`
                reply(key)
                InzieOfc.replyWithAudio({
                    url: short.ayah.audio.primary,
                    filename: short.nameOfSurah.short
                })
            }
            break
            case 'listsurah': {
                var asma = await fetch(api('alfa', '/api/islam/' + command, {}, 'apikey'))
                if (!asma.ok) throw asma.text()
                var data = await asma.json()
                key = 'List Surah\n\n'
                reply(key + data.result)
            }
            break
            case 'tafsirsurah': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} nama surah\`\n\nContoh penggunaan:\n\`${prefix+command} Al-fatihah\``)
                var asma = await fetch(api('alfa', '/api/islam/' + command, {
                    surah: q
                }, 'apikey'))
                if (!asma.ok) throw asma.text()
                var data = await asma.json()
                let key = 'Tafsir Surah\n\n'
                let no = 0
                for (var i = 0; i < data.result.length; i++) {
                    no += 1
                    key += `• Surah : ${data.result[i].surah}\n`
                    key += `• Tafsir : ${data.result[i].tafsir}\n\n-----------------------------------\n\n`
                }
                reply(key)
            }
            break
            case 'alquranaudio': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} surah|ayah\`\n\nContoh penggunaan:\n\`${prefix+command} 1|5\``)
                var mon = args.join(' ')
                var m1 = mon.split("|")[0]
                var m2 = mon.split("|")[1]
                var asma = await fetch(api('alfa', '/api/islam/alquran-audio2', {
                    ayat: m2,
                    surah: m1
                }, 'apikey'))
                if (!asma.ok) throw asma.text()
                var data = await asma.json()
                let short = data.result.data
                let key = 'Alquran Audio\n\n'
                key += `• Surah : ${short.surah.name.short} (${short.surah.name.transliteration.en})\n`
                key += `• Arti : ${short.surah.name.translation.en} (${short.surah.name.translation.id})\n`
                key += `• Surah ke : ${short.surah.number}\n`
                key += `• Urutan : ${short.surah.sequence}\n`
                key += `• Total ayat : ${short.surah.numberOfVerses}\n`
                key += `• Wahyu : ${short.surah.revelation.arab} (${short.surah.revelation.id})\n`
                key += `• Tafsir : ${short.surah.tafsir.id}\n\n~~~~~~~~~~~~~~~~~~~\n\n`
                key += `• Juz : ${short.meta.juz}\n`
                key += `• Page : ${short.meta.page}\n`
                key += `• Manzil : ${short.meta.manzil}\n`
                key += `• Ruku : ${short.meta.ruku}\n`
                key += `• Quarte : ${short.meta.hizbQuarter}\n`
                key += `• Arab : ${short.text.arab}\n`
                key += `• Latin : ${short.text.transliteration.en}\n`
                key += `• Tr en : ${short.translation.en}\n`
                key += `• Tr id : ${short.translation.id}\n`
                key += `• Tafsir short : ${short.tafsir.id.short}\n`
                key += `• Tafsir long : ${short.tafsir.id.long}\n\n-----------------------------------\n\n`
                reply(key)
                InzieOfc.replyWithAudio({
                    url: short.audio.primary,
                    filename: short.surah.name.short
                })
            }
            break
            //nsfw & sfw
            case 'cuddle':
            case 'foxgirl':
            case 'kemonomimi2':
            case 'woof':
            case 'holo2':
            case 'hug':
            case 'kiss':
            case 'lizard':
            case 'meowi':
            case 'neko2':
            case 'pat':
            case 'poke':
            case 'slap':
            case 'tickle': {
                reply(lang.wait)
                let ini_url = global.api('alfa', '/api/sfw/' + command, {}, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            case 'baka':
            case 'smug':
            case 'neko-sfw':
            case 'hentai-gif':
            case 'spank':
            case 'blowjob':
            case 'cumarts':
            case 'eroyuri':
            case 'eroneko':
            case 'erokemonomimi':
            case 'erokitsune':
            case 'ero':
            case 'feet':
            case 'erofeet':
            case 'feetgif':
            case 'femdom':
            case 'futanari':
            case 'hentai':
            case 'holoero':
            case 'holo':
            case 'keta':
            case 'kitsune':
            case 'kemonomimi':
            case 'pussyart':
            case 'pussywankgif':
            case 'girl-solo':
            case 'girl-solo-gif':
            case 'tits':
            case 'trap':
            case 'yuri':
            case 'avatar2':
            case 'anal':
            case 'bj':
            case 'boobs':
            case 'classic':
            case 'cumsluts':
            case 'kuni':
            case 'lesbian':
            case 'neko':
            case 'neko-gif':
            case 'ahegao':
            case 'bdsm':
            case 'cuckold':
            case 'cum':
            case 'foot':
            case 'gangbang':
            case 'glasses':
            case 'jahy':
            case 'masturbation':
            case 'nsfw-neko':
            case 'orgy':
            case 'panties':
            case 'tentacles':
            case 'thighs':
            case 'zettai': {
                reply(lang.wait)
                let ini_url = global.api('alfa', '/api/nsfw/' + command, {}, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            //Photooxy
            case 'battlegrounds-logo':
            case 'battlefield4':
            case 'text-8bit': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                if (!text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                mm = args.join(' ')
                m1 = mm.split("|")[0];
                m2 = mm.split("|")[1];
                reply(lang.wait)
                let ini_url = global.api("alfa", '/api/photooxy/' + command, {
                    text: m1,
                    text2: m2
                }, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            case 'typography-flower':
            case 'under-flower':
            case 'bevel-text':
            case 'silk-text':
            case 'sweet-andy':
            case 'smoke-typography':
            case 'carvedwood':
            case 'scary-cemetery':
            case 'royallook':
            case 'coffeecup2':
            case 'illuminated':
            case 'harry-potter2':
            case 'birthday-cake':
            case 'embroidery':
            case 'flaming':
            case 'furtext':
            case 'nightsky':
            case 'glow-rainbow':
            case 'gradient-avatar':
            case 'white-cube':
            case 'graffiti-cover':
            case 'rainbow-shine':
            case 'smoky-neon':
            case 'quotes-underfall':
            case 'vector-nature':
            case 'yellow-rose':
            case 'love-text':
            case 'underwater-ocean':
            case 'nature-text':
            case 'wolf-metal':
            case 'summer-text':
            case 'wooden-board':
            case 'quote-wood':
            case 'love-text':
            case 'quotes-undergrass':
            case 'naruto-banner':
            case 'love-message':
            case 'textoncup2':
            case 'burn-paper':
            case 'smoke':
            case 'romantic-messages':
            case 'shadow-sky':
            case 'text-cup':
            case 'coffecup': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                if (text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                reply(lang.wait)
                let ini_url = global.api('alfa', '/api/photooxy/' + command, {
                    text: text
                }, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            //telegram sticker
            /*  case "patrick":
              case "popoci":
              case "sponsbob":
              case "kawan-sponsbob":
              case "awoawo":
              case "chat":
              case "benedict":
              case "dbfly":
              case "dino-kuning":
              case "doge":
              case "gojosatoru":
              case "hope-boy":
              case "jisoo":
              case "kr-robot":
              case "kucing":
              case "lonte":
              case "manusia-lidi":
              case "menjamet":
              case "meow":
              case "nicholas":
              case "tyni": {
                  reply(lang.wait)
                  let ini_url = global.api('alfa', '/api/telegram-sticker/' + command, {}, 'apikey')
                  let res = await fetch(ini_url)
                  if (!res.ok) throw await res.text()
                  InzieOfc.replyWithSticker({url: ini_url})
              }
              break
              //canvas
              case 'ttp':
              case 'attp': {
                  if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks\`\n\nContoh penggunaan\n\`${prefix+command} saya robok anda goblok\``)
                  let res = await fetch(global.api('alfa', '/api/canvas/' + command, {text:text}, 'apikey'))
                  if (!res.ok) throw await res.text()
                  let img = await res.buffer()
                  let encmedia = await InzieOfc.sendMediaAsSticker(m.chat, img, m, {
                      packname: global.packname,
                      author: global.author
                  })
                  await fs.unlinkSync(encmedia)
              }
              break*/
            case 'nulis':
                reply(`Pilihan Fitur Nulis

1. ${prefix}nuliskiri
2. ${prefix}nuliskanan
3. ${prefix}foliokiri
4. ${prefix}foliokanan

Contoh:
\`${prefix}nuliskiri Subscribe Ya YT InzieOfc\``)
                break
            case 'foliokiri':
            case 'foliokanan':
            case 'nuliskanan':
            case 'nuliskiri': {
                if (text.length < 2) return reply(`Kirim perintah:\n\`${prefix+command} teks\`\n\nContoh penggunaan\n\`${prefix+command} ini tulisan saya\``)
                reply(lang.wait)
                const tulisan = text
                let ini_url = global.api("alfa", '/api/canvas/' + command, {
                    text: tulisan
                }, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            //textpro
            case "3dbox":
            case "3dchrome":
            case "3dglue":
            case "3dstone":
            case "abstra":
            case "advanced":
            case "bear":
            case "berry":
            case "biscuit":
            case "black-metal":
            case "blackpink":
            case "blood":
            case "blood2":
            case "blue-balloon":
            case "blue-gem":
            case "blue-glass":
            case "blue-glitter":
            case "blue-jewelry":
            case "blue-metal":
            case "blue-sparkling":
            case "bokeh":
            case "bread":
            case "broken":
            case "bronze-glitter":
            case "candy":
            case "captain-as2":
            case "carbon":
            case "chocolate":
            case "chrismast":
            case "christmas":
            case "cloudsky":
            case "cyan-balloon":
            case "cyan-glass":
            case "cyan-jewelry":
            case "cyan-sparkling":
            case "dark-gold":
            case "decorate":
            case "decorate-purple":
            case "decorative":
            case "deluxe-gold":
            case "demon":
            case "denim":
            case "discovery":
            case "dropwater":
            case "drug":
            case "embossed":
            case "engraved":
            case "equalizer":
            case "eroded-metal":
            case "fabric":
            case "fiction":
            case "firework":
            case "glitch":
            case "gloss":
            case "glossy":
            case "glossy-blue":
            case "glossy-carbon":
            case "gold-balloon":
            case "gold-glitter":
            case "gold-sparkling":
            case "golden":
            case "gradient":
            case "gradient2":
            case "green-balloon":
            case "green-glass":
            case "green-glitter":
            case "green-jewelry":
            case "green-neon":
            case "green-sparkling":
            case "halloween":
            case "halloween2":
            case "holographic":
            case "honey2":
            case "hot-metal":
            case "ice":
            case "joker":
            case "juice":
            case "koifish":
            case "luxury2":
            case "magma":
            case "marble":
            case "marble2":
            case "matrix":
            case "metaldark":
            case "metallic2":
            case "minion":
            case "multicolor":
            case "natural":
            case "neon":
            case "neon-devil":
            case "neon-light":
            case "neon2":
            case "neonc":
            case "neonlight":
            case "neonligth2":
            case "newyear":
            case "newyear2":
            case "orange-glass":
            case "orange-jewelry":
            case "oscar":
            case "papercut":
            case "peridot":
            case "pink-balloon":
            case "pink-glitter":
            case "pink-sparkling":
            case "purple":
            case "purple-balloon":
            case "purple-gem":
            case "purple-glass":
            case "purple-glitter":
            case "purple-jewelry":
            case "purple-shiny-glass":
            case "purple-sparkling":
            case "rainbow2":
            case "red-balloon":
            case "red-glass":
            case "red-jewelry":
            case "red-sparkling":
            case "road-warning":
            case "robot":
            case "rock":
            case "rusty":
            case "scifi":
            case "shiny":
            case "silver-glitter":
            case "silver-jewelry":
            case "sircuit":
            case "skeleton":
            case "sketch":
            case "snow":
            case "steel":
            case "strawberry":
            case "summer":
            case "summery":
            case "thunder":
            case "thunder2":
            case "toxic":
            case "transformer":
            case "underwater":
            case "wall":
            case "water-pipe":
            case "watercolor":
            case "wicker":
            case "wonderful-graffiti":
            case "wood":
            case "writing":
            case "xmas":
            case "yellow-glass":
            case "yellow-jewelry": {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                if (text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                reply(lang.wait)
                let ini_url = global.api('alfa', '/api/textpro/' + command, {
                    text: text
                }, 'apikey')
                let res = await fetch(ini_url)
                if (res.status != 200) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            case 'horror':
            case 'game8bit':
            case 'layered':
            case 'glitch2':
            case 'cool-graffiti':
            case 'cool-wall-graffiti':
            case 'realistic':
            case 'space3d':
            case 'glitch-tiktok':
            case 'stone':
            case 'marvel':
            case 'marvel2':
            case "metal-rose-gold":
            case 'pornhub':
            case 'avengers':
            case 'metal-rainbow':
            case 'metal-gold':
            case 'metal-galaxy':
            case "metal-silver":
            case 'lion':
            case 'wolf-black-white':
            case 'wolf-galaxy':
            case 'ninja':
            case '3dsteel':
            case 'horror2':
            case 'lava':
            case 'bagel': {
                if (!text) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                if (text.includes('|')) return reply(`Kirim perintah:\n\`${prefix+command} teks1|teks2\`\n\nContoh penggunaan:\n\`${prefix+command} InzieOfc\``)
                mm = args.join(' ')
                m1 = mm.split("|")[0];
                m2 = mm.split("|")[1];
                reply(lang.wait)
                let ini_url = global.api("alfa", '/api/textpro/' + command, {
                    text: m1,
                    text2: m2
                }, 'apikey')
                let res = await fetch(ini_url)
                if (!res.ok) throw await res.text()
                InzieOfc.replyWithPhoto({
                    url: ini_url
                }, {
                    caption: lang.ok
                })
            }
            break
            default:
            if (budy.startsWith('> ')) {
               if (!isCreator) return reply("Khusus owner")
               try {
                  let evaled = await eval(budy.slice(2))
                  if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                  await reply(evaled)
               } catch (err) {
                  await reply(util.format(err))
               }
            }
        }
    } catch (e) {
        InzieOfc.reply(util.format(e))
        console.log('[ ERROR ] ' + e)
    }
}
