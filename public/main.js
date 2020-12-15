
//El segundo objeto es un obj de configuracion
var socket = io.connect('http://localhost:8080', { 'forceNew': true });

//queremos escuchar y envair eventos en el socket

socket.on('messages', function(data){
    console.log(data);
    render(data);  
});

function render(data){
    
    var html = data.map(function(data, inndex){
        return(`<div>
        <strong>${data.author}</strong>:
        <em>${data.text}</em></div>`); 
    }).join(" "); 
    
    document.getElementById('messages').innerHTML=html;
}

var prueba = "pepe";
function addMessage(e){
    //Este lo que vamos a enviar al servidor
    var payload = {         
        author:document.getElementById("name").value,
        text: document.getElementById("texto").value
    };
 
    socket.emit('new-message', payload);
    return false;
    //Ahora hay que escuchar este evento en el servidor 
}