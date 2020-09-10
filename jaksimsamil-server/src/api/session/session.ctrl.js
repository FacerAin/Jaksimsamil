const axios = require("axios");
const Participation = require("../../models/participation");
const Session = require("../../models/session");
const Group = require("../../models/group");
const User = require("../../models/user");
const Challenge = require("../../models/challenge");
const Problem = require("../../models/problem");
const mongoose = require("mongoose");
require('dotenv').config();

const {ObjectId} = mongoose.Types;

/* POST /api/session/createproblem/:how
{   
    sessionId: ObjectId or String,
    groupId: ObjectId or String,
    problemList:[Number], (optional)
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
        const session = await Session.findById(sessionId);
        const challengeId = session['challengeId'];
        const challenge = await Challenge.findById(challengeId);
        const goalPerSession = challenge['goalPerSession'];
        const participation = await Participation.findOne({sessionId:sessionId,groupId:groupId});
        const group = await Group.findById(groupId);
        const how=ctx.params.how;
        if(how==='self'){
            if(problemList.length!==goalPerSession){
                ctx.throw(400,'문제 수가 맞지 않습니다.');
            }
            let check = true;
            for(let i=0;i<group.members.length;i++){
                const user = await User.findById(group.members[i]);
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
                ctx.throw(400,'그룹원이 이미 푼 문제는 등록할 수 없습니다.');
                return;
            }
            else{
                problemList.map(async problemNum=>await participation.addProblem({problemNum:problemNum,isSolved:false}));
                ctx.body=participation.serialize(); 
            }
        }
        else if(how==='recommend'){
            let groupProblemList=[];
            let selectedProblemList=[];
            for(let i=0;i<group.members.length;i++){
                const user = await User.findById(group.members[i]);
                for(let key in user.solvedBJ_date.solvedBJbyDATE){
                    groupProblemList.push(user.solvedBJ_date.solvedBJbyDATE[key]);
                }
            }
            groupProblemList=groupProblemList.flat().sort((a,b)=>new Date(b.solvedDate)-new Date(a.solvedDate)).map(elem=>elem.problem_number);
            groupProblemList=groupProblemList.filter((x,i)=>groupProblemList.indexOf(x)===i);
            console.log(groupProblemList);
            const problems=await Problem.find({}).sort({count:-1});
            console.log(problems);
            console.log(goalPerSession);
            for(let i=0;i<problems.length;i++){
                if(!groupProblemList.includes(String(problems[i].problemNum))){
                    selectedProblemList.push(String(problems[i].problemNum));
                }
                if(selectedProblemList.length===goalPerSession || i/problems.length >= 0.75){
                    break;
                }
            }
            for(let i=0; i<groupProblemList.length && selectedProblemList.length < goalPerSession; i++){
                const p = await Problem.findOne({problemNum:groupProblemList[i]});
                if( Number(p.solvedacLevel)< 1 || Number(p.solvedacLevel)>30 ){
                    continue;
                }
                const body = await axios.get(`https://api.solved.ac/v2/search/problems.json?query=solvable:true+tier:${p.solvedacLevel}&page=1&sort=solved&sort_direction=desc`);
                let data = body.data;
                if(typeof(data)==='string'){
                    data=JSON.parse(data);
                }
                for(let j=0;j<data.result.problems.length;j++){
                    if(!groupProblemList.includes(data.result.problems[j].id)){
                        selectedProblemList.push(data.result.problems[j].id.toString());
                        break;
                    }
                }
            }
            selectedProblemList.map(async problemNum=>await participation.addProblem({problemNum:problemNum,isSolved:false}));
            ctx.body=participation.serialize(); 
        }
    }
    catch(e){
        console.error(e);
        ctx.throw(500,e);
    }
};


// GET /api/session/status?sessionId&groupId

exports.status=async (ctx)=>{
    try{
        let {sessionId,groupId}=ctx.request.query;
        if(typeof(sessionId)==='string'){
            sessionId=new ObjectId(sessionId);
        }
        if(typeof(groupId)==='string'){
            groupId=new ObjectId(groupId);
        }
        const participation=await Participation.findOne({sessionId:sessionId,groupId:groupId});
        const group = await Group.findById(groupId);
        for(let i=0;i<group.members.length;i++){
            const user=await User.findById(group.members[i]);
            await axios.patch(`http://localhost:${process.env.SERVER_PORT}/api/profile/syncBJ`,{username:user.username});
        }
        for(let i=0;i<group.members.length;i++){
            const user=await User.findById(group.members[i]);
            let userProblemList = [];
            for(let key in user.solvedBJ_date.solvedBJbyDATE){
                userProblemList.push(user.solvedBJ_date.solvedBJbyDATE[key]);
            }
            userProblemList=userProblemList.flat().map(elem=>elem.problem_number);
            for(let j=0;j<participation.problems.length;j++){
                if(userProblemList.includes(String(participation.problems[i].problemNum))){
                    participation.problems[i].isSolved=true;
                    await participation.save();
                }
            }
        }
        ctx.body=participation.serialize();
    }
    catch(e){
        ctx.throw(500,e);
    }
}