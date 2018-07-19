<?php

/**
     * Clase para envio de email
     */
class Mail  {
        private $destino = 'contacto@futboldesafio.com';
        public $asunto;
        public $cabecera;
        public $mensajeMail;
        public $respuesta;

        //Constructor
        function __construct() {


        }
        /*Funcion para almacenar contacto en un archivo CSV*/     
        function almacenarContactoCsv($nombreContacto,$emailContacto,$telefonoContacto,$comentario){
            $archivo=fopen("logs/contacto.txt", "a");	
                         $mensaje =$nombreContacto.";".$emailContacto.";".$comentario."\n";				 
                         if(fputs($archivo, $mensaje)){
                                fclose($archivo);
                                $this->respuesta="Gracias por contactarnos";
                                return TRUE;                                        
                         }
        }           
        /*Funcion para enviar correo al recibir un contacto */
        function enviarMailContactoCliente($contacto=array()){

            foreach ($contacto as $key => $value) {
                $$key=$value;
            }
            if(mail($this->destino, $nombreContacto+" quiere contactarse","Hola soy "+$nombreContacto+"\nQuiero"+$comentarioContacto+"\nMis datos de contacto son \nTeléfono:"+$telefonoContacto+"\nEmail:"+$emailContacto+"")){
                return true;
            }else{
                $archivo=fopen("logs/contactos.txt","a");
                $mensaje=$nombreContacto+" quiere contactarse"+"Hola soy "+$nombreContacto+"quiero"+$comentarioContacto+" y mis datos de contacto son Teléfono:"+$telefonoContacto+"Email:"+$emailContacto+"\n";
                if(fputs($archivoe,$mensaje)){
                     fclose($archivo);
                    return false;
                }
            }
        }
        //Enviar vario correo a un destinatario personalizado
        function enviarMailAmigo($destino,$asunto,$mensajeMail){
                $this->destino=trim($destino);
                $this->asunto=trim($asunto);
                $this->mensajeMail=trim($mensajeMail);
                if (mail($this->destino,$this->asunto,$this->mensajeMail)) {
                        $this->respuesta="Hemos enviado el correo a un asesor que pronto se comunicara contigo";
                        return TRUE;
                }else{
                        $this->respuesta="Hemos tenido problemas con nuestro servidor de correos intentalo mas tarde!";
                        return FALSE;
                }
        }
        //Funcion para enviar correos
        function enviarMail($nombreContacto,$emailContacto,$mensajeEmail,$origen=''){
                //$this->mensajeMail=$mensajeEmail;			    
                //$this->asunto='quiere contactarse contigo.';
                if($origen!=""){
                    $origen="FROM: $origen";
                }else{
                    $origen="FROM: Contactos Futbol Desafio <contactos@futboldesafio.com.co>";
                }

                if (mail($this->destino,$this->asunto,$mensajeEmail,$origen)) {
                        $this->respuesta="Hemos recibido tu solicitud Gracias por contactarnos!";
                        return TRUE;
                }else{
                        $this->respuesta="Hemos tenido problemas con nuestro servidor de correos intentalo mas tarde!";
                        return FALSE;
                }
        }
        //Funcion para enviar correo a varios destinos
        function enviarMails($contactos=array()){

                if(count($contactos) > 0){
                        foreach ($contactos as $contacto) {
                                if (mail($contacto,$this->asunto, $this->mensajeMail)) {

                                }else{
                                        $this->respuesta="Error al enviar Email";
                                }
                        }
                }
        }
        /*funtion para enviar un correo con formato HTML*/
        function enviarMailHTML($destino,$asunto,$mensajeEmailHTML,$cabeceraAdicional=""){
            //Para envio de mensajes con contenido HTML debemos establecer las cabeceras
            $this->cabeceras='MIME-Version: 1.0'."\r\n";
            $this->cabeceras.='Content-type:text/html;charset=iso-8859-1'."\r\n";
            $this->cabeceras.='To:'.$destino;
            $this->cabeceras.='From:Inscripciones Fútbol Desafío <inscripciones@futboldesafio.com.co>';
            $this->cabeceras.='Cc:contacto@futboldesafio.com';
            if(mail($destino,$asunto,$mensajeEmailHTML,$this->cabeceras)){
                $this->respuesta="El Email ha sido enviado";
                return TRUE;
            }else{
                $this->respuesta="Error al enviar Email";
                return FALSE;
            }
        }
        /*funtion para enviar un correo con formato HTML*/
        function enviarMailsHTML($contactos,$asunto,$mensajeEmailHTML,$cabeceraAdicional=""){
            //Para envio de mensajes con contenido HTML debemos establecer las cabeceras
            $this->cabeceras='MIME-Version: 1.0'."\r\n";
            $this->cabeceras.='Content-type:text/html;charset=iso-8859-1'."\r\n";
            //Cabecer as adicionales
            $this->cabeceras.='To:'.$this->destino;
            $this->cabeceras.='From:Inscripciones Fútbol Desafío <inscripciones@futboldesafio.com.co>';
            $this->cabeceras.='Cc:contacto@futboldesafio.com';
            if(count($contactos)>0){
                 foreach ($contactos as $contacto) {
                    if(mail($contacto,$asunto,$mensajeEmailHTML,$cabeceras)){
                        $this->respuesta="El Email ha sido enviado";
                    }else{
                        $this->respuesta="Error al enviar Email";
                        return FALSE;

                    }
                }
                return TRUE;
             }else{
                 $this->respuesta="No hay contactos";
                 return FALSE;
             }

        }
        /*function __destruct(){
                unset($this);
        } */
}
class FormatoRespuestaServidor{
    public $respuesta=FALSE;
    public $mensaje;
    public $datosRespuesta;
        function __construct() {
          
        }
        function setRespuesta($r){
            $this->respuesta=$r;
        }
        function setMensaje($m){
            $this->mensaje=$m;
        }
        function obtenerRespuesta(){
            return array("respuesta"=>$this->respuesta,
                            "mensaje"=>  $this->mensaje,
                            "datosRespuesta"=>  $this->datosRespuesta);
        }
        function obtenerRespuestaJson($m,$dr=  array()){
            return json_encode(array("respuesta"=>$this->respuesta,
                                "mensaje"=>  $m,
                                "datosRespuesta"=>  $dr));
        }
        function obtenerRespuestaJsonSinMsn($dr=  array()){
            return json_encode(array("respuesta"=>$this->respuesta,
                                "mensaje"=> $this->mensaje,
                                "datosRespuesta"=>  $dr));
        }
        function obtenerMensajeJson($m){
            return json_encode(array("respuesta"=>$this->respuesta,"mensaje"=>  $m));
        }
    
}
class Encriptar{
        private $longitud_sailt;
        
	    
		/*
     	* Metodo encargado de encriptar una cadena con un sailt o cadena para decodificar nuevamente el HASH
     	*/
    	public function encriptarConSalt($dato, $tipo = 'sha1'){
        //Genero el valor "Sailt" a partir de un uniqueId y de tamaño definido en la longitud del "sailt"
        $salt=  substr(uniqid(rand(),TRUE),0,  $this->longitud_sailt);
			//Evaluo que exista el tipo de codificacion valido para PHP
	        if(in_array($tipo,  hash_algos())){
	            //Encrpta el dato convertido a minusculas junto al "Sailt"
	            $encriptar=$salt.strtolower($dato);
				
	            $datoEncriptadoConSailt = hash($tipo,$encriptar);
	            //Agrego el tamaño del "Sailt" al inicio de la cadena y el "Sailt" al final.
	            //longitud+HASH+sailt
	            return $this->longitud_sailt.$datoEncriptadoConSailt.$salt;
	        }  else {
	            return "Error : algoritmo no encontrado";
	        }

    	}
    	
		/*
     	* Metodo encargado de desencriptar una cadena 
     	* Return arreglo con tres indices longitud,HASH,salt
     	*/
    	public function desencriptarHash($cadena){
	        //Obtengo una cadena parcial con el tamaño del sailt
	        $arrHash['longitud']= substr($cadena, 0,1);
	        //Obtengo la cadena parcial con el HASH al conocer la longitud del "sailt"
	        $arrHash['hash']=  substr($cadena, 1,  strlen($cadena)-($arrHash['longitud']+1));
	        //str_Replace("Elemento a buscar","Valor por el cual remplazar","Donde se va a buscar") 
	        $arrHash['salt']= str_replace($arrHash['hash'],'',  substr($cadena, 1));
	        return $arrHash;
    	}
    //Funcion para evaluar el nivel de seguridad de la contraseña
	public function evaluarSeguridadPass($contrasenia) {
	        $nivelSeguridad=0;
	        $consecutivos=0;
	        
	        //Convierte un string en un array
	           $arrString = \str_split($contrasenia);
	           
	        //Evaluo el tamaño de la contraseña
	        if (strlen($contrasenia)>= 8) {
	            $nivelSeguridad++;
	        }
	        if(\strlen($contrasenia) >= 16){
	            $nivelSeguridad++;
	        }
	        //Evaluo que contenga mayusculas y minusculas
	        if(strtoupper($contrasenia) != $contrasenia){
	            $nivelSeguridad++;
	        }
	        //Evaluo el numero de simbolos que contiene
	        preg_match_all('/[!@#$%&*\/=?,;.:\-_+^\\\]/',$contrasenia, $simbolos);
	           $nivelSeguridad+=sizeof($simbolos[0]);
	           //remuevo los valores repetidos y cuento los caracteres unicos
	           $unicos =  sizeof(array_unique($arrString));
	           
	           $nivelSeguridad+=$unicos;
	           //Recorro el array para validar los caracteres repetidos
	               for($i=0;$i<count($arrString);$i++){
	                   if($i > 0){
	                      if($arrString[$i-1] === $arrString[$i]){
	                       $consecutivos++;
	                      }
	                   }
	               }
	               //Resto la cantidad de coincidencias de los niveles e seguridad
	               $nivelSeguridad -= $consecutivos;
	               
	               return $nivelSeguridad;
	    }
		
	public function __construct() {
	        //Genero el valor aleatorio para el tamaño del "Salt"
	      $this->longitud_sailt= \rand(0, 9);
	}
}
class Log{
    public $archivo;
    public $mensaje;
    
    public function __construct() {
        
    }
    public function registrar_log_mysql($archivo,$numeroError,$msnError){
        //ejemplo ../logs/error.log
        $this->archivo =  fopen($archivo,"a");
            $mensaje='Mysql Error['.date("d-m-y H:i:s",time()).'] => {'.$numeroError.'}=>{'.$msnError."}\n";
            
            if(fputs($this->archivo, $this->mensaje)){
                fclose($this->archivo);
                return TRUE;
            }else{
                fclose($this->archivo);
                return FALSE;
            }
    
    }
    public function registrar_log_php($archivo,$numeroError,$msnError){
        //ejemplo ../logs/error.log
                $this->mensaje="PHP Error[".date("d-m-y H:i:s",time())."] => {".$numeroError."}=>{".$msnError."}\n";                
                $this->archivo=  fopen($archivo, "a");
                if(fputs($this->archivo,$this->mensaje)){
                    fclose($this->archivo);
                    return TRUE;
                }else{
                    fclose($this->archivo);
                    return FALSE;
                }
    
    }
    public function enviar_log_email($emailDestino,$asunto,$msnError){
        $email= new Mail();
        if($email->enviarMailAmigo($emailDestino, $asunto, $msnError)){
            return TRUE;
        }else{
            return FALSE;            
        }
    }    
    public function registrar_log_archivo($archivo,$msn){
        //ejemplo ../logs/error.log
                $this->mensaje=$msn;                
                $this->archivo=  fopen("../".$archivo, "a");
                if(fputs($this->archivo,$this->mensaje)){
                    fclose($this->archivo);
                    return TRUE;
                }else{
                    fclose($this->archivo);
                    return FALSE;
                }
    
    }
    
}
class Archivos{
    function __construct() {
        
    }
    function mover_archivo($directorio,$mi_archivo){
        
                
                //Obtengo el nombre del archivo
                $nombre=basename($mi_archivo["name"]);
                $ext=  explode(".", $nombre);
                //Asigno direccion completa de la ubicacion del archivo
                 $file=$directorio.$nombre;
                 if(!file_exists($directorio)){
                     mkdir($directorio, '0777');
                 }
                 
                 if(move_uploaded_file($mi_archivo["tmp_name"],$file)){
                    
                     return array("mensaje"=>"Archivo almacenado correctamente","respuesta"=>TRUE);
                    
                }else{
                     return array("mensaje"=>"Error al mover archivo","respuesta"=>FALSE);
                }
                 
    }
    function cambiar_ruta_archivo($vieja_ruta,$nueva_ruta){
        //echo $vieja_ruta."-";
        //echo $nueva_ruta;
        if(rename($vieja_ruta,$nueva_ruta)){
                    
             return array("mensaje"=>"Archivo almacenado correctamente","respuesta"=>TRUE);

        }else{
             return array("mensaje"=>"Error al mover archivo","respuesta"=>FALSE);
        }
    }
    function listar_archivos_directorio($ruta){
        //var_dump(is_dir($ruta));
        //var_dump($ruta);
        $arr=array();
        //Abrir directorio y listarlo
        if(is_dir($ruta)){
            if($dh=  opendir($ruta)){
                $i=0;                
               // $arr=  scandir($ruta);
                while(($archivo=  readdir($dh))!== false){
                    //var_dump($dh);
                    //var_dump($archivo);
                    if($archivo!="." && $archivo!=".."){
                        $arr[$i]=$archivo;
                        $i++;
                    }
                    
                }
                return $arr;
            }
            closedir($dh);
        }else{
            return false;
        }
        
    }
} 
class CalendarioAPI{
/********************************************************************
* Función getGCalendar (Eduardo Revilla Vaquero)                    *
* Genera url para la creación de un evento en google calendar.      *
*********************************************************************/
function getGoogleCalendarUrl($event){  
        $titulo = urlencode($event['titulo']); 
        $descripcion = urlencode($event['descripcion']); 
        $localizacion = urlencode($event['localizacion']); 
        $start=new DateTime($event['fecha_inicio'].' '.$event['hora_inicio'].' '.date_default_timezone_get()); 
        $end=new DateTime($event['fecha_fin'].' '.$event['hora_fin'].' '.date_default_timezone_get()); 
        $dates = urlencode($start->format("Ymd\THis")) . "/" . urlencode($end->format("Ymd\THis"));
        $name = urlencode($event['nombre']);
        $url = urlencode($event['url']);
        //$gCalUrl = "http://www.google.com/calendar/event?action=TEMPLATE&amp;text=".$titulo."&amp;dates=".$dates."&amp;details=".$descripcion."&amp;location=".$localizacion."&amp;trp=false&amp;sprop=".$url."&amp;sprop=name:".$name;
        $gCalUrl="https://calendar.google.com/calendar/render?action=TEMPLATE&text=".$titulo."&dates=".$dates."&details=".$descripcion."&location=".$localizacion."&trp=false&sprop=www.worksmart.com.co&sprop=name:worksmart&sf=true&output=xml#eventpage_6";
return ($gCalUrl);
}
}
?>