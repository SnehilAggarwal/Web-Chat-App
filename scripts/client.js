var socket = io();
$("#msg").prop( "disabled", true );
$('.chatbox').hide();

$('#unform').submit( (e)=>{
    e.preventDefault();
    socket.emit('userlogin' , $("#username").val());
    $('#msg').val('');
    $('#unform').remove();
    $('#msg').prop( 'disabled' , false );
    $('.loginwrapper').hide();
    $('.chatbox').show();
});

$('#mssgform').submit( (e)=>{
    e.preventDefault();
    var msg = $('#msg').val()
    displaymsg('Me',msg);
    socket.emit('chatmessage', msg);
    $('#msg').val('');
    return false;
} );

socket.on( 'chatmessage' , (username, msg)=>{
    displaymsg(username,msg);
});

function displaymsg(username,msg){
    if(username=="Me"){
        $('#messages').append($('<li class="mes mymessage">').html("<div class = \" name \">" + username + "</div>" + "<div class = \" message \">" + msg + "</div>"));
    }
    else{
        $('#messages').append($('<li class="mes othermessage">').html("<div class = \" name \">" + username + "</div>" + "<div class = \" message \">" + msg + "</div>"));
    }
    var cont = $('.msgspace');
    cont.scrollTop( cont.prop('scrollHeight') );
}