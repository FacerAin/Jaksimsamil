const mongoose = require("mongoose");

const { Schema } = mongoose;

const SelectedProblemSchema=new Schema({
    problemNum: {type: Number, required: true},
    isSolved: {type:Boolean, default: false},
},{
    _id: false
});

const ParticipationSchema = new Schema({
    sessionId: { type: Schema.Types.ObjectId, ref: 'Session' },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group' },
    problems: [{type:SelectedProblemSchema}]
},{
    collection: 'particiaption'
});

ParticipationSchema.statics.findBySessionId=function(session){
    return this.find({sessionId:session._id});
}

ParticipationSchema.statics.findByGroupId=function(group){
    return this.find({groupId:group._id});
}

ParticipationSchema.methods.addProblem=function(problem){
    this.problems.push({problemNum:problem.problemNum,isSolved:problem.isSolved});
    return this.save();
}

ParticipationSchema.methods.serialize=function(){
    let participationJSON=this.toJSON();
    return participationJSON;
}

const Participation = mongoose.model('Participation', ParticipationSchema);
module.exports = Participation;