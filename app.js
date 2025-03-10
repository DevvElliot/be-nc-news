const express = require("express")

const {getTopics} = require("./controllers/topics.controller")

const app = express()
const documentation = require("./endpoints.json")

app.get("/api", (req, res) => {
    res.status(200).send({endpoints: documentation})
})

app.get("/api/topics", getTopics)

module.exports = app