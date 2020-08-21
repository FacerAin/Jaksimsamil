const mongoose = require("mongoose");

const { Schema } = mongoose;

const ParticipationSchema = new Schema({
    sessionId: { type: Schema.Types.ObjectId, ref: 'Session' },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group' }
});

const Participation = mongoose.model('Participation', ParticipationSchema);
module.exports = Participation;