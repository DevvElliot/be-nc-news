const express = require("express")

const app = express()

const documentation = require("./endpoints.json")

app.get("/api", (req, res) => {
    res.status(200).send({endpoints: documentation})
})

module.exports = app