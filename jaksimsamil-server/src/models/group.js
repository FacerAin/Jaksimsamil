const mongoose = require("mongoose");

const { Schema } = mongoose;

const GroupSchema = new Schema({
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{
    collection: 'group'
});

const Group = mongoose.model('Group',GroupSchema);
module.exports = Group;