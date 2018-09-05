<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once '../datos/constantes.php';
require_once '../datos/constantes_url.php';

abstract class ModeloBaseDeDatos{

    public $sentencia_sql;
    public $filas=array();
    public $respuesta_funcion=array();
    public $filas_json;
    public $conexion;
    public $ultimoRegistro;
    public $filasAfectadas;
    public $codigoMensaje;
    public $mensajeDepuracion;

    private function abrir_conexion(){
        $this->conexion=new mysqli(DB_HOST, DB_USUARIO, DB_CLAVE, DB_NOMBRE_DATABASE, DB_PUERTO);
        
        if($this->conexion->connect_error){
                        
            $this->mensajeDepuracion=$this->conexion->error;
              $log=new Log();   
              $log->registrar_log_mysql("logs/error.log",$this->conexion->connect_errno, $this->conexion->connect_error);
           return FALSE;          
            
        }  else {
            return TRUE;
        }   

    }        
    private function cerrar_conexion(){
        $this->conexion->close();
    }
    public function ejecutar_funcion_sql(){
        if($this->sentencia_sql!=""){
            if($this->abrir_conexion()){
                $this->conexion->set_charset('utf8');
                if($resultado=$this->conexion->query($this->sentencia_sql)){
                    $this->respuesta_funcion=$resultado->fetch_object();
                    //var_dump($this->respuesta_funcion->respuesta);
                    if($this->respuesta_funcion->respuesta == "0"){
                        $this->mensajeDepuracion="Registro ya existe";
                        return FALSE;
                    }
                    return TRUE;
                }
                else{
                    $this->mensajeDepuracion="Lo sentimos pero ha ocurrido un error al generar la consulta";
                    return FALSE;
                }            
            }else{

                $this->mensajeDepuracion=$this->conexion->error;
                $this->codigoMensaje =  $this->connect_errno;
                $log=new Log();   
                $log->registrar_log_php("../logs/errorApp.log","1", $this->conexion->error);

                return FALSE;
            }
        }else{
            $this->mensajeDepuracion="por favor ingrese una sentencia SQL";
            return FALSE;
        }
        

    }
    
    public function ejecutar_consulta_sql(){
        
        if($this->abrir_conexion()){
            $arregloRespuesta=array();
            $this->conexion->set_charset('utf8');
            //echo $this->sentencia_sql;
            if($resultado=  $this->conexion->query($this->sentencia_sql)){
                //var_dump($resultado->fetch_assoc());
                while($arregloRespuesta[]=$resultado->fetch_assoc());
                //var_dump(count($arregloRespuesta));
                
                $resultado->close();                    
                $this->cerrar_conexion();
                $i=0;
                
                foreach ($arregloRespuesta as  $value) {
                
                    if($value!=null){
                        //var_dump($value);
                        //$this->filas[$i++]=  array_map('utf8_encode', $value);
                        $this->filas[$i++]=$value;
                        //var_dump($this->filas[$i]);
                    }


                }
                
                //var_dump(count($this->filas));
                //echo "string";
                
                if(count($this->filas)>0){
                    //var_dump($this->filas);
                    $this->filas_json=json_encode($this->filas);
                    //var_dump($this->filas_json);
                    return TRUE;
                }else{
                    //echo "--";
                    //echo count($this->filas);
                    $log=new Log();
                    $this->mensajeDepuracion="No existen registros con la especificacion que busca";
                    $log->registrar_log_php("../logs/errorApp.log","1", $this->sentencia_sql);
                    return FALSE;
                }    

            }
        }
        else{
            
            $this->mensajeDepuracion=$this->conexion->error;
            $this->codigoMensaje =  $this->connect_errno;
            $log=new Log();   
            $log->registrar_log_php("../logs/errorApp.log","1", $this->conexion->error);
              
            return FALSE;
        }

    }
    
    public function ejecutar_sentencia_sql(){
          if($this->abrir_conexion()){
              //echo $this->sentencia_sql;
              $this->conexion->set_charset('utf8');
              if($this->conexion->query($this->sentencia_sql)){
                  $this->ultimoRegistro=$this->conexion->insert_id;
                  $this->fiasAfectadas=$this->conexion->affected_rows;
                  /*OBTENGO EL VALOR DEVUELTO POR LA FUNCION*/
                  
                  $this->cerrar_conexion();
                  return TRUE;
              }else {
                    $this->mensajeDepuracion=$this->conexion->error;
                    $log=new Log();   
                    $log->registrar_log_php("../logs/errorApp.log","1", $this->conexion->error."SENTENCIA \n[".$this->sentencia_sql."]");
                
                    $this->cerrar_conexion();
                  return FALSE;
              }
          }else{
              $this->mensajeDepuracion=$this->conexion->error;
              $log=new Log();   
              $log->registrar_log_php("../logs/errorApp.log","1", $this->conexion->error);
                
              return FALSE;
          }  
    }
    //Metodos abstractos
    public function insertar_registro(){
        //echo $this->sentencia_sql;
        if($this->sentencia_sql!=""){
            if($this->ejecutar_sentencia_sql()){
                $this->codigoMensaje="00";
                $this->mensajeDepuracion="Se ha registrado un nuevo registro en la Base de datos.";
                return TRUE;
            }else{
                $this->codigoMensaje="01";
                $log=new Log();   
                $log->registrar_log_php("../logs/errorApp.log","1", $this->conexion->error."SENTENCIA \n [".$this->sentencia_sql."]");              
                return FALSE;
            }
            
        }else{
            $this->mensajeDepuracion="Por favor ingresa una sentencia SQL";
            return FALSE;
            
        }
        
        
    }
    public function consultar_registros(){
        //echo $this->sentencia_sql;
        if($this->sentencia_sql!=""){
            if($this->ejecutar_consulta_sql()){
                 $this->mensajeDepuracion="";
                return TRUE;
            }else{
                
                $this->mensajeDepuracion="No hay registros encontrados";
                return FALSE;
            }
            
        }else{
            $this->mensajeDepuracion="Por favor ingresa una sentencia SQL";
            return FALSE;
            
        }
    }
    public function eliminar_registro(){
        if($this->sentencia_sql!=""){
            if($this->ejecutar_sentencia_sql()){
                $this->mensajeDepuracion="se ha eliminado un nuevo registro en la Base de datos";
                return TRUE;
            }else{
                $this->mensajeDepuracion="Ha ocurrido un error al eliminar el registro";
                return FALSE;
            }
            
        }else{
            $this->mensajeDepuracion="Por favor ingresa una sentencia SQL";
            return FALSE;
            
        }
    }
    public function actualizar_registro(){
        if($this->sentencia_sql!=""){
            if($this->ejecutar_sentencia_sql()){
                $this->mensajeDepuracion="se ha actualizado un nuevo registro en la Base de datos";
                return TRUE;
            }else{
                $this->mensajeDepuracion="Ha ocurrido un error al actualizar el  registro";
                return FALSE;
            }
            
        }else{
            $this->mensajeDepuracion="Por favor ingresa una sentencia SQL";
            return FALSE;
            
        }
    }

}

