const express = require('express');
const path = require("path")
const app = express();

const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
// Login & Register
const usersRoute = require('./routes/usersRoute')

const bookingRoute = require("./routes/bookingRoute")

app.use(express.json())

app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingRoute);

// static

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function(_, res){
    res.sendFile(
        path.join(__dirname, './client/build/index.html'),
        function(err) {
            res.status(500).send(err);
        }
    );
});

const port = process.env.PORT || 5000;

app.listen(port,() => console.log('Node server started using nodemon'));