const db = require("../db/connection")

exports.fetchArticles = () => {
    // not entirely sure how joining works, will need a recap
    // was thinking of just comparing tables but that's not really using queries which is what the task wants
    // todo: get comments sorted (I feel like I'm behind)
    return db.query("SELECT *, COUNT(comments.article_title) as comment_count FROM articles JOIN comments ON articles.title = comments.article_title GROUP BY comments.article_title, articles.title").then(({rows}) => {
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