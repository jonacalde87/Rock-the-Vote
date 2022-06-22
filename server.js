const express = require("express")
const app = express()
require("dotenv").config()
const expressJwt = require("express-jwt");
const morgan = require("morgan")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 9000

//middleware
app.use(morgan("dev"))
app.use(express.json())

//db
// mongoose.set("useCreateIndex", true) //NO IDEA
mongoose.connect(process.env.MONGODB_URI || 
    "mongodb://localhost:27017/rock-the-vote-db",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) throw err
        console.log("Connected to the database")
    }
)

//routes
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api/issues', require('./routes/issueRouter.js'));
app.use('/api/issues/comments', require('./routes/commentRouter.js'));

//error handler
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`)
})


