exports.compareBJ = function (solvedBJ_new, problem_set) {
  try {
    let new_obj = [];

    for (let i = 0; i < problem_set.length; i++) {
      let found = false;
      for (let j = 0; j < solvedBJ_new.length; j++) {
        if (solvedBJ_new[j].problem_number == problem_set[i].problem_number) {
          found = true;
          break;
        }
      }
      if (!found) {
        new_obj.push(problem_set[i]);
      }
    }
    return new_obj;
  } catch (e) {
    console.log(e);
  }
};

exports.randomItem = function (a) {
  return a[Math.floor(Math.random() * a.length)];
};
