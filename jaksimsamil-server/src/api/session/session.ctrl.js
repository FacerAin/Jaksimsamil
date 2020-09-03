const Participation = require("../../models/participation");
const Session = require("../../models/session");
const Group = require("../../models/group");
const User = require("../../models/user");
const mongoose = require("mongoose");

const {ObjectId} = mongoose.Types;

/* POST /api/session/createproblem/:how
{   
    sessionId: ObjectId,
    groupId: ObjectId,
    problemList:[Number],
}
*/
exports.createProblem = async (ctx)=>{
    try{
        let {sessionId,groupId,problemList} = ctx.request.body;
        if(typeof(sessionId)==='string'){
            sessionId=new ObjectId(sessionId);
        }
        if(typeof(groupId)==='string'){
            groupId=new ObjectId(groupId);
        }
        if(typeof(problemList)==='string'){
            problemList=JSON.parse(problemList);
        }
        const participation = await Participation.findOne({sessionId:sessionId,groupId:groupId});
        const group = await Group.findById(groupId);
        const how=ctx.params.how;
        if(how==='self'){
            let check = true;
            for(let i=0;i<group.members.length;i++){
                const user = await User.findById(group.members[i]);
                console.log(user);
                console.log(typeof(user.solvedBJ_date.solvedBJbyDATE));
                let userProblemList = [];
                for(let key in user.solvedBJ_date.solvedBJbyDATE){
                    userProblemList.push(user.solvedBJ_date.solvedBJbyDATE[key]);
                }
                userProblemList=userProblemList.flat().map(elem=>elem.problem_number);
                for(let j=0;j<problemList.length;j++){
                    if(userProblemList.includes(problemList[j])){
                        check = false;
                        break;
                    }
                }
            }
            if(!check){
                ctx.throw('그룹원이 이미 푼 문제는 등록할 수 없습니다.');
                return;
            }
            else{
                problemList.map(async problemNum=>await participation.addProblem({problemNum:problemNum,isSolved:false}));
                ctx.body=participation.serialize(); 
            }
        }
        else if(how==='recommend'){
            //TODO
        }
    }
    catch(e){
        ctx.throw(500,e);
    }
};