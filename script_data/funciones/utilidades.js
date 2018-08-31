/**
 * Variables globales con expresiones regulares
 * 
 * */
var rgxEmail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?: |com.es|com|com.co|net.co|co|org|net|biz|info|mobi|cat|es|ar|futbol|rocks|)$/i;
var rgxNumero=/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/;

/**
 * url=//Ubicacion del archivo a consultar en la peticion HTTP
 * data= datos enviado en formato Json
 * type=tipo de metodo en este caso con el metodo POST
 * dataType=formato en que se recibe la informacion
 * */
/*funcion para consultar la hora del cliente*/
function horaCliente(){
    var anio= new Date();
    var mes= new Date();
    var dia=new Date();
    var hora=new Date(); 
    var minuto= new Date();
    var segundo= new Date();

    var a=anio.getFullYear();
    if(a<=9){
      a="0"+a;
    }
    var m= mes.getMonth();
    if(m<9){
      m="0"+(m+1);
    }else{  
      m=(m+1);
    }
    var d=dia.getDate();
    if(d<=9){
      d="0"+d;
    }

    
   
    var h=hora.getHours();
    if(h<=9){
        h="0"+h;
    }
    var minutos=minuto.getMinutes();
    if(minutos<=9){
        minutos="0"+minutos;
    }
    var segundos=segundo.getSeconds();
    if(segundos<=9){
        segundos="0"+segundos;
    }
    var ultActividad=a+"-"+m+"-"+d+" "+h+":"+minutos+":"+segundos;
    return ultActividad;
    
}
function horaClienteFormato(fecha){
       

    var a=fecha.getFullYear();
    if(a<=9){
      a="0"+a;
    }
    var m= fecha.getMonth();
    if(m<9){
      m="0"+(m+1);
    }else{  
      m=(m+1);
    }
    var d=fecha.getDate();
    if(d<=9){
      d="0"+d;
    }

    
   
    
    var ultActividad=a+"-"+m+"-"+d;
    return ultActividad;
    
}
function horaClientePersonlizada(){
    var anio= new Date();
    var mes= new Date();
    var dia=new Date();
    var hora=new Date(); 
    var minuto= new Date();
    var segundo= new Date();
    var m =mes.getUTCMonth()+1;
    var mes_nombre="";
    switch(m){
      case 1:
      mes_nombre="ENERO";
        break;
      case 2:
      mes_nombre="FEBRERO";
        break;
      case 3:
        mes_nombre="MARZO";
        break;
      case 4:
        mes_nombre="ABRIL";
        break;
      case 5:
        mes_nombre="MAYO";
        break;
      case 6:
      mes_nombre="JUNIO";
        break;
        case 7:
        mes_nombre="JULIO";
        break;
        case 8:
        mes_nombre="AGOSTO";
        break;
        case 9:
        mes_nombre="SEPTIEMBRE";
        break;
        case 10:
        mes_nombre="OCTUBRE";
        break;
        case 11:
        mes_nombre="NOVIEMBRE";
        break;
        case 12:
        mes_nombre="DICIEMBRE";
        break;   
    }
    var ultActividad=dia.getDate()+" DE "+(mes_nombre)+" DE "+anio.getFullYear();
    return ultActividad;
    
}


function ayer(){
  var obj_anio = new Date();
    var obj_mes = new Date();
    var obj_dia =new Date();
    var dia=obj_dia.getDate()-1;
    var mes=obj_mes.getMonth()+1;
    var anio=obj_anio.getFullYear();  
    /*var dia=1;
    var mes=10;
    var anio=2016;*/

    if(dia==1){
        
 
         switch(mes){
           case 1:
              anio=anio-1;
              mes="12";
              dia="31";
            break;
           case 2:
               mes="01";
               dia="31"; 
            break;
           case 3:
                mes="02";
                if ((anio % 4 == 0) && (anio % 100 != 0) || (anio % 400 == 0)){
                  dia="29";
                }else{
                  dia="28";
                }
                
            break;
           case 4:
               mes="03";
               dia="31"; 
            break;
           case 5:
                mes="04";
                dia="30";
            break;
           case 6:
               mes="05";
               dia="31"; 
            break;
           case 7:
               mes="06";
               dia="30"; 
            break;
           case 8:
              mes="07";
              dia="31";
            break;
           case 9:
              mes="08";
              dia="31";
            break;
           case 10:
              mes="09";
              dia="30";
            break;
           case 11:
              mes="10";
              dia="31";
            break;
           case 12:
              mes="11";
              dia="30";
            break;   
         } 
    }
    //console.log(anio+"-"+(mes)+"-"+(dia));
    return anio+"-"+(mes)+"-"+(dia);
}

function este_mes(){
  var mes = new Date();
  switch(mes.getMonth()+1){
    case 1:
      return [mes.getFullYear()+"-01-"+"01",mes.getFullYear()+"-01-"+"31"];
    break;
    case 2:
    //pilas con los biciestos
      
     var ano=mes.getFullYear();
      if ((ano % 4 == 0) && (ano % 100 != 0) || (ano % 400 == 0)){
        return [mes.getFullYear()+"-02-"+"01",mes.getFullYear()+"-02-"+"29"];
      }
        return [mes.getFullYear()+"-02-"+"01",mes.getFullYear()+"-02-"+"28"];
    
    break;
    case 3:
      return [mes.getFullYear()+"-03-"+"01",mes.getFullYear()+"-03-"+"31"];
    break;
    case 4:
      return [mes.getFullYear()+"-04-"+"01",mes.getFullYear()+"-04-"+"30"];
    break;
    case 5:
      return [mes.getFullYear()+"-05-"+"01",mes.getFullYear()+"-05-"+"31"];
    break;
    case 6:
      return [mes.getFullYear()+"-06-"+"01",mes.getFullYear()+"-06-"+"30"];
    break;
    case 7:
      return [mes.getFullYear()+"-07-"+"01",mes.getFullYear()+"-07-"+"31"];
    break;
    case 8:
      return [mes.getFullYear()+"-08-"+"01",mes.getFullYear()+"-08-"+"31"];
    break;
    case 9:
      return [mes.getFullYear()+"-09-"+"01",mes.getFullYear()+"-09-"+"30"];
    case 10:
      return [mes.getFullYear()+"-10-"+"01",mes.getFullYear()+"-10-"+"31"];
    break;
    case 11:
      return [mes.getFullYear()+"-11-"+"01",mes.getFullYear()+"-11-"+"30"];
    break;
    case 12:
      return [mes.getFullYear()+"-12-"+"01",mes.getFullYear()+"-12-"+"31"];
    break;
    
  } 

}

    

/*Funcion para agregar un evento a un elemento del objeto DOCUMENT*/
function agregarEvento(idElemento,evento,funcion){
    if(document.getElementById(idElemento)!=null){
        
        /*//console.log("Nombre evento ");
        //console.log(evento);
        //console.log("Funcion ");
        //console.log(funcion);*/
        
        document.getElementById(idElemento).addEventListener(evento,funcion,false);
        if(evento=="click"){
          document.getElementById(idElemento).ondblclick = function() { return false; }
        } 
        
        
        
    }else{
        /*//console.log("ERROR");
        //console.log("Nombre evento ");
        //console.log(evento);
        //console.log("Funcion ");
        //console.log(funcion);
        //console.log("-Elemento");
        //console.log(idElemento);
        //console.log("el elemento no existe");*/
    }
    
} 
/*Funcion para agregar una funcion al evento load del objeto WINDOW*/
function agregarEventoLoad(funcion){
    window.addEventListener("load",funcion,false);
    
}
/*Funcion para agregar una funcion al evento page show del objeto WINDOW*/
function agregarEventoPageShow(funcion){
    window.addEventListener("pageshow",funcion,false);
}

function mostrarMensaje(dato){
    
    if(dato.mensaje!=undefined){
        alert(dato.mensaje);
    }else if(dato.mensaje!=undefined){
        alert(dato.mensaje);
    }else{
        alert(dato);
    }
    
}
function salir(_usuario){
    
    if(confirm("Desea salir de la aplicacion?")){
        globales._usuario=false;
        globales._cerrar_sesion=true;
        
        agregar_session_storage("ssGlobales",globales);
        if(obtener_local_storage("ssGlobales")){
          
          agregar_local_storage("ssGlobales",globales);
        }  
        location.href="index.html";
     }
}
/*
 * Funcion para convertir los valores enviados por GET 
 * a un array
 * 
 * @returns {recibirValorGet.tmparr}
 */
function recibirValorGet(){
  //console.log(window.location.href);
  //console.log(window.location.pathname);
    params=window.location.href.split("?");
    if(params[1]!=undefined){
      params=params[1].split("&");
      if(params!=""){
          return params;
      }else{
          return false;
      }  
    }else{
      //console.log("No ay parametros enviados a la página");
      return false;
    }
    
    
      
}
function cambiarAccion(){
    
    switch(this.id.split("_")[0]){
        //USUARIO
       
         case "buscar":
         accionUsuario="consulta";
            break;
         case "editar":
         accionUsuario="editar";
            break;
         case "eliminar":
            accionUsuario="eliminar";
            break;   
         
         //DEFAULT   
         default:
             mostrarMensaje({mensaje:"Por favor agrega una accion para el usuario "+this.id.split("_")[0]});
             break;
    }
}




//funcion para el control de teclas 
var combinacion=[];
function control_de_teclas(){
     var isCtrl = false;
        document.onkeyup=function(e){
            if(e.which == 17) isCtrl=false;
        }
        document.onkeydown=function(e){
        if(e.which == 17) {isCtrl=true;}
            
            if(isCtrl && e.which != 17){
                switch(e.which){
                    case 49:
                      //CRTL+1
                      //console.log("acción para CTRL+1 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 50:
                      //CRTL+2
                      //console.log("acción para CTRL+2 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                     case 51:
                      //CRTL+3
                      //console.log("acción para CTRL+3 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                     case 52:
                      //CRTL+4
                      //console.log("acción para CTRL+4 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 53:
                      //CRTL+5
                      //console.log("acción para CTRL+5 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 54:
                      //CRTL+6
                      //console.log("acción para CTRL+6 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 55:
                      //CRTL+7
                      //console.log("acción para CTRL+7 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 56:
                      //CRTL+8
                      //console.log("acción para CTRL+8 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 57:
                      //CRTL+9
                      //console.log("acción para CTRL+9 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;           
                    case 83:
                    //S
                    //console.log("acción para CTRL+S y evitar que ejecute la acción propia del navegador");
                    //return false;            
                    break;
                    case 82:
                    //R
                    
                    //console.log("acción para CTRL+R y evitar que ejecute la acción propia del navegador");
                    return false;
                    break;
                    case 86:
                      //console.log("acción para CTRL+V y evitar que ejecute la acción propia del navegador");
                      //agregar_boton_ticket(1);
                      break;
                      case 67:
                      //console.log("acción para CTRL+C y evitar que ejecute la acción propia del navegador");
                     /* if(confirm("¿Desea registrar esta factura?")){
                        crear_factura();  
                      }*/
                      
                    break;
                    case 69:
                      //console.log("acción para CTRL+E y evitar que ejecute la acción propia del navegador");
                     // eliminar_ticket(_numero_ticket);
                    break;  
                    default:
                        //console.log("acción para CTRL+"+e.which+" y evitar que ejecute la acción propia del navegador");

                        //return false;
                    break;
                }    
            }
            
        }


}
function crear_data_list(id_data_list,datos,id,valor){
  var existe=false;
  var sel=document.getElementById(id_data_list);
          sel.innerHTML="";
          var opt=document.createElement("option");
          opt.innerHTML="SELECCIONA UNA";
          opt.setAttribute("value","--");
          sel.appendChild(opt); 
          

  Object.keys(datos).forEach(function(clave) {

    var mis_llaves=Object.keys(datos[clave]);
    
    for(var l in mis_llaves){

      if(existe==false && mis_llaves[l]==id){
        var opt=document.createElement("option");
        opt.setAttribute("value",datos[clave][id]+"-"+datos[clave][valor]);
        existe=true;
      }
      if(existe==true && mis_llaves[l]==valor){
        opt.innerHTML=datos[clave][id]+"-"+datos[clave][valor];
        sel.appendChild(opt); 
        existe=false;
        var opt=document.createElement("option");
      }
    }
 });

  //console.log(sel);
}
function crear_data_list_tres(id_data_list,datos,id,valor){
  var existe=false;
  var sel=document.getElementById(id_data_list);
          sel.innerHTML="";
          var opt=document.createElement("option");
          opt.innerHTML="SELECCIONA UNA";
          opt.setAttribute("value","--");
          sel.appendChild(opt); 
          

  Object.keys(datos).forEach(function(clave) {

    var mis_llaves=Object.keys(datos[clave]);
    
    for(var l in mis_llaves){

      if(existe==false && mis_llaves[l]==id){
        var opt=document.createElement("option");
        opt.setAttribute("value",datos[clave][id]+"-"+datos[clave][valor]);
        existe=true;
      }
      if(existe==true && mis_llaves[l]==valor){
        opt.innerHTML=datos[clave][id]+"-"+datos[clave][valor];
        sel.appendChild(opt); 
        existe=false;
        var opt=document.createElement("option");
      }
    }
 });
  
  //console.log(sel);
}
function crear_data_list_dos(id_data_list,datos,id,valor){
  var existe=false;
  var sel=document.getElementById(id_data_list);
          sel.innerHTML="";
          var opt=document.createElement("option");
          opt.innerHTML="SELECCIONA UNA OPCION";
          opt.setAttribute("value","--");
          sel.appendChild(opt); 
          

  Object.keys(datos).forEach(function(clave) {

    var mis_llaves=Object.keys(datos[clave]);
    
    for(var l in datos[clave]){
      //console.log(datos[clave][l]);
      if(existe==false && datos[clave][l]!=""){

        var opt=document.createElement("option");
        opt.setAttribute("value",datos[clave][l]);
        existe=true;
      }
      if(existe==true && datos[clave][l]!=""){
        opt.innerHTML=datos[clave][l];
        sel.appendChild(opt); 
        existe=false;
        var opt=document.createElement("option");
      }
    }
 });

  //console.log(sel);
}
/*
  FUNCION PARA CREAR SELECT DINAMICOS
  {id_select}=>ID ELEMENTO HTML,
  {datos}=>DATOS JSON,
  {id}=>clave uno, debe ser para el id del elemento,
  {valor}=> clave dos debe ser para e valor,
*/
function crear_select(id_select,datos,id,valor){
    
  var existe=false;
   var sel=document.getElementById(id_select);
  if(sel!=null){

          sel.innerHTML="";
          var opt=document.createElement("option");
          opt.innerHTML="SELECCIONA UNA OPCION";
          opt.setAttribute("value","0");
          //sel.appendChild(opt); 
          
       
        Object.keys(datos).forEach(function(clave) {
          //console.log(clave);
          //console.log(Object.keys(datos[clave]));
         
         
          var mis_llaves=Object.keys(datos[clave]);
          
          for(var l in mis_llaves){

            if(existe==false && mis_llaves[l]==id){
              //console.log(mis_llaves[l]);
              //console.log(datos[clave][id]);
              var opt=document.createElement("option");
              opt.setAttribute("value",datos[clave][id]);
              existe=true;
            }
              ////console.log("-"+mis_llaves[l]);
              ////console.log("->"+valor);
            if(existe==true && mis_llaves[l]==valor){
              ////console.log(mis_llaves[l]);
              ////console.log(datos[clave][valor]);
              ////console.log(mis_llaves[l]);
              ////console.log(datos[clave][valor]);
              opt.innerHTML=datos[clave][valor];
              sel.appendChild(opt); 
              existe=false;
              var opt=document.createElement("option");
            }
          }
       });

        //console.log(sel);
  }
}

function crear_select_2(id_select,datos,id,valor){
    
  var existe=false;
   var sel=document.getElementById(id_select);
  if(sel!=null){

          sel.innerHTML="";
          var opt=document.createElement("option");
          opt.innerHTML="Reporte general";
          opt.setAttribute("value","G");
          sel.appendChild(opt); 
          
       
        Object.keys(datos).forEach(function(clave) {
          //console.log(clave);
          //console.log(Object.keys(datos[clave]));
         
         
          var mis_llaves=Object.keys(datos[clave]);
          
          for(var l in mis_llaves){

            if(existe==false && mis_llaves[l]==id){
              //console.log(mis_llaves[l]);
              //console.log(datos[clave][id]);
              var opt=document.createElement("option");
              opt.setAttribute("value",datos[clave][id]);
              existe=true;
            }
              ////console.log("-"+mis_llaves[l]);
              ////console.log("->"+valor);
            if(existe==true && mis_llaves[l]==valor){
              ////console.log(mis_llaves[l]);
              ////console.log(datos[clave][valor]);
              ////console.log(mis_llaves[l]);
              ////console.log(datos[clave][valor]);
              opt.innerHTML=datos[clave][valor];
              sel.appendChild(opt); 
              existe=false;
              var opt=document.createElement("option");
            }
          }
       });

        //console.log(sel);
  }
}
function crear_select_3(id_select,datos,id,valor,prim_item,pri_value){
    
  var existe=false;
   var sel=document.getElementById(id_select);
  if(sel!=null){

          sel.innerHTML="";
          var opt=document.createElement("option");
          opt.innerHTML=prim_item;
          opt.setAttribute("value",pri_value);
          if(prim_item!=""){
            sel.appendChild(opt); 
          }
          
          
       
        Object.keys(datos).forEach(function(clave) {
          ////console.log(clave);
          ////console.log(Object.keys(datos[clave]));
         
         
          var mis_llaves=Object.keys(datos[clave]);
          
          for(var l in mis_llaves){

            if(existe==false && mis_llaves[l]==id){
              //console.log(mis_llaves[l]);
              //console.log(datos[clave][id]);
              var opt=document.createElement("option");
              opt.setAttribute("value",datos[clave][id]);
              existe=true;
            }
              ////console.log("-"+mis_llaves[l]);
              ////console.log("->"+valor);
            if(existe==true && mis_llaves[l]==valor){
              ////console.log(mis_llaves[l]);
              ////console.log(datos[clave][valor]);
              ////console.log(mis_llaves[l]);
              ////console.log(datos[clave][valor]);
              opt.innerHTML=datos[clave][valor];
              sel.appendChild(opt); 
              existe=false;
              var opt=document.createElement("option");
            }
          }
       });

        //console.log(sel);
  }
}


/*  FUNCION PARA CREAR TABLAS SIN FUNCIONES

  {id_tabla}=>ID DEL ELEMENTO QUE CONTIENE LA TABLA,
  {datos}=>DATOS DE LA TABLA,
  {columnas}=>NOMBRE DE LAS COLUMNAS Y DE LOS VALORES,
  {clase_tabla}=>CLASE PARA LA TABLA,
  {clase_fila}=>CLASE PARA LA FILA,
  {clase_celda}=>CLASE PARA LA CELDA,
*/

function crear_tablas(id_tabla,datos,columnas,clase_tabla,clase_fila,clase_celda){
  //console.log(datos);
  //console.log(columnas);
  var existe=false;
  var div=document.getElementById(id_tabla);
  var tabla=document.createElement("table");
  if(clase_tabla!=undefined){
    tabla.setAttribute("class",clase_tabla);
  }
  div.innerHTML="";
  var fila=document.createElement("tr");
  for(var l in columnas){
      var celda=document.createElement("td"); 
      //console.log(l);  
      if(columnas[l]!=undefined){
        
         if(clase_fila!=undefined){
            fila.setAttribute("class",clase_fila);
          }
         //console.log(columnas[l]);
         celda.innerHTML=columnas[l];
         if(clase_celda!=undefined){
            celda.setAttribute("class",clase_celda);
          }
         
       
         fila.appendChild(celda);
         //console.log(fila); 
         tabla.appendChild(fila);
      }
  }    
  Object.keys(datos).forEach(function(clave) {
   
    var mis_llaves=columnas;
    //console.log(mis_llaves);  
     var fila=document.createElement("tr");
    for(var l in mis_llaves){
      var celda=document.createElement("td"); 
      //console.log(l);  
      if(datos[clave][l]!=undefined){
        
         if(clase_fila!=undefined){
            fila.setAttribute("class",clase_fila);
          }
         //console.log(datos[clave][l]);
         celda.innerHTML=datos[clave][l];
         if(clase_celda!=undefined){
            celda.setAttribute("class",clase_celda);
          }
         
       
       fila.appendChild(celda);
       //console.log(fila); 
      }

       tabla.appendChild(fila);
       div.appendChild(tabla); 
      
      /*if(existe==false && mis_llaves[l]==id){
        var opt=document.createElement("option");
        opt.setAttribute("value",datos[clave][id]);
        existe=true;
      }
      if(existe==true && mis_llaves[l]==valor){
        opt.innerHTML=datos[clave][valor];
        sel.appendChild(opt); 
        existe=false;
        var opt=document.createElement("option");
      }*/
    }
 });
}



//funcion que extiende Js y serializa un formulario

$.fn.serializarFormulario = function()
      {
      var o = {};
      //console.log(this);
      
      if(this[0]!=undefined){
        var elementos=this[0].elements;
        for(var e in elementos){
          //console.log(elementos[e].required);
          if(elementos[e].required==true && elementos[e].value ==""){
            elementos[e].style.borderColor="blue";
            return false;
          }else if(elementos[e].required!=undefined){
            elementos[e].style.borderColor="";
          }
        }

        var a = this.serializeArray();
        
        $.each(a, function() {
              

           if (o[this.name]) {
              

               if (!o[this.name].push) {
                   o[this.name] = [o[this.name]];
               }
                //console.log(this.name);
                
               o[this.name].push(this.value || '');
           } else {
                
                o[this.name] = this.value || '';
                
           }

          
        });
        return o;
      }else{
        return false;
      }
};
//FUNCION PARA LIMPIAR LOS FORMULARIOS
 function limpiarFormulario(idForm){
    var form=document.getElementById(idForm);
    //console.log(form);
    if(form!=null){
            for(var i in form.elements){

            if(form.elements[i].nodeName == "TEXTAREA"){
                form.elements[i].value="";  
            }
            ////console.log(form.elements[i].style.borderColor);
            ////console.log(form.elements[i].checked);
            ////console.log(form.elements[i].value);


            switch(form.elements[i].type){
                case "text":
                    form.elements[i].value="";
                    break;
                case "email":
                    form.elements[i].value="";
                    break;
                case "number":
                    form.elements[i].value="";
                    break;
                case "password":
                    form.elements[i].value="";
                    break;
                case "select-one":
                    form.elements[i].value="0";
                    break;
                case "date":
                    form.elements[i].value="";
                    break;    
                case "checkbox":
                    form.elements[i].checked=false;
                    break;
                case "radio":
                    form.elements[i].checked=false;
                break;
                 case "file":
                    form.elements[i].value="";
                break;
            }
            if(form.elements[i].style!=undefined){
              form.elements[i].style.borderColor="";
            }
            

        }
    }
    
    //console.log(form);
    //console.log(idForm);
 }      
 /*
  FUNCION PARA OCULTAR LOGIN
  {usuario}=>datos del usuario,
  {div_oculto}=>div que se desea ocultar,
  {div_activo}=>div que se desea mostrar,
 */
 function iniciar_panel(usuario,curso,pin){
  if(usuario==false){
      location.href="alumno_registro.html?c="+curso+"&p="+pin;  
  }else{      
      
      agregar_session_storage("ssGlobales",globales);
      if(globales._usuario.nombre_rol=="alumno"){
        location.href="alumno.html";  
      }else{
        location.href="admin.html";  
      }  
  }
    
    
}
$.fn.serializarFormulario2 = function()
      {
      var ndata_form={
        tipo_doc:"",
        edad:"",
        genero:"",
        zonas:"",
        escolaridad:""

      }; 

      var ar=[];
      var i=0;
      for(var t in this[0].tipo_doc){
        //console.log(this[0].tipo_doc[t]);
          if(this[0].tipo_doc[0].value=="0" && this[0].tipo_doc[0].checked && this[0].tipo_doc[t].value != undefined ){
                if(this[0].tipo_doc[t].value!="0"){
                  ar[i++]=this[0].tipo_doc[t].value;
                }
              
            
          }else{
            if(this[0].tipo_doc[t].checked && this[0].tipo_doc[t].value != undefined){
              ar[i++]=this[0].tipo_doc[t].value;
            }
          } 



          
      }
      ndata_form.tipo_doc=ar; 

      var ar=[];
      var i=0;
      for(var t in this[0].edad){
        //console.log(this[0].edad[t]);
          if(this[0].edad[0].value=="0" && this[0].edad[0].checked && this[0].edad[t].value != undefined ){
                if(this[0].edad[t].value!="0"){
                  ar[i++]=this[0].edad[t].value;
                }
              
            
          }else{
            if(this[0].edad[t].checked && this[0].edad[t].value != undefined){
              ar[i++]=this[0].edad[t].value;
            }
          } 



          
      } 
      ndata_form.edad=ar;   

      var ar=[];
      var i=0;
      for(var t in this[0].genero){
        //console.log(this[0].genero[t]);
          if(this[0].genero[0].value=="0" && this[0].genero[0].checked && this[0].genero[t].value != undefined ){
                if(this[0].genero[t].value!="0"){
                  ar[i++]=this[0].genero[t].value;
                }
              
            
          }else{
            if(this[0].genero[t].checked && this[0].genero[t].value != undefined){
              ar[i++]=this[0].genero[t].value;
            }
          } 



          
      } 
      ndata_form.genero=ar;   
      var ar=[];
      var i=0;
      for(var t in this[0].zonas){
        ////console.log(this[0].zonas[t]);
          if(this[0].zonas[0].value=="0" && this[0].zonas[0].checked && this[0].zonas[t].value != undefined ){
                if(this[0].zonas[t].value!="0"){
                  ar[i++]=this[0].zonas[t].value;
                }
              
            
          }else{
            if(this[0].zonas[t].checked && this[0].zonas[t].value != undefined){
              ar[i++]=this[0].zonas[t].value;
            }
          } 



          
      } 
      ndata_form.zonas=ar;  
      var ar=[];
      var i=0;
      for(var t in this[0].escolaridad){
        //console.log(this[0].escolaridad[t]);
          if(this[0].escolaridad[0].value=="0" && this[0].escolaridad[0].checked && this[0].escolaridad[t].value != undefined ){
                if(this[0].escolaridad[t].value!="0"){
                  ar[i++]=this[0].escolaridad[t].value;
                }
              
            
          }else{
            if(this[0].escolaridad[t].checked && this[0].escolaridad[t].value != undefined){
              ar[i++]=this[0].escolaridad[t].value;
            }
          } 



          
      } 
      ndata_form.escolaridad=ar;  

     
      return ndata_form;
};

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}
function dibujar_anio(id_sel){
    var anio=Number(horaCliente().split("-")[0]);
    sel=document.getElementById(id_sel);
    for(var a=2005 ; a <= anio;a++){
        var opt=document.createElement("option");
        opt.innerHTML=a;
        sel.appendChild(opt);
    }
}

function dibujar_grado(id_sel,ini,fin){
    var anio=Number(horaCliente().split("-")[0]);
    sel=document.getElementById(id_sel);
    sel.innerHTML="";
    var opt=document.createElement("option");
    opt.innerHTML="--seleccione un grado--";
    sel.appendChild(opt);
    for(var a=ini ; a <= fin;a++){
        var opt=document.createElement("option");
        opt.innerHTML=a;
        sel.appendChild(opt);
    }
}