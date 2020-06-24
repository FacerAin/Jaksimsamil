/*
2. 현재 날짜와의 차이 => 
3. 오늘 푼 문제 => 앞에서부터 순회하면서 데이트 같은거 찾기
3. 최근 일주일간 푼 문제 수 => 앞에서부터 순회하면서 - 값이 
4. 추천 문제 => 정규 셋에서 없는거 찾기
5. 날짜별로 묶기.
데이터베이스에서 처리하자
*/

let moment = require('moment');

exports.analyzeBJ = function (solvedBJ) {
  try {
    if (solvedBJ) {
      console.log(solvedBJ[0]);
      let presentDate = moment();
      let presentDate_str = presentDate.format('YYYYMMDD');
      let latestDate = moment(solvedBJ[0].solved_date, 'YYYYMMDD');
      let difflatest = presentDate.diff(latestDate, 'days');

      let solvedBJbyDATE = {};
      for (let i = 0; i < solvedBJ.length; i++) {
        if (!(solvedBJ[i].solved_date in solvedBJbyDATE)) {
          solvedBJbyDATE[solvedBJ[i].solved_date] = [];
          solvedBJbyDATE[solvedBJ[i].solved_date].push(solvedBJ[i]);
        } else {
          solvedBJbyDATE[solvedBJ[i].solved_date].push(solvedBJ[i]);
        }
      }

      let latestNum = solvedBJbyDATE[solvedBJ[0].solved_date].length;
      let presentNum =
        presentDate_str in solvedBJbyDATE
          ? solvedBJbyDATE[presentDate_str].length
          : 0;
      let returnOBJ = {
        latestDate: latestDate.format('YYYYMMDD'),
        difflatest: difflatest,
        latestNum: latestNum,
        presentNum: presentNum,
        solvedBJbyDATE: solvedBJbyDATE,
      };
      console.log(returnOBJ);
      return returnOBJ;
    }
  } catch (e) {
    console.log(e);
  }
};
