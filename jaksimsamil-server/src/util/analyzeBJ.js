let moment = require("moment");
const problem_set = require("../data/problem_set");
const compareBJ = require("./compareBJ");
exports.analyzeBJ = function (solvedBJ) {
  try {
    if (solvedBJ) {
      let presentDate = moment();
      let presentDate_str = presentDate.format("YYYYMMDD");
      let latestDate = moment(solvedBJ[0].solved_date, "YYYYMMDD");
      let difflatest = presentDate.diff(latestDate, "days");
      let latestSolve = solvedBJ[0];

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

      let weekNUM = 0;
      let monthNUM = 0;
      let totalNUM = 0;
      for (let i = 0; i < solvedBJ.length; i++) {
        let diffDate = presentDate.diff(
          moment(solvedBJ[i].solved_date, "YYYYMMDD"),
          "days"
        );
        if (diffDate <= 7) {
          weekNUM++;
          monthNUM++;
          totalNUM++;
        } else if (diffDate <= 31) {
          monthNUM++;
          totalNUM++;
        } else {
          totalNUM++;
        }
      }

      let unsolved_data = compareBJ.compareBJ(
        solvedBJ,
        problem_set.problem_set
      );
      let recommend_data = compareBJ.randomItem(unsolved_data);

      let returnOBJ = {
        latestDate: latestDate.format("YYYYMMDD"),
        difflatest: difflatest,
        latestNum: latestNum,
        presentNum: presentNum,
        weekNum: weekNUM,
        monthNum: monthNUM,
        totalNum: totalNUM,
        solvedBJbyDATE: solvedBJbyDATE,
        latestSolve: latestSolve,
        recommend_data: recommend_data,
      };

      return returnOBJ;
    }
  } catch (e) {
    console.log(e);
  }
};
