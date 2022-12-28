const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();
const User = require("../model/userModel");
const Post = require("../model/blog")
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
routes.use(bodyParser.json());
const secret = "BLOGAPP";

routes.post("/", async(req,res)=> {
    try {
        console.log("iam in post of blog")
        const {title, description, image, author} = req.body;
        // console.log(req.user)

        const posts = await Post.create({
            user: req.user,
            title,
            image,
            description,
            author
        })

        res.json({
            status: "success",
            posts
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
})


routes.get("/:id", async (req,res) => {
    try {
        console.log("inside get blog "+ req.params.id)
        const posts = await Post.find({user: req.params.id});
        res.json({
            status: "success",
            posts
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

module.exports = routes;