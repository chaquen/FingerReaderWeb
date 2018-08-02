<?php


class CurlUse {
	function descargar_archivo($url,$destino){
		//$url = "http://soyprogramador.liz.mx/wp-content/uploads/2011/11/phplogo128.png";
		//var_dump($url);
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
		$output = curl_exec($ch);
		//var_dump($output);
		//Guardamos la imagen en un archivo
		//echo $destino;
		$fh = fopen($destino, 'w');
		fwrite($fh, $output);
		fclose($fh);

		return true;
		
	}	
}