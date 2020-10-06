var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/styles'));
app.use(express.static(path.join(__dirname, 'scripts')));

// var messages = ["Good","Boy"];

app.get("/", (req,res) =>{
    res.render("index.ejs");
} );


io.on('connection', (socket) => {
    console.log("A user Coneected");
    socket.on( 'disconnect' , ()=>{
       console.log("User Discnnected"); 
    });

    socket.on( 'userlogin' , (username)=>{
        socket.nickname = username;
    });

    socket.on( 'chatmessage' , (msg)=>{
        socket.broadcast.emit('chatmessage' , socket.nickname, msg );
    } );
});

// app.get("/chat" , ( req,res) =>{
//     res.render("chat.ejs",{messages:messages});
// } );

// app.post("/chat" , (req,res) =>{
//     var msg = req.body.message;
//     messages.push(msg);
//     res.redirect("/chat");
// });

http.listen(process.env.PORT || 4401,()=>{
    console.log("Server Started");
})