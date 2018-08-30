function iniciar_menu_preparar(){
	
	
	agregarEvento("btnPreparar","click",function(){
		 dialog.showModal();
			
	});
	agregarEvento("btnListo","click",function(){
		$('#listo').fadeOut();
	});
	agregarEvento("btnAceptar","click",function(e){
		e.preventDefault();
		dialog.close();
		$('#preparando').fadeIn();
			registrarDatoOff(globales._URL_BE+"controlador/controlador_preparar.php","",{user:globales._usuario.email,pass:globales._usuario.pass,id:globales._usuario.id},function(rs){
			    $('#preparando').fadeOut();
				$('#listo').fadeIn();
				console.log(rs);
				if(Object.keys(rs).length>=1){
					
				    var msn="";
				    console.log(Object.keys(rs).length);
				    for(var r in rs){

				    	msn+=rs[r].mensaje+"\n";
				    }
				    if(Object.keys(rs).length==1){
				    	document.getElementById('msnPrepara').innerHTML=rs[0].mensaje;
				    	consultar_db();
				    }else{
				    	document.getElementById('msnPrepara').innerHTML=msn;	
				    }
				}else{
					document.getElementById('msnPrepara').innerHTML=rs.mensaje;
				}
			    


			    
			    
			    //mostrarMensaje(msn); 
			},function(jqXHR, textStatus, errorThrown){
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);
                        });
	});
	agregarEvento("btnCancelar","click",function(){
		dialog.close();
	});

}

agregarEventoLoad(iniciar_menu_preparar);
