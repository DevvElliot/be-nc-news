const {fetchArticles, fetchArticleById} = require("../models/articles.model")

exports.getArticles = (req, res) => {
    fetchArticles().then((articles) => {
        res.status(200).send({articles: articles})
    })
}

exports.getArticleById = (req, res) => {
    const {article_id} = req.params
    fetchArticleById(article_id).then((article) => {
        res.status(200).send({article: article})
    })
}