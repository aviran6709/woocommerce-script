const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const api =require("./controllers/serverApi.js")
const scraper=require("./controllers/scraperApi")
const app = express();
const PORT = 3003;
app.options('*', cors());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 app.get("/" , api.getAllCategoris );
 app.get("/tags" , api.getAlltags );
 app.post("/" , api.uploudProduct );
app.post('/scrap',scraper.scrapData)

app.listen(PORT, () => {
  console.log("server connected");




  
});

