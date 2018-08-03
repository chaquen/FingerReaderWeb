function iniciar_menu_eventos(){
	/*agregarEvento("btnContactar","click",function(){
			var datos = $("#formContacto").serializarFormulario();
			datos.origen="info@jedidiassalud.com";
			console.log(datos);
			if(false!=datos){
				registrarDato("contactar_pg_construccion",datos,function(rs){
					mostrarMensaje(rs);
				},"formContacto");
			}else{
				mostrarMensaje("Por favor ingresa los campos requeridos");
			}
	});*/
	globales._usuario=obtener_local_storage("ssUsuario");
	if(globales._usuario==false){
		location.href="index.html";
	}

	
	console.log(globales);

	
	agregarEvento("btnRegistroUsuario","click",function(){

		registrarDatoOff(globales._URL_BE+"controlador/controlador_participantes.php","valida_registro",
						{usuario:globales._usuario},function(rs){

							if(rs.respuesta){
								location.href="registroUsuario.html?id="+rs.valores_consultados[0].id;		
							}else{
								mostrarMensaje("Por favor registra una huella");
							}
						});
		

	});
	agregarEvento("btnSalir","click",function(){

		if(confirm("¿Estas seguro de salir de la aplicación?")){
			eliminar_local_storage("ssUsuario");
			location.href="index.html";		
		}
	});
	agregarEvento("liInicio","click",function(){
		location.href="menuEventos.html";
	});
	agregarEvento("btnEventos","click",function(){
		location.href="eventos.html";
	});
	agregarEvento("btnReportes","click",function(){
		location.href="reportes.html";
	});
	
	consultar_db();
	registrarDatoOff(globales._URL_BE+"controlador/controlador_eventos.php","preparar_eventos",{},function(rs){
            if(rs.respuesta==false){
                mostrarMensaje("Error al selecciona evento");
            }
    },"");
	
}

function consultar_db(){

	consultarDatosOff(globales._URL_BE+"controlador/controlador_usuario.php","validar_db",{},function(rs){
			    console.log(rs);
			    
			    if(rs.respuesta){
			    	 if(navigator.onLine) {
	                //goOnline();
	                
	                  $('#btnInstalar').fadeOut();
			    	  $('#btnPreparar').fadeIn();

	                } else {
	                   $('#btnPreparar').fadeOut();
                            $('#btnInstalar').fadeOut();
                            $('#btnOff').fadeIn();
	                }
	                if(rs.valores_consultados!=undefined){
	                	document.getElementById("pMsn").innerHTML=rs.mensaje+", ultima fecha y hora de preparacion "+eval(rs.valores_consultados)[0].fecha+"\n ¿Quieres prepararlo de nuevo?";	
	                }
			    	
			    	//document.getElementById("btnInstalar").style.display="none";
			    	//document.getElementById("btnPreparar").style.display="block";
			    	
				}else{
					  if(navigator.onLine) {
	                //goOnline();
	                
	                  $('#btnInstalar').fadeIn();
			    	  $('#btnPreparar').fadeOut();

	                } else {
	                   $('#btnPreparar').fadeOut();
                            $('#btnInstalar').fadeOut();
                            $('#btnOff').fadeIn();
	                }
					
			    	//document.getElementById("btnInstalar").style.display="block";
			    	//document.getElementById("btnPreparar").style.display="none";
			    	
			    	
			    }
	});
}


agregarEventoLoad(iniciar_menu_eventos);
