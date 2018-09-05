<?php
header('Access-Control-Allow-Origin: *'); 
include("../datos/orm_core.php");
ini_set('max_execution_time', 14400); //14400 seconds = 240 minutes =  4 horas
$conn = new mysqli(DB_HOST, DB_USUARIO, DB_CLAVE,DB_NOMBRE_DATABASE);
$objeto= new Participantes();
$evento=new Eventos();
$user=new Users();
$down=new CurlUse();
$eve=new Eventos();


$ch = curl_init();
// definimos la URL a la que hacemos la petición
$us=json_decode($_REQUEST["datos"]);
//var_dump($us);
//curl_setopt($ch, CURLOPT_URL,"http://localhost/api_biometric/preparar");
curl_setopt($ch, CURLOPT_URL,API_URL."preparar");
// recibimos la respuesta y la guardamos en una variable
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// indicamos el tipo de petición: GET
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array("datos"=>array("usuario"=>$us->datos->user,"clave"=>$us->datos->pass,"id"=>$us->datos->id))));

$remote_server_output = curl_exec ($ch);
 
// cerramos la sesión cURL
curl_close ($ch);
 
// hacemos lo que queramos con los datos recibidos
// por ejemplo, los mostramos
//var_dump($remote_server_output)
//print_r($remote_server_output);
$da=json_decode($remote_server_output);

//var_dump($da);
//
if($da!=NULL){
	if($da->respuesta){
			$res=$user->crear_registro($da->usuario);

		//var_dump($res);

			
			foreach ($da->lineas as $key => $value) {
				//var_dump($value);
				$evento=new Eventos();	
				$evento->crear_registro_lineas($value);
				//$i++;
			}
			foreach ($da->procesos as $key => $value) {
				//var_dump($value);
				$evento=new Eventos();	
				$evento->crear_registro_proceso($value);
				//$i++;
			}
			$i=0;
			/*foreach ($da->eventos as $key => $value) {
				//var_dump($value);
				$evento=new Eventos();	
				$res[$i]=$evento->crear_registro($value);
				$i++;
				

				
				
			}*/


			foreach ($da->eventos as $key => $value) {
				//var_dump($value);
				$evento=new Eventos();	
				$resp[$i]=$evento->crear_registro($value);
				
				$dir="../files/events/".$value->id;
				if(!file_exists($dir)){
					mkdir($dir, 0700);
				}
				

				//SE CONECTA CON EL SERVIDOR PRINCIPAL Y DESCARGA LOS ARCHIVOS
				$down->descargar_archivo(API_URL_MATRIZ.$value->atachments,$dir."/".$value->atachments);
			}	

			$objeto->eliminar_recurso("estado_registro = 'antiguo'");
			 foreach($da->participantes as $pp){
					foreach ($pp as $key => $value) {
		                $$key=$value;
		         	}

		         		
			         	$huela=mysqli_escape_string($conn,convert_uudecode($huella_binaria));
						//var_dump(utf8_encode($ciud_nacimiento));
						$lugar_exp=utf8_decode($lugar_exp);
						$dep_nacimiento=utf8_decode($dep_nacimiento);
						$cap_dife=utf8_decode($cap_dife);
						$etnia=utf8_decode($etnia);
						$cargo_poblador=utf8_decode($cargo_poblador);
						$sub_etnia=utf8_decode($sub_etnia);
						$departamento_ubi=utf8_decode($departamento_ubi);
						$municipio=utf8_decode($municipio);
				        $vereda_ubi=utf8_decode($vereda_ubi);
						$escolaridad=utf8_decode($escolaridad);
						$titulo_obt=utf8_decode($titulo_obt);
						$ciud_nacimiento=utf8_decode($ciud_nacimiento);
				 		$vereda_nacimiento=utf8_decode($vereda_nacimiento);
						$pri_apellido=utf8_decode($pri_apellido);
						$seg_apellido=utf8_decode($seg_apellido);
						$pri_nombre=utf8_decode($pri_nombre);
						$seg_nombre=utf8_decode($seg_nombre);



						//var_dump(utf8_decode($ciud_nacimiento));
						//var_dump($ciud_nacimiento);

						//echo "<br>";
						$sql = "INSERT INTO participantes (	id,
															tipo_doc,
															documento,
															lugar_exp,
															pri_apellido,
															seg_apellido,
															pri_nombre,
															seg_nombre,
															ciud_nacimiento,
															dep_nacimiento,
															vereda_nacimiento,
															fecha_nac,
															edad,
															genero,
															sub_genero,
															cap_dife,
															etnia,
															sub_etnia,
															zona,
															departamento_ubi,
															municipio,
															vereda_ubi,
															celular,
															email,
															escolaridad,
															titulo_obt,
															anio_ingreso_pdp,
															cargo_poblador,
															state,
															estado_registro,
															created_at,
															updated_at,
															tipo_registro,
															huella_binaria) 
			                                  VALUES ('$id',
			                                  		  '$tipo_doc',
			                                  		  '$documento',
			                                  		  '$lugar_exp',
			                                  		  '$pri_apellido',
			                                  		  '$seg_apellido',
			                                  		  '$pri_nombre', 
			                                  		  '$seg_nombre',
			                                  		  '$ciud_nacimiento',
			                                  		  '$dep_nacimiento',
													  '$vereda_nacimiento',
			                                  		  '$fecha_nac',
			                                  		  '$edad',
			                                  		  '$genero',
			                                  		  '$sub_genero',
			                                  		  '$cap_dife',
			                                  		  '$etnia',
			                                  		  '$sub_etnia',
			                                  		  '$zona',
			                                  		  '$departamento_ubi',
			                                  		  '$municipio',
									  				  '$vereda_ubi',
			                                  		  '$celular',
			                                  		  '$email',
			                                  		  '$escolaridad',
			                                  		  '$titulo_obt',
			                                  		  '$anio_ingreso_pdp',
			                                  		  '$cargo_poblador',
			                                  		  '$state',
			                                  		  'antiguo',
			                                  		  '$created_at',
			                                  		  '$updated_at',
			                                  		  'antiguo',
			                                  		  '".$huela."')";

			           
				        if ($conn->query($sql) === TRUE) {
							//echo "New record created successfully";
						} else {
							//echo "Error: " . $sql . "<br>" . $conn->error;
						}	
				}
			 foreach($da->detalle_procesos as $pp){
					foreach ($pp as $key => $value) {
		                $$key=$value;
		         	}

		         		
			         	$sql = "INSERT INTO detalle_procesos (id,id_usuario,id_proceso,created_at) 
			                                  VALUES ('$id','$id_usuario','$id_proceso','$created_at')";

			           
				        if ($conn->query($sql) === TRUE) {
							//echo "New record created successfully";
						} else {
							//echo "Error: " . $sql . "<br>" . $conn->error;
						}	
				}	
			
			$eve->registro_sincronizar($us->datos->id,$us->hora_cliente,"'preparacion'");
		        


			$conn->close();
			echo json_encode($resp);


	}else{
		echo json_encode($da);		
	}
   


}else{
	echo json_encode([["mensaje"=>"Ha ocurrido un error por favor comunícate con el administrador","respuesta"=>false]]);
    //print_r($remote_server_output);
}


//REGISTRAR EN BD

?>
