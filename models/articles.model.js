const db = require("../db/connection")

exports.fetchArticles = () => {
    return db.query("SELECT * FROM articles").then(({rows}) => {
        return rows
    })
}

exports.fetchArticleById = (articleId) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1", [articleId])
    .then(({rows}) => {
        if (rows.length === 0) return Promise.reject()
        return rows
    })
}