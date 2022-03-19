function dbConnect() {
    // Db connection
    //refrence mongoose documentation
const mongoose = require('mongoose')
const url = 'mongodb://localhost/comments'

mongoose.connect(url, {
    // userNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: true
})

const connection = mongoose.connection
//checking connection btw database and server
connection.once('open', function() {
    console.log('Database connected...')
})
}

module.exports = dbConnect