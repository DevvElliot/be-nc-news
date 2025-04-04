const express = require("express");

const { getTopics } = require("./controllers/topics.controller");
const {
    getArticles,
    getArticleById,
    getCommentsByArticleId,
} = require("./controllers/articles.controller");

const app = express();
const documentation = require("./endpoints.json");

const cors = require("cors");

app.use(cors());

app.get("/api", (req, res) => {
    res.status(200).send({ endpoints: documentation });
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.all("*", (req, res, next) => {
    res.status(404).send({ msg: "Not found" });
    next();
});

app.use((err, req, res, next) => {
    res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
