const scrapBot = require("./scraperBot")

const scrapData = async( req , res)=>{
 const url  = req.body
  const data = await scrapBot.scrapBot(url.src)
  await res.send(data)
}

module.exports={scrapData}