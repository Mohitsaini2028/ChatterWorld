const express = require('express');
const req = require('express/lib/request');
const {join} = require('path');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);

});

// Static Files
// app.use('/',express.static(join(process.cwd(), "public")))

app.use(express.static(__dirname +  "/public"))

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    res.render("index")
});

// Socket
                            // server name - on which server socket have to work - here we have to work on http server
const io = require('socket.io')(http)

// io.listen(+process.env.PORT);

io.on('connection', (socket) => {
    console.log('Connected....');

    // listening event message
    socket.on('message', (msg)=>{
        console.log(msg);
        // sending message to all client except the sender.
                            //event name, data
        socket.broadcast.emit('message', msg); 
    })
})



