const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const connect = require("./connection/connect");
const app = express();
app.use(bodyParser.json());
const loginRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
let jwt = require("jsonwebtoken");
const secret = "BLOGAPP";
const cors = require("cors");

app.use(cors());

//adding jwt token
app.use("/api/posts", (req, res, next)=> {
    // console.log("inside jwt")
    if(req.headers.authorization) {
        const token = req.headers.authorization;
        if(token) {
            // console.log(token)
            jwt.verify(token, secret, function(err,decoded) {
                if(err) {
                    return res.status(403).json({
                        status: "failed",
                        message: "Invalid token"
                    })
                }
                // console.log(decoded.data)
                // console.log("hello")
                req.user = decoded.data;
                next();
            })
        }
        else {
            return res.status(403).json({
                status: "failed",
                message: "not authenticated user"
            })
        }
    }
})


app.use("/api/user",loginRoutes);
app.use("/api/posts",postRoutes);




app.listen(8000,()=> {
    console.log("the server is up at 8000 port")
})