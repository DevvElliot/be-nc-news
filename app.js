const express = require("express")

const {getTopics} = require("./controllers/topics.controller")

const app = express()
const documentation = require("./endpoints.json")

app.get("/api", (req, res) => {
    res.status(200).send({endpoints: documentation})
})

app.get("/api/topics", getTopics)

app.all("*", (req, res, next) => {
    res.status(404).send({msg: "Not found"})
    next()
})

app.use((err, req, res, next) => {
    res.status(500).send({msg: "Internal server error"})
})

module.exports = app