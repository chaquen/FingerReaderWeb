var pos;
function iniciar_evento_participantes(){
    var d=recibirValorGet();
    pos=d[0].split("=")[1];

    globales._usuario=obtener_local_storage("ssUsuario");
    if(globales._usuario==false){
        location.href="index.html";
    }
    globales._URL=globales._URL_BE;
    
    
   
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
             if(datos.etnia=="Otro"){
                datos.etnia=document.getElementById("txt_et_otro").value;
             }
             if(datos.genero=="Otro"){
                datos._sub_genero=document.getElementById("txtGenero").value;
             }

             if(datos.tipo_doc=="0"){
                mostrarMensaje("Selecciona el tipo documento");
                return false;
             }
                //registrarDato("participantes",{datos:datos,id:data.id},function(rs){
                registrarDatoOff(globales._URL+"controlador/controlador_participantes.php","crearParticipanteSinEvento",{datos:datos,id:pos},function(rs){
                        if(rs.respuesta==true){
                            mostrarMensaje(rs);
                            window.close();
                            
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
    agregarEvento("btnGuardarAsistentes","click",function(){
        consultarDatosOff(globales._URL_BE+"controlador/controlador_participantes.php","guardar_asistentes",{id_evento:pos},function(rs){
                console.log(rs);
                
                mostrarMensaje(rs);
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
    cargar_archivos();

}

function cargar_archivos(){
     consultarDatosOff("script_data/data/colombia.json","",{},function(rs){
        console.log(rs);
        globales._departamentos=rs;
        crear_data_list("txt_dep_nacimiento",rs,"id","departamento");
        
    });


   
}


agregarEventoLoad(iniciar_evento_participantes);
