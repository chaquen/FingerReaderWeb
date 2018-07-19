<?php

class Users extends ModeloBaseDeDatos{
    private $TABLA='users';
    public $huella;
    
    
    public function __construct() {
        
    }
    public function ultima_preparacion(){
        $this->sentencia_sql="SELECT * FROM sincronizaciones ORDER BY fecha DESC LIMIT 1";
        //var_dump($this->consultar_registros());
        if($this->consultar_registros()!=false){
            return array("mensaje"=> "Equipo listo",
                    "valores_consultados"=>$this->filas_json,
                    "respuesta"=>TRUE);

           
        }else{
            return array("mensaje"=>"No se ha preparado",
                "respuesta"=>TRUE
                );
        }
    }

    function crear_registro($arr){
         foreach ($arr as $key => $value) {
                $$key=$value;
            }   

        $this->sentencia_sql="SELECT * FROM users WHERE  id = $id";
        if($this->consultar_registros()==false){
            $this->sentencia_sql="INSERT INTO ". trim($this->TABLA)." (id,name,lastname,pass,state,email,remember_token) 
                VALUES ('$id','$name','$lastname','$pass','$state','$email','$remember_token')"; 

            if($this->insertar_registro()){
            //var_dump($this->respuesta_funcion);
                return array("mensaje"=> $this->mensajeDepuracion,
                    "respuesta"=>TRUE);
            }else{
                return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
            }   

           
        }else{
            return array("mensaje"=>"Usuario ya existe",
                "respuesta"=>FALSE,
                "valores_consultados"=>$this->filas_json);
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
           
            return array("mensaje"=>$this->filas[0]["name"]." ".$this->filas[0]["lastname"],
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas[0],
                "redireccionar"=>"menuEventos.html");
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

    function actualizar_recurso_estado($id){
      
          $this->sentencia_sql="UPDATE ".$this->TABLA." SET 
                                                        
                                                        estado_registro = 'registrado'
                                                        WHERE id = '$id'";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
}
