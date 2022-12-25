const puppeteer = require("puppeteer");

const scrapBot = async (link) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(link);
  const scrapImage = async () => {
    let imageBank = await page.evaluate(() => {
      let imgTags = Array.from(document.querySelectorAll("img"));
      let imageArray = [];
      imgTags.map((image) => {
        let src = image.src;
        imageArray.push(src);

        imageArray = imageArray.filter((url) => {
          return url.includes("-100x100");
        });
      });
      imageArray = imageArray.map((url) => {
        return url.replace("-100x100", "");
      });
      return imageArray;
    });

    return imageBank;
  };
  const scrapPrice = async () => {
    let price = await page.evaluate(() => {
      let priceTag = document.querySelector(".price");
      return priceTag.innerText;
    });

    return price;
  };

  const price = await scrapPrice();
  const image = await scrapImage();
  await browser.close();
  const sortedImageArray = image.map((item) => {
    return { src: item };
  });
  return { price: price, image: sortedImageArray };
};

module.exports = { scrapBot };
