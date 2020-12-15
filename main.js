var express = require('express');
var app = express();
const path = require('path');
//Creamos el servidor
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [];

app.use(express.static(path.join(__dirname,'public')));
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

var port = process.env.PORT || 8080; 
//Prbamos que todo va bien xd
server.listen(port, function(){
    console.log("Servidor corriendo en http://localhost:8080");
});