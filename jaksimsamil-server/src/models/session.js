const mongoose = require("mongoose");

const { Schema } = mongoose;

const SessionSchema = new Schema({
    challengeId: { type: Schema.Types.ObjectId, ref: 'Challenge' },
    sessionStartDate: { type: Object },
    sessionEndDate: { type: Object },
    status: { type: String  }
},{
    collection: 'session'
});

SessionSchema.statics.findByChallengeId=function(challenge){
    return this.find({challengeId:challenge._id});
}

SessionSchema.methods.getSessionStartDate=function(){
    return this.sessionStartDate;
}

SessionSchema.methods.getSessionEndDate=function(){
    return this.sessionEndDate;
}

SessionSchema.methods.getStatus=function(){
    return this.status;
}

SessionSchema.methods.serialize=function(){
    let sessionJSON=this.toJSON();
    return sessionJSON;
}

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;