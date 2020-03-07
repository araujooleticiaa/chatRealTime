const express = require('express')
const path = require('path')

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')))
app.set('views',path.join(__dirname,'public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');


let messages = [];

app.use('/',(req,res)=>{
    res.render('index.html');
})

io.on('connection', socket => {
    //console.log(`socket conectado ${socket.id}`)

    socket.emit('previusMessage',messages);

    socket.on('sendMessage',data =>{
       messages.push(data);
       socket.broadcast.emit('receivedMessage', data);
    })
})


server.listen(3333);