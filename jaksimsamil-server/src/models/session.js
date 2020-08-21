const mongoose = require("mongoose");

const { Schema } = mongoose;

const SessionSchema = new Schema({
    challengeId: { type: Schema.Types.ObjectId, ref: 'Challenge' },
    sessionStartDate: { type: Object },
    sessionEndDate: { type: Object }
});

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;