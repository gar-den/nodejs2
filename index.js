const express = require('express');
const app = express();
const Http = require("http");
const http = Http.createServer(app);
const port = 3000
const crypto = require('crypto'); // import crypto

const connect = require('./schemas');
connect();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'));

const socketIo = require('socket.io');
const io = socketIo(http, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const router = require('./routers/router');
app.use('/', [router]);

// Making API
const postsRouter = require('./routers/posts');
app.use('/api/posts', [postsRouter]);
const usersRouter = require('./routers/users');
app.use('/api/users', [usersRouter]);
const commentsRouter = require('./routers/comments');
app.use('/api/comments', [commentsRouter]);

http.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})

io.on("connection", (socket) => {
    // console.log("someone is connected!");

    socket.send("connected");

    socket.on("makepost", (data) => {
        // console.log(data);
    });

    socket.on("posted", (data) => {
        socket.broadcast.emit("someonePosted", data);
    });

    socket.on("commented", (data) => {
        // username, url, title, postuser, comment
        socket.broadcast.emit("someoneCommented", data);
    })

    socket.on("disconnect", () => {
        // console.log("someone is disconnected!")
    })

    socket.on("chatsend", (data) => {
        socket.emit("someoneSendChat", data);
    })

});