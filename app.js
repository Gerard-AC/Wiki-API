const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
  title: String,
  content:  String
};

const Article = mongoose.model("Article", articleSchema);

//requests targeting all articles - get, post, delete
app.route("/articles")

.get(function(req, res){
  Article.find({}, function(err, result){
    if(!err){
      res.send(result);
    }
    else{
      res.send(err);
    }
  });
})

.post(function(req, res){

  const newArticle = new Article ({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if(!err){
      res.send("Successfully inserted a new article");
    }
    else{
      res.send(err);
    }
  });

})

.delete(function(req, res){
  Article.deleteMany({}, function(err){
    if(!err){
      res.send("Successfully deleted all articles");
    }
    else{
      res.send(err);
    }
  })
});

//requests targeting a specific article - get, put, patch, delete
app.route("/articles/:specificArticleTitle")

.get(function(req, res){
  const articleTitle = req.params.specificArticleTitle;
  Article.findOne({title:articleTitle}, function(err, result){
    if(!err){
      res.send(result);
    }
    else{
      res.send(err);
    }
  });
})

.put(function(req, res){
  const articleTitle = req.params.specificArticleTitle;
  const newTitle = req.body.title;
  const newcontent = req.body.content;
  Article.replaceOne({title: articleTitle}, {title: newTitle, content: newcontent}, function(err, result){
    if(!err){
      res.send(result);
    }
    else{
      res.send(err);
    }
  });
})

.patch(function(req, res){
  const articleTitle = req.params.specificArticleTitle;
  Article.updateOne({title: articleTitle}, {$set: req.body}, function(err, result){
    if(!err){
      res.send(result);
    }
    else{
      res.send(err);
    }
  });
})

.delete(function(req, res){
  const articleTitle = req.params.specificArticleTitle;
  Article.deleteOne({title: articleTitle}, function(err, result){
    if(!err){
      res.send(result);
    }
    else{
      res.send(err);
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
