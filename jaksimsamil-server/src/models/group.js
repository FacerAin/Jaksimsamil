const mongoose = require("mongoose");

const { Schema } = mongoose;

const GroupSchema = new Schema({
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{
    collection: 'group'
});

GroupSchema.methods.addGroupMemeber=function(user){
    this.members.push({$oid:user._id.$oid});
    return this.save();
}

const Group = mongoose.model('Group',GroupSchema);
module.exports = Group;