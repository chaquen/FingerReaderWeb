var pos;
var procesos=[];
function iniciar_evento_actualizar_participantes(){
    var d=recibirValorGet();
    pos=d[0].split("=")[1];
    buscar_participante(pos);
    globales._usuario=obtener_local_storage("ssUsuario");
    if(globales._usuario==false){
        location.href="index.html";
    }
    globales._URL=globales._URL_BE;
    
    
   
    agregarEvento("btnActualizarParticiapantes","click",function(){
        var datos = $("#formPobladores").serializarFormulario();
       
         
        if(false!=datos){
            document.getElementById("btnActualizarParticiapantes").style.display="none";
             datos.estado_registro="registrado";
             console.log(datos);
             console.log(pos);
             datos.created_at=horaCliente();
             datos.created_at=horaCliente();
             datos.tipo_registro="nuevo";
             datos.state=true;
             if(datos.etnia!="0"){
                if(datos.etnia=="Otro"){
                     datos.sub_etnia=document.getElementById("txt_et_otro").value;
                 }else{
                    datos.sub_etnia="";
                 }
             }else{
                 mostrarMensaje("Selecciona una etnia");
                 document.getElementById("btnActualizarParticiapantes").style.display="";
                return false; 
             }
             
             if(datos.genero!="--Genero--"){
                if(datos.genero=="Otro"){
                    datos.genero_otro=document.getElementById("txtGenero").value;
                 }   
             }else{
                mostrarMensaje("Debes seleccionar un genero");
                document.getElementById("btnActualizarParticiapantes").style.display="";
                return false; 
             }

             if(datos.zona=="0"){
                
                mostrarMensaje("Debes seleccionar una zona");
                document.getElementById("btnActualizarParticiapantes").style.display="";
                return false; 
                    
             }
             if(datos.cargo_pobrador==""){
                datos.cargo_pobrador="Ninguno";
             }  
             

             if(datos.tipo_doc=="0"){
                mostrarMensaje("Selecciona el tipo documento");
                document.getElementById("btnActualizarParticiapantes").style.display="";
                return false;
             }
             if(procesos.length==0){
                mostrarMensaje("Selecciona al menos un proceso");
                document.getElementById("btnActualizarParticiapantes").style.display="";
                return false;  
             }else{
                for(var p in procesos){ 
                    procesos[p]=procesos[p].split("-")[0];
                }
                datos.procesos=procesos;
             }
             if(datos.escolaridad!="0"){
                if(datos.escolaridad!="Ninguno"){
                    if(document.getElementById("txtTitulo").value==""){
                         mostrarMensaje("Ingresa el titulo obtenido");
                         document.getElementById("btnActualizarParticiapantes").style.display="";
                        return false;  
                    }
                 }else{
                    document.getElementById("txtTitulo").value="Ninguno";
                 }   


             }else{
                mostrarMensaje("Selecciona la escolaridad");
                document.getElementById("btnActualizarParticiapantes").style.display="";
                return false; 
             }

             if(datos.anio_ingreso_pdp=="0"){
                mostrarMensaje("Selecciona el año de ingreso al pdp");
                document.getElementById("btnActualizarParticiapantes").style.display="";
                return false; 
             }
             if(datos.dep_nacimiento.split("-")[1]==undefined){
                datos.dep_nacimiento=datos.dep_nacimiento;
             }else{
                datos.dep_nacimiento=datos.dep_nacimiento.split("-")[1];
             }
             if(datos.departamento_ubi.split("-")[1]==undefined){
                datos.departamento_ubi=datos.departamento_ubi;
             }else{
                datos.departamento_ubi=datos.departamento_ubi.split("-")[1];
             }
             
             
                //registrarDato("participantes",{datos:datos,id:data.id},function(rs){
                registrarDatoOff(globales._URL+"controlador/controlador_participantes.php","actualizarParticipanteConEvento",{datos:datos,id:pos},function(rs){
                        if(rs.respuesta==true){
                            mostrarMensaje(rs);

                            //  window.open('','_parent',''); 
                            //window.close(); 
                            location.href="menuEventos.html";

                            
                        }
                        
                    
                },"formPobladores");
        }else{
                mostrarMensaje("Por favor ingresa los campos requeridos");
        
        }
     
    });
    
    agregarEvento("btnCancelarParticiapantes","click",function(){
        limpiarFormulario("formPobladores");
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
            console.log(dep)
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
            console.log(document.getElementById("lista_datos_2"));
    });

     agregarEvento("txt_dep_2","keypress",function(e){        
        console.log(e);
        console.log(e.key);
        dep2=[];
         if (e.keyCode != 13 && e.key!=undefined) {
            for(var el in globales._departamentos){
                console.log(globales._departamentos[el].departamento.toUpperCase());
                console.log(e.key);
                console.log(globales._departamentos[el].departamento.indexOf(e.key));
                if(globales._departamentos[el].departamento.toUpperCase().indexOf(e.key.toUpperCase()) >= 0){
                    
                    //console.log(globales._departamentos[el].departamento);
                    dep2.push(globales._departamentos[el]);
                }
            }
            console.log(dep2)
            crear_data_list("lista_datos_dep_2",dep2,"id","departamento");  
         }
            
    });
    agregarEvento("txt_dep_2","change",function(e){
        console.log(e);
        dep2=[];
        for(var el in globales._departamentos){
              
                if(globales._departamentos[el].id == e.srcElement.value.split("-")[0]  ){
                    
                    console.log(globales._departamentos[el].ciudades);
                    dep2.push(globales._departamentos[el].ciudades);
                }
            }

            crear_data_list_dos("lista_datos_mun_2",dep2);
    });

    agregarEvento("btn_Regresar","click",function(){
        location.href="menuEventos.html";
    });


    agregarEvento("txt_cc","change",function(){
        consultarDatosOff(globales._URL_BE+"controlador/controlador_usuario.php","validar_cc",{cc:this.value},function(rs){
                console.log(rs);
                
                if(rs.respuesta==true){
                    mostrarMensaje("Este documento ya esta registrado");
                }
        });
    });
   
    agregarEvento("selEtnia","change",function(){
        console.log(this.value);
        console.log("Otro");
        if(this.value==="Otro"){
            document.getElementById("txt_et_otro").style.display="";
        }else{
            document.getElementById("txt_et_otro").style.display="none";
        }
    });
    agregarEvento("selGenero","change",function(){
        console.log(this.value);
        console.log("Otro");
        if(this.value==="Otro"){
            document.getElementById("txtGenero").style.display="";
        }else{
            document.getElementById("txtGenero").style.display="none";
        }
    });
    agregarEvento("txtLineas","change",function(){
        //console.log(document.getElementById("txtLineas").value.split("-")[0]);
        if(document.getElementById("txtLineas").value!=""){
            consultarDatosOff(globales._URL_BE+"controlador/controlador_eventos.php","consultarProceso",{nombre:document.getElementById("txtLineas").value.split("-")[0]},function(rs){
                console.log(rs);
                
                crear_data_list_tres("listaProcesos",rs.datos,"id","nombre_proceso");
                
            });
        }
        
    });
    agregarEvento("btnAgregarProceso","click",function(){
        if(document.getElementById("txtProceso").value!=""){
            var reg=true;
            for(var p in procesos){
                if(procesos[p]==document.getElementById("txtProceso").value){
                    reg=false;
                    break;
                }
            }

            if(reg){
                console.log(document.getElementById("txtProceso").value);
                procesos.push(document.getElementById("txtProceso").value);  
                dibujar_procesos();  
                document.getElementById("txtLineas").value="";
                document.getElementById("txtProceso").value="";
            }else{
                mostrarMensaje("Este proceso ya se registro");
            }
            
           //document.getElementById("txtLineas").value="";
            //document.getElementById("txtProceso").value="";
        }else{
            mostrarMensaje("Debes seleccionar una linea y un proceso");
        }
        
    });
    agregarEvento("selEscolaridad","change",function(){
       
        switch(this.value){
            case "Primaria":
                dibujar_grado("selGrado",1,5);
                document.getElementById("selGrado").style.display="";
                document.getElementById("txtTitulo").value="";
            break;
            
            case "Bachillerato":
                dibujar_grado("selGrado",6,11);
                document.getElementById("selGrado").style.display="";
                document.getElementById("txtTitulo").value="";
            break;
            default:
                document.getElementById("selGrado").style.display="none";
            break;
        }
    });
    agregarEvento("selGrado","change",function(){
        document.getElementById("txtTitulo").value="";
        document.getElementById("txtTitulo").value=this.value+"° Grado";
    });
		
    cargar_archivos();
    dibujar_anio("selAnioDeingreso");


}

function cargar_archivos(){
     consultarDatosOff("script_data/data/colombia.json","",{},function(rs){
        console.log(rs);
        globales._departamentos=rs;
       crear_data_list("lista_datos",rs,"id","departamento");
        crear_data_list("lista_datos_dep_2",rs,"id","departamento");
        
    });

    consultarDatosOff(globales._URL_BE+"controlador/controlador_eventos.php","consultarLineas",{},function(rs){
        console.log(rs);
        
        crear_data_list_tres("listaLineas",rs.datos,"id","nombre_linea");
        
    });

   
}

function buscar_participante(id){
    if(id!=undefined){
        consultarDatosOff(globales._URL_BE+"controlador/controlador_participantes.php","consultarParticipantePorId",{id:id},function(rs){
            console.log(rs);
            mostrar_datos_usuario(rs.datos[0]);
            
        });    
    }
	
}

function mostrar_datos_usuario(datos){
    agregar_valor_txt("txt_cc",datos.documento);
    agregar_valor_txt("txtLugExo",datos.lugar_exp);
    agregar_valor_txt("txtPriApe",datos.pri_apellido);
    agregar_valor_txt("txtSegApe",datos.seg_apellido);
    agregar_valor_txt("txtPriNom",datos.pri_nombre);
    agregar_valor_txt("txtSegNom",datos.seg_nombre);
    agregar_valor_txt("txt_dep_nacimiento",datos.dep_nacimiento);
    agregar_valor_txt("txt_ciud_nacimiento",datos.ciud_nacimiento);
    agregar_valor_txt("fecNac",datos.fecha_nac);
    agregar_valor_txt("txtGenero",datos.sub_genero);
    agregar_valor_txt("txtCapDif",datos.cap_dife);
    agregar_valor_txt("txt_et_otro",datos.sub_etnia);
    agregar_valor_txt("txtMunUbi",datos.municipio);
    agregar_valor_txt("txt_dep_2",datos.departamento_ubi);    
    agregar_valor_txt("txtCel",datos.celular);   
    agregar_valor_txt("txtEmail",datos.email);
    agregar_valor_txt("txtEscolaridad",datos.escolaridad);   
    agregar_valor_txt("txtTitulo",datos.titulo_obt);   
    agregar_valor_txt("txtCargo",datos.cargo_poblador);   
    agregar_valor_select("selTipoDoc",datos.tipo_doc);
    agregar_valor_select("selGenero",datos.genero);
    agregar_valor_select("selEtnia",datos.etnia);
    agregar_valor_select("selEscolaridad",datos.escolaridad);
    agregar_valor_select("selZona",datos.zona);
    agregar_valor_select("selAnioDeingreso",datos.anio_ingreso_pdp);
    dibujar_procesos_db(datos.procesos);
    
}
function agregar_valor_txt(id,value){
    document.getElementById(id).value=value;
}
function agregar_valor_select(id,value){

    for(var f in document.getElementById(id).options){
        if(document.getElementById(id).options[f]!=undefined){
            if(document.getElementById(id).options[f].innerHTML==value || document.getElementById(id).options[f].value==value){
                document.getElementById(id).options[f].selected=true;
            }
        }
        
    }
}

function dibujar_procesos_db(proc){
    var lista=document.getElementById("liProceso");
    //lista.innerHTML="";
    for(var f in proc){
        procesos.push(proc[f].id+"-"+proc[f].nombre_proceso);

        var li=document.createElement("li");
        var h=document.createElement("h5");
        h.innerHTML=proc[f].id+"-"+proc[f].nombre_proceso;
        var h5=document.createElement("h6");
        //h5.setAttribute("onclick","quitar('"+proc[f].id_detalle_proceso+"')");
        //h5.innerHTML="Quitar";
        li.appendChild(h);
        li.appendChild(h5);
        lista.appendChild(li);
    }
}
function quitar(id){
    if(confirm("¿Desea eliminar este proceso?")){
        consultarDatosOff(globales._URL_BE+"controlador/controlador_eventos.php","eliminarDetalleProceso",{id:id},function(rs){
            console.log(rs);
            
            
        });    
    }
    
}

function dibujar_procesos(){
    var lista=document.getElementById("liProceso");
    lista.innerHTML="";
    for(var f in procesos){
    
        var li=document.createElement("li");
        var h=document.createElement("h5");
        h.innerHTML=procesos[f];
        var h5=document.createElement("h6");
        //h5.setAttribute("onclick","quitar('"+proc[f].id_detalle_proceso+"')");
        //h5.innerHTML="Quitar";
        li.appendChild(h);
        li.appendChild(h5);
        lista.appendChild(li);

    }
}
agregarEventoPageShow(iniciar_evento_actualizar_participantes);
