//JShint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://unsorted:AMIlihanas%4019@cluster0.wqps4.mongodb.net/blogDB?retryWrites=true&w=majority").then("Successfully Connected");

const postSchema = {
    title:String,
    content:String,
}

const Post = mongoose.model("Post",postSchema);


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;


app.get("/",(req,res)=>{
    Post.find({},(err,post)=>{
        if(!err){
            res.render("home",{postDatas:post,});
        }
        else{
            console.log(err);
        }
    });
    
});

const contactData = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis natus nulla dignissimos ut earum voluptatibus similique quas deserunt aspernatur sed! Ex, itaque! Magnam veritatis, ipsum debitis perferendis commodi ad temporibus repudiandae saepe fuga non nulla consectetur repellat eius sapiente nemo molestiae odit voluptas magni ipsam, nostrum quis explicabo ex voluptate! Odit harum expedita tenetur explicabo maiores vel adipisci hic sequi.`;

app.get("/contact",(req,res)=>{
    res.render("contact",{contactPage:contactData});
});

aboutData = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil totam voluptatibus illum, impedit quibusdam cupiditate, rerum saepe, quaerat et maiores fugiat! Impedit illum, corporis, quas dolorem nemo temporibus nesciunt dolores quod sed maiores magni tenetur voluptatibus quaerat rerum vitae. Deleniti perferendis mollitia hic molestiae fugiat. Rerum laboriosam porro libero?`;

app.get("/about",(req,res)=>{
    res.render("about",{aboutPage:aboutData,});
});

app.get("/compose",(req,res)=>{
    res.render("compose");
});

app.post("/compose",(req,res)=>{
    const post= new Post({
        title:req.body.postTitle,
        content:req.body.postBody,
    });
    post.save(function(err){
        if(!err){    
            res.redirect("/");
        }
    });
})

app.get("/post/:postId",(req,res)=>{
    const reqPostID=(req.params.postId);
    Post.findOne({_id:reqPostID},(err,post)=>{
        if(!err){
            res.render("post",{
                postTitle:post.title,
                postText:post.content,
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});