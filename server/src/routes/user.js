const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
routes.use(bodyParser.json());
const secret = "BLOGAPP";


routes.post("/register", async(req,res)=> {
    try {
        const {email,password} = req.body;

        let user = await User.findOne({email});
        if(user) {
            return res.status(401).json({
                status: "failed",
                message: "user already exists try to login"
            })
        }

        const users = await User.create({
            email,
            password
        })

        return res.json({
            status: "success",
            message: "Registration successfull",
            users
        })


    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
})

routes.post("/login", async (req,res)=> {
    try {
        // console.log("inside login")
        const {email, password} = req.body;
        let user = await User.findOne({email});

        if(!user) {
            res.status(401).json({
                status: "failed",
                message: "Seems like you have not registered yet, kindly register yourself"
            })
        }

        if(user.password === password) {
            const token = jwt.sign({
                exp:Math.floor(Date.now()/1000) + (60*60),
                data: user._id
            },secret)

            res.status(200).json({
                status: "success",
                message: "Login successfull",
                token,
                user: user._id
            });
        }
        else {
            res.status(401).json({
                status: "failed",
                message: "invalid credentials..!! please provide correct email/password"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})





module.exports = routes;