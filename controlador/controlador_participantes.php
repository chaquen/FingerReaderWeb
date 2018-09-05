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
                echo json_encode(array("mensaje"=>"No se ha podido registrar este usuario al evento por favor verifica la huella, para registrar la asistencia"));    
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
             break;
         case "consultarParticipantePorId":
            $id=$post->datos->id;
            $res=$objeto->obtener_registro_por_valor("id,tipo_doc,documento,lugar_exp,pri_apellido,seg_apellido,pri_nombre,seg_nombre,ciud_nacimiento,dep_nacimiento,fecha_nac,edad,genero,sub_genero,cap_dife,etnia,sub_etnia,zona,departamento_ubi,municipio,celular,email,escolaridad,titulo_obt,anio_ingreso_pdp,cargo_poblador,anio_ingreso_pdp","id = '$id'");

            
           
            //echo "================"; 
            //var_dump($res2);
            if($res["respuesta"]){
                //var_dump($res["valores_consultados"]);
                $d1=$res["valores_consultados"];
                $vv=$objeto2->obtener_procesos_por_usuario($d1[0]["documento"]);
                if($vv["respuesta"]){
                    $d1[0]["procesos"]=$vv["valores_consultados"];

                }else{
                    $d1[0]["procesos"]=[];                    
                }
                

                echo json_encode(
                    array("respuesta"=>TRUE,
                        "mensaje"=>"REGISTRO ENCONTRADO",
                        "datos"=>$d1
                       
                        )
                    );   


            }else{
                echo json_encode(
                    array("respuesta"=>FALSE,
                        "mensaje"=>"REGISTRO NO FUE ENCONTRADO"
                       
                        )
                    );   
            }
            
            
             
             break;    
         case "crearParticipanteSinEvento":
            
                 echo  json_encode($objeto->actualizar_recurso($post->datos->datos,$post->datos->id));
            
       
            break;     
         case "actualizarParticipanteConEvento":
                $r=$objeto->actualizar_recurso_en_evento($post->datos->datos,$post->datos->id);
                if($r["respuesta"]){
                    foreach ($post->datos->datos->procesos as $key => $value) {
                           //var_dump($value);
                           $objeto2=new Participantes();
                           if($value!=0){
                            $objeto2->actualizar_detalle_proceso($value,$post->datos->datos->documento,$post->hora_cliente);  
                           }
                           
                    }
                        //var_dump($post->datos->datos->documento);
                        
                }
                echo  json_encode($r);
                    
       
            break;         
        case "consultarParticipantePendientes":
            $hoy=strftime( "%Y-%m-%d", time() );    
            $id_evento=$post->datos->id;
            $d=$objeto->obtener_registro_por_valor_join("participantes.id,participantes.pri_nombre,participantes.seg_nombre,participantes.pri_apellido,participantes.seg_apellido,participantes.updated_at","participantes.estado_registro = 'participando' AND detalle_participantes.event_id = '$id_evento' ");
            $obj=[];
            //var_dump($d);
            if($d["respuesta"]){
                foreach ($d["valores_consultados"] as $key => $value) {
                 //var_dump($value);

                     $date1=date_create(explode(" ", $value["updated_at"])[0]);
                     $date2=date_create($hoy);
                     $diff=date_diff($date1,$date2);              
                     $diferencia=$diff->format("%y%");
                     //var_dump($diferencia);
                     if($diferencia>=2){
                        $value["actualizar_recurso"]=1;
                     }else{
                        $value["actualizar_recurso"]=0;
                     }
                     $obj[$key]=$value;
                }
                echo  json_encode(["respuesta"=>true,"valores_consultados"=>$obj]);    
            }else{
                echo  json_encode(["respuesta"=>false,"mensaje"=>"No hay participantes"]);    
            }
            

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