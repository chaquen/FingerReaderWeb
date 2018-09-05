<?php

class Eventos extends ModeloBaseDeDatos{
    private $TABLA='eventos';
    public $huella;
    
    
    public function __construct() {
        
    }
    

    function crear_registro($arr){
         foreach ($arr as $key => $value) {
            //var_dump($key);
                $$key=$value;
            }   

        $this->sentencia_sql="SELECT * FROM eventos WHERE  id = $id";
        if($this->consultar_registros()==false){
            $this->sentencia_sql="INSERT INTO ". trim($this->TABLA)." (id,id_ref,name,description,date,city,address,atachments,state,img,created_at,updated_at) 
                VALUES ('$id','$id_ref','$name','$description','$date','$city','$address','$atachments','$state','$img','$created_at','$updated_at')"; 

            if($this->insertar_registro()){
            //var_dump($this->filas[0]);
                return array("mensaje"=> "Los eventos se han registrado satisfactoriamente.",
                    "respuesta"=>TRUE);
            }else{
                return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
            }   

           
        }else{


            $this->sentencia_sql="UPDATE ".$this->TABLA." SET                                                         
                                                        name = '$name',
                                                        description = '$description',
                                                        date = '$date',
                                                        city = '$city',
                                                        address = '$address',
                                                        atachments = '$atachments',
                                                        state = '$state',
                                                        img = '$img',
                                                        updated_at = '$updated_at'
                                                        WHERE id = '$id'";
            if($this->actualizar_registro()){
                 return array("mensaje"=>  "El evento ".$this->filas[0]["name"]." ya esta registrado","respuesta"=>FALSE, "datos"=>$this->filas[0]["name"]);
            }else{
                return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
            }


           
        }
                
        
    }    


    function obtener_registro_todos_los_registros(){
        $tbl=$this->TABLA;
          $this->sentencia_sql="SELECT * FROM ".$this->TABLA ;
        
        
        if($this->consultar_registros()){
            //var_dump($this->filas);
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_por_valor($valores_a_retornar,$valor){
        $this->sentencia_sql="SELECT ". trim($valores_a_retornar)." FROM ". trim($this->TABLA);

        if($valor!=""){
            $this->sentencia_sql.=" WHERE ".$valor;
        }
        
        //echo $this->sentencia_sql;
        
        
        if($this->consultar_registros()){
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas_json);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    
    function eliminar_recurso(){
        $this->sentencia_sql="SELECT () as respuesta";
        if($this->eliminar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso($arr,$id){
        foreach ($arr as $key => $value) {
                $$key=$value;
            }   
         /*$this->sentencia_sql="UPDATE ".$this->TABLA." SET 
                                                        tipo_doc = '$tipo_doc',
                                                        documento = '$documento',
                                                        lugar_exp = '$lugar_exp',
                                                        pri_apellido = '$pri_apellido',
                                                        seg_apellido = '$seg_apellido',
                                                        pri_nombre = '$pri_nombre',
                                                        seg_nombre = '$seg_nombre',
                                                        dep_nacimiento = '$dep_nacimiento',
                                                        ciud_nacimiento = '$ciud_nacimiento',
                                                        fecha_nac = '$fecha_nac',
                                                        genero = '$genero',
                                                        cap_dife = '$cap_dife',
                                                        etnia = '$etnia',
                                                        zona = '$zona',
                                                        municipio = '$municipio',
                                                        celular = '$celular',
                                                        email = '$email',
                                                        escolaridad = '$escolaridad',
                                                        titulo_obt = '$titulo_obt',
                                                        organizacion = '$organizacion',
                                                        proceso = '$proceso',
                                                        estado_registro = 'registro'
                                                        WHERE id = '$id'";*/
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }

    function actualizar_recurso_estado($id,$estado){
      
          $this->sentencia_sql="UPDATE ".$this->TABLA." SET 
                                                        
                                                        estado_evento = '$estado'
                                                        WHERE id = '$id'";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }


    public function actualizar_recurso_evento($where,$cambios){
            //var_dump($where);
            //var_dump($cambios);
           $this->sentencia_sql="UPDATE ".$this->TABLA." SET " 
                                                         .
                                                            $cambios

                                                         ." WHERE ".$where;
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }

    public function crear_detalle_evento($arr){
        foreach ($arr as $key => $value) {
                $$key=$value;
            }   

         $this->sentencia_sql="SELECT * FROM detalle_participantes WHERE user_id = $user_id AND event_id = $event_id";
        //var_dump($this->consultar_registros());
        //var_dump($this->filas[0]["id"]);
        if($this->consultar_registros()==false){
            $this->sentencia_sql="INSERT INTO detalle_participantes (user_id,event_id,created_at,updated_at) VALUES ('$user_id','$event_id','$created_at','$updated_at')"; 

            if($this->insertar_registro()){
            //var_dump($this->respuesta_funcion);
                return array("mensaje"=> $this->mensajeDepuracion,
                    "respuesta"=>TRUE);
            }else{
                return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
            }   
        }else{


             $this->sentencia_sql="UPDATE detalle_participantes SET 
                                                        
                                                        user_id = '$user_id',
                                                        event_id = '$event_id',
                                                        updated_at = '$updated_at'
                                                        WHERE id = '".$this->filas[0]["id"]."'";
            if($this->actualizar_registro()){
                return array("mensaje"=> $this->mensajeDepuracion,
                    "respuesta"=>TRUE);
            }else{
                return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
            }
        }
    }

    public function registro_sincronizar($usuario,$fecha,$tipo){
        $this->sentencia_sql="INSERT INTO sincronizaciones (fecha,usuario,tipo) VALUES('$fecha','$usuario',$tipo)";
         if($this->insertar_registro()){
            //var_dump($this->filas[0]);
                return array("mensaje"=> "sincronizacion realizada",
                    "respuesta"=>TRUE);
            }else{
                return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
            }   

    }
    function obtener_registro_todas_las_lineas(){
        $tbl=$this->TABLA;
          $this->sentencia_sql="SELECT * FROM lineas" ;
        
        
        if($this->consultar_registros()){
            //var_dump($this->filas);
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function obtener_registro_todos_los_procesos($nom){
        
           $this->sentencia_sql="SELECT proceso.id,proceso.nombre_proceso FROM proceso INNER JOIN lineas ON proceso.fk_id_linea = lineas.id WHERE lineas.id = '$nom'";
        
        
        if($this->consultar_registros()){
            //var_dump($this->filas);
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE);
        }
        
    }
    function crear_registro_lineas($arr){
            foreach ($arr as $key => $value) {
            //var_dump($key);
                $$key=$value;
            }   
            $this->sentencia_sql="SELECT * FROM lineas WHERE  id = $id";
            if($this->consultar_registros()==false){
                $this->sentencia_sql="INSERT INTO lineas (id,nombre_linea) VALUES('$id','$nombre_linea')";
                if($this->insertar_registro()){
                //var_dump($this->filas[0]);
                    return array("mensaje"=> "linea registrada",
                        "respuesta"=>TRUE);
                }else{
                    return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
                }   
            }
            
                
        
    }
    function crear_registro_proceso($arr){
            foreach ($arr as $key => $value) {
            //var_dump($key);
                $$key=$value;
            }   

            $this->sentencia_sql="SELECT * FROM proceso WHERE  id = $id";
            if($this->consultar_registros()==false){
                $this->sentencia_sql="INSERT INTO proceso (id,fk_id_linea,nombre_proceso) VALUES('$id','$fk_id_linea','$nombre_proceso')";
                if($this->insertar_registro()){
                //var_dump($this->filas[0]);
                    return array("mensaje"=> "linea registrada",
                        "respuesta"=>TRUE);
                }else{
                    return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
                }    
            }
            
                
        
    }  
    function eliminar_detalle_proceso($id){
            

            $this->sentencia_sql="DELETE FROM detalle_procesos WHERE id = '$id'";
            if($this->eliminar_registro()){
            
                return array("mensaje"=> "registro eliminado",
                        "respuesta"=>TRUE);
                
            }else{
                    return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
            }
            
                
        
    } 
}
