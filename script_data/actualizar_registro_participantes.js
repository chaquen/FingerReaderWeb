

agregarEventoLoad(iniciar_evento_actualizar);
var data={id:undefined};
function iniciar_evento_actualizar(){
	var source = new EventSource(globales._URL_BE+'controlador/controlador_server_actualizar_participante.php?id_evento='+pos);

	source.addEventListener('message', function(event) {
	  data = JSON.parse(event.data);
	  console.log(data);
	  if(data.id!=undefined){
	  	 //source.close();
	  	console.log(data);
	  	agregar_a_var_participantes(data);
	  	
	  	
	  }
	}, false);

	source.addEventListener('open', function(event) {
	  //logger.log('> Connection was opened');
	  //console.log(event.data);
	  //var data = JSON.parse(event.data);
	  //console.log(data);
	  if(data.id!=undefined){
	  	 //source.close();
	  	console.log(data.id);
	  }
	  
	}, false);

	source.addEventListener('error', function(event) {
            console.log(event);
	  if (event.eventPhase == 2) { //EventSource.CLOSED
	    //logger.log('> Connection was closed');
            //source.close();
            //mostrarMensaje("A ocurrido un error vuelva a iniciar sesion y en cso de que la falla persista comuniquese con el administrador");
	  	console.log(event);  
	  }
	}, false);
}

function closeConnection() {
  source.close();
  
}
