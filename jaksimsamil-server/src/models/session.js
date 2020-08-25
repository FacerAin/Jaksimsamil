const mongoose = require("mongoose");

const { Schema } = mongoose;

const SessionSchema = new Schema({
    challengeId: { type: Schema.Types.ObjectId, ref: 'Challenge' },
    sessionStartDate: { type: Object },
    sessionEndDate: { type: Object },
    isOpen: { type: Boolean  }
},{
    collection: 'session'
});

SessionSchema.statics.findByChallengeId=function(challenge){
    return this.find({challengeId:challenge._id.$oid});
}

SessionSchema.methods.getSessionStartDate=function(){
    return this.sessionStartDate;
}

SessionSchema.methods.getSessionEndDate=function(){
    return this.sessionEndDate;
}

SessionSchema.methods.getIsOpen=function(){
    return this.isOpen;
}

SessionSchema.methods.serialize=function(){
    return this.toJSON();
}

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;