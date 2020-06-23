/*
1. 날짜 순 정렬
2. 현재 날짜와의 차이
3. 최근 일주일간 푼 문제 수
4. 추천 문제
*/
exports.analyzeBJ = function (solvedBJ) {
  console.log(typeof solvedBJ);
  if (solvedBJ) {
    solvedBJ.sort(function (a, b) {
      return a.solvedDate > b.solvedDate
        ? -1
        : a.solvedDate < b.solvedDate
        ? 1
        : 0;
    });
    console.log(solvedBJ);
  }
};
