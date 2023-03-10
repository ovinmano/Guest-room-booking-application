const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://ovinmano:alonemano7339@cluster0.ih09tiq.mongodb.net/mern-rooms'

mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser : true})

var connection = mongoose.connection

connection.on('error',()=>{
    console.log('mongodb connection failed');
})

connection.on('connected',()=>{
    console.log('mongo connection sucessful');
})


module.exports = mongoose