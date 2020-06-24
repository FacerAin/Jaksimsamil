let moment = require("moment");

exports.analyzeBJ = function (solvedBJ) {
  try {
    if (solvedBJ) {
      let presentDate = moment();
      let presentDate_str = presentDate.format("YYYYMMDD");
      let latestDate = moment(solvedBJ[0].solved_date, "YYYYMMDD");
      let difflatest = presentDate.diff(latestDate, "days");

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
        latestDate: latestDate.format("YYYYMMDD"),
        difflatest: difflatest,
        latestNum: latestNum,
        presentNum: presentNum,
        solvedBJbyDATE: solvedBJbyDATE,
      };

      return returnOBJ;
    }
  } catch (e) {
    console.log(e);
  }
};
