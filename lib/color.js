//base by DGXeon
//re-upload? recode? copy code? give credit ya :)
//YouTube: @Lorenzxz
//Instagram: Lorenzxz
//Telegram: t.me/Lorenzobotinc
//GitHub: @Lorenzxz
//WhatsApp: +6283825536262
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@Lorenzxz

const chalk = require('chalk')
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}
const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}
module.exports = {
	color,
	bgcolor
}
