<?php
//seleccionar el vento y los registros para registrar
header('Access-Control-Allow-Origin: *'); 
include("../datos/orm_core.php");
$objeto= new Participantes();
$objeto2= new Participantes();
//$objeto->huella;
$datos=$objeto->obtener_registro_todos_los_registros_para_sync("WHERE estado_registro = 'verificado' OR estado_registro = 'registrado' OR estado_registro = 'participando'");
$datos_2=$objeto2->obtener_registro_todos_los_registros_detall_participacion();
//var_dump($datos);
//var_dump($datos_2);
if($datos["respuesta"]==true || $datos_2["respuesta"]==true){
	//$datos=http_build_query(array("datos"=>array("hora_cliente"=>"00000000","peticion"=>"post","datos"=>array("a"=>1,"b"=>"2"))));
//$datos=array("datos"=>array("hora_cliente"=>"00000000","peticion"=>"post","datos"=>array("a"=>1,"b"=>"2")));
//var_dump($datos["valores_consultados"]);
//echo "<br>=======";
// abrimos la sesión cURL
$ch = curl_init();
// definimos la URL a la que hacemos la petición
curl_setopt($ch, CURLOPT_URL,"https://biometric.mohansoft.com/sync");

//curl_setopt($ch, CURLOPT_URL,"http://localhost/api_biometric/sync");

// recibimos la respuesta y la guardamos en una variable
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// indicamos el tipo de petición: POST
//curl_setopt($ch, CURLOPT_POST, TRUE);
// definimos cada uno de los parámetros
//var_dump($datos["valores_consultados"]);
/*foreach ($datos["valores_consultados"] as $key => $value) {
	var_dump($value);
}*/


curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array("datos"=>$datos["valores_consultados"],"datos2"=>$datos_2["valores_consultados"])));
 

$remote_server_output = curl_exec ($ch);
 
// cerramos la sesión cURL
curl_close ($ch);
 
// hacemos lo que queramos con los datos recibidos
// por ejemplo, los mostramos
//echo "falta respuesta de servidor";
print_r($remote_server_output);
}else{
echo json_encode(array("mensaje"=>"No registros para sincronizar","respuesta"=>true));
}

?>
