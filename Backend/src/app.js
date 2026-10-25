const express = require('express');
const multer = require('multer');
const app = express();
const cors =require("cors")
const uploadImage = require('./services/storage.service');
app.use(cors())
app.use(express.json());

const postModel = require('./models/post.model');

const upload = multer({ storage: multer.memoryStorage() })

app.post('/create-post', upload.single('image'), async (req, res) => {

    console.log(req.body);
    console.log(req.file);
    const result = await uploadImage(req.file.buffer);

    const post = await postModel.create({
        image: result.url,
        request: req.body.caption
    })

    return res.status(200).json({
        message: "post created successfully",
        post
    })
})

app.get("/posts", async (req, res) => {
    const posts = await postModel.find();

    return res.status(200).json({
        message: "posts fetched successfully",
        posts
    })
})

module.exports = app;