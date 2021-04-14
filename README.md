# Wiki-API

A simple RESTful API using NodeJS, ExpressJS and MongoDB

1) npm install - install all node modules
2) node app.js - run the sever 
3) /articles - get, post, delete (chained route handlers)
4) /articles/specific_article - get, put, patch, delete

Schema of the collection:
articleSchema = {
title: String,
content: String
};
