<?php	
header('Content-Type: text/event-stream');	
header('Cache-Control: no-cache');	
/**	
* Constructs the SSE data format and flushes that data to the client.	
*	
* 	
*/	
//var_dump($_GET["id_evento"]);
include("../datos/orm_core.php");	

	
//$salida=true;	

   $objeto= new Participantes();	
   $objeto2= new Participantes();  
   
    $res=$objeto->obtener_registro_por_valor("id,estado_registro,pri_apellido,seg_apellido,pri_nombre,seg_nombre","estado_registro = 'verificado' OR estado_registro = 'participando' ORDER BY updated_at DESC LIMIT 1");	
      
       	
          //var_dump($res["valores_consultados"][0]);	
        if ($res["respuesta"]==true) {

          //  $obj=json_decode($res["valores_consultados"][0]);	
	         $obj=(object)$res["valores_consultados"][0];
             //var_dump($obj->id);	
             $id=$obj->id;  	
             $pri_nom=$obj->pri_nombre;  	
             $seg_nom=$obj->seg_nombre;  	
             $pri_ape=$obj->pri_apellido;  	
             $seg_ape=$obj->seg_apellido;  	
             $estado=$obj->estado_registro;  	
             $objeto2->actualizar_recurso_estado($obj->id,"participando");          	
	   
             	
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

?> 