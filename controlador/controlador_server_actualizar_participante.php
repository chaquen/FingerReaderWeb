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
   $id_e=$_GET["id_evento"]; 
   $objeto= new Participantes();	
   $objeto2= new Participantes();  
   $hoy=strftime( "%Y-%m-%d", time() );
    $res=$objeto->obtener_registro_por_valor_join("participantes.id,estado_registro,pri_apellido,seg_apellido,pri_nombre,seg_nombre,participantes.updated_at"," event_id ='$id_e' AND (estado_registro = 'verificado' OR estado_registro = 'participando') ORDER BY detalle_participantes.updated_at DESC LIMIT 1");	
      
       	
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

             $actualizar_recurso=0; 	
             $date1=date_create(explode(" ", $obj->updated_at)[0]);
             $date2=date_create($hoy);
             $diff=date_diff($date1,$date2);              
             $diferencia=$diff->format("%y%");
             //var_dump($diferencia);
             if($diferencia>=2){
                $actualizar_recurso=1;
             }
             $objeto2->actualizar_recurso_estado($obj->id,"participando");          	
	     
             	
            
             echo "data: {\n";	
             echo "data: \"pri_nombre\": \"$pri_nom\", \n";                    	
             echo "data: \"seg_nombre\": \"$seg_nom\", \n";                    	
             echo "data: \"pri_apellido\": \"$pri_ape\", \n";                    	
             echo "data: \"seg_apellido\": \"$seg_ape\", \n";                    	
             echo "data: \"estado\": \"$estado\", \n";                    	
             echo "data: \"id\": $id, \n";	
             echo "data: \"actualizar_recurso\": $actualizar_recurso\n";  
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