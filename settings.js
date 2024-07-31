//base by DGXeon
//re-upload? recode? copy code? give credit ya :)
//YouTube: @InzieOfc
//Instagram: inziebrokenhearts
//Telegram: t.me/Inzkwece
//GitHub: @BotAnjayy4
//WhatsApp: +6281515881647
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@Inzie ofc

// Require
const fs = require('fs')
const chalk = require('chalk')
const {
   indonesia
} = require("./InzieMedia/language");

/*--------------------------------------------*/

// Owner
global.ytname = "YT: Lorenzxz" //ur yt chanel name
global.socialm = "GitHub: Lorenzxz" //ur github or insta name
global.location = "Indonesia, Jawa Barat, Bandung" //ur location

/*--------------------------------------------*/

// Information
global.botname = 'InzieBotz' //ur bot name
global.ownernumber = '6289667644225' //ur owner number
global.ownername = 'InzieAntiGedor' //ur owner name
global.websitex = "https://youtube.com/@InzieOfc"
global.wagc = "https://chat.whatsapp.com/KmRXIQQpEILDzQ7aaJsycZ"
global.themeemoji = '🪀'
global.wm = "Inzie"
global.botscript = 'Di YT InzieOfc' //script link
global.packname = "Sticker By"
global.author = "InzieOfc\n\n+6289667644225"
global.creator = "6289667644225@s.whatsapp.net"

/*--------------------------------------------*/

// Telegram
global.OWNER = ["Inzie", "http://t.me/InzKwece"]
global.OWNER_NAME = "Inzie Lek"
global.BOT_TOKEN = '-'
global.APIKeys = {
   'https://api.zeeoneofc.my.id': '-',
}   
global.BOT_NAME = "Inzie"   
global.THUMBNAIL = "./InzieMedia/image/lol.jpg"
global.DONASI = "./InzieMedia/image/donasi.jpg"
global.language = indonesia
global.lang = language //don't change

/*--------------------------------------------*/

// APIs
global.apiId = {
 smm: '-',
 lapak: '-',
 litensi: '-'
}

// Apikey
global.api = {
 smm: '-',
 lapak: '-',
 litensi: '-',
 atlantic: '-',
 osu: '-'
}

global.APIs = {
   alfa: 'https://api.zeeoneofc.my.id',
   smm: "https://smmnusantara.id",
   lapak: "https://panel.lapaksosmed.com",
   atlantic: "https://atlantich2h.com/layanan/price_list"
   }

/*--------------------------------------------*/

// Prefix & Premium
global.xprefix = '.'
global.premium = ["6283825536262"] // Premium User
global.hituet = 0

/*--------------------------------------------*/

// Pterodactyl
global.domain = 'https://inziepanel.com' // Isi Domain Lu
global.apikey = 'ptla_' // Isi Apikey Plta Lu
global.capikey = 'ptlc_' // Isi Apikey Pltc Lu
global.eggsnya = '15' // id eggs yang dipakai
global.location = '1' // id location


/*--------------------------------------------*/    

// Type
global.typemenu = 'v12' // menu type 'v1' => 'v12'
global.typereply = 'v4' // reply type 'v1' => 'v4'
global.autoblocknumber = '92' //set autoblock country code
global.antiforeignnumber = '91' //set anti foreign number country code
global.welcome = false //welcome/left in groups
global.anticall = false //bot blocks user when called
global.autoswview = false //auto status/story view
global.adminevent = false //show promote/demote message
global.groupevent = false //show update messages in group chat
//msg
global.mess = {
	limit: 'Your limit is up!',
	nsfw: 'Nsfw is disabled in this group, Please tell the admin to enable',
    done: 'Done✓',
    error: 'Error!',
    success: 'Here you go!',
    owner: 'Only owner can do that!',
    bugrespon: 'Success!'
}

/*--------------------------------------------*/

// Thumbnail
global.thumb = fs.readFileSync('./InzieMedia/theme/InzieFoto.jpg')

/*--------------------------------------------*/

// Bug Text
global.xbugtex = {
xtxt: '🚨Lorenzxz🚨',
}
global.bimg = '-'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})