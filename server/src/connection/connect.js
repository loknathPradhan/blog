const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/blog_app")
.then(console.log("connected to db")).catch(console.error);