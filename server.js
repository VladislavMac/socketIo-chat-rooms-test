import express from "express";
import http from "http"
import path from "path"
import { Server } from "socket.io";

const app    = express();
const server = http.createServer(app);
const io     = new Server(server)

const __dirname = path.resolve();
const PORT      = process.env.PORT || 4300;

// Set static floder
app.use(express.static(path.join(__dirname, 'public')))

// when user connetion
io.on('connection', socket =>{
    socket.emit('message', 'Welcome!')

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'User has be join the chat')

    // Runs when client disconnects
    socket.on('disconnect', () =>{
        io.emit('message', 'User has been leave the chat')
    })

    // Listen for chat message
    socket.on('chatMessage', (msg) =>{
        io.emit('message', msg)
    })
})

server.listen(PORT, ()=>{
    console.log('Server start')
})
