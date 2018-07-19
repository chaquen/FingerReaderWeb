<?php
header('Content-Type:text/html; Charset="UTF-8"');    
header('Access-Control-Allow-Origin: *'); 
include("../datos/orm_core.php");
//var_dump(isset($_REQUEST["datos"]));

if(isset($_REQUEST['datos'])){
    $post=  json_decode($_REQUEST['datos']);
    $operacion=$post->operacion;
    $objeto= new Participantes();//Mi clase  modelo 
    $objeto2= new Participantes();//Mi clase  modelo 

    switch($operacion){
      
         case "crearParticipante":
            //var_dump($post);    
            //var_dump($post->datos->id);    
            //var_dump($objeto->actualizar_recurso($post->datos->datos,$post->datos->id));
            $re=$objeto->actualizar_recurso($post->datos->datos,$post->datos->id);
            //var_dump($re["respuesta"]);
            if($re["respuesta"]){
                //registrar en evento
                //$evento->crear_detalle_evento(array("user_id"=>$post->datos->id,"event_id"=>$post->datos->id_evento));
                 echo  json_encode($evento->crear_detalle_evento(array("user_id"=>$post->datos->id,"event_id"=>$post->datos->id_evento,"created_at"=>$post->hora_cliente,"updated_at"=>$post->hora_cliente)));
            }else{
                echo json_encode(array("mensaje"=>"Nose ha podido registrar este usuario al evento por favor verifca la huella, para registrar la asistencia"));    
            }
       
            break;   

        case "consultarParticipante":
            $res=$objeto->obtener_registro_por_valor("id,estado_registro,pri_apellido,seg_apellido,pri_nombre,seg_nombre","estado_registro = 'por_registrar'");
            $res2=$objeto2->obtener_registro_por_valor("id,estado_registro,pri_apellido,seg_apellido,pri_nombre,seg_nombre","estado_registro = 'registrado'");
            //var_dump($res);
            //echo "================"; 
            //var_dump($res2);
            if($res["respuesta"]){
                //var_dump($res["valores_consultados"]);
                $d1=$res["valores_consultados"];
            }else{
                $d1=NULL;
            }
            
            if($res2["respuesta"]){
                $d2=$res2["valores_consultados"];
            }else{
                $d2=NULL;
            }
             echo json_encode(
                    array("respuesta"=>TRUE,
                        "mensaje"=>"REGISTRO ENCONTRADO",
                        "datos"=>$d1,
                       "registrados"=>$d2
                        )
                    );

         case "crearParticipanteSinEvento":
            
                 echo  json_encode($objeto->actualizar_recurso($post->datos->datos,$post->datos->id));
            
       
            break;      
        case "consultarParticipantePendientes":
                
            $id_evento=$post->datos->id;
            echo  json_encode($objeto->obtener_registro_por_valor_join("participantes.id,participantes.pri_nombre,participantes.seg_nombre,participantes.pri_apellido,participantes.seg_apellido","participantes.estado_registro = 'participando' AND detalle_participantes.event_id = '$id_evento' "));

        break;     
        case "guardar_asistentes":
                //var_dump($post);
                $dd=$objeto->obtener_registro_por_valor("participantes.id,participantes.pri_nombre,participantes.seg_nombre,participantes.pri_apellido,participantes.seg_apellido","participantes.estado_registro = 'verificado' OR participantes.estado_registro = 'registrado'");

                foreach ($dd["valores_consultados"] as $key => $value) {
                    $evento= new Eventos();
                    //var_dump($value);
                    $evento->crear_detalle_evento(array("user_id"=>$value["id"],"event_id"=>$post->datos->id_evento
                        ,"created_at"=>$post->hora_cliente,"updated_at"=>$post->hora_cliente));
             
                }
                
                echo json_encode(array("mensaje"=>"Usuarios asociados","respuesta"=>true));    
            break;
        case "valida_registro":

            echo json_encode($objeto->obtener_registro_por_valor("id","estado_registro = 'por_registrar' "));

        break;    
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la petición"));
}