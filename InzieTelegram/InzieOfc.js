require("../settings")
const {
    Telegraf,
    Context
} = require('telegraf')
const {
    simple
} = require("../lib/telefunc")
const axios = require("axios")
const fs = require('fs')
const moment = require('moment-timezone')
const os = require('os')
const speed = require('performance-now')

if (BOT_TOKEN == global.BOT_TOKEN)
    
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')

const bot = new Telegraf(BOT_TOKEN)
async function startInzieOfc() {
    bot.on('callback_query', async (InzieOfc) => {
        //console.log(InzieOfc)
        action = InzieOfc.callbackQuery.data.split(' ')
        args = action
        user_id = Number(action[1])
        if (InzieOfc.callbackQuery.from.id != user_id) return InzieOfc.answerCbQuery('Uppss... this button not for you!', {
            show_alert: true
        })
        const timestampi = speed();
        const latensii = speed() - timestampi
        const user = simple.getUserName(InzieOfc.callbackQuery.from)
        const {
            isUrl,
            fetchJson
        } = simple
        const pushname = user.full_name;
        const username = user.username ? user.username : "InzieOfc";
        const isCreator = [InzieOfc.botInfo.username, ...global.OWNER].map(v => v.replace("https://t.me/", '')).includes(user.username ? user.username : "-")
        const reply = async (text) => {
            for (var x of simple.range(0, text.length, 4096)) { //maks 4096 character, jika lebih akan eror
                return await InzieOfc.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                })
            }
        }
        try {
            switch (action[0]) {
                case "menucmd": {
                    let hit_total;
                    try {
                        hit_total = await simple.fetchJson('https://api.countapi.xyz/hit/api-InzieOfcbot.herokuapp.com/visits')
                    } catch {
                        hit_total = {
                            value: "-"
                        }
                    }
                    hitall = `${hit_total.value == undefined ? '-' : hit_total.value}`
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
                    lang.menu(InzieOfc, THUMBNAIL, pushname, OWNER_NAME, OWNER, "/", hitall, latensii, os, simple, week, date, dateIslamic, username, isCreator, user.id.toString())
                }
                break
                case "animecmd": {
                    lang.animecmd(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "asupancmd": {
                    lang.asupancmd(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "cecancmd": {
                    lang.cecancmd(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "cogancmd": {
                    lang.cogancmd(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "downloadcmd": {
                    lang.downloadcmd(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "ephotocmd": {
                    lang.ephotocmd(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "ephotocmd2": {
                    lang.ephotocmd2(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "logocmd": {
                    lang.logocmd(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "logocmd2": {
                    lang.logocmd2(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "islamcmd": {
                    lang.islamcmd(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "nsfwcmd": {
                    lang.nsfwcmd(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "photooxycmd": {
                    lang.photooxycmd(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "textprocmd": {
                    lang.textprocmd(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "textprocmd2": {
                    lang.textprocmd2(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "textprocmd3": {
                    lang.textprocmd3(InzieOfc, THUMBNAIL, user_id.toString())
                }
                break
                case "owner": {
                    await InzieOfc.sendContact(OWNER_NUMBER, OWNER_NAME)
                    reply(`My lord [${OWNER_NAME}](${OWNER[0]}) 👑`)
                }
                break
                case "ytmp3": {
                    if (!args[2]) return reply(`Kirim perintah:\n/ytmp3 link youtube\n\nContoh penggunaan:\n/ytmp3 https://youtu.be/kwop2Eg5QY4`)
                    if (!isUrl(args[2])) return reply(`Kirim perintah:\n/ytmp3 link youtube\n\nContoh penggunaan:\n/ytmp3 https://youtu.be/kwop2Eg5QY4`)
                    if (!args[2].includes('youtu.be') && !args[2].includes('youtube.com')) return reply(`Kirim perintah:\n/ytmp3 link youtube\n\nContoh penggunaan:\n/ytmp3 https://youtu.be/kwop2Eg5QY4`)
                    reply(lang.wait)
                    await InzieOfc.deleteMessage()
                    let res = await fetch(global.api('alfa', '/api/downloader/youtube-audio', {
                        url: args[2]
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
                    if (size.replace("MB","") > 50 || size.replace("GB","") >= 1 ) { //batas download 50mb, tamabahin jika kurang (misal 100mb = 100000)
                let key = "「 YOUTUBE AUDIO 」\n\n"
                key += `• Id: ${id}\n`
                key += `• Title: ${title}\n`
                key += `• Quality: ${quality}\n`
                key += `• Size: ${filesize}\n`
                key += `• Download: ${getdl.data}\n\n`
                        key += `Ukuran media melebihi batas, silahkan download sendiri melalui link di atas.`
                        await InzieOfc.replyWithPhoto({
                            url: thumbnail
                        }, {
                            caption: key
                        })
                        await InzieOfc.replyWithAudio({
                            url: download,
                            filename: title
                        })
                    } else {
                        let key = "「 YOUTUBE AUDIO 」\n\n"
                        key += `• Id: ${id}\n`
                        key += `• Title: ${title}\n`
                        key += `• Quality: ${quality}\n`
                        key += `• Size: ${filesize}\n`
                        key += `• Download: ${getdl.data}\n\n`
                        key += `Silahkan download melalui link di atas jika media tidak di kirim`
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
                case "ytmp4": {
                    if (!args[2]) return reply(`Kirim perintah:\n/ytmp4 link youtube\n\nContoh penggunaan:\n/ytmp4 https://youtu.be/kwop2Eg5QY4`)
                    if (!isUrl(args[2])) return reply(`Kirim perintah:\n/ytmp4 link youtube\n\nContoh penggunaan:\n/ytmp4 https://youtu.be/kwop2Eg5QY4`)
                    if (!args[2].includes('youtu.be') && !args[2].includes('youtube.com')) return reply(`Kirim perintah:\n/ytmp4 link youtube\n\nContoh penggunaan:\n/ytmp4 https://youtu.be/kwop2Eg5QY4`)
                    reply(lang.wait)
                    await InzieOfc.deleteMessage()
                    let res = await fetch(global.api('alfa', '/api/downloader/youtube-video', {
                        url: args[2]
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
                    if (size.replace("MB","") > 50 || size.replace("GB","") >= 1 ) { //batas download 50mb, tamabahin jika kurang (misal 100mb = 100000)
                        let key = "「 YOUTUBE VIDEO 」\n\n"
                        key += `• Id: ${id}\n`
                        key += `• Title: ${title}\n`
                        key += `• Quality: ${quality}\n`
                        key += `• Size: ${filesize}\n`
                        key += `• Download: ${getdl.data}\n\n`
                        key += `Ukuran media melebihi batas, silahkan download sendiri melalui link di atas.`
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
                    } else {
                        let key = "「 YOUTUBE VIDEO 」\n\n"
                        key += `• Id: ${id}\n`
                        key += `• Title: ${title}\n`
                        key += `• Quality: ${quality}\n`
                        key += `• Size: ${filesize}\n`
                        key += `• Download: ${getdl.data}\n\n`
                        key += `Silahkan download melalui link di atas jika media tidak di kirim`
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
            }
        } catch (e) {
            console.log(e)
        }
    })
    bot.command('help', async (InzieOfc) => {
        user = simple.getUserName(InzieOfc.message.from)
        await InzieOfc.reply(lang.first_chat(BOT_NAME, user.full_name), {
            parse_mode: "MARKDOWN",
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Script',
                        url: "https://github.com/lorenzxz/telebot"
                    }, {
                        text: 'Owner',
                        url: OWNER[0]
                    }]
                ]
            }
        })
    })

    bot.command('start', async (InzieOfc) => {
        let user = simple.getUserName(InzieOfc.message.from)
        await InzieOfc.reply(lang.first_chat(BOT_NAME, user.full_name), {
            parse_mode: "MARKDOWN",
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Script',
                        url: "https://github.com/lorenzxz/telebot"
                    }, {
                        text: 'Owner',
                        url: OWNER[0]
                    }]
                ]
            }
        })
    })
    bot.on('new_chat_members', async (chat) => {
	console.log(chat.message.from)
	let d = new Date(new Date + 3600000)
			let locale = 'id'
			let week = d.toLocaleDateString(locale, { weekday: 'long' })
			let date = d.toLocaleDateString(locale, {
     		 day: 'numeric',
  		    month: 'long',
    		  year: 'numeric'
		    })
            const jamnyy = moment.tz("Asia/Jakarta").format('HH:mm:ss')
	var message = chat.message
	var pp_group = await simple.getPhotoProfile(message.chat.id)
	var groupname = message.chat.title
	var groupmembers = await bot.telegram.getChatMembersCount(message.chat.id)
	for (x of message.new_chat_members) {
		var pp_user = await simple.getPhotoProfile(x.id)
		var full_name = simple.getUser(x).full_name
		var teks = `*Welcome to ${groupname}*

📛 : \`${full_name}\`
🆔 : \`${message.from.id}\`
🌐 : \`${message.from.language_code}\`
🏅 : \`${groupmembers} Members\`
📆 : \`${week}, ${date}\`
⏰ : \`${jamnyy} Asia/Jakarta\`
`
    	await chat.replyWithPhoto({
			url: global.api('alfa', '/api/canvas/welcomev2', {
                    avatar: pp_user,
                    username: full_name,
                    background: pp_group,
                    guildname: groupname,
                    membercount: groupmembers
               }, 'apikey')
		},{
		  caption: teks, parse_mode: 'Markdown', disable_web_page_preview: true
		})
	}
})
    bot.on('left_chat_member', async (chat) => {
	console.log(chat.message.from)
	var message = chat.message
	var pp_user = await simple.getPhotoProfile(message.left_chat_member.id)
	var pp_group = await simple.getPhotoProfile(message.chat.id)
	var groupname = message.chat.title
	var groupmembers = await bot.telegram.getChatMembersCount(message.chat.id)
	var pp_user = await simple.getPhotoProfile(message.left_chat_member.id)
	var full_name = simple.getUser(message.left_chat_member).full_name
  var outt = `◪ Goodbye ${full_name}

◪ Leave from group: 
${groupname}

└─ ❏ Nomor: [${full_name}](https://t.me/${message.from.username})
GoodBye~~`
	await chat.replyWithPhoto({ url: global.api('alfa', '/api/canvas/goodbyev2', {
                    avatar: pp_user,
                    username: full_name,
                    background: pp_group,
                    guildname: groupname,
                    membercount: groupmembers
               }, 'apikey') }, 
	{caption: outt, parse_mode: 'Markdown'})
})
    bot.on('message', async (InzieOfc) => {
        require("../InzieOfcTelegram/InzieOfcMain")(InzieOfc, bot)
    })

    bot.launch({
        dropPendingUpdates: true
    })

    bot.telegram.getMe().then((getme) => {
        console.table({
            "Bot Name": getme.first_name,
            "Username": "@" + getme.username,
            "ID": getme.id,
            "Link": `https://t.me/${getme.username}`,
            "Author": "https://t.me/InzKwece"
        })
    })
}
startInzieOfc()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))