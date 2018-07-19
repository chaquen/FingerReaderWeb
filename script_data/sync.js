//var dep;
//var pos;
function iniciar_evento_sync(){
	agregarEvento("btnSincronizar","click",function(){
		
		$('#sincroniza').fadeIn();
		consultarDatosOff(globales._URL_BE+"controlador/controlador_sincronizar.php","",{},function(rs){
			    if(rs.respuesta){
			    	 
        			 $('#sincroniza').fadeOut();
        			 $('#sincronizo').fadeIn();
			    }
		        
	        
    	});
		    
	});
	agregarEvento("btnSincronizo","click",function(){
		$('.subContenido').fadeOut('fast');
	});
}


agregarEventoLoad(iniciar_evento_sync);
