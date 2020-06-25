const axios = require("axios");
const cheerio = require("cheerio");
const StringToDate = require("./StringToDate");
/*
ToDO
- 예외 처리
*/
exports.getBJ = async function (userid) {
  let data_list = [];
  let next_page_link = "";

  await getStartPage(userid).then((html) => {
    //시작 페이지를 가져온다.
    //같은 객체를 두번 선언한다. 퍼포먼스에 문제 생길수도
    //함수에 객체를 넘기는 방법도 있다.
    //첫 페이지 가져온다.
    data_list.push(getData(html));
    next_page_link = getNextPageLink(html);
  });
  while (next_page_link != -1) {
    //다음 페이지를 가져온다.
    await getNextPage(next_page_link).then((html) => {
      data_list.push(getData(html));
      next_page_link = getNextPageLink(html);
    });
  }
  return data_list.flat(1);
};

const getStartPage = async (userid) => {
  //유저 아이디 입력
  try {
    return await axios.get(
      "https://www.acmicpc.net/status?user_id=" + userid + "&result_id=4"
    );
  } catch (error) {
    console.log(error);
  }
};

const getNextPage = async (link) => {
  //링크 입력
  try {
    return await axios.get(link);
  } catch (error) {
    console.log(error);
  }
};

const getData = (html) => {
  //페이지 데이터 파싱
  let psArr = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $("#status-table > tbody");
  $bodyList.children().each((index, element) => {
    psArr.push({
      problem_number: $(element).find("a.problem_title").text(),
      problem_title: $(element).find("a.problem_title").attr("title"),
      solved_date: StringToDate.StringToDate_BJ(
        $(element).find("a.real-time-update").attr("title")
      ),
    });
  });
  return psArr;
};
const getNextPageLink = (html) => {
  //다음 페이지가 있으면 다음 페이지 주소 return, 없으면 -1 return
  const $ = cheerio.load(html.data);
  return $("#next_page").attr("href")
    ? "https://www.acmicpc.net/" + $("#next_page").attr("href")
    : -1;
};
