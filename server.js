const express = require('express')
const app = express()
// creating server  at port 3000
const port = process.env.PORT || 3000
// connecting all files(html,css,js) on clint side using express framework
app.use(express.static('public'))
//connecting database
const dbConnect = require('./db')
dbConnect()
// importing models.js which include schema for db
const Comment = require('./models/comments')
//telling express about the format(json)
app.use(express.json())

// making url and posting it on database
app.post('/api/comments', (req, res) => {
    const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment
    })
    comment.save().then(response => {
        res.send(response)
    })
})
// to fetch comment from db
app.get('/api/comments', (req, res) => {
    Comment.find().then(function(comments) {
        res.send(comments)
    })
})

//listing port and checking
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

let io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`)
    //deceting any event
    socket.on('comment', (data) => {
        data.time = Date()
        socket.broadcast.emit('comment', data)
    })
})