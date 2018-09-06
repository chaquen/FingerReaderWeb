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
				    	if(rs[r].mensaje!=undefined){
				    		msn+=rs[r].mensaje+"\n";	
				    	}else{
				    		msn=rs.mensaje;		
				    		break;
				    	}
				    	

				    }

				    
				    if(Object.keys(rs).length==1){
				    	if(rs[0].mensaje!=undefined){
				    		document.getElementById('msnPrepara').innerHTML=rs[0].mensaje;
				    	}else{
				    		document.getElementById('msnPrepara').innerHTML=rs.mensaje;
				    	}
				    	
				    	consultar_db();
				    }else{
				    	if(msn!=undefined){
				    		document.getElementById('msnPrepara').innerHTML=msn;		
				    	}else{
				    		document.getElementById('msnPrepara').innerHTML=rs.mensaje;	
				    	}
				    	
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
