var socket = io();


$('#mssgform').submit( (e)=>{
    e.preventDefault();
    var msg = $('#msg').val()
    displaymsg('me',msg);
    socket.emit('chatmessage', msg);
    $('#msg').val('');
    return false;
} );


socket.on( 'chatmessage' , (username, msg)=>{
    displaymsg(username,msg);
});

$('#unform').submit( (e)=>{
    e.preventDefault();
    socket.emit('userlogin' , $("#username").val());
    $('#msg').val('');
    $('#unform').remove();
});

function displaymsg(username,msg){
    console.log(msg);
    $('#messages').append($('<li>').text(username + "-" + msg));
}