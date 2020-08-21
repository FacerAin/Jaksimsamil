const mongoose = require("mongoose");

const { Schema } = mongoose;

const GroupSchema = new Schema({
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Group = mongoose.model('Group',GroupSchema);
module.exports = Group;