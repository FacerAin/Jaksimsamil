var getBJ = require("./getBJ");
var fs = require("fs");

const test = async (userid) => {
  let lst = await getBJ.getBJ(userid);
  let return_lst = [];
  for (let i = 0; i < lst.length; i++) {
    return_lst.push(lst[i].problem_number);
  }

  var stringJson = JSON.stringify(return_lst) + "\n";
  fs.open("test.json", "a", "666", function (err, id) {
    if (err) {
      console.log("file open err!!");
    } else {
      fs.write(id, stringJson, null, "utf8", function (err) {
        console.log("file was saved!");
      });
    }
  });
};

/*

*/
test("jwseo001");
