const app = require("./app")

const port = 9090
app.listen(port, (err) => {
    if (err) console.log(`Failed to connect to port ${port}: ${err}`)
    else console.log(`Connected to port ${port}!`)
})

module.exports = app