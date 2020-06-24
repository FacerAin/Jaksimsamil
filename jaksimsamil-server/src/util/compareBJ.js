exports.compareBJ = function (solvedBJ_new, problem_set) {
  try {
    let new_obj = [];
    for (let i = 0; i < solvedBJ_new.length; i++) {
      if (!problem_set.includes(String(solvedBJ_new[i].problem_number))) {
        new_obj.push(solvedBJ_new[i]);
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
