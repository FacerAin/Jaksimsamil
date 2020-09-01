const mongoose = require("mongoose");

const { Schema } = mongoose;

const GroupSchema = new Schema({
    groupName: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{
    collection: 'group'
});

GroupSchema.statics.findByGroupName=function(groupName){
    return this.find({groupName:groupName});
}

GroupSchema.methods.addGroupMember=function(user){
    this.members.push(user._id);
    return this.save();
}

GroupSchema.methods.getMembers=function(){
    return this.members;
}

GroupSchema.methods.serialize=function(){
    let groupJSON=this.toJSON();
    return groupJSON;
}

const Group = mongoose.model('Group',GroupSchema);
module.exports = Group;