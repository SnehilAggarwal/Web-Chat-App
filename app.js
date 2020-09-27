var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

var messages = ["Good","Boy"];

app.get("/", (req,res) =>{
    res.render("index.ejs");
} );


io.on('connection', (socket) => {
    console.log("A user Coneected");
    socket.on( 'disconnect' , ()=>{
       console.log("USer Discnnected"); 
    });

    socket.on( 'chatmessage' , (msg)=>{
        console.log(msg);
        io.emit('chatmessage' , msg );
    } )
});

// app.get("/chat" , ( req,res) =>{
//     res.render("chat.ejs",{messages:messages});
// } );

// app.post("/chat" , (req,res) =>{
//     var msg = req.body.message;
//     messages.push(msg);
//     res.redirect("/chat");
// });

http.listen(4401,()=>{
    console.log("Server Started");
})