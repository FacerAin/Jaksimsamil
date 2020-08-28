const mongoose = require("mongoose");

const { Schema } = mongoose;

const GroupSchema = new Schema({
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{
    collection: 'group'
});

GroupSchema.methods.addGroupMemeber=function(user){
    this.members.push(user._id);
    return this.save();
}

GroupSchema.methods.getMembers=function(){
    return this.members;
}

GroupSchema.methods.serialize=function(){
    return this.toJSON();
}

const Group = mongoose.model('Group',GroupSchema);
module.exports = Group;