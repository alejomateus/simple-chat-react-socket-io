const express = require('express');
const http= require("http");
const socketIo= require ('socket.io');
const path = require('path');

//webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
//Middleware
app.use(webpackDevMiddleware(webpack(config)));
app.use(express.static(path.join(__dirname,'public')));
io.on('connection',socket=>{
    console.log("Socket connected: ",socket.id);
    socket.on('message',body=>{
        socket.broadcast.emit('message',{
            body,
            from:socket.id.slice(8)
        });
    })
})
server.listen(5000,()=>{
    console.log("server on port 5000");
})