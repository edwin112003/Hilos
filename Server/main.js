var express = require('express');
var app = express();
//Creamos el servidor
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [];

app.use(express.static('public'));
//cuando recibamos un get en la ruta raiz 
//active la funcion

io.on('connection', function(socket){
    console.log('Alguien se ha conectado con socket');
    //Este envia uno a uno
    socket.emit('messages', messages);
    socket.on('new-message', function(data){
        messages.push(data);

        //Para un chat en donde al mandar un nuevo mensaje se ponga/actualice
        //en todos los sockets que hay. ESTE ENVIA UNO A TODOS
        io.sockets.emit("messages", messages); 
    });
});

//Prbamos que todo va bien xd
server.listen(8080, function(){
    console.log("Servidor corriendo en http://localhost:8080");
});