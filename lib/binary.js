//base by DGXeon
//re-upload? recode? copy code? give credit ya :)
//YouTube: @Lorenzxz
//Instagram: Lorenzxz
//Telegram: t.me/Lorenzobotinc
//GitHub: @Lorenzxz
//WhatsApp: +6283825536262
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@Lorenzxz

async function dBinary(str) {
var newBin = str.split(" ")
var binCode = []
for (i = 0; i < newBin.length; i++) {
    binCode.push(String.fromCharCode(parseInt(newBin[i], 2)))
  }
return binCode.join("")
}

async function eBinary(str = ''){    
let res = ''
res = str.split('').map(char => {       
return char.charCodeAt(0).toString(2);  
 }).join(' ')
return res
}

module.exports = { dBinary, eBinary }