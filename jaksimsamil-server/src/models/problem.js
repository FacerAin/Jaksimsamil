const mongoose=require('mongoose');

const {Schema}=mongoose;

const ProblemSchema=new Schema({
    problemNum: {type: Number, required: true, unique: true},
    problemTitle: {type: String, required: true},
    solvedacLevel: {type: Number},
    sumbitNum: {type: Number, required: true},
    correctNum: {type: Number, required: true},
    count: { type: Number },
    category: {type:[String]}
},{
    collection: 'problem'
});

ProblemSchema.statics.findByProblemNum=function(problemNum){
    return this.findOne({problemNum:problemNum});
}

ProblemSchema.methods.addCategory=function(category){
    this.category.push(category);
    return this.save();
}

ProblemSchema.methods.removeCategory=function(category){
    const idx=this.category.findIndex(item=>item===category);
    this.splice(idx,1);
    return this.save();
}

ProblemSchema.methods.getProblemNum=function(){
    return this.problemNum;
}

ProblemSchema.methods.getProblemTitle=function(){
    return this.problemTitle;
}

ProblemSchema.methods.getSolvedacLevel=function(){
    return this.solvedacLevel;
}

ProblemSchema.methods.getSumbitNum=function(){
    return this.sumbitNum;
}

ProblemSchema.methods.getCorrectNum=function(){
    return this.correctNum;
}

ProblemSchema.methods.getCount=function(){
    return this.count;
}

ProblemSchema.methods.getCategory=function(){
    return this.category;
}

ProblemSchema.methods.serialize=function(){
    return this.toJSON();
}

const Problem = mongoose.model('Problem',ProblemSchema);
module.exports = Problem;