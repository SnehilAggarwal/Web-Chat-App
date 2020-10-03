var socket = io();
$('form').submit( (e)=>{
    e.preventDefault();
    socket.emit('chatmessage', $('#msg').val());
    $('#msg').val('');
    return false;
} );
socket.on( 'chatmessage' , (msg)=>{
    console.log(msg);
    $('#messages').append($('<li>').text(msg));
});