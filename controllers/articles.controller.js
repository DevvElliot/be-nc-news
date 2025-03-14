const {fetchArticles, fetchArticleById, fetchCommentsByArticleId, handleCommentByArticleId} = require("../models/articles.model")

exports.getArticles = (req, res) => {
    fetchArticles().then((articles) => {
        res.status(200).send({articles: articles})
    })
}

exports.getArticleById = (req, res, next) => {
    const {article_id} = req.params
    fetchArticleById(article_id).then((article) => {
        res.status(200).send({article: article})
    })
    .catch((err) => {
        res.status(404).send({msg: "Not found (articleId does not exist)"})
    })
}

exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params
    fetchCommentsByArticleId(article_id).then((comments) => {
        res.status(200).send({comments: comments})
    })
}

exports.postCommentByArticleId = (req, res, next) => {
    const {article_id} = req.params
    const {username, body} = req.body
    handleCommentByArticleId(article_id, body, username).then((comment) => {
        res.status(201).send({comment: comment})
    })
    .catch((err) => {
        res.status(400).send({msg: "Bad request"})
    })
}