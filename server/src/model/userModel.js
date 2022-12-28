const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: {type: String,trim:true},
    password: {type: String,trim:true}
})

const userModel = new mongoose.model("User", userSchema);
module.exports = userModel;
