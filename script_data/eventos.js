function iniciar_menu_eventos(){
	globales._usuario=obtener_local_storage("ssUsuario");
	if(globales._usuario==false){
		location.href="index.html";
	}
	
	registrarDatoOff(globales._URL_BE+"controlador/controlador_eventos.php","mis_eventos",
						{usuario:globales._usuario},function(rs){
                        if(rs.respuesta==true){
                        	//$('#menuAdmin').fadeOut('fast');
        					//$('#wrapper').fadeIn('slow');
                           	dibujar_lista_eventos(eval(rs.valores_consultados));
							agregar_local_storage("lsEventos",eval(rs.valores_consultados));
							
							
                        }else{
                        	mostrarMensaje("Aun no tienes eventos sincronizados o activos en este equipo");
                        }
                        
                    
      		},"");

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
		registrarDatoOff(globales._URL_BE+"controlador/controlador_eventos.php","preparar_eventos",{},function(rs){
                        if(rs.respuesta==false){
                            mostrarMensaje("Error al selecciona evento");
                            
                        }else{
                             //console.log(eval(rs.valores_consultados)[0].id);
                             
                        }
                        

                    
                },"");
		
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
}



agregarEventoLoad(iniciar_menu_eventos);
function dibujar_lista_eventos(rs){
	// var lista=document.getElementById("listaEvento");
	// lista.innerHTML="";
	// var tam=Object.keys(rs).length;
 //        console.log(tam);
 //  	var reg=false;

 	var wrapper_html = $("#this_content");
 	var html;

	for(var e in rs){

		if (rs[e].atachments=="none") {

			html = 'No hay documento';

		}

		else {

			html = '<a href="http://pdpmagdalenacentro.org/assets/private/atachments/events/'+rs[e].atachments+' target="_blank">DESCARGAR</a>';
		}

		$(wrapper_html).append('<tr>'+
			                      '<td class="mdl-data-table__cell--non-numeric">'+rs[e].name+'</td>'+
			                      '<td class="mdl-data-table__cell--non-numeric">'+rs[e].date+'</td>'+
			                      '<td>'+html+'</td>'+
			                      '<td> <a href="registroParticipantes.html?id='+rs[e].id+'">REGISTRAR</a></td>'+
			                    '</tr>');
		// console.log(rs[e]);
		// var liOne=document.createElement("li");
		// liOne.className="item1";//aqui debe cambiar
		// var a=document.createElement("a");
		// a.href="#";
		// a.innerHTML=rs[e].name;
		// var span=document.createElement("span");
		// span.innerHTML=" ";
		// a.appendChild(span);
		// liOne.appendChild(a);
		
		//if(rs[e].atachments!="none"){


		// 	var innerList=document.createElement("ul");	
		// 	innerList.className="listaDescargable"
		// 	var ilLi=document.createElement("li");
		// 	var inA=document.createElement("a");
		// 	inA.setAttribute("target","_blank");
		// 	inA.innerHTML=rs[e].atachments;
		// 	//inA.href="http://pdpmagdalenacentro.org/assets/private/atachments/events/"+rs[e].atachments;
		// 	inA.href=globales._URL_BE+"files/events/"+rs[e].id+"/"+rs[e].atachments;

		// 	var ilSpan=document.createElement("span");
		// 	ilSpan.innerHTML=" DESCARGAR";
		// 	inA.appendChild(ilSpan);
		// 	ilLi.appendChild(inA);
		// 	innerList.appendChild(ilLi);
  //                       var ilLi=document.createElement("li");
		// 	var inA=document.createElement("a");
                        
  //                       inA.href="registroParticipantes.html?id="+rs[e].id;
  //                       inA.innerHTML="Registrar participante";
		// 	var ilSpan=document.createElement("span");
		// 	ilSpan.innerHTML=" IR A";
		// 	inA.appendChild(ilSpan);
		// 	ilLi.appendChild(inA);
		// 	innerList.appendChild(ilLi);
		// 	reg=true;
                        
                        
		// }else{
  //           var innerList=document.createElement("ul");	
		// 	var ilLi=document.createElement("li");
		// 	var inA=document.createElement("a");
  //                       //inA.setAttribute("target","_blank");
  //                        inA.href="registroParticipantes.html?id="+rs[e].id;
  //                       inA.innerHTML="Registrar participante";
		// 	var ilSpan=document.createElement("span");
		// 	ilSpan.innerHTML="IR A";
		// 	inA.appendChild(ilSpan);
		// 	ilLi.appendChild(inA);
		// 	innerList.appendChild(ilLi);
		// 	reg=true;
		// }
		
		

  //               console.log(e);
		// /*if(e==tam-1){
			
		// 	var ilLi=document.createElement("li");
		// 	var inA=document.createElement("a");
		// 	inA.innerHTML="Registrar Participantes";
		// 	ilLi.appendChild(inA);
		// 	innerList.appendChild(ilLi);
		// 	reg=true;
		// }*/

		// if(reg){
		// 	liOne.appendChild(innerList);	
		// 	reg=false;
		// }
		




		// lista.appendChild(liOne);
	}
}