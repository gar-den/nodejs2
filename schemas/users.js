const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
});

UserSchema.virtual('userId').get(function () {
    return this._id.toHexString();
});  // make front-end refer this value

UserSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Users", UserSchema);