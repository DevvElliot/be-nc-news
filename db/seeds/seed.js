const db = require("../connection");
const format = require("pg-format")

const seed = ({ topicData, userData, articleData, commentData }) => {
  //const convertedTopicData = topicData.map((obj) => [obj.description, obj.slug, obj.img_url])

  return db
    .query(
      "DROP TABLE IF EXISTS topics CASCADE; CREATE TABLE topics(slug VARCHAR PRIMARY KEY NOT NULL, description VARCHAR, img_url VARCHAR(1000))"
    )
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users CASCADE; CREATE TABLE users(username VARCHAR PRIMARY KEY UNIQUE NOT NULL, name VARCHAR, avatar_url VARCHAR(1000))");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS articles CASCADE; CREATE TABLE articles(article_id SERIAL PRIMARY KEY, title VARCHAR, topic VARCHAR REFERENCES topics(slug), author VARCHAR REFERENCES users(username), body TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, votes INT DEFAULT 0, article_img_url VARCHAR(1000))")
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS comments CASCADE; CREATE TABLE comments(comment_id SERIAL PRIMARY KEY, article_id INT REFERENCES articles(article_id), body TEXT, votes INT DEFAULT 0, author VARCHAR REFERENCES users(username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
    })
    .then(() => {
      // testing returning
      return db.query(format("INSERT INTO topics(slug, description, img_url) VALUES %L RETURNING slug", convertData(topicData)))
    })
    .then((d) => {
      // todo: try to implement returning somehow alongside inserting data, this is really complicated
      console.log(d)
      return db.query(format("INSERT INTO users(username, name, avatar_url) VALUES %L", convertData(userData)))
    })
    .then(() => {
      return db.query(format("INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L", convertData(articleData)))
    })
    .then(() => {
      //return db.query(format("INSERT INTO comments(body, votes, author, created_at) VALUES %L", convertData(commentData)))
    })
};

function convertData(dataToBeInserted){

  // todo: fix basically everything and not use a function like this
  // first 2 tables insert correctly but the other 2 have wrong values
  const data = dataToBeInserted.map((obj) => {
    const keys = Object.keys(obj)
    if (obj.article_img_url && !obj.votes){
      keys.splice(5, 0, "votes")
    }
    const sentData = []
    keys.forEach((key) => {
      if (key === "votes"){
        sentData.push(obj.votes || 0)
      } else {
        sentData.push(key === "created_at" ? new Date(obj[key]) : obj[key])
      }
    })
    return sentData
  })
  
  return data
}
module.exports = seed;
