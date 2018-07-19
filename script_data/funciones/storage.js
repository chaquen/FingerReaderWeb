/*Funcion para consultar session storage*/
function obtener_session_storage(nombreSession){
    if(sessionStorage[nombreSession]!=undefined){
       var sesion=JSON.parse(sessionStorage[nombreSession]);
    
       return sesion;
    }else{  
        return false;
    }
}
function agregar_session_storage(nombre,datos){
     sessionStorage.setItem(nombre,JSON.stringify(datos));
}

function obtener_id_usuario(){
    var s= obtener_session_storage("ssUsuario");
    return s.id_usuario;
}
function eliminar_session_storage(nombre){
    if(nombre!=undefined){
        sessionStorage.removeItem(nombre);
    }else{
        sessionStorage.clear();
    }
}
/*Funcion para consultar local storage*/
function obtener_local_storage(nombreSession){
    if(localStorage[nombreSession]!=undefined){
       var sesion=JSON.parse(localStorage[nombreSession]);
    
       return sesion;
    }else{  
        return false;
    }
}
function agregar_local_storage(nombre,datos){
     
        try {
          
            if(localStorage[nombre]!=undefined){
                
                localStorage.removeItem(nombre);
                
                localStorage.setItem(nombre,JSON.stringify(datos));   
                localStorage.setItem("fecha_creacion",JSON.stringify(horaCliente()));   
             }else{
                localStorage.setItem(nombre,JSON.stringify(datos));   
                console.log(localStorage);

             }
        }
        catch(err) {
            document.getElementById("demo").innerHTML = err.message;
        }
}

function obtener_id_usuario(){
    var s= obtener_local_storage("lsUsuario");
    return s.id_usuario;
}
function eliminar_local_storage(nombre){
    if(nombre!=undefined){
        console.log(nombre);
        localStorage.removeItem(nombre);
        localStorage.removeItem("fecha_creacion");

    }else{
        localStorage.clear();
    }
}