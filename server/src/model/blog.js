const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    title: String,
    image: String,
    description: String,
    author: String
})

const blogModel = new mongoose.model("Blog", blogSchema);

module.exports = blogModel;