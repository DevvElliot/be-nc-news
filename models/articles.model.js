const db = require("../db/connection");

exports.fetchArticles = () => {
    // not entirely sure how joining works, will need a recap
    // was thinking of just comparing tables but that's not really using queries which is what the task wants
    // todo: get comments sorted (I feel like I'm behind)
    return db
        .query(
            `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::INT
        AS comment_count
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id
        GROUP BY comments.article_id, articles.article_id`
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.fetchArticleById = (articleId) => {
    return db
        .query("SELECT * FROM articles WHERE article_id = $1", [articleId])
        .then(({ rows }) => {
            if (rows.length === 0) return Promise.reject();
            return rows;
        });
};

exports.fetchCommentsByArticleId = (articleId) => {
    return db
        .query("SELECT * FROM comments WHERE article_id = $1", [articleId])
        .then(({ rows }) => {

            if (rows.length === 0) return Promise.reject();
            return rows;
        });
};
