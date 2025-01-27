const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: false, trim: true },
        lastName: { type: String, required: false, trim: true },
        email: { type: String, required: false, unique: false },
        profilePic: { type: String, required: false, match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
        role: { type: String, required: true, enum: ["cohort", "leader"] },
    }, 
    { timestamps: true }
);

const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);
module.exports = { TeamMember };