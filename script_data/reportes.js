agregarEventoLoad(iniciar_reportes);
var arr_gen=[];//RRAY PARA LA PAGINACION
var todos_los_datos_asistentes;
var dep=[];
var dep2=[];
var fecha_evento="";
var lugar_evento="";
var nom_reporte;

var todo_esco;
var todo_genero;
var todo_sub_genero;
var todo_proceso;
var todo_orga;
var todo_etnia;
var todo_sub_etnia;
var todo_edad;
var todo_dep_nac;
var todo_ciu_nac;
var todo_cap_dife;
var todo_anio;
var todo_cargo;
var todo_zona;
//
var todo_esco_pie;
var todo_genero_pie;
var todo_sub_genero_pie;
var todo_proceso_pie;
var todo_orga_pie;
var todo_etnia_pie;
var todo_sub_etnia_pie;
var todo_edad_pie;
var todo_dep_nac_pie;
var todo_ciu_nac_pie;
var todo_cap_dife_pie;
var todo_anio_pie;
var todo_cargo_pie;
var todo_zona_pie;



function iniciar_reportes(){
	

	var d=recibirValorGet();
	 	/*consultarDatosOff("script_data/data/colombia.json","",{},function(rs){
		console.log(rs);
		globales._departamentos=rs;
		
        crear_data_list("lista_datos_ubi",rs,"id","departamento");
    	});*/
    dibujar_anio("selAnioDeingreso");		


    if(d==false){
    	consultar_eventos("G");
    }else{
    	var id_ev=d[0].split("=")[1];
    	consultar_eventos(id_ev);
    }
    agregarEvento("liInicio","click",function(){
		location.href="menuEventos.html";
	});
	agregarEvento("btnEventos","click",function(){
		location.href="eventos.html";
	});
	
    agregarEvento("btnSalir","click",function(){

        if(confirm("¿Estas seguro de salir de la aplicación?")){
            eliminar_local_storage("ssUsuario");
            location.href="index.html";     
        }
    });


  
	agregarEvento("btnGeneraReporte","click",function(){
		document.getElementById("aExpor").innerHTML="";
		var datos = $("#formReportes").serializarFormulario();
		var datos2 = $("#formReportes").serializarFormulario2();
		var aprovado=true;

		if(datos.tipo_doc!=undefined){
			datos.tipo_doc=datos2.tipo_doc;
		}
		if(datos.edad!=undefined){
			datos.edad=datos2.edad;
		}
		if(datos.genero!=undefined){
			datos.genero=datos2.genero;
		}
		if(datos.zonas!=undefined){
			datos.zonas=datos2.zonas;
		}
		if(datos.escolaridad!=undefined){
			datos.escolaridad=datos2.escolaridad;
		}
		if(datos.etnia!=undefined){
			var va=document.getElementById("selEtnia").value;
			console.log(va);
			if(va=="Otro"){
				va='Otro';

			}else if(va=="0"){
				va=["Indígena","Negro (Afro-colombiano)","Blanco","Mestizo","Zambo",'Otro'];					
			}
			datos.etnia=va;
		}
		if(datos.ciud_nacimiento!=""){
			datos.ciud_nacimiento = datos.ciud_nacimiento.split("-")[0];
		}
		if(datos.dep_nacimiento!=""){
			datos.dep_nacimiento = datos.dep_nacimiento.split("-")[0]+"-"+datos.dep_nacimiento.split("-")[1];
		}
		if(datos.municipio!=""){
			datos.municipio = datos.municipio.split("-")[0];
		}
					
		//nom_reporte=document.getElementById("selEventos").options[document.getElementById("selEventos").selectedIndex].innerHTML;	
		
		var opt=document.getElementById("selEventos").options;
		var eventos=[];
		var i=0;
		for(var f in opt){
			if(opt[f].selected==true && opt[f].value=="G"){
				eventos=opt[f].value;
				break;
			}
			if(opt[f].selected==true){
				eventos[i++]=opt[f].value;
			}
		}

		//alert(eventos);
		//alert(eventos.length);

		if(eventos.length==0){
			mostrarMensaje("Selecciona un evento");
			aprovado=false;
		}

		if(datos.anio_ingreso_pdp==0){
			delete datos.anio_ingreso_pdp;
		}
		console.log(datos);
		
		if(aprovado){
			//mostrar tablas de resultados
			$('.encabezado, #menuAdmin, .contenido').fadeOut('fast');
			$('#reporteGenerado').show('scale');
			
			switch(datos.tipo_reporte){
					
				case "TipoTortas":
				
			
				
					registrarDato("reportes_general",{datos,id_evento:eventos},function(rs){
							reporte_tortas(rs);						
							dibujar_tabla_eventos(rs.eventos);
							document.getElementById("divListaAsis3").style.display="none";
								
											

					},"");	
				
					break;	
				case "TipoBarras":


				
			
				
					registrarDato("reportes_general",{datos,id_evento:eventos},function(rs){
							reporte_barras(rs);
							dibujar_tabla_eventos(rs.eventos);
							document.getElementById("divListaAsis3").style.display="none";
								
							

					},"");

					break;	
				default:
					//TORTAS
					registrarDato("reportes_general",{datos,id_evento:eventos},function(rs){
							if(!rs.respuesta){
								mostrarMensaje(rs);
							}
							document.getElementById("divListaAsis3").style.display="none";
							dibujar_tabla_eventos(rs.eventos);
							console.log(rs);
							console.log(document.getElementById("divReporteGeneral"));
						    
								document.getElementById("tblListaGeneral").style.display="";
								document.getElementById("divReporteGeneralLista").style.display="";
								if(Object.keys(rs.datos).length>0){
									todos_los_datos_asistentes=rs.datos;
									arr_gen=chunkArray(rs.datos,10);
									
									document.getElementById("divReporteGeneral").style.display="";
									dibujar_tabla(arr_gen[0]);	
									crear_sel_paginas(arr_gen.length);
								}else{
									document.getElementById("divReporteGeneral").style.display="none";
									document.getElementById("divReporteGeneralLista").style.display="none";
									todos_los_datos_asistentes=[];

								}

								

								if(Object.keys(rs.datos_escolaridad).length>0){
									$('#piechart_material_esco').fadeIn();
	                               
	                                $('#divEsco').fadeIn();
	                                
									var arr=[];
	                                arr.push("Participantes");
	                                arr.push("Tipo");
									var cabza=[];
									
									cabza.push(arr);

									for(var v in rs.datos_escolaridad){
	                                    var arr=[];
										arr.push( rs.datos_escolaridad[v].escolaridad);	
										arr.push(Number(rs.datos_escolaridad[v].cuantos_por_escolaridad));	
	                                    cabza.push(arr);
									}
	                                console.log(cabza);   
									todo_esco_pie=cabza;
									
								

								      
								}else{
									$('#piechart_material_esco').fadeOut();
									$('#divEsco').fadeOut();
									todo_esco_pie=[];
	                               
								}

								if(Object.keys(rs.anio_ingreso_pdp).length>0){
									$('#piechart_material_anio').fadeIn();
	                                
	                                $('#divAnioIng').fadeIn();
	                                
									var arr=[];
	                                arr.push("Participantes");
	                                arr.push("Año Ingreso");
									var cabza=[];
									
									cabza.push(arr);

									for(var v in rs.anio_ingreso_pdp){
	                                    var arr=[];
										arr.push( rs.anio_ingreso_pdp[v].anio_ingreso_pdp);	
										arr.push(Number(rs.anio_ingreso_pdp[v].cuantos_por_anio));	
	                                    cabza.push(arr);
									}
	                                console.log(cabza);   
									todo_anio_pie=cabza;
									
								 	

								      
								}else{
									$('#piechart_material_anio').fadeOut();
	                                
	                                $('#divAnioIng').fadeIn();
	                                todo_anio_pie=[];
								}


								if(Object.keys(rs.cargo).length>0){
									$('#piechart_material_cargo').fadeIn();
	                                
	                                $('#divCargo').fadeIn();
	                                
									var arr=[];
	                                arr.push("Participantes");
	                                arr.push("Cargo");
									var cabza=[];
									
									cabza.push(arr);

									for(var v in rs.cargo){
	                                    var arr=[];
										arr.push( rs.cargo[v].cargo_poblador);	
										arr.push(Number(rs.cargo[v].cuantos_por_cargo));	
	                                    cabza.push(arr);
									}
	                                console.log(cabza);   
									todo_cargo_pie=cabza;								  
								}else{
									$('#piechart_material_cargo').fadeOut();
	                                
	                                $('#divCargo').fadeIn();
	                                todo_cargo_pie=[];
								}

								if(Object.keys(rs.datos_cap_dife).length>0){
									$('#piechart_material_cap_dif').fadeIn();
	                                
	                                 $('#divCapDife').fadeIn();
	                                 
									var cabza=[];
	                                                                var arr=[];
									arr.push("Participantes");
									arr.push("Capacidades Diferentes");
									cabza.push(arr);

									for(var v in rs.datos_cap_dife){
	                                    var arr=[];
										arr.push( rs.datos_cap_dife[v].cap_dife);	
										arr.push(Number(rs.datos_cap_dife[v].cuantos_por_cap_dife));	
	                                    cabza.push(arr);
									}
									todo_cap_dife_pie=cabza;
									
								 	
								}else{
									$('#piechart_material_cap_dif').fadeOut();
	                                
	                                $('#divCapDife').fadeOut();
	                                todo_cap_dife_pie=[];
								}

								if(Object.keys(rs.datos_ciu_nac).length>0){
									$('#piechart_material_ciu').fadeIn();
									
									$('#divCiuNac').fadeIn();
	                                
									var cabza=[];
	                                var arr=[];
									arr.push("Participantes");
									arr.push("Ciudad Nacimiento");
									cabza.push(arr);

									for(v in rs.datos_ciu_nac){
	                                    var arr=[];
										arr.push( rs.datos_ciu_nac[v].ciud_nacimiento);	
										arr.push(Number(rs.datos_ciu_nac[v].cuantos_por_ciud_nacimiento));	
	                                    cabza.push(arr);
									}
									todo_ciu_nac_pie=cabza;
									

								}else{
									$('#piechart_material_ciu').fadeOut();
									
									$('#divCiuNac').fadeOut();
									todo_ciu_nac_pie=[];
									
								}
								if(Object.keys(rs.datos_dep_nac).length>0){
									
	                                $('#piechart_material_dep_nac').fadeIn();
	                                $('#divDepNac').fadeIn();
									var arr=[];
									var cabza=[];
	                                arr.push("Participantes");
									arr.push("Departamento Nacimiento");
									cabza.push(arr);

									for(var v in rs.datos_dep_nac){
										var arr=[];
										arr.push( rs.datos_dep_nac[v].dep_nacimiento);	
										arr.push(Number(rs.datos_dep_nac[v].cuantos_por_dep_nacimiento));	
	                                    cabza.push(arr);
									}
								    todo_dep_nac_pie=cabza;
								
								}else{
									
	                                $('#piechart_material_dep_nac').fadeOut();
	                                $('#divDepNac').fadeOut();
	                                todo_dep_nac_pie=[];

								}

								if(Object.keys(rs.datos_edaddes).length>0){
									
									$('#piechart_material_eda').fadeIn();
									$('#divEdades').fadeIn();
									var cabza=[];
	                                var arr=[];
									arr.push("Participantes");
									arr.push("Edad");
									cabza.push(arr);

									for(var v in rs.datos_edaddes){
	                                    var arr=[];
										arr.push( rs.datos_edaddes[v].edad +" años");	
										arr.push(Number(rs.datos_edaddes[v].cuentos_por_edad));	
	                                     cabza.push(arr);
									}
									todo_edad_pie=cabza;
									
								}else{
									
									$('#piechart_material_eda').fadeOut();
									$('#divEdades').fadeOut();
									todo_edad_pie=[];
								}
								if(Object.keys(rs.datos_genero).length>0){
									
	                                $('#piechart_material_gen').fadeIn();
	                                $('#divGenero').fadeIn();
									var cabza=[];
	                                 var arr=[];
									arr.push("Participantes");
									arr.push("Genero");
									cabza.push(arr);

									for(var v in rs.datos_genero){
	                                    var arr=[];
										arr.push( rs.datos_genero[v].genero);	
										arr.push(Number(rs.datos_genero[v].cuentos_por_genero));	
	                                    cabza.push(arr);
									}
									todo_genero_pie=cabza;
	                                console.log(todo_genero_pie);
								}else{
									
	                                $('#piechart_material_gen').fadeOut();
	                                $('#divGenero').fadeOut();
	                                todo_genero_pie=[];
								}

								if(Object.keys(rs.datos_sub_genero).length>0){
									
	                                $('#piechart_material_sub_gen').fadeIn();
	                                $('#divSubGenero').fadeIn();
									var cabza=[];
	                                var arr=[];
									arr.push("Participantes");
									arr.push("Genero");
									cabza.push(arr);

									for(var v in rs.datos_sub_genero){
										var arr=[];
										if(rs.datos_sub_genero[v].sub_genero!=null){
											
											arr.push( rs.datos_sub_genero[v].sub_genero);	
											arr.push(Number(rs.datos_sub_genero[v].cuentos_por_sub_genero));	
		                                    cabza.push(arr);	
										}
	                                    
									}
									todo_sub_genero_pie=cabza;
									console.log(todo_sub_genero_pie);
								}else{
									$('#piechart_material_sub_sgen').fadeOut();
	                                $('#divSubGenero').fadeOut();
	                                todo_sub_genero_pie=[];
								}


								if(Object.keys(rs.zona).length>0){
									
	                                $('#piechart_material_zona').fadeIn();
	                                $('#divZona').fadeIn();
									var cabza=[];
	                                                                var arr=[];
									arr.push("Participantes");
									arr.push("Zonas");
									cabza.push(arr);

									for(v in rs.zona){
	                                    var arr=[];
										arr.push( rs.zona[v].zona);	
										arr.push(Number(rs.zona[v].cuantos_por_zona));	
	                                    cabza.push(arr);
									}
									todo_zona_pie=cabza;
									
								}else{
									
	                                $('#piechart_material_zona').fadeOut();
	                                $('#divZona').fadeOut();
	                                todo_zona_pie=[];
								}

								if(Object.keys(rs.datos_etnia).length>0){
									
	                                $('#piechart_material_etnia').fadeIn();
	                                $('#divEtnia').fadeIn();
									var cabza=[];
	                                var arr=[];
									arr.push("Participantes");
									arr.push("Etnia");
									cabza.push(arr);

									for(v in rs.datos_etnia){
	                                    var arr=[];
										arr.push( rs.datos_etnia[v].etnia);	
										arr.push(Number(rs.datos_etnia[v].cuantos_por_etnia));	
	                                    cabza.push(arr);
									}
									todo_etnia_pie=cabza;
									
								}else{
									
	                                $('#piechart_material_etnia').fadeOut();
	                                $('#divEtnia').fadeOut();
	                                todo_etnia_pie=[];
								}
								if(Object.keys(rs.datos_sub_etnia).length>0){
									
	                                $('#piechart_material_setnia').fadeIn();
	                                $('#divOtraEtnia').fadeIn();
									var cabza=[];
	                                var arr=[];
									arr.push("Participantes");
									arr.push("Etnia");
									cabza.push(arr);

									for(v in rs.datos_sub_etnia){
	                                    var arr=[];
	                                    if(rs.datos_sub_etnia[v].sub_etnia!=null){
	                                    	arr.push( rs.datos_sub_etnia[v].sub_etnia);	
											arr.push(Number(rs.datos_sub_etnia[v].cuantos_por_etnia));	
		                                    cabza.push(arr);
	                                    }
										
									}
									todo_sub_etnia_pie=cabza;
									
								}else{
									
	                                $('#piechart_material_setnia').fadeOut();
	                                $('#divOtraEtnia').fadeOut();
	                                todo_sub_etnia_pie=[];
								}
								

								if(Object.keys(rs.datos_organizacion).length>0){
									
	                                $('#piechart_material_orga').fadeIn();
	                                $('#divOrga').fadeIn();
									var cabza=[];
	                                                                var arr=[];
									arr.push("Participantes");
									arr.push("Organizacion");
									cabza.push(arr);

									for(var v in rs.datos_organizacion){
	                                    var arr=[];
										arr.push( rs.datos_organizacion[v].organizacion);	
										arr.push(Number(rs.datos_organizacion[v].cuantos_por_organizacion));	
	                                    cabza.push(arr);
									}
									todo_orga_pie=cabza;
									
								}else{
									
	                                $('#piechart_material_orga').fadeOut();
	                                $('#divOrga').fadeOut();
	                                todo_orga_pie=[];
								}
								if(Object.keys(rs.datos_proceso).length>0){
									
	                                $('#piechart_material_proceso').fadeIn();
	                                $('#divPro').fadeIn();
									var cabza=[];
	                                var arr=[];
									arr.push("Participantes");
									arr.push("Proceso");
									cabza.push(arr);

									for(var v in rs.datos_proceso){
	                                    var arr=[];
	                                    arr.push( rs.datos_proceso[v].proceso);	
										arr.push(Number(rs.datos_proceso[v].cuantos_por_proceso));	
	                                    cabza.push(arr);
	                                                                        
									}
									todo_proceso_pie=cabza;
								}else{
									
	                                $('#piechart_material_proceso').fadeOut();
	                                $('#divPro').fadeOut();
	                                todo_proceso_pie=[];
								}	
								if(Object.keys(rs.documento).length>0){
									document.getElementById("tblListaGeneralDoc").style.display="";
									dibujar_tabla2(rs.documento);
								}else{
									document.getElementById("tblListaGeneralDoc").style.display="none";
									document.getElementById("divListaAsis1").style.display="none";
									
									//document.getElementById("divListaAsis2").style.display="none";
								} 	

								if(Object.keys(rs.nombre).length>0){
									document.getElementById("tblListaGeneralNom").style.display="";
									dibujar_tabla3(rs.nombre);
								}else{
									document.getElementById("tblListaGeneralNom").style.display="none";
									//document.getElementById("divListaAsis1").style.display="none";
									document.getElementById("divListaAsis2").style.display="none";
								} 	

								google.charts.load('current', {'packages':['corechart']});
	                            google.charts.setOnLoadCallback(dibujar_grafico_reporte_torta);
						
					},"");	

					//BRARRAS	
					registrarDato("reportes_general",{datos,id_evento:eventos},function(rs){
							
							if(!rs.respuesta){
								mostrarMensaje(rs);
							}
							document.getElementById("divListaAsis3").style.display="none";
							dibujar_tabla_eventos(rs.eventos);
							console.log(document.getElementById("divReporteGeneral"));
							
								document.getElementById("tblListaGeneral").style.display="";
								document.getElementById("divReporteGeneralLista").style.display="";
								if(Object.keys(rs.datos).length>0){
									todos_los_datos_asistentes=rs.datos;
									arr_gen=chunkArray(rs.datos,10);
									document.getElementById("divReporteGeneral").style.display="";
									dibujar_tabla(arr_gen[0]);	
									crear_sel_paginas(arr_gen.length);	
								}else{
									document.getElementById("divReporteGeneral").style.display="none";
									document.getElementById("divReporteGeneralLista").style.display="none";
								}

								

								if(Object.keys(rs.datos_escolaridad).length>0){
									
	                                $('#barchart_material_esco').fadeIn();
	                                $('#divEsco').fadeIn();
									var arr=[];
									var cabza=["Participantes"];
									var body2=["Escolaridad "];
									//cabza.push("participantes");

									for(v in rs.datos_escolaridad){
										console.log(rs.datos_escolaridad[v]);
										cabza.push( rs.datos_escolaridad[v].escolaridad);	
										body2.push(Number(rs.datos_escolaridad[v].cuantos_por_escolaridad));	
									}
									todo_esco=[cabza,body2];
									
								 	//google.charts.load('current', {'packages':['bar']});
							      	//google.charts.setOnLoadCallback(drawChartes);

								      
								}else{
									
	                                $('#barchart_material_esco').fadeOut();
	                                $('#divEsco').fadeOut();
	                                todo_esco=[];
								}


								if(Object.keys(rs.anio_ingreso_pdp).length>0){
									
	                                $('#barchart_material_anio').fadeIn();
	                                $('#divAnioIng').fadeIn();
									var arr=[];
									var cabza=["Participantes"];
									var body2=["Año ingreso PDP"];
									//cabza.push("participantes");

									for(v in rs.anio_ingreso_pdp){
										console.log(rs.anio_ingreso_pdp[v]);
										cabza.push( rs.anio_ingreso_pdp[v].anio_ingreso_pdp);	
										body2.push(Number(rs.anio_ingreso_pdp[v].cuantos_por_anio));	
									}
									todo_anio=[cabza,body2];
									
								 	
								      
								}else{
									
	                                $('#barchart_material_anio').fadeOut();
	                                $('#divAnioIng').fadeOut();
	                                todo_anio=[];
								}

								if(Object.keys(rs.cargo).length>0){
									
	                                $('#barchart_material_cargo').fadeIn();
	                                $('#divCargo').fadeIn();
									var arr=[];
									var cabza=["Participantes"];
									var body2=["Cargo Poblador"];
									//cabza.push("participantes");

									for(v in rs.cargo){
										console.log(rs.cargo[v]);
										cabza.push( rs.cargo[v].cargo_poblador);	
										body2.push(Number(rs.cargo[v].cuantos_por_cargo));	
									}
									todo_cargo=[cabza,body2];
									
								 	
								      
								}else{
										
	                                $('#barchart_material_cargo').fadeOut();
	                                $('#divCargo').fadeOut();
	                                todo_cargo=[];
								}

								

								if(Object.keys(rs.datos_cap_dife).length>0){
									
	                                $('#barchart_material_cap_dif').fadeIn();
	                                $('#divCapDife').fadeIn();
									var arr=[];
									var cabza=["Participantes"];
									var body=["Capacidades Diferentes"];
									//cabza.push("participantes");

									for(v in rs.datos_cap_dife){
										cabza.push( rs.datos_cap_dife[v].cap_dife);	
										body.push(Number(rs.datos_cap_dife[v].cuantos_por_cap_dife));	
									}
									todo_cap_dife=[cabza,body];
									
								 	
								}else{
									
	                                $('#barchart_material_cap_dif').fadeOut();
	                                $('#divCapDife').fadeOut();
	                                todo_cap_dife=[];
								}

								if(Object.keys(rs.datos_ciu_nac).length>0){
									
									$('#barchart_material_ciu').fadeIn();
									$('#divCiuNac').fadeIn();
									var arr=[];
									var cabza=["Participantes"];
									var body=["Ciudad Nacimiento"];
									//cabza.push("participantes");

									for(v in rs.datos_ciu_nac){
										cabza.push( rs.datos_ciu_nac[v].ciud_nacimiento);	
										body.push(Number(rs.datos_ciu_nac[v].cuantos_por_ciud_nacimiento));	

									}
									todo_ciu_nac=[cabza,body];
									

								}else{
									
									$('#barchart_material_ciu').fadeOut();
									$('#divCiuNac').fadeOut();
									todo_ciu_nac=[];
								}
								if(Object.keys(rs.datos_dep_nac).length>0){
									
	                                $('#barchart_material_dep_nac').fadeIn();
	                                $('#divDepNac').fadeIn();
	                                var arr=[];
									var cabza=["Participantes"];
									var body=["Departamento Nacimiento"];
									//cabza.push("participantes");

									for(v in rs.datos_dep_nac){
										cabza.push( rs.datos_dep_nac[v].dep_nacimiento);	
										body.push(Number(rs.datos_dep_nac[v].cuantos_por_dep_nacimiento));	
									}
								    todo_dep_nac=[cabza,body];
								
								}else{
									
	                                $('#barchart_material_dep_nac').fadeOut();
	                                $('#divDepNac').fadeOut();
	                                todo_dep_nac=[];
								}

								if(Object.keys(rs.datos_edaddes).length>0){
									
	                                $('#barchart_material_eda').fadeIn();
	                                $('#divEdades').fadeIn();
									var arr=[];
									var cabza=["Participantes"];
									var body=["Edad"];
									//cabza.push("participantes");

									for(v in rs.datos_edaddes){
										cabza.push( rs.datos_edaddes[v].edad+" años");	
										body.push(Number(rs.datos_edaddes[v].cuentos_por_edad));	
									}
									todo_edad=[cabza,body];
									
								}else{
									
	                                $('#barchart_material_eda').fadeOut();
	                                $('#divEdades').fadeOut();
	                                todo_edad=[];
								}
								if(Object.keys(rs.datos_genero).length>0){
									
	                                $('#barchart_material_gen').fadeIn();
	                                $('#divGenero').fadeIn();
	                                var arr=[];
									var cabza=["Participantes"];
									var body=["Genero"];
									//cabza.push("participantes");

									for(v in rs.datos_genero){
										cabza.push( rs.datos_genero[v].genero);	
										body.push(Number(rs.datos_genero[v].cuentos_por_genero));	
									}
									todo_genero=[cabza,body];
								
								}else{
									
	                                $('#barchart_material_gen').fadeOut();
	                                $('#divGenero').fadeOut();
	                                todo_genero=[];
									
								}

								
								if(Object.keys(rs.datos_sub_genero).length>0){
									
	                                $('#barchart_material_sub_gen').fadeIn();
	                                $('#divSubGenero').fadeIn();
	                                var arr=[];
									var cabza=["Participantes"];
									var body=["Otro Genero"];
									//cabza.push("participantes");

									for(v in rs.datos_sub_genero){
										if(rs.datos_sub_genero[v].sub_genero!=null){
											cabza.push( rs.datos_sub_genero[v].sub_genero);	
											body.push(Number(rs.datos_sub_genero[v].cuentos_por_sub_genero));		
										}
										
									}

									if(cabza.length>1){
										todo_sub_genero=[cabza,body];	
									}else{
										todo_sub_genero=[];	
									}
								
								}else{
								
	                                $('#barchart_material_sub_gen').fadeOut();
	                                $('#divSubGenero').fadeOut();
	                            	todo_sub_genero=[];    
									
								}

								if(Object.keys(rs.zona).length>0){
									
	                                $('#barchart_material_zona').fadeIn();
	                                $('#divZona').fadeIn();

									var arr=[];
									var cabza=["Participantes"];
									var body=["Zonas"];
									//cabza.push("participantes");

									for(v in rs.zona){
										cabza.push( rs.zona[v].zona);	
										body.push(Number(rs.zona[v].cuantos_por_zona));	
									}
									todo_zona=[cabza,body];
									
								}else{
									
	                                $('#barchart_material_zona').fadeOut();
	                                $('#divZona').fadeOut();
	                                todo_zona=[];
								}


								if(Object.keys(rs.datos_etnia).length>0){
									
	                                $('#barchart_material_etnia').fadeIn();
	                                $('#divEtnia').fadeIn();

									var arr=[];
									var cabza=["Participantes"];
									var body=["Etnia"];
									//cabza.push("participantes");

									for(v in rs.datos_etnia){
										cabza.push( rs.datos_etnia[v].etnia);	
										body.push(Number(rs.datos_etnia[v].cuantos_por_etnia));	
									}
									todo_etnia=[cabza,body];
									
								}else{
									
	                                $('#barchart_material_etnia').fadeOut();
	                                $('#divEtnia').fadeOut();
	                                todo_etnia=[];
								}

								if(Object.keys(rs.datos_sub_etnia).length>0){
									
	                                $('#barchart_material_setnia').fadeIn();
	                                $('#divOtraEtnia').fadeIn();

									var arr=[];
									var cabza=["Participantes"];
									var body=["Etnia"];
									//cabza.push("participantes");

									for(v in rs.datos_sub_etnia){
										if(rs.datos_sub_etnia[v].sub_etnia!=null){
											cabza.push( rs.datos_sub_etnia[v].sub_etnia);	
											body.push(Number(rs.datos_sub_etnia[v].cuantos_por_etnia));		
										}
										
									}
									todo_sub_etnia=[cabza,body];
									
								}else{
									$('#barchart_material_setnia').fadeOut();
									$('#divOtraEtnia').fadeOut();
	                                todo_sub_etnia=[];
								}
								

								if(Object.keys(rs.datos_organizacion).length>0){
									
	                                $('#barchart_material_orga').fadeIn();
	                                $('#divOrga').fadeIn();
									var arr=[];
									var cabza=["Participantes"];
									var body=["Organizacion"];
									//cabza.push("participantes");

									for(v in rs.datos_organizacion){
										cabza.push( rs.datos_organizacion[v].organizacion);	
										body.push(Number(rs.datos_organizacion[v].cuantos_por_organizacion));	
									}
									todo_orga=[cabza,body];
									
								}else{
									
	                                $('#barchart_material_orga').fadeOut();
	                                $('#divOrga').fadeOut();
	                                todo_orga=[];
								}
								if(Object.keys(rs.datos_proceso).length>0){
									
	                                $('#barchart_material_proceso').fadeIn();
	                                $('#divPro').fadeIn();
									var arr=[];
									var cabza=["Participantes"];
									var body=["Proceso"];
									//cabza.push("participantes");

									for(v in rs.datos_proceso){
										cabza.push( rs.datos_proceso[v].proceso);	
										body.push(Number(rs.datos_proceso[v].cuantos_por_proceso));	
									}
									todo_proceso=[cabza,body];
								}else{
									
	                                $('#barchart_material_proceso').fadeOut();
	                                $('#divPro').fadeOut();
	                                todo_proceso=[];
								}	
								if(Object.keys(rs.documento).length>0){
									document.getElementById("tblListaGeneralDoc").style.display="";
									dibujar_tabla2(rs.documento);
								}else{
									document.getElementById("tblListaGeneralDoc").style.display="none";
									//document.getElementById("divListaAsis1").style.display="none";
									document.getElementById("divListaAsis2").style.display="none";
									
								} 	

								if(Object.keys(rs.nombre).length>0){
									document.getElementById("tblListaGeneralNom").style.display="";
									dibujar_tabla3(rs.nombre);
								}else{
									document.getElementById("tblListaGeneralNom").style.display="none";
									document.getElementById("divListaAsis1").style.display="none";
									//document.getElementById("divListaAsis2").style.display="none";
								} 	 	

								google.charts.load('current', {'packages':['bar']});
	                            google.charts.setOnLoadCallback(dibujar_grafico_reporte_barras);
		
					},"");
			
					break;			
			}
		}

		
		
	});
	agregarEvento("txt_dep_nacimiento","keypress",function(e){        
        console.log(e);
        console.log(e.key);
        dep=[];
         if (e.keyCode != 13 && e.key!=undefined) {
            for(var el in globales._departamentos){
                console.log(globales._departamentos[el].departamento.toUpperCase());
                console.log(e.key);
                console.log(globales._departamentos[el].departamento.indexOf(e.key));
                if(globales._departamentos[el].departamento.toUpperCase().indexOf(e.key.toUpperCase()) >= 0){
                    
                    //console.log(globales._departamentos[el].departamento);
                    dep.push(globales._departamentos[el]);
                }
            }
            console.log(dep);
            crear_data_list("lista_datos",dep,"id","departamento");  
         }
            
    });
    agregarEvento("txt_dep_nacimiento","change",function(e){
        console.log(e);
        dep=[];
        for(var el in globales._departamentos){
              
                if(globales._departamentos[el].id == e.srcElement.value.split("-")[0]  ){
                    
                    console.log(globales._departamentos[el].ciudades);
                    dep.push(globales._departamentos[el].ciudades);
                }
            }

            crear_data_list_dos("lista_datos_2",dep);
    });
   

    agregarEvento("selEventos","change",function(e){
     		var opt=document.getElementById("selEventos").options;
     		consultarDatos("repo_eventos/"+this.value,{},function(rs){
     			var arr_sel=[];
     			var i=0;
				for(var s in opt){
					if(opt[s].selected == true && opt[s].value != "G"){
						arr_sel[i++]=opt[s].value;
					}else if(opt[s].selected == true && opt[s].value == "G"){
						arr_sel[0]=opt[s].value;
					}
				}		
				if(arr_sel.length==1){
					if(arr_sel[0]!="G"){
						fecha_evento=rs.eventos[0].date;
						lugar_evento=rs.eventos[0].city;
						nom_reporte=rs.eventos[0].name;	
					}else{
						fecha_evento="";
						lugar_evento="";	
						nom_reporte="";
					}
					
				}else{
					fecha_evento="";
					lugar_evento="";
					nom_reporte="";	
				}
				
				crear_select_3("selEtnias",rs.etnia,"etnia","etnia","Todas las etnias","0");
				crear_select_3("selCapDiff",rs.cap_dife,"cap_dife","cap_dife","Todas las Capacidades","0");		


				crear_data_list_dos("lista_datos_dep_nac",rs.dep_nacimiento,"dep_nacimiento","cuantos_por_dep_nacimiento");  
				crear_data_list_dos("lista_datos_ciu_nacimiento",rs.ciud_nacimiento,"ciud_nacimiento","cuantos_por_ciud_nacimiento");  
				crear_data_list_dos("lista_datos_cap_dife",rs.cap_dife,"cap_dife","cuantos_por_cap_dife");  
				//crear_data_list_dos("lista_datos_etnia",rs.etnia,"etnia","cuantos_por_etnia");  
				crear_data_list_dos("lista_datos_orga",rs.organizacion,"organizacion","cuantos_por_organizacion");  
				crear_data_list_dos("lista_datos_proceso",rs.proceso,"proceso","cuantos_por_proceso");  
			},"");
     	
       
    });


    agregarEvento("btnGenerarPdf","click",function(){
    	dibujar_tabla(todos_los_datos_asistentes);
     	 window.print();

     });
	
    agregarEvento("btnGenerarExcel","click",function(){
		if(document.getElementById("selEventos").value!="0"){
			var datos = $("#formReportes").serializarFormulario();
			var datos2 = $("#formReportes").serializarFormulario2();

			if(datos.tipo_doc!=undefined){
			datos.tipo_doc=datos2.tipo_doc;
		}
		if(datos.edad!=undefined){
			datos.edad=datos2.edad;
		}
		if(datos.genero!=undefined){
			datos.genero=datos2.genero;
		}
		if(datos.zonas!=undefined){
			datos.zonas=datos2.zonas;
		}
		if(datos.escolaridad!=undefined){
			datos.escolaridad=datos2.escolaridad;
		}
		if(datos.etnia!=undefined){
			var va=document.getElementById("selEtnia").value;
			console.log(va);
			if(va=="Otro"){
				va=document.getElementById("txt_et_otro").value;

			}else if(va=="0"){
				va=["Indígena","Negro (Afro-colombiano)","Blanco","Mestizo","Zambo"];					
			}
			datos.etnia=va;
		}
		
		var opt=document.getElementById("selEventos").options;
		var eventos=[];
		var i=0;
		for(var f in opt){
			if(opt[f].selected==true && opt[f].value=="G"){
				eventos=opt[f].value;
				break;
			}
			if(opt[f].selected==true){
				eventos[i++]=opt[f].value;
			}
		}

		if(datos.anio_ingreso_pdp==0){
			delete datos.anio_ingreso_pdp;
		}
		
			//registrarDato(globales._URL_ONLINE+"exportar_reporte_lista",{datos},function(rs){
			registrarDato("exportar_reporte_lista",{id_evento:document.getElementById("selEventos").value,datos:datos},function(rs){	
				if(rs.respuesta==true){
					document.getElementById("aExpor").setAttribute("href",globales._URL_ONLINE+rs.direccion);
					document.getElementById("aExpor").innerHTML="DESCARGAR REPORTE";
				}
				console.log(rs);
			});
		}else{
			mostrarMensaje("Por favor selecciona un evento");	
		}
		
	});


}




function crear_sel_paginas(tam){
	var cta=document.getElementById("selPaginas");
    cta.innerHTML="";
    cta.setAttribute("onchange","cargar_hoja()");
        
    for(var d=1; d<=tam;d++){
	        if(arr_gen[(d-1)].length!=undefined){
	        	var li=document.createElement("option");
	        
	            li.innerHTML="pagina "+(d);
	          
	            li.value=(d-1);
	          
	            cta.appendChild(li);	
	        }	
    }
}

function cargar_hoja(){

	dibujar_tabla(arr_gen[document.getElementById("selPaginas").selectedIndex]);
}

function reporte_tortas(rs){
						if(!rs.respuesta){
							mostrarMensaje(rs);
						}
						console.log(document.getElementById("divReporteGeneral"));
					    
							document.getElementById("tblListaGeneral").style.display="";
							document.getElementById("divReporteGeneralLista").style.display="";
							if(Object.keys(rs.datos).length>0){
								todos_los_datos_asistentes=rs.datos;
								arr_gen=chunkArray(rs.datos,10);
								document.getElementById("divReporteGeneral").style.display="";
								dibujar_tabla(arr_gen[0]);	
								crear_sel_paginas(arr_gen.length);
							}else{
								document.getElementById("divReporteGeneral").style.display="none";
								document.getElementById("divReporteGeneralLista").style.display="none";	
							}

							

							if(Object.keys(rs.datos_escolaridad).length>0){
								$('#piechart_material_esco').fadeIn();
                                $('#barchart_material_esco').fadeOut();
                                $('#divEsco').fadeIn();
                                
								var arr=[];
                                arr.push("Participantes");
                                arr.push("Tipo");
								var cabza=[];
								
								cabza.push(arr);

								for(var v in rs.datos_escolaridad){
                                    var arr=[];
									arr.push( rs.datos_escolaridad[v].escolaridad);	
									arr.push(Number(rs.datos_escolaridad[v].cuantos_por_escolaridad));	
                                    cabza.push(arr);
								}
                                console.log(cabza);   
								todo_esco_pie=cabza;
								
							 	

							      
							}else{
								$('#piechart_material_esco').fadeOut();
                                $('#barchart_material_esco').fadeOut();
                                $('#divEsco').fadeIn();
                                todo_esco_pie=[];
							}


							if(Object.keys(rs.anio_ingreso_pdp).length>0){
								$('#piechart_material_anio').fadeIn();
                                $('#barchart_material_anio').fadeOut();
                                $('#divAnioIng').fadeIn();
                                
								var arr=[];
                                arr.push("Participantes");
                                arr.push("Año Ingreso");
								var cabza=[];
								
								cabza.push(arr);

								for(var v in rs.anio_ingreso_pdp){
                                    var arr=[];
									arr.push( rs.anio_ingreso_pdp[v].anio_ingreso_pdp);	
									arr.push(Number(rs.anio_ingreso_pdp[v].cuantos_por_anio));	
                                    cabza.push(arr);
								}
                                console.log(cabza);   
								todo_anio_pie=cabza;
								
							 	

							      
							}else{
								$('#piechart_material_anio').fadeOut();
                                $('#barchart_material_anio').fadeOut();
                                $('#divAnioIng').fadeIn();
                                todo_anio_pie=[];
							}


							if(Object.keys(rs.cargo).length>0){
								$('#piechart_material_cargo').fadeIn();
                                $('#barchart_material_cargo').fadeOut();
                                $('#divCargo').fadeIn();
                                
								var arr=[];
                                arr.push("Participantes");
                                arr.push("Cargo");
								var cabza=[];
								
								cabza.push(arr);

								for(var v in rs.cargo){
                                    var arr=[];
									arr.push( rs.cargo[v].cargo_poblador);	
									arr.push(Number(rs.cargo[v].cuantos_por_cargo));	
                                    cabza.push(arr);
								}
                                console.log(cabza);   
								todo_cargo_pie=cabza;								  
							}else{
								$('#piechart_material_cargo').fadeOut();
                                $('#barchart_material_cargo').fadeOut();
                                $('#divCargo').fadeIn();
                                todo_cargo_pie=[];
							}


							if(Object.keys(rs.datos_cap_dife).length>0){
								$('#piechart_material_cap_dif').fadeIn();
                                 $('#barchart_material_cap_dif').fadeOut();
                                 $('#divCapDife').fadeIn();
                                 
								var cabza=[];
                                var arr=[];
								arr.push("Participantes");
								arr.push("Capacidades Diferentes");
								cabza.push(arr);

								for(var v in rs.datos_cap_dife){
                                    var arr=[];
									arr.push( rs.datos_cap_dife[v].cap_dife);	
									arr.push(Number(rs.datos_cap_dife[v].cuantos_por_cap_dife));	
                                    cabza.push(arr);
								}
								todo_cap_dife_pie=cabza;
								
							 	
							}else{
								$('#piechart_material_cap_dif').fadeOut();
                                $('#barchart_material_cap_dif').fadeOut();
                                $('#divCapDife').fadeOut();
                                todo_cap_dife_pie=[];
							}

							if(Object.keys(rs.datos_ciu_nac).length>0){
								$('#piechart_material_ciu').fadeIn();
								$('#barchart_material_ciu').fadeOut();
								$('#divCiuNac').fadeIn();
                                
								var cabza=[];
                                var arr=[];
								arr.push("Participantes");
								arr.push("Ciudad Nacimiento");
								cabza.push(arr);

								for(v in rs.datos_ciu_nac){
                                    var arr=[];
									arr.push( rs.datos_ciu_nac[v].ciud_nacimiento);	
									arr.push(Number(rs.datos_ciu_nac[v].cuantos_por_ciud_nacimiento));	
                                   cabza.push(arr);
								}
								todo_ciu_nac_pie=cabza;
								

							}else{
								$('#piechart_material_ciu').fadeOut();
								$('#barchart_material_ciu').fadeOut();
								$('#divCiuNac').fadeOut();
								todo_ciu_nac_pie=[];
							}
							if(Object.keys(rs.datos_dep_nac).length>0){
								$('#barchart_material_dep_nac').fadeOut();
                                $('#piechart_material_dep_nac').fadeIn();
                                $('#divDepNac').fadeIn();
								var arr=[];
								var cabza=[];
                                arr.push("Participantes");
								arr.push("Departamento Nacimiento");
								cabza.push(arr);

								for(var v in rs.datos_dep_nac){
                                    var arr=[];
									arr.push( rs.datos_dep_nac[v].dep_nacimiento);	
									arr.push(Number(rs.datos_dep_nac[v].cuantos_por_dep_nacimiento));	
                                    cabza.push(arr);
								}
							    todo_dep_nac_pie=cabza;
							
							}else{
								$('#barchart_material_dep_nac').fadeOut();
                                $('#piechart_material_dep_nac').fadeOut();
                                $('#divDepNac').fadeOut();
                                todo_dep_nac_pie=[];
							}

							if(Object.keys(rs.datos_edaddes).length>0){
								$('#barchart_material_eda').fadeOut();
								$('#piechart_material_eda').fadeIn();
								$('#divEdades').fadeIn();
								var cabza=[];
                                var arr=[];
								arr.push("Participantes");
								arr.push("Edad");
								cabza.push(arr);

								for(var v in rs.datos_edaddes){
									var arr=[];
									arr.push( rs.datos_edaddes[v].edad+" años");	
									arr.push(Number(rs.datos_edaddes[v].cuentos_por_edad));	
                                    cabza.push(arr);
								}
								todo_edad_pie=cabza;
								
							}else{
								$('#barchart_material_eda').fadeOut();
								$('#piechart_material_eda').fadeOut();
								$('#divEdades').fadeOut();
								todo_edad_pie=[];
							}
							if(Object.keys(rs.datos_genero).length>0){
								$('#barchart_material_gen').fadeOut();
                                $('#piechart_material_gen').fadeIn();
                                $('#divGenero').fadeIn();
								var cabza=[];
                                var arr=[];
								arr.push("Participantes");
								arr.push("Genero");
								cabza.push(arr);

								for(var v in rs.datos_genero){
                                    var arr=[];
									arr.push( rs.datos_genero[v].genero);	
									arr.push(Number(rs.datos_genero[v].cuentos_por_genero));	
                                    cabza.push(arr);
								}
								todo_genero_pie=cabza;
                                console.log(todo_genero_pie);
							}else{
								$('#barchart_material_gen').fadeOut();
                                $('#piechart_material_gen').fadeOut();
                                $('#divGenero').fadeOut();
                                todo_genero_pie=[];
							}

							if(Object.keys(rs.datos_sub_genero).length>0){
								$('#barchart_material_sub_gen').fadeOut();
                                $('#piechart_material_sub_gen').fadeIn();
                                $('#divSubGenero').fadeIn();
								var cabza=[];
                                var arr=[];
								arr.push("Participantes");
								arr.push("Genero");
								cabza.push(arr);

								for(var v in rs.datos_sub_genero){
									var arr=[];
                                    if(rs.datos_sub_genero[v].sub_genero!=null){
                                    	console.log(rs.datos_sub_genero[v].sub_genero);
                                    	
										arr.push( rs.datos_sub_genero[v].sub_genero);	
										arr.push(Number(rs.datos_sub_genero[v].cuentos_por_sub_genero));	
	                                    cabza.push(arr);	
                                    }
                                    
								}
								if(cabza.length>2){
									todo_sub_genero_pie=cabza;	
								}else{
									todo_sub_genero_pie=[];
								}
								
								console.log(todo_sub_genero_pie);
							}else{
								$('#barchart_material_sub_gen').fadeOut();
                                $('#piechart_material_sub_gen').fadeOut();
                                $('#divSubGenero').fadeOut();
                                todo_sub_genero_pie=[];
							}

							if(Object.keys(rs.zona).length>0){
								$('#barchart_material_zona').fadeOut();
                                $('#piechart_material_zona').fadeIn();
                                $('#divZona').fadeIn();
								var cabza=[];
                                                                var arr=[];
								arr.push("Participantes");
								arr.push("Zonas");
								cabza.push(arr);

								for(v in rs.zona){
                                    var arr=[];
									arr.push( rs.zona[v].zona);	
									arr.push(Number(rs.zona[v].cuantos_por_zona));	
                                    cabza.push(arr);
								}
								todo_zona_pie=cabza;
								
							}else{
								$('#barchart_material_zona').fadeOut();
                                $('#piechart_material_zona').fadeOut();
                                $('#divZona').fadeOut();
                                todo_zona_pie=[];
							}

							if(Object.keys(rs.datos_etnia).length>0){
								$('#barchart_material_etnia').fadeOut();
                                $('#piechart_material_etnia').fadeIn();
                                $('#divEtnia').fadeIn();
								var cabza=[];
                                                                var arr=[];
								arr.push("Participantes");
								arr.push("Etnia");
								cabza.push(arr);

								for(v in rs.datos_etnia){
                                    var arr=[];
									arr.push( rs.datos_etnia[v].etnia);	
									arr.push(Number(rs.datos_etnia[v].cuantos_por_etnia));	
                                    cabza.push(arr);
								}
								todo_etnia_pie=cabza;
								
							}else{
								$('#barchart_material_etnia').fadeOut();
                                $('#piechart_material_etnia').fadeOut();
                                $('#divEtnia').fadeOut();
                                todo_etnia_pie=[];
							}
							if(Object.keys(rs.datos_sub_etnia).length>0){
								$('#barchart_material_setnia').fadeOut();
                                $('#piechart_material_setnia').fadeIn();
                                $('#divOtraEtnia').fadeIn();
								var cabza=[];
                                var arr=[];
								arr.push("Participantes");
								arr.push("Etnia");
								cabza.push(arr);

								for(v in rs.datos_sub_etnia){
                                    var arr=[];
									if(rs.datos_sub_etnia[v].sub_etnia!=null){
										arr.push( rs.datos_sub_etnia[v].sub_etnia);	
										arr.push(Number(rs.datos_sub_etnia[v].cuantos_por_etnia));	
                                    	cabza.push(arr);	
									}
									
								}
								todo_sub_etnia_pie=cabza;
								
							}else{
								$('#barchart_material_setnia').fadeOut();
                                $('#piechart_material_setnia').fadeOut();
                                $('#divOtraEtnia').fadeOut();
                                todo_sub_etnia_pie=[];
							}
							

							if(Object.keys(rs.datos_organizacion).length>0){
								$('#barchart_material_orga').fadeOut();
                                $('#piechart_material_orga').fadeIn();
                                $('#divOrga').fadeIn();
								var cabza=[];
                                                                var arr=[];
								arr.push("Participantes");
								arr.push("Organizacion");
								cabza.push(arr);

								for(var v in rs.datos_organizacion){
                                    var arr=[];
									arr.push( rs.datos_organizacion[v].organizacion);	
									arr.push(Number(rs.datos_organizacion[v].cuantos_por_organizacion));	
                                    cabza.push(arr);
								}
								todo_orga_pie=cabza;
								
							}else{
								$('#barchart_material_orga').fadeOut();
                                $('#piechart_material_orga').fadeOut();
                                $('#divOrga').fadeOut();
                                todo_orga_pie=[];
							}
							if(Object.keys(rs.datos_proceso).length>0){
								$('#barchart_material_proceso').fadeOut();
                                $('#piechart_material_proceso').fadeIn();
                                $('#divPro').fadeIn();
								var cabza=[];
                                                                var arr=[];
								arr.push("Participantes");
								arr.push("Proceso");
								cabza.push(arr);

								for(var v in rs.datos_proceso){
                                    var arr=[];
                                    arr.push( rs.datos_proceso[v].proceso);	
									arr.push(Number(rs.datos_proceso[v].cuantos_por_proceso));	
                                    cabza.push(arr);
                                                                        
								}
								todo_proceso_pie=cabza;
							}else{
								$('#barchart_material_proceso').fadeOut();
                                $('#piechart_material_proceso').fadeOut();
                                $('#divPro').fadeOut();
                                todo_proceso_pie=[];
							}	
							if(Object.keys(rs.documento).length>0){
								document.getElementById("tblListaGeneralDoc").style.display="";
								dibujar_tabla2(rs.documento);
							}else{
								document.getElementById("tblListaGeneralDoc").style.display="none";
								document.getElementById("divListaAsis1").style.display="none";
								
								//document.getElementById("divListaAsis2").style.display="none";
							} 	

							if(Object.keys(rs.nombre).length>0){
								document.getElementById("tblListaGeneralNom").style.display="";
								dibujar_tabla3(rs.nombre);
							}else{
								document.getElementById("tblListaGeneralNom").style.display="none";
								//document.getElementById("divListaAsis1").style.display="none";
								document.getElementById("divListaAsis2").style.display="none";
							} 	

							google.charts.load('current', {'packages':['corechart']});
                            google.charts.setOnLoadCallback(dibujar_grafico_reporte_torta);
}
function reporte_barras(rs){
						if(!rs.respuesta){
							mostrarMensaje(rs);
						}
	
						console.log(document.getElementById("divReporteGeneral"));
						
							document.getElementById("tblListaGeneral").style.display="";
							document.getElementById("divReporteGeneralLista").style.display="";
							if(Object.keys(rs.datos).length>0){
								todos_los_datos_asistentes=rs.datos;
								arr_gen=chunkArray(rs.datos,10);
								document.getElementById("divReporteGeneral").style.display="";
								dibujar_tabla(arr_gen[0]);	
								crear_sel_paginas(arr_gen.length);	
							}else{
								document.getElementById("divReporteGeneral").style.display="none";
								document.getElementById("divReporteGeneralLista").style.display="none";
							}

							

							if(Object.keys(rs.datos_escolaridad).length>0){
								$('#piechart_material_esco').fadeOut();
                                $('#barchart_material_esco').fadeIn();
                                $('#divEsco').fadeIn();
								var arr=[];
								var cabza=["Participantes"];
								var body2=["Escolaridad "];
								//cabza.push("participantes");

								for(v in rs.datos_escolaridad){
									console.log(rs.datos_escolaridad[v]);
									cabza.push( rs.datos_escolaridad[v].escolaridad);	
									body2.push(Number(rs.datos_escolaridad[v].cuantos_por_escolaridad));	
								}
								todo_esco=[cabza,body2];
								
							 	
							      
							}else{
								$('#piechart_material_esco').fadeOut();
                                $('#barchart_material_esco').fadeOut();
                                $('#divEsco').fadeOut();
                                todo_esco=[];
							}

							if(Object.keys(rs.anio_ingreso_pdp).length>0){
								$('#piechart_material_anio').fadeOut();
                                $('#barchart_material_anio').fadeIn();
                                $('#divAnioIng').fadeIn();
								var arr=[];
								var cabza=["Participantes"];
								var body2=["Año ingreso PDP"];
								//cabza.push("participantes");

								for(v in rs.anio_ingreso_pdp){
									console.log(rs.anio_ingreso_pdp[v]);
									cabza.push( rs.anio_ingreso_pdp[v].anio_ingreso_pdp);	
									body2.push(Number(rs.anio_ingreso_pdp[v].cuantos_por_anio));	
								}
								todo_anio=[cabza,body2];
								
							 	
							      
							}else{
								$('#piechart_material_anio').fadeOut();
                                $('#barchart_material_anio').fadeOut();
                                $('#divAnioIng').fadeOut();
                                todo_anio=[];
							}

							if(Object.keys(rs.cargo).length>0){
								$('#piechart_material_cargo').fadeOut();
                                $('#barchart_material_cargo').fadeIn();
                                $('#divCargo').fadeIn();
								var arr=[];
								var cabza=["Participantes"];
								var body2=["Cargo Poblador"];
								//cabza.push("participantes");

								for(v in rs.cargo){
									console.log(rs.cargo[v]);
									cabza.push( rs.cargo[v].cargo_poblador);	
									body2.push(Number(rs.cargo[v].cuantos_por_cargo));	
								}
								todo_cargo=[cabza,body2];
								
							 	
							      
							}else{
								$('#piechart_material_cargo').fadeOut();
                                $('#barchart_material_cargo').fadeOut();
                                $('#divCargo').fadeOut();
                                todo_cargo=[];
							}

							

							if(Object.keys(rs.datos_cap_dife).length>0){
								$('#piechart_material_cap_dif').fadeOut();
                                $('#barchart_material_cap_dif').fadeIn();
                                $('#divCapDife').fadeIn();
								var arr=[];
								var cabza=["Participantes"];
								var body=["Capacidades Diferentes"];
								//cabza.push("participantes");

								for(v in rs.datos_cap_dife){
									cabza.push( rs.datos_cap_dife[v].cap_dife);	
									body.push(Number(rs.datos_cap_dife[v].cuantos_por_cap_dife));	
								}
								todo_cap_dife=[cabza,body];
								
							 	
							}else{
								$('#piechart_material_cap_dif').fadeOut();
                                $('#barchart_material_cap_dif').fadeOut();
                                $('#divCapDife').fadeOut();
                                todo_cap_dife=[];
							}

							if(Object.keys(rs.datos_ciu_nac).length>0){
								$('#piechart_material_ciu').fadeOut();
								$('#barchart_material_ciu').fadeIn();
								$('#divCiuNac').fadeIn();
								var arr=[];
								var cabza=["Participantes"];
								var body=["Ciudad Nacimiento"];
								//cabza.push("participantes");

								for(v in rs.datos_ciu_nac){
									cabza.push( rs.datos_ciu_nac[v].ciud_nacimiento);	
									body.push(Number(rs.datos_ciu_nac[v].cuantos_por_ciud_nacimiento));	

								}
								todo_ciu_nac=[cabza,body];
								

							}else{
								$('#piechart_material_ciu').fadeOut();
								$('#barchart_material_ciu').fadeOut();
								$('#divCiuNac').fadeOut();
								todo_ciu_nac=[];
							}
							if(Object.keys(rs.datos_dep_nac).length>0){
								$('#piechart_material_dep_nac').fadeOut();
                                $('#barchart_material_dep_nac').fadeIn();
                                $('#divDepNac').fadeIn();
                                var arr=[];
								var cabza=["Participantes"];
								var body=["Departamento Nacimiento"];
								//cabza.push("participantes");

								for(v in rs.datos_dep_nac){
									cabza.push( rs.datos_dep_nac[v].dep_nacimiento);	
									body.push(Number(rs.datos_dep_nac[v].cuantos_por_dep_nacimiento));	
								}
							    todo_dep_nac=[cabza,body];
							
							}else{
								$('#piechart_material_dep_nac').fadeOut();
                                $('#barchart_material_dep_nac').fadeOut();
                                $('#divDepNac').fadeOut();
                                todo_dep_nac=[];
							}

							if(Object.keys(rs.datos_edaddes).length>0){
								$('#piechart_material_eda').fadeOut();
                                $('#barchart_material_eda').fadeIn();
                                $('#divEdades').fadeIn();
								var arr=[];
								var cabza=["Participantes"];
								var body=["Edad"];
								//cabza.push("participantes");

								for(v in rs.datos_edaddes){
									cabza.push( rs.datos_edaddes[v].edad+" años");	
									body.push(Number(rs.datos_edaddes[v].cuentos_por_edad));	
								}
								todo_edad=[cabza,body];
								
							}else{
								$('#piechart_material_eda').fadeOut();
                                $('#barchart_material_eda').fadeOut();
                                $('#divEdades').fadeOut();
                                todo_edad=[];
							}
							if(Object.keys(rs.datos_genero).length>0){
								$('#piechart_material_gen').fadeOut();
                                $('#barchart_material_gen').fadeIn();
                                $('#divGenero').fadeIn();
                                var arr=[];
								var cabza=["Participantes"];
								var body=["Genero"];
								//cabza.push("participantes");

								for(v in rs.datos_genero){
									cabza.push( rs.datos_genero[v].genero);	
									body.push(Number(rs.datos_genero[v].cuentos_por_genero));	
								}
								todo_genero=[cabza,body];
							
							}else{
								$('#piechart_material_gen').fadeOut();
                                $('#barchart_material_gen').fadeOut();
                                $('#divGenero').fadeOut();
								todo_genero=[];	
							}

							if(Object.keys(rs.datos_sub_genero).length>0){
								$('#piechart_material_sub_gen').fadeOut();
                                $('#barchart_material_sub_gen').fadeIn();
                                $('#divSubGenero').fadeIn();
                                var arr=[];
								var cabza=["Participantes"];
								var body=["Genero"];
								//cabza.push("participantes");

								for(v in rs.datos_sub_genero){
									if(rs.datos_sub_genero[v].sub_genero!=null){
										cabza.push( rs.datos_sub_genero[v].sub_genero);	
										body.push(Number(rs.datos_sub_genero[v].cuentos_por_sub_genero));	
									}
									
								}
								if(cabza.length>1){
									todo_sub_genero=[cabza,body];	
								}else{
									todo_sub_genero=[];	
								}
								
							
							}else{
								$('#piechart_material_sub_gen').fadeOut();
                                $('#barchart_material_sub_gen').fadeOut();
                                $('#divSubGenero').fadeOut();
								todo_sub_genero=[];	
							}
							if(Object.keys(rs.zona).length>0){
									$('#piechart_material_zona').fadeOut();
	                                $('#barchart_material_zona').fadeIn();
	                                $('#divZona').fadeIn();

									var arr=[];
									var cabza=["Participantes"];
									var body=["Zonas"];
									//cabza.push("participantes");

									for(v in rs.zona){
										cabza.push( rs.zona[v].zona);	
										body.push(Number(rs.zona[v].cuantos_por_zona));	
									}
									todo_zona=[cabza,body];
									
								}else{
									$('#piechart_material_zona').fadeOut();
	                                $('#barchart_material_zona').fadeOut();
	                                $('#divZona').fadeOut();
	                                todo_zona=[];
								}

							if(Object.keys(rs.datos_etnia).length>0){
								$('#piechart_material_etnia').fadeOut();
                                $('#barchart_material_etnia').fadeIn();
                                $('#divEtnia').fadeIn();

								var arr=[];
								var cabza=["Participantes"];
								var body=["Etnia"];
								//cabza.push("participantes");

								for(v in rs.datos_etnia){
									cabza.push( rs.datos_etnia[v].etnia);	
									body.push(Number(rs.datos_etnia[v].cuantos_por_etnia));	
								}
								todo_etnia=[cabza,body];
								
							}else{
								$('#piechart_material_etnia').fadeOut();
                                $('#barchart_material_etnia').fadeOut();
                                $('#divEtnia').fadeOut();
                                todo_etnia=[];
							}
							if(Object.keys(rs.datos_sub_etnia).length>0){
								$('#piechart_material_setnia').fadeOut();
                                $('#barchart_material_setnia').fadeIn();
                                $('#divOtraEtnia').fadeIn();

								var arr=[];
								var cabza=["Participantes"];
								var body=["Etnia"];
								//cabza.push("participantes");

								for(v in rs.datos_sub_etnia){
									if(rs.datos_sub_etnia[v].sub_etnia!=null){
										cabza.push( rs.datos_sub_etnia[v].sub_etnia);	
										body.push(Number(rs.datos_sub_etnia[v].cuantos_por_etnia));		
									}
									
								}
								todo_sub_etnia=[cabza,body];
								
							}else{
								$('#piechart_material_setnia').fadeOut();
                                $('#barchart_material_setnia').fadeOut();
                                $('#divOtraEtnia').fadeOut();
                                todo_sub_etnia=[];
							}
							

							if(Object.keys(rs.datos_organizacion).length>0){
								$('#piechart_material_orga').fadeOut();
                                $('#barchart_material_orga').fadeIn();
                                $('#divOrga').fadeIn();
								var arr=[];
								var cabza=["Participantes"];
								var body=["Organizacion"];
								//cabza.push("participantes");

								for(v in rs.datos_organizacion){
									cabza.push( rs.datos_organizacion[v].organizacion);	
									body.push(Number(rs.datos_organizacion[v].cuantos_por_organizacion));	
								}
								todo_orga=[cabza,body];
								
							}else{
								$('#piechart_material_orga').fadeOut();
                                $('#barchart_material_orga').fadeOut();
                                $('#divOrga').fadeOut();
                                todo_orga=[];
							}
							if(Object.keys(rs.datos_proceso).length>0){
								$('#piechart_material_proceso').fadeOut();
                                $('#barchart_material_proceso').fadeIn();
                                $('#divPro').fadeIn();
								var arr=[];
								var cabza=["Participantes"];
								var body=["Proceso"];
								//cabza.push("participantes");

								for(v in rs.datos_proceso){
									cabza.push( rs.datos_proceso[v].proceso);	
									body.push(Number(rs.datos_proceso[v].cuantos_por_proceso));	
								}
								todo_proceso=[cabza,body];
							}else{
								$('#piechart_material_proceso').fadeOut();
                                $('#barchart_material_proceso').fadeOut();
                                $('#divPro').fadeOut();
                                todo_proceso=[];
							}	
							if(Object.keys(rs.documento).length>0){
								document.getElementById("tblListaGeneralDoc").style.display="";
								dibujar_tabla2(rs.documento);
							}else{
								document.getElementById("tblListaGeneralDoc").style.display="none";
								//document.getElementById("divListaAsis1").style.display="none";
								document.getElementById("divListaAsis2").style.display="none";
								
							} 	

							if(Object.keys(rs.nombre).length>0){
								document.getElementById("tblListaGeneralNom").style.display="";
								dibujar_tabla3(rs.nombre);
							}else{
								document.getElementById("tblListaGeneralNom").style.display="none";
								document.getElementById("divListaAsis1").style.display="none";
								//document.getElementById("divListaAsis2").style.display="none";
							} 	 	

							google.charts.load('current', {'packages':['bar']});
                            google.charts.setOnLoadCallback(dibujar_grafico_reporte_barras);
}

function dibujar_tabla2(datos){
		document.getElementById("divListaAsis1").style.display="";
	    document.getElementById("divListaAsis2").style.display="none";
		
		var tbl=document.getElementById("tblListaGeneralDoc");

		tbl.innerHTML="";
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML="#";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);


		var td=document.createElement("td");
		td.innerHTML="Documento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Primer Nombre";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Segundo Nombre";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Primer Apellido";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Segundo Apellido";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Genero";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Edad";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Ciudad de Nacimiento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Departamento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Télefono";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Activo desde";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Evento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Fecha asistencia";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		tbl.appendChild(tr);		
	for(var f in datos){
		console.log(datos[f]);
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML=(f+1);
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].documento;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].pri_nombre;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].seg_nombre;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].pri_apellido;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].seg_apellido;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML=datos[f].genero;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].edad+" años";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].ciud_nacimiento;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].departamento_ubi;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].celular;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].anio_ingreso_pdp;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].name;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].updated_at;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		tbl.appendChild(tr);		

	}
	
}
function dibujar_tabla3(datos){
		document.getElementById("divListaAsis1").style.display="none";
		document.getElementById("divListaAsis2").style.display="";
		var tbl=document.getElementById("tblListaGeneralNom");

		tbl.innerHTML="";
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML="#";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Documento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Primer Nombre";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Segundo Nombre";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Primer Apellido";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Segundo Apellido";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Genero";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Edad";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Ciudad de Nacimiento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Departamento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Télefono";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Activo desde";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);	

		var td=document.createElement("td");
		td.innerHTML="Evento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Fecha asistencia";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		tbl.appendChild(tr);		
	for(var f in datos){
		console.log(datos[f]);
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML=(f+1);
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].documento;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].pri_nombre;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].seg_nombre;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].pri_apellido;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].seg_apellido;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML=datos[f].genero;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].edad+" años";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].ciud_nacimiento;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].departamento_ubi;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].celular;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].anio_ingreso_pdp;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].name;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].updated_at;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		tbl.appendChild(tr);		

	}
}


function consultar_eventos(id){
	if(id=="G"){
		consultarDatos("repo_eventos/"+id,{},function(rs){
			//globales._departamentos=rs.dep_nacimiento;	

			crear_select_3("selEventos",rs.eventos,"id","name","Todos los eventos","G");
			crear_select_3("selEtnias",rs.etnia,"etnia","etnia","Todas las etnias","0");
			crear_select_3("selCapDiff",rs.cap_dife,"cap_dife","cap_dife","Todas las Capacidades","0");
			crear_data_list("lista_datos_dep_nac",rs.dep_nacimiento,"dep_nacimiento","cuantos_por_dep_nacimiento");  
			crear_data_list("lista_datos_ciu_nacimiento",rs.ciud_nacimiento,"ciud_nacimiento","cuantos_ciud_nacimiento");  
			crear_data_list("lista_datos_mun_ubi",rs.municipio,"municipio","cuantos_por_municipio");  
			crear_data_list("lista_datos_orga",rs.organizacion,"organizacion","cuantos_por_organizacion");  
			crear_data_list("lista_datos_proceso",rs.proceso,"proceso","cuantos_por_proceso");  
		},"");	
	}else{
		consultarDatos("repo_eventos/"+id,{},function(rs){
			//globales._departamentos=rs.dep_nacimiento;								
			crear_select_3("selEventos",rs.eventos,"id","name","","");
			crear_select_3("selEtnias",rs.etnia,"etnia","etnia","Todas las etnias","0");
			crear_select_3("selCapDiff",rs.cap_dife,"cap_dife","cap_dife","Todas las Capacidades","0");
			crear_data_list("lista_datos_dep_nac",rs.dep_nacimiento,"dep_nacimiento","cuantos_por_dep_nacimiento");  
			crear_data_list("lista_datos_ciu_nacimiento",rs.ciud_nacimiento,"ciud_nacimiento","cuantos_ciud_nacimiento");  
			crear_data_list("lista_datos_mun_ubi",rs.municipio,"municipio","cuantos_por_municipio");  
			crear_data_list("lista_datos_orga",rs.organizacion,"organizacion","cuantos_por_organizacion");  
			crear_data_list("lista_datos_proceso",rs.proceso,"proceso","cuantos_por_proceso"); 
			fecha_evento=rs.eventos[0].date;
			lugar_evento=rs.eventos[0].city;
		},"");
	}
	
}


function dibujar_tabla(datos){
		console.log(datos);
		var tbl=document.getElementById("tblListaGeneral");
		tbl.innerHTML="";
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML="#";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Documento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Primer Nombre";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Segundo Nombre";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Primer Apellido";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Segundo Apellido";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Genero";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Edad";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Ciudad de Nacimiento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Departamento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Télefono";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Activo desde";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		tbl.appendChild(tr);		
	for(var f in datos){
		console.log(datos[f]);
		var tr=document.createElement("tr");
		tr.setAttribute("onclick","ver_asistencia_individual('"+datos[f].documento+"')");
		

		var td=document.createElement("td");
		td.innerHTML=Number(f)+1;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].documento;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].pri_nombre;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].seg_nombre;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].pri_apellido;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].seg_apellido;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML=datos[f].genero;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].edad+" años";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].ciud_nacimiento;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].departamento_ubi;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].celular;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].anio_ingreso_pdp;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		tbl.appendChild(tr);		

	}


}

function ver_asistencia_individual(documento){
	consultarDatos("reportes_por_id/"+documento,{},function(rs){
										
						dibujar_tabla_eventos_individual(rs.datos);
							
										

				},"");	
}
//barras
function dibujar_grafico_reporte_barras(){
 
	//escolariodad
	if(todo_esco!=undefined){
		var data_esco = google.visualization.arrayToDataTable(
							          todo_esco
							         );

		var options_esoc = {
	                    
			     chart: {
			        title: nom_reporte+" Escolaridad" ,
			        subtitle: lugar_evento+" "+fecha_evento
			        },
			     bars: 'horizontal' // Required for Material Bar Charts.
			    };


		 
								        	    
		var chartesco = new google.charts.Bar(document.getElementById('barchart_material_esco'));
	    chartesco.draw(data_esco, google.charts.Bar.convertOptions(options_esoc));	
	}
	//ingreso pdp
	if(todo_anio!=undefined){
		var data_anio = google.visualization.arrayToDataTable(
							          todo_anio
							         );

		var options_anio = {
	                    
			     chart: {
			        title: nom_reporte+" año ingreso pdp" ,
			        subtitle: lugar_evento+" "+fecha_evento
			        },
			     bars: 'horizontal' // Required for Material Bar Charts.
			    };


		 
								        	    
		var chartesco = new google.charts.Bar(document.getElementById('barchart_material_anio'));
	    chartesco.draw(data_anio, google.charts.Bar.convertOptions(options_anio));	
	}
	//cargo
	if(todo_cargo!=undefined){
		var data_cargo = google.visualization.arrayToDataTable(
							          todo_cargo
							         );

		var options_cargo = {
	                    
			     chart: {
			        title: nom_reporte+" cargo poblador" ,
			        subtitle: lugar_evento+" "+fecha_evento
			        },
			     bars: 'horizontal' // Required for Material Bar Charts.
			    };


		 
								        	    
		var chartesco = new google.charts.Bar(document.getElementById('barchart_material_cargo'));
	    chartesco.draw(data_cargo, google.charts.Bar.convertOptions(options_cargo));	
	}
	//genero
	if(todo_genero!=undefined){
			var data_genero = google.visualization.arrayToDataTable(
							          todo_genero
							         );
		    var options_genero = {
				     chart: {
				        title: nom_reporte+" Genero" ,
				        subtitle: lugar_evento+" "+fecha_evento
				        },
				     bars: 'horizontal' // Required for Material Bar Charts.
				    };

		    var chartgen = new google.charts.Bar(document.getElementById('barchart_material_gen'));
			chartgen.draw(data_genero, google.charts.Bar.convertOptions(options_genero));
	}
    
    
	//sub/genero
    if(todo_sub_genero!=undefined){
    	if(Object.keys(todo_sub_genero).length>1){
    		var data_sgenero = google.visualization.arrayToDataTable(
							          todo_sub_genero
							         );
		    var options_sgenero = {
				     chart: {
				        title: nom_reporte+" Otros Generos" ,
				        subtitle: lugar_evento+" "+fecha_evento
				        },
				     bars: 'horizontal' // Required for Material Bar Charts.
				    };

			
		    var chartsgen = new google.charts.Bar(document.getElementById('barchart_material_sub_gen'));
			chartsgen.draw(data_sgenero, google.charts.Bar.convertOptions(options_sgenero));
    	}else{
    		$("#divSubGenero").fadeOut();	
    	}
    	
			
    }else{
    	$("#divSubGenero").fadeOut();
    }
    //proceso
    if(todo_proceso!=undefined){
		var data_pro = google.visualization.arrayToDataTable(
							          todo_proceso
							         );

							        var options_pro = {
							          chart: {
							            title: nom_reporte+" Procesos",
							            subtitle: lugar_evento+" "+fecha_evento
							          },
							          bars: 'horizontal' // Required for Material Bar Charts.
							        };

							        var chart_pro = new google.charts.Bar(document.getElementById('barchart_material_proceso'));

							        chart_pro.draw(data_pro, google.charts.Bar.convertOptions(options_pro));
	}
    
	if(todo_orga_pie!=undefined){
		//organizacion
					var data_org = google.visualization.arrayToDataTable(
							          todo_orga
							         );

							        var options_org = {
							          chart: {
							            title: nom_reporte+" Organizacion",
							            subtitle: lugar_evento+" "+fecha_evento
							          },
							          bars: 'horizontal' // Required for Material Bar Charts.
							        };

							        var chart_org = new google.charts.Bar(document.getElementById('barchart_material_orga'));

							        chart_org.draw(data_org, google.charts.Bar.convertOptions(options_org));
	}

	//zona
	if(todo_zona!=undefined){
			var data_zona = google.visualization.arrayToDataTable(
							          todo_zona
							         );

							        var options_zona = {
							          chart: {
							            title: nom_reporte+" Zonas",
							            subtitle: lugar_evento+" "+fecha_evento
							          },
							          bars: 'horizontal' // Required for Material Bar Charts.
							        };

							        var chart_et = new google.charts.Bar(document.getElementById('barchart_material_zona'));

							        chart_et.draw(data_zona, google.charts.Bar.convertOptions(options_zona));		
	}		
	
	//etnia
	if(todo_etnia!=undefined){
			var data_etnia = google.visualization.arrayToDataTable(
							          todo_etnia
							         );

							        var options_etnia = {
							          chart: {
							            title: nom_reporte+" Etnia",
							            subtitle: lugar_evento+" "+fecha_evento
							          },
							          bars: 'horizontal' // Required for Material Bar Charts.
							        };

							        var chart_et = new google.charts.Bar(document.getElementById('barchart_material_etnia'));

							        chart_et.draw(data_etnia, google.charts.Bar.convertOptions(options_etnia));		
	}		
	
	 
	//subetnia
	if(todo_sub_etnia!=undefined ){
		if(Object.keys(todo_sub_etnia).length>1){
			var data_setnia = google.visualization.arrayToDataTable(
							          todo_sub_etnia
							         );

							        var options_setnia = {
							          chart: {
							            title: nom_reporte+" Etnia",
							            subtitle: lugar_evento+" "+fecha_evento
							          },
							          bars: 'horizontal' // Required for Material Bar Charts.
							        };

							        var chart_ets = new google.charts.Bar(document.getElementById('barchart_material_setnia'));

							        chart_ets.draw(data_setnia, google.charts.Bar.convertOptions(options_setnia));							        				        				      	
		
		}
		
	 
	}else{
		$('#divOtraEtnia').fadeOut();
	}
	//edad
	if(todo_edad!=undefined){
		var data_ed = google.visualization.arrayToDataTable(
							          todo_edad
							         );

							        var options_ed = {
							          chart: {
							            title: nom_reporte+" Edades",
							            subtitle: lugar_evento+" "+fecha_evento
							          },
							          bars: 'horizontal' // Required for Material Bar Charts.
							        };

							        var chart_ed = new google.charts.Bar(document.getElementById('barchart_material_eda'));

							        chart_ed.draw(data_ed, google.charts.Bar.convertOptions(options_ed));			
	}
	//departamento nacimiento
	if(todo_dep_nac!=undefined){
		var data_dep_nac = google.visualization.arrayToDataTable(
							          todo_dep_nac
							         );

							        var options_dep_nac = {
							          chart: {
							            title: nom_reporte+" Departamento Nacimiento",
							            subtitle: lugar_evento+" "+fecha_evento
							          },
							          bars: 'horizontal' // Required for Material Bar Charts.
							        };

							        var chart_dep_nac = new google.charts.Bar(document.getElementById('barchart_material_dep_nac'));

							        chart_dep_nac.draw(data_dep_nac, google.charts.Bar.convertOptions(options_dep_nac));	
	}
	//ciudad nacimeinto
	if(todo_ciu_nac!=undefined){
		        var data_ciu_nac = google.visualization.arrayToDataTable(
							          todo_ciu_nac
							         );

							        var options_ciu_nac = {
							          chart: {
							            title: nom_reporte +" Ciudad Nacimiento",
							            subtitle: lugar_evento+" "+fecha_evento
							          },
							          bars: 'horizontal' // Required for Material Bar Charts.
							        };

							        var chart_ciu_nac = new google.charts.Bar(document.getElementById('barchart_material_ciu'));

							        chart_ciu_nac.draw(data_ciu_nac, google.charts.Bar.convertOptions(options_ciu_nac));						        
		
	}  			        
	
						        

	if(todo_cap_dife!=undefined){
		//capacidad diferecias
		var data_cap_dif = google.visualization.arrayToDataTable(
							          todo_cap_dife
							         );

							        var options_cap_dif = {
							          chart: {
							            title: nom_reporte+" Capacidades Diferentes",
							            subtitle: lugar_evento+" "+fecha_evento
							          },
							          bars: 'horizontal' // Required for Material Bar Charts.
							        };

							        var chart_cap_dif = new google.charts.Bar(document.getElementById('barchart_material_cap_dif'));

							        chart_cap_dif.draw(data_cap_dif, google.charts.Bar.convertOptions(options_cap_dif));
	}
							        


							   
							   
}
function dibujar_grafico_reporte_torta(){
	//escolariodad
	if(todo_esco_pie!=undefined){
		var data_esco = google.visualization.arrayToDataTable( todo_esco_pie     );
        console.log(data_esco);
        console.log(todo_esco_pie);
		var options_esoc = {
			     
			         title: nom_reporte+" Escolaridad",
	          		 is3D: true,
			         };
				        	    
		var chartesco = new google.visualization.PieChart(document.getElementById('piechart_material_esco'));
	        chartesco.draw(data_esco,options_esoc);
	}
	//año ingreso
	if(todo_anio_pie!=undefined){
		var data_anio = google.visualization.arrayToDataTable( todo_anio_pie     );
        console.log(data_anio);
        console.log(todo_anio_pie);
		var options_anio = {
			     
			         title: nom_reporte+" Año ingreso PDP",
	          		 is3D: true,
			         };
				        	    
		var chartesco = new google.visualization.PieChart(document.getElementById('piechart_material_anio'));
	        chartesco.draw(data_anio,options_anio);
	}
	//cargo
	if(todo_cargo_pie!=undefined){
		var data_cargo = google.visualization.arrayToDataTable( todo_cargo_pie     );
        console.log(data_cargo);
        console.log(todo_cargo_pie);
		var options_cargo = {
			     
			         title: nom_reporte+" Cargo Poblador",
	          		 is3D: true,
			         };
				        	    
		var chartesco = new google.visualization.PieChart(document.getElementById('piechart_material_cargo'));
	        chartesco.draw(data_cargo,options_cargo);
	}
	//genero
	if(todo_genero_pie!=undefined){
			var data_genero = google.visualization.arrayToDataTable(todo_genero_pie);
	       console.log(data_genero);
	         var options_genero = {
			     title: nom_reporte,
	          	     is3D: true,
			    };

	     var chartgen = new google.visualization.PieChart(document.getElementById('piechart_material_gen'));
		chartgen.draw(data_genero, options_genero);
	}
    
    
	//sub_genero
	if(todo_sub_genero_pie[1]!=undefined){
		
		 var data_sub_genero = google.visualization.arrayToDataTable(todo_sub_genero_pie);
     	 console.log(data_sub_genero);
         var options_sub_genero = {
		     title: nom_reporte,
          	     is3D: true,
		 };

     	 var chartsgen = new google.visualization.PieChart(document.getElementById('piechart_material_sub_gen'));
		 chartsgen.draw(data_sub_genero, options_sub_genero);
	}else{
		$("#divSubGenero").fadeOut();
	}
    
	//proceso
	if(todo_proceso_pie!=undefined){
		var data_pro = google.visualization.arrayToDataTable( todo_proceso_pie );

							        var options_pro = {
							          title: nom_reporte+" Genero",
          							  is3D: true,
							        };
                                                                
							        var chart_pro = new google.visualization.PieChart(document.getElementById('piechart_material_proceso'));

							        chart_pro.draw(data_pro, options_pro);
	}
	
	//organizacion
	if(todo_orga_pie!=undefined){
			var data_org = google.visualization.arrayToDataTable(todo_orga_pie);

							        var options_org = {
							          title: nom_reporte+" Organizaciones",
          							  is3D: true,
							        };

							        var chart_org = new google.visualization.PieChart(document.getElementById('piechart_material_orga'));

							        chart_org.draw(data_org, options_org);		
	}
	//zona
	if(todo_zona_pie!=undefined){
		var data_zona = google.visualization.arrayToDataTable( todo_zona_pie);

							        var options_zona = {
							           title: nom_reporte+" Zonas",
          							  is3D: true,
							        };

							        var chart_et = new google.visualization.PieChart(document.getElementById('piechart_material_zona'));

							        chart_et.draw(data_zona, options_zona);	
	}
	//etnia
	if(todo_etnia_pie!=undefined){
		var data_etnia = google.visualization.arrayToDataTable( todo_etnia_pie);

							        var options_etnia = {
							           title: nom_reporte+" Etnias",
          							  is3D: true,
							        };

							        var chart_et = new google.visualization.PieChart(document.getElementById('piechart_material_etnia'));

							        chart_et.draw(data_etnia, options_etnia);	
	}
	 
	//subetnia
	if(todo_sub_etnia_pie[1]!=undefined){
		var data_setnia = google.visualization.arrayToDataTable( todo_sub_etnia_pie);

							        var options_setnia = {
							           title: nom_reporte+" Etnias",
          							  is3D: true,
							        };

							        var chart_et = new google.visualization.PieChart(document.getElementById('piechart_material_setnia'));

							        chart_et.draw(data_setnia, options_setnia);	
	}else{
		$('#divOtraEtnia').fadeOut();
	}
	 						        					        				      
	//edad
	if(todo_edad_pie!=undefined){
		var data_ed = google.visualization.arrayToDataTable(  todo_edad_pie );

							        var options_ed = {
							          title: nom_reporte+" Edades",
          							  is3D: true,
							        };

							        var chart_ed = new google.visualization.PieChart(document.getElementById('piechart_material_eda'));

							        chart_ed.draw(data_ed,options_ed);						        
	}
	  
	//departamento nacimiento
	if(todo_dep_nac_pie!=undefined){
			var data_dep_nac = google.visualization.arrayToDataTable(todo_dep_nac_pie   );

							        var options_dep_nac = {
							           title: nom_reporte+" Departamentos de nacimiento",
          							   is3D: true,
							        };

							        var chart_dep_nac = new google.visualization.PieChart(document.getElementById('piechart_material_dep_nac'));

							        chart_dep_nac.draw(data_dep_nac, options_dep_nac);			
	}
				        

	//ciudad nacimeinto
	if(todo_ciu_nac_pie!=undefined){
		var data_ciu_nac = google.visualization.arrayToDataTable( todo_ciu_nac_pie );

							        var options_ciu_nac = {
							           title: nom_reporte+" Ciudad de nacimeinto",
          							   is3D: true,
							        };

							        var chart_ciu_nac = new google.visualization.PieChart(document.getElementById('piechart_material_ciu'));

							        chart_ciu_nac.draw(data_ciu_nac, options_ciu_nac );						
	}
	if(todo_cap_dife_pie!=undefined){
		var data_cap_dif = google.visualization.arrayToDataTable( todo_cap_dife_pie );

							        var options_cap_dif = {
							           title: nom_reporte+" Capacidades",
          							   is3D: true,
							        };

							        var chart_cap_dif = new google.visualization.PieChart(document.getElementById('piechart_material_cap_dif'));

							        chart_cap_dif.draw(data_cap_dif, options_cap_dif);	
	}               
	//capacidad diferecias
						        

}
function dibujar_tabla_eventos(datos){
		var tbl=document.getElementById("tblListaEventosGeneral");
		tbl.innerHTML="";
	
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML="Nombre Evento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Fecha Evento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Ciudad Evento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Asistentes Evento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		tbl.appendChild(tr);		
	for(var f in datos){
		console.log(datos[f]);
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML=datos[f].name;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		
		var td=document.createElement("td");
		td.innerHTML=datos[f].date;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].city;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);


		var td=document.createElement("td");
		td.innerHTML=datos[f].cuantos_por_eventos;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		tbl.appendChild(tr);		}

}
function dibujar_tabla_eventos_individual(datos){
		document.getElementById("divListaAsis3").style.display="";
		document.getElementById("tldRepoInd").innerHTML="Reporte Asistencia Individual de </br>"+datos[0].nombre;
		var tbl=document.getElementById("tblListaGeneralIndi");
		tbl.innerHTML="";
	
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML="Nombre Evento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Fecha Evento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Ciudad Evento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Asistencia Evento";
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		tbl.appendChild(tr);		
	for(var f in datos){
		console.log(datos[f]);
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML=datos[f].name;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		
		var td=document.createElement("td");
		td.innerHTML=datos[f].date;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].city;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);


		var td=document.createElement("td");
		td.innerHTML=datos[f].updated_at;
		td.className="mdl-data-table__cell--non-numeric";
		tr.appendChild(td);

		tbl.appendChild(tr);		

	}

}
