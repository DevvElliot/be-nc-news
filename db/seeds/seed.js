const db = require("../connection");
const format = require("pg-format");
const {convertTimestampToDate} = require("./utils")

const seed = ({ topicData, userData, articleData, commentData }) => {
    //const convertedTopicData = topicData.map((obj) => [obj.description, obj.slug, obj.img_url])

    return db
        .query(
            "DROP TABLE IF EXISTS topics CASCADE; CREATE TABLE topics(slug VARCHAR PRIMARY KEY NOT NULL, description VARCHAR, img_url VARCHAR(1000))"
        )
        .then(() => {
            return db.query(
                "DROP TABLE IF EXISTS users CASCADE; CREATE TABLE users(username VARCHAR PRIMARY KEY UNIQUE NOT NULL, name VARCHAR, avatar_url VARCHAR(1000))"
            );
        })
        .then(() => {
            return db.query(
                "DROP TABLE IF EXISTS articles CASCADE; CREATE TABLE articles(article_id SERIAL PRIMARY KEY, title VARCHAR, topic VARCHAR REFERENCES topics(slug), author VARCHAR REFERENCES users(username), body TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, votes INT DEFAULT 0, article_img_url VARCHAR(1000))"
            );
        })
        .then(() => {
            return db.query(
                "DROP TABLE IF EXISTS comments CASCADE; CREATE TABLE comments(comment_id SERIAL PRIMARY KEY, article_id INT REFERENCES articles(article_id), body TEXT, votes INT DEFAULT 0, author VARCHAR REFERENCES users(username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
            );
        })
        .then(() => {
            const converted = topicData.map((obj) => [obj.description, obj.slug, obj.img_url])
            return db.query(format("INSERT INTO topics(slug, description, img_url) VALUES %L", converted))
        })
        .then(() => {
            const converted = userData.map((obj) => [obj.username, obj.name, obj.avatar_url])
            return db.query(format("INSERT INTO users(username, name, avatar_url) VALUES %L", converted))
        })
        .then(() => {
            const fixedTime = articleData.map((obj) => {
                return convertTimestampToDate(obj)
            })

            const converted = fixedTime.map((obj) => [obj.title, obj.topic, obj.author, obj.body, obj.created_at, obj.votes, obj.article_img_url])

            return db.query(format("INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L", converted))
        })
        .then(() => {});
};

module.exports = seed;
