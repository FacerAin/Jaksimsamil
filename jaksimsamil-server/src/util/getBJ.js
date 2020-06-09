const axios = require("axios");
const cheerio = require("cheerio");
let userid_test = "syw5141";
const getHtml = async (userid) => {
  try {
    return await axios.get("https://www.acmicpc.net/user/" + userid);
  } catch (error) {
    console.log(error);
  }
};

getHtml(userid_test).then((html) => {
  let psList = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $("div.panel-body").children();

  $bodyList.each(function (i) {
    if (i % 2 == 0) {
      psList[i / 2] = {
        problem_number: $(this).children().text(),
        problem_title: $(this).next().children().text(),
      };
    }
  });

  console.log(psList);
  return psList;
});

//body > div.wrapper > div.container.content > div.row > div:nth-child(2) > div:nth-child(3) > div.col-md-9 > div:nth-child(1) > div.panel-body
