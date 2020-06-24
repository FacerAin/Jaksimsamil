/*
집중을 해보자.
새거와 데이터가 있다.
데이터 기준으로 새거에 자료가 있으면 넘어가기
없으면 새 배열에 추가
키만 모아둔 리스트를 만들자.
그렇게 해서 
반복은 새거 길이만큼
데이터에 있으면 추가 X
없으면 추가
그렇게 반환
*/

exports.compareBJ = function (solvedBJ_new, problem_set) {
  try {
    let new_obj = [];
    for (let i = 0; i < solvedBJ.length; i++) {
      if (solvedBJ_new[i].problem_number in problem_set) {
        new_obj.push(solvedBJ_new[i]);
      }
    }
    console.log(new_obj);
  } catch (e) {
    console.log(e);
  }
};
