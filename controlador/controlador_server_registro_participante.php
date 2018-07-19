<?php	
header('Content-Type: text/event-stream');	
header('Cache-Control: no-cache');	
/**	
* Constructs the SSE data format and flushes that data to the client.	
*	
* 	
*/	
include("../datos/orm_core.php");	
	
//$salida=true;	
 function sendMsg() {	
   $objeto= new Participantes();	
   
    $res=$objeto->obtener_registro_por_valor("id,estado_registro,pri_apellido,seg_apellido,pri_nombre,seg_nombre","estado_registro = 'por_registrar'");	
        	
       	
           //var_dump($obj[0]);	
        if ($res["respuesta"]==true) {	
          $obj=json_decode($res["valores_consultados"]);	
	
           //var_dump($res["datos"][0]->id);	
             $id=$obj[0]->id;  	
             $pri_nom=$obj[0]->pri_nombre;  	
             $seg_nom=$obj[0]->seg_nombre;  	
             $pri_ape=$obj[0]->pri_apellido;  	
             $seg_ape=$obj[0]->seg_apellido;  	
             $estado=$obj[0]->estado_registro;  	
             	
	
             	
             //echo "id: $id" . PHP_EOL;	
             echo "data: {\n";	
             echo "data: \"pri_nombre\": \"$pri_nom\", \n";                    	
             echo "data: \"seg_nombre\": \"$seg_nom\", \n";                    	
             echo "data: \"pri_apellido\": \"$pri_ape\", \n";                    	
             echo "data: \"seg_apellido\": \"$seg_ape\", \n";                    	
             echo "data: \"estado\": \"$estado\", \n";                    	
             echo "data: \"id\": $id\n";	
             echo "data: }\n";	
             
               echo PHP_EOL;	
               ob_flush();	
               flush();	
              
               return true;  	
               
             
             	
            	
           die();	
           //break;	
         }else{	
           echo "buscando";	
         }	
 }	
 	

?> 