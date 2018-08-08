agregarEventoLoad(iniciar_index);
function iniciar_index(){


	registrarDatoOff(globales._URL_BE+"controlador/controlador_eventos.php","preparar_eventos",{},function(rs){
			            if(rs.respuesta==false){
			                mostrarMensaje("Error al selecciona evento");
			            }
			    },"");
	
}

