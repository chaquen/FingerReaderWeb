<?php
//seleccionar el vento y los registros para registrar
header('Access-Control-Allow-Origin: *'); 
include("../datos/orm_core.php");
ini_set('max_execution_time', 14400); //14400 seconds = 240 minutes =  4 horas


$objeto= new Participantes();
$objeto2= new Participantes();
$objeto3= new Participantes();
//$objeto->huella;
$partici=$objeto->obtener_registro_todos_los_registros_para_sync("WHERE estado_registro = 'verificado' OR estado_registro = 'registrado' OR estado_registro = 'participando'");
$detalle_partici=$objeto2->obtener_registro_todos_los_registros_detall_participacion();
$procesos=$objeto3->obtener_todos_procesos();
//var_dump($partici);
//var_dump($detalle_partici);
//var_dump($procesos);
if($partici["respuesta"]==true || $detalle_partici["respuesta"]==true){
	//$datos=http_build_query(array("datos"=>array("hora_cliente"=>"00000000","peticion"=>"post","datos"=>array("a"=>1,"b"=>"2"))));
//$datos=array("datos"=>array("hora_cliente"=>"00000000","peticion"=>"post","datos"=>array("a"=>1,"b"=>"2")));
//var_dump($datos["valores_consultados"]);
//echo "<br>=======";
// abrimos la sesión cURL
$ch = curl_init();
// definimos la URL a la que hacemos la petición
curl_setopt($ch, CURLOPT_URL,API_URL."sync");
//var_dump(API_URL."sync");
//curl_setopt($ch, CURLOPT_URL,"http://localhost/api_biometric/sync");

// recibimos la respuesta y la guardamos en una variable
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// indicamos el tipo de petición: POST
//curl_setopt($ch, CURLOPT_POST, TRUE);
// definimos cada uno de los parámetros
//var_dump($procesos["valores_consultados"]);
/*foreach ($datos["valores_consultados"] as $key => $value) {
	var_dump($value);
}*/


curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array("participantes"=>$partici["valores_consultados"],"detalle_participantes"=>$detalle_partici["valores_consultados"],"procesos"=>$procesos["valores_consultados"])));
 

$remote_server_output = curl_exec ($ch);
 
// cerramos la sesión cURL
curl_close ($ch);
 
// hacemos lo que queramos con los datos recibidos
// por ejemplo, los mostramos
//echo "falta respuesta de servidor";
//print_r($remote_server_output);


$da=json_decode($remote_server_output);
//var_dump($da);
	if($da!=NULL){
		if($da->respuesta){
		    //se eliminan registros usados
			$objeto->eliminar_recurso("estado_registro = 'verificado'");
			$objeto->eliminar_recurso("estado_registro = 'registrado'");
			$objeto->eliminar_recurso("estado_registro = 'participando'");
			//$eve=new Eventos();	
			//$eve->registro_sincronizar($us->datos->id,$us->hora_cliente,"'sincronizacion'");
			print_r($remote_server_output);	
		}else{
			echo json_encode(array("mensaje"=>"No hay registros para sincronizar","respuesta"=>true));
		}	
	}else{
		echo json_encode(array("mensaje"=>"No se ha sincronizado el servidor ha retornado NULL","respuesta"=>false));
	}
}else{
	echo json_encode(array("mensaje"=>"No hay registros para sincronizar","respuesta"=>false));
}


?>
