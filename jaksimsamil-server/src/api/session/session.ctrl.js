/* POST /api/session/createproblem/:how
{
    problemList:[Number]
}
*/
exports.createProblem = async (ctx)=>{
    try{
        const how=ctx.params.how;
        if(how==='self'){

        }
        else if(how==='recommend'){

        }
    }
    catch(e){
        ctx.throw(500,e);
    }
};