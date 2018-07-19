<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache'); 

include("../datos/orm_core.php");
//var_dump($_GET["id_evento"]);
$objeto= new Participantes();
$objeto2= new Participantes();
$objeto3= new Participantes();
$salida=true;


$res=$objeto->obtener_registro_por_valor("id,estado_registro,pri_apellido,seg_apellido,pri_nombre,seg_nombre","estado_registro = 'por_registrar'");
 do {
        
         
         
        
            
         if ($res["respuesta"]==true) {
              $obj=json_decode($res["valores_consultados"]);

            
              $id=$obj[0]->id;  
              $pri_nom=$obj[0]->pri_nombre;  
              $seg_nom=$obj[0]->seg_nombre;  
              $pri_ape=$obj[0]->pri_apellido;  
              $seg_ape=$obj[0]->seg_apellido;  
              $estado=$obj[0]->estado_registro;  
              $rand=rand();

              
            
              
              //$rs=$objeto2->crear_registro(["user_id"=>$id,"event_id"=>$_GET["id_evento"]]);
              //if($rs["respuesta"]==true){
                //$objeto3->actualizar_recurso_estado($id);
                  echo "data: {\n";
                  echo "data: \"pri_nombre\": \"$pri_nom\", \n";              
                  //echo "data: \"seg_nombre\": \"$seg_nom\", \n";              
                  //echo "data: \"pri_apellido\": \"$pri_ape\", \n";              
                  //echo "data: \"seg_apellido\": \"$seg_ape\", \n";              
                  echo "data: \"estado\": \"$estado\", \n";              
                  echo "data: \"id\": \"$id\", \n";                                
                  echo "data: \"rand\": $rand\n";
                  echo "data: }\n";
                  echo PHP_EOL;
                  ob_flush();
                  flush();
                  //die();
                  $salida=false;  
              //}
              
             
            //die();
            
          }
         else{
            echo "buscando";
            $salida=FALSE;
          }
		
          


          
} while($salida);

if($salida==false){
               
                
              
}

 /*function consultar_registro_participante_old(){
        do {
        	echo "string";
          // Cap connections at 10 seconds. The browser will reopen the connection on close
            $res=$objeto->obtener_registro_por_valor("id","estado_registro = 'por_registrar'");
            var_dump(json_decode($res["valores_consultados"]));
          if ($res["respuesta"]==false) {
            //var_dump($res["datos"][0]->id);
              $id=$res["valores_consultados"][0]->id;  
              
              echo "id: $id" . PHP_EOL;
              echo "data: {\n";
             
              echo "data: \"id\": $id\n";
              echo "data: }\n";
              echo PHP_EOL;
              ob_flush();
              flush();

             
            die();
            break;
          }else{
            echo "buscando";
          }
		
          


          //sendMsg($startedAt." Hola :) pez" , time());
          //sleep(5);
          // If we didn't use a while loop, the browser would essentially do polling
          // every ~3seconds. Using the while, we keep the connection open and only make
          // one request.
        } while(true);
    }*/

