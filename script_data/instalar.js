agregarEventoLoad(iniciar_instalar);
function iniciar_instalar(){
	
	agregarEvento("btnInstalar","click",function(){
			$('#instalando').fadeIn();
			registrarDatoOff(globales._URL_BE+"controlador/controlador_instalar_db.php","",{},function(rs){
				//mostrarMensaje(rs);						
				if(rs.respuesta){
					$('#instalando').fadeOut();
					$('#instalo').fadeIn();
					
				}

			},"");

	});

	agregarEvento("btnInstalo","click",function(){
		$('.subContenido').fadeOut('fast');
		consultar_db();
	})

}	