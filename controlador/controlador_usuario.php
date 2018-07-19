<?php
header('Content-Type:text/html; Charset="UTF-8"');    
header('Access-Control-Allow-Origin: *'); 

include("../datos/orm_core.php");
include("../datos/Install.php");
//var_dump(isset($_REQUEST["datos"]));

if(isset($_REQUEST['datos'])){
    $post=  json_decode($_REQUEST['datos']);
    $operacion=$post->operacion;
    $objeto= new Participantes();//Mi clase  modelo 
    $us=new Users();
    switch($operacion){
        case "crearEmpleado":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            //$objeto->documento=trim($post->datos->documento);
            //$objeto->correo=  trim($post->datos->correo);
            
            
            
            
            break;
            
         
        case "consultarParticipante":
            var_dump($post);
        break;     
        case "login_local":
            //var_dump($post);
            $email=$post->datos->usuario;
            $pass=$post->datos->pass;
            
            echo  json_encode($us->obtener_registro_por_valor("*","email = '$email' AND pass = '$pass'"));

        break;
        case "validar_db":  
            //var_dump($post);

            $install= new Install();
            if($install->validar_db()){

                echo  json_encode($us->ultima_preparacion());
            }else{
                echo  json_encode(array("mensaje"=>"Base de datos NO encontrada","respuesta"=>FALSE));
            }

            break;

        case "validar_cc":
                $objeto= new Participantes();
                echo json_encode($objeto->obtener_registro_por_valor("documento","documento = '".$post->datos->cc."'"));

            break;    
        

        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la petición","datos"=>$_REQUEST['datos']));
}