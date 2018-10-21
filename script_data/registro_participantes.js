var pos;
var procesos=[];
function iniciar_evento_participantes(){
    var d=recibirValorGet();
    pos=d[0].split("=")[1];

    globales._usuario=obtener_local_storage("ssUsuario");
    if(globales._usuario==false){
        location.href="index.html";
    }
    globales._URL=globales._URL_BE;
    
    agregarEvento("liInicio","click",function(){
        location.href="menuEventos.html";
    });
    agregarEvento("btnEventos","click",function(){
        location.href="eventos.html";
    });
    agregarEvento("btnReportes","click",function(){
        location.href="reportes.html";
    });
   
    agregarEvento("btnRegistrarParticiapantes","click",function(){
        var datos = $("#formPobladores").serializarFormulario();
       
        
        if(false!=datos){
             datos.estado_registro="registrado";
             console.log(datos);
             console.log(pos);
             datos.created_at=horaCliente();
             datos.created_at=horaCliente();
             datos.tipo_registro="nuevo";
             datos.state=true;


             if(rgxNumero.test(datos.documento)==false){
                mostrarMensaje("Por favor ingresa solo números enteros positivos y sin puntos");
                return false; 
             }
             if(datos.documento.length <= 3){
                mostrarMensaje("Por favor ingresa unnumero con mas de cuatro cifras valido para el documento");
                return false; 
             }
             if(datos.etnia!="0"){
                if(datos.etnia=="Otro"){
                     datos.sub_etnia=document.getElementById("txt_et_otro").value;
                 }else{
                    datos.sub_etnia="";
                 }
             }else{
                mostrarMensaje("Selecciona una etnia");
                return false; 
             }
             if(datos.genero!="--Genero--"){
                if(datos.genero=="Otro"){
                    datos.genero_otro=document.getElementById("txtGenero").value;
                 }   
             }else{
                mostrarMensaje("Debes seleccionar un género");
                return false; 
             }

             if(datos.zona=="0"){
                
                mostrarMensaje("Debes seleccionar una zona");
                return false; 
                    
             }
             if(datos.cargo_poblador==""){
                datos.cargo_poblador="Ninguno";
             }  
             

             if(datos.tipo_doc=="0"){
                mostrarMensaje("Selecciona el tipo documento");
                return false;
             }
             if(procesos.length==0){
                mostrarMensaje("Selecciona al menos un proceso");
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
                         mostrarMensaje("Ingresa el título obtenido");
                        return false;  
                    }
                 }else{
                    document.getElementById("txtTitulo").value="Ninguno";
                    datos.titulo_obt="Ninguno";
                 }   


             }else{
                mostrarMensaje("Selecciona la escolaridad");
                return false; 
             }

             if(datos.anio_ingreso_pdp=="0"){
                mostrarMensaje("Selecciona el año de ingreso al pdp");
                return false; 
             }

            

             datos.dep_nacimiento=datos.dep_nacimiento.split("-")[1];
             datos.departamento_ubi=datos.departamento_ubi.split("-")[1];
             
               registrarDatoOff(globales._URL+"controlador/controlador_participantes.php","crearParticipanteSinEvento",{datos:datos,id:pos},function(rs){
                        if(rs.respuesta==true){
                            mostrarMensaje(rs);
                            //alert('El usuario se registro con exito');
                            //  window.open('','_parent',''); 
                            window.close(); 
                            //location.href="menuEventos.html";
                            
                        }else{
                        	mostrarMensaje(rs);
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
 

    agregarEvento("btnSalir","click",function(){

        if(confirm("¿Estas seguro de salir de la aplicación?")){
            eliminar_local_storage("ssUsuario");
            location.href="index.html";     
        }
    });

    agregarEvento("selEtnia","change",function(){
        console.log(this.value);
        console.log("Otro");
        if(this.value==="Otro"){
            $("#divOtraEtnia").fadeIn("fast");
        }else{
            $("#divOtraEtnia").fadeOut("fast");
        }
    });
    agregarEvento("selGenero","change",function(){
        console.log(this.value);
        console.log("Otro");
        if(this.value==="Otro"){
            $("#divGenero").fadeIn("fast");
        }else{
            $("#divGenero").fadeOut("fast");
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
                document.getElementById("txtTitulo").value="";
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



function dibujar_procesos(){
    var lista=document.getElementById("liProceso");
    lista.innerHTML="";
    for(var f in procesos){
        var li=document.createElement("li");
        li.innerHTML=procesos[f];
        lista.appendChild(li);
    }
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

agregarEventoLoad(iniciar_evento_participantes);
