var dep;
var pos;
var id;
var participantes=[];
function iniciar_evento_participantes(){


    globales._usuario=obtener_local_storage("ssUsuario");
    if(globales._usuario==false){
        location.href="index.html";
    }
    globales._URL=globales._URL_BE;
    
    var d=recibirValorGet();
     pos=d[0].split("=")[1];
    //console.log(d);
    //onsole.log(d[0].split("=")[1]);

    //globales._eventos=obtener_local_storage("lsEventos");
    
   
    console.log(globales._eventos[pos]);

    /*consultarDatosOff("script_data/data/colombia.json","",{},function(rs){
        console.log(rs);
        globales._departamentos=rs;
        crear_data_list("txt_dep_nacimiento",rs,"id","departamento");
        
    });*/
    //console.log(globales._URL);
    //console.log(globales._URL+"controlador/controlador_participantes.php");
    consultar_participantes();
   
    agregarEvento("btnRegistrarParticiapantes","click",function(){
        var datos = $("#formPobladores").serializarFormulario();
       
        
        if(false!=datos){
             datos.estado_registro="registrado";
             console.log(datos);
             console.log(id);
             datos.created_at=horaCliente();
             datos.created_at=horaCliente();
             datos.tipo_registro="nuevo";
             datos.state=true;
                //registrarDato("participantes",{datos:datos,id:data.id},function(rs){
                registrarDatoOff(globales._URL+"controlador/controlador_participantes.php","crearParticipante",{datos:datos,id:id,id_evento:pos},function(rs){
                        if(rs.respuesta==true){
                            mostrarMensaje(rs);
                            document.getElementById("contenedorP").style.display='none';
                            document.getElementById("tblParticipantes").style.display='block';
                            consultar_participantes();
                        }
                        
                    
                },"formPobladores");
        }else{
                mostrarMensaje("Por favor ingresa los campos requeridos");
        }
    });
    
    agregarEvento("btnCancelarParticiapantes","click",function(){
        limpiarFormulario("formPobladores");
    });
    
    
 
    /*agregarEvento("txt_dep_nacimiento","keypress",function(e){        
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
    });
    */
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
    

    registrarDatoOff(globales._URL_BE+"controlador/controlador_eventos.php","seleccionar_evento",{id_evento:pos},function(rs){
                        if(rs.respuesta==false){
                            mostrarMensaje("Error al selecciona evento");
                            
                        }else{
                             console.log(eval(rs.valores_consultados)[0].id);
                             document.getElementById("h1NombreDelEvento").innerHTML=eval(rs.valores_consultados)[0].name;
                             document.getElementById("id_evento").value=eval(rs.valores_consultados)[0].id;
                        }
                        

                    
                },"");
    
}
agregarEventoLoad(iniciar_evento_participantes);

function dibujar_registrados(){
    var div=document.getElementById("tblParticipantesRegistrados");
    div.innerHTML="";
    var tr=document.createElement("tr");
    
    var th=document.createElement("th");
    th.className="mdl-data-table__cell--non-numeric";
    th.innerHTML="Primer Nombre";
    tr.appendChild(th);
    
    var th=document.createElement("th");
    th.className="mdl-data-table__cell--non-numeric";
    th.innerHTML="Segundo Nombre";
    tr.appendChild(th);
    
    var th=document.createElement("th");
    th.className="mdl-data-table__cell--non-numeric";
    th.innerHTML="Primer Apellido";
    tr.appendChild(th);
    
    var th=document.createElement("th");
    th.className="mdl-data-table__cell--non-numeric";
    th.innerHTML="Segundo Apellido";
    tr.appendChild(th);
    
    div.appendChild(tr);
    var datos=participantes;
    for(var d in datos){

        var tr=document.createElement("tr");
        
        var td=document.createElement("td");
        td.className="mdl-data-table__cell--non-numeric";
        td.innerHTML=datos[d].pri_nombre;
        tr.appendChild(td);
        
        var td=document.createElement("td");
        td.className="mdl-data-table__cell--non-numeric";
        td.innerHTML=datos[d].seg_nombre;
        tr.appendChild(td);
        
        var td=document.createElement("td");
        td.className="mdl-data-table__cell--non-numeric";
        td.innerHTML=datos[d].pri_apellido;
        tr.appendChild(td);
        
        
        var td=document.createElement("td");
        td.className="mdl-data-table__cell--non-numeric";
        td.innerHTML=datos[d].seg_apellido;
        tr.appendChild(td);
        
        
        
        div.appendChild(tr);
    
    }
}
function agregar_a_var_participantes(dato){
    console.log(dato);
    var existe=false;
    for(var f in participantes){
        if(participantes[f].id==dato.id){
            existe=true;
        }
    }

    if(!existe){
        console.log(participantes);
        if(participantes==null){
            participantes=[];
        }
        participantes.push(dato);
          dibujar_registrados();
    }
}
function consultar_participantes(){
    consultarDatosOff(globales._URL+"controlador/controlador_participantes.php","consultarParticipantePendientes",{id:pos},function(rs){
        console.log(rs);   
        
        var div=document.getElementById("tblParticipantesRegistrados");
        //div.innerHTML="";
        var tr=document.createElement("tr");
        
        var th=document.createElement("th");
        th.className="mdl-data-table__cell--non-numeric";
        th.innerHTML="Primer Nombre";
        tr.appendChild(th);
        
        var th=document.createElement("th");
        th.className="mdl-data-table__cell--non-numeric";
        th.innerHTML="Segundo Nombre";
        tr.appendChild(th);
        
        var th=document.createElement("th");
        th.className="mdl-data-table__cell--non-numeric";
        th.innerHTML="Primer Apellido";
        tr.appendChild(th);
        
        var th=document.createElement("th");
        th.className="mdl-data-table__cell--non-numeric";
        th.innerHTML="Segundo Apellido";
        tr.appendChild(th);
        
        div.appendChild(tr);    


        participantes=rs.valores_consultados;
        dibujar_registrados();
        
        
        
    });
}