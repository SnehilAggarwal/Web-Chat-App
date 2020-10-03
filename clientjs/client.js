var socket = io();


$('#mssgform').submit( (e)=>{
    e.preventDefault();
    socket.emit('chatmessage', $('#msg').val());
    $('#msg').val('');
    return false;
} );


socket.on( 'chatmessage' , (username, msg)=>{
    console.log(msg);
    $('#messages').append($('<li>').text(username + "-" + msg));
});

$('#unform').submit( (e)=>{
    e.preventDefault();
    socket.emit('userlogin' , $("#username").val());
    $('#msg').val('');
    $('#unform').remove();
});