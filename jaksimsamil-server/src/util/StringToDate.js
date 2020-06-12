exports.StringToDate_BJ = function (date_str) {
  let arr_date = date_str.split(" "); //yyyy m dd tt MM SS Fomat LIST
  let arr_date_r = arr_date.map(function (str) {
    let str_r = str.slice(0, -1);

    return str_r.length == 1 ? "0" + str_r : str_r;
  });

  return arr_date_r[0] + arr_date_r[1] + arr_date_r[2]; //YYYYMMDD 형식으로 반환
};
