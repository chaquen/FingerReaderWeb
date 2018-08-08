<?php

require_once '../datos/constantes.php';
require_once '../datos/constantes_url.php';
require_once '../utilidades/CurlUse.php';


class Install {
    
    
    
    public function __construct() {
        
    }
 	
    public function validar_db(){
    	$conectar = mysqli_connect( DB_HOST, DB_USUARIO, DB_CLAVE,DB_NOMBRE_DATABASE);
    	if (mysqli_connect_errno()){
		  	//die("Connection error: " . mysqli_connect_errno());
		  	return false;
		}else{
			return true;
		}


    }
 	public function crea_db(){

		$conectar = mysqli_connect( DB_HOST, DB_USUARIO, DB_CLAVE);

		$var =DB_NOMBRE_DATABASE;
		$consulta ="CREATE DATABASE $var CHARACTER SET utf8 COLLATE utf8_general_ci";
		$resultado=mysqli_query($conectar,$consulta);
		
		if($resultado){
			$conn =new mysqli(DB_HOST, DB_USUARIO, DB_CLAVE , DB_NOMBRE_DATABASE);

			$query = '';
			$curluse=new CurlUse();
			$curluse->descargar_archivo(API_URL."db/archivo/sql/db_ong_local.sql","../db/sql/db_ong_local.sql");
			$sqlScript = file('../db/sql/db_ong_local.sql');
			foreach ($sqlScript as $line)   {
			        
			        $startWith = substr(trim($line), 0 ,2);
			        $endWith = substr(trim($line), -1 ,1);
			        
			        if (empty($line) || $startWith == '--' || $startWith == '/*' || $startWith == '//') {
			                continue;
			        }
			               
			        $query = $query . $line;
			        if ($endWith == ';') {
			                mysqli_query($conn,$query) or die('<div class="error-response sql-import-response">Problem in executing the SQL query <b>' . $query. '</b></div>');
			                $query= '';             
			        }
			}
			return array("mensaje"=>"Base de datos creada","respuesta"=>true);
		}else{
			$conn =new mysqli(DB_HOST, DB_USUARIO, DB_CLAVE , DB_NOMBRE_DATABASE);

			$query = '';
			$curluse=new CurlUse();
			$curluse->descargar_archivo(API_URL."db/archivo/sql/db_ong_local.sql","../db/sql/db_ong_local.sql");
			$sqlScript = file('../db/sql/db_ong_local.sql');
			foreach ($sqlScript as $line)   {
			        
			        $startWith = substr(trim($line), 0 ,2);
			        $endWith = substr(trim($line), -1 ,1);
			        
			        if (empty($line) || $startWith == '--' || $startWith == '/*' || $startWith == '//') {
			                continue;
			        }
					//echo "string";
			        //var_dump($query); 			                
			        $query = $query . $line;
			        if ($endWith == ';') {
			                mysqli_query($conn,$query) or die('<div class="error-response sql-import-response">Problem in executing the SQL query <b>' . $query. '</b>'.API_URL."db/archivo/sql/db_ong_local.sql".'</div>');
			                $query= '';             
			        }
			}
			//return array("mensaje"=>mysqli_error($conectar),"respuesta"=>false);			
			return array("mensaje"=>"Base de datos creada","respuesta"=>true);
			//falta msn error
			
		}


 		
 	}   
}