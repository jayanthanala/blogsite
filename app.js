//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin-jayanth:<willaddconfigfile>@blogwebsite-c9tg9.mongodb.net/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const homeStartingContent = "Blog developed by Jayant. MongoDB and Heroku";
const aboutContent = "Jayanth Anala.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = new mongoose.Schema({
  title:String,
  content:String
});

const Post = mongoose.model("Post",postSchema);


app.get("/",function(req,res){

  Post.find({}, function(err, posts){
   res.render("home", {
     homeContent: homeStartingContent,
     postOn: posts
     });
 });

});

app.get("/about",function(req,res){
  res.render("about",{aboutContents: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContents: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});


app.get("/posts/:thing",function(req,res){
  var paramId = req.params.thing;
  Post.findOne({_id:paramId},function(err,posts){
    res.render("post", {
      heading: posts.title,
      paragraph: posts.content
    });
  });


});


app.post("/compose",function(req,res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

 post.save(function(err){
   if (!err){
     res.redirect("/");
   }
 });
  // console.log(post)
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
