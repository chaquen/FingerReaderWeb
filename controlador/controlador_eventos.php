<?php
header('Content-Type:text/html; Charset="UTF-8"');    
header('Access-Control-Allow-Origin: *'); 
include("../datos/orm_core.php");
//var_dump(isset($_REQUEST["datos"]));

if(isset($_REQUEST['datos'])){
    $post=  json_decode($_REQUEST['datos']);
    $operacion=$post->operacion;
    $objeto= new Eventos();//Mi clase  modelo 
   
    switch($operacion){
       
        case "mis_eventos":
            //var_dump($post);
            $res=$objeto->obtener_registro_por_valor("*","id_ref = ".$post->datos->usuario->id);
            //var_dump($res);
            echo json_encode($res);
        break;     
        case "seleccionar_evento":
            $objeto->actualizar_recurso_evento("estado_evento = 'activo'","estado_evento = 'suspendido'");
            $objeto->actualizar_recurso_estado($post->datos->id_evento,"activo");
            $id=$post->datos->id_evento;
            echo json_encode($objeto->obtener_registro_por_valor("id,name","id = '$id'"));
        break;
        case "preparar_eventos":
            $objeto->actualizar_recurso_evento("estado_evento = 'activo'","estado_evento = 'suspendido'");
           
            echo json_encode(["mensaje"=>"Eventos Preparados"]);
        break;
        case "consultarLineas":
            $li=$objeto->obtener_registro_todas_las_lineas();
            //$pro=$objeto->obtener_registro_todos_los_procesos();
            //var_dump($li);
            //var_dump($li);
            $arr=[];
            foreach ($li["valores_consultados"] as $key => $value) {
                $arr[$key]=(array)$value;
            }
            echo json_encode(array("respuesta"=>true,"mensaje"=>"lineas","datos"=>$arr));
        break;  
        case "consultarProceso":
            $li=$objeto->obtener_registro_todos_los_procesos(utf8_decode($post->datos->nombre));
            //$pro=$objeto->obtener_registro_todos_los_procesos();
            //var_dump($li);
            //var_dump($li);
            $arr=[];
            foreach ($li["valores_consultados"] as $key => $value) {
                $arr[$key]=(array)$value;
            }
            echo json_encode(array("respuesta"=>true,"mensaje"=>"procesos","datos"=>$arr));
        break;
        case 'eliminarDetalleProceso':
            echo json_encode($objeto->eliminar_detalle_proceso($post->datos->id));
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la petición","datos"=>$_REQUEST['datos']));
}