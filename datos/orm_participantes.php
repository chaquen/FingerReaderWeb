<?php

class Participantes extends ModeloBaseDeDatos{
    private $TABLA='participantes';
    public $huella;
    
    
    public function __construct() {
        
    }
    

    function crear_registro($arr){
         foreach ($arr as $key => $value) {
                $$key=$value;
         }   
            $this->sentencia_sql="INSERT INTO participantes (
                                                        huella_binaria) 
                                                        VALUES ( 
                                                        '$huella_binaria')";

            

            if($this->insertar_registro()){
            //var_dump($this->respuesta_funcion);
                return array("mensaje"=> $this->mensajeDepuracion,
                    "respuesta"=>TRUE);
            }else{
                return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
            }                   
        
    }    


    function obtener_registro_todos_los_registros(){
        
            $this->sentencia_sql="SELECT 
                             `participantes`.`id`, 
                            `tipo_doc`,
                            `documento`,
                            `lugar_exp`, 
                            `pri_apellido`,
                            `seg_apellido`,
                            `pri_nombre`,
                            `seg_nombre`, 
                            `ciud_nacimiento`, 
                            `dep_nacimiento`,
                            `vereda_nacimiento`,
                            `fecha_nac`, 
                            `edad`, 
                            `genero`, 
                            `sub_genero`, 
                            `cap_dife`, 
                            `etnia`, 
                            `sub_etnia`, 
                            `zona`, 
                            `municipio`, 
                            `departamento_ubi`,
                            `vereda_ubi`,
                            `celular`, 
                            `email`, 
                            `escolaridad`, 
                            `titulo_obt`, 
                            `huella_binaria`, 
                            `state`, 
                            `estado_registro`, 
                            `tipo_registro`, 
                            `anio_ingreso_pdp`,
                            `cargo_poblador`,  
                            `participantes`.`created_at`, 
                            `participantes`.`updated_at`
                            FROM ".trim($this->TABLA)." " ;
        
        
        if($this->consultar_registros()){
            //var_dump($this->filas);
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE,"valores_consultados"=>false);
        }
        
    }
    function obtener_registro_todos_los_registros_para_sync($WHERE){
        
             $this->sentencia_sql="SELECT 
                            `participantes`.`id`, 
                            `tipo_doc`,
                            `documento`,
                            `lugar_exp`, 
                            `pri_apellido`,
                            `seg_apellido`,
                            `pri_nombre`,
                            `seg_nombre`, 
                            `ciud_nacimiento`, 
                            `dep_nacimiento`, 
                            `vereda_nacimiento`,
                            `fecha_nac`, 
                            `edad`, 
                            `genero`, 
                            `sub_genero`, 
                            `cap_dife`, 
                            `etnia`, 
                            `sub_etnia`, 
                            `zona`, 
                            `municipio`, 
                            `departamento_ubi`,
                            `vereda_ubi`,
                            `celular`, 
                            `email`, 
                            `escolaridad`, 
                            `titulo_obt`, 
                            `huella_binaria`, 
                            `state`, 
                            `estado_registro`, 
                            `tipo_registro`, 
                            `anio_ingreso_pdp`,
                            `cargo_poblador`,  
                            `participantes`.`created_at`, 
                            `participantes`.`updated_at`
                            FROM ".trim($this->TABLA)." ".$WHERE ;
        
        
        if($this->consultar_registros()){
            //var_dump($this->filas);
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE,"valores_consultados"=>false);
        }
        
    }
    function obtener_registro_todos_los_registros_detall_participacion(){
        
           $this->sentencia_sql="SELECT 
                             * FROM detalle_participantes" ;
        
        
        if($this->consultar_registros()){
            //var_dump($this->filas);
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=> FALSE,"valores_consultados"=>false);
        }
        
    }
    function obtener_registro_por_valor($valores_a_retornar,$valor){

        $this->sentencia_sql="SELECT ". trim($valores_a_retornar)." FROM ". trim($this->TABLA);

        if($valor!=""){
            $this->sentencia_sql.=" WHERE ".$valor;
        }
        
        //echo $this->sentencia_sql;
        
        
        if($this->consultar_registros()){
            //var_dump($this->filas);
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas);
        }else{
            return array("mensaje"=>  "No hay registros de participantes","respuesta"=> FALSE,"valores_consultados"=>NULL);
        }
        
    }

    function obtener_registro_por_valor_join($valores_a_retornar,$valor){
         
        $this->sentencia_sql="SELECT ". trim($valores_a_retornar)." FROM ". trim($this->TABLA)." INNER JOIN detalle_participantes ON ". trim($this->TABLA).".documento = detalle_participantes.user_id";

        if($valor!=""){
            $this->sentencia_sql.=" WHERE ".$valor;
        }
        
        //echo $this->sentencia_sql;
        
        
        if($this->consultar_registros()){
            //var_dump($this->filas);
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas);
        }else{
            return array("mensaje"=>  "No hay registros de participantes","respuesta"=> FALSE,"valores_consultados"=>NULL);
        }
        
    }
    
    function eliminar_recurso($valor){
        $this->sentencia_sql="DELETE FROM ".$this->TABLA." WHERE ".$valor;
        //echo $this->sentencia_sql;
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


            $cumpleanos = new DateTime($fecha_nac);
            $hoy = new DateTime();
            $annos = $hoy->diff($cumpleanos);
            $edad=$annos->y;
            if(preg_match("/^[0-9]+$/",$documento)==1 ){
                if($edad>=8){
                    
                            $this->sentencia_sql="UPDATE ".$this->TABLA." SET 
                                                                    tipo_doc = '$tipo_doc',
                                                                    documento = '$documento',
                                                                    lugar_exp = '$lugar_exp',
                                                                    pri_apellido = '$pri_apellido',
                                                                    seg_apellido = '$seg_apellido',
                                                                    pri_nombre = '$pri_nombre',
                                                                    seg_nombre = '$seg_nombre',
                                                                    dep_nacimiento = '$dep_nacimiento',
                                                                    ciud_nacimiento = '$ciud_nacimiento',
                                                                    vereda_nacimiento = '$vereda_nacimiento',
                                                                    fecha_nac = '$fecha_nac',
                                                                    edad = '$edad',
                                                                    genero = '$genero',
                                                                    sub_genero = '$genero_otro',
                                                                    cap_dife = '$cap_dife',
                                                                    etnia = '$etnia',
                                                                    sub_etnia = '$sub_etnia',
                                                                    zona = '$zona',
                                                                    departamento_ubi = '$departamento_ubi',
                                                                    municipio = '$municipio',
                                                                    vereda_ubi = '$vereda_ubi',
                                                                    celular = '$celular',
                                                                    email = '$email',
                                                                    escolaridad = '$escolaridad',
                                                                    titulo_obt = '$titulo_obt',
                                                                    estado_registro = 'registrado',
                                                                    tipo_registro = 'nuevo',
                                                                    state = '1',
                                                                    created_at = '$created_at',
                                                                    updated_at = '$created_at',
                                                                    cargo_poblador = '$cargo_poblador',
                                                                    anio_ingreso_pdp = '$anio_ingreso_pdp'
            
                                                                    WHERE id = '$id'";
                    if($this->actualizar_registro()){
                        //var_dump($procesos);
                        foreach ($procesos as $key => $value) {
                            $pp=$value;
                            $this->sentencia_sql="INSERT INTO  detalle_procesos (id_usuario,id_proceso,created_at) VALUES ('$documento','$pp','$created_at')";
                            $this->insertar_registro();
                                
                            
                        }
                            
                         return array("mensaje"=> $this->mensajeDepuracion,
                                "respuesta"=>TRUE,"SQL"=> $this->sentencia_sql);   
                        
                    }else{
                        return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE,"sql"=>$this->sentencia_sql);
                    }
                }else{
                    return array("mensaje"=>  "Este participante no tiene la edad suficiente para ingresar a el evento","respuesta"=>FALSE,"sql"=>"");
                } 
            }else{
                return array("mensaje"=>  "Debes ingresar un número valido para el documento, por favor no uses puntos o letras en el documento","respuesta"=>FALSE,"sql"=>"");
            }
            
           
    }

     function actualizar_recurso_en_evento($arr,$id){
        foreach ($arr as $key => $value) {
                $$key=$value;
            }   


            $cumpleanos = new DateTime($fecha_nac);
            $hoy = new DateTime();
            $annos = $hoy->diff($cumpleanos);
            $edad=$annos->y;
            if(preg_match("/^[0-9]+$/",$documento)==1 ){

                if($edad>=8){
                        $this->sentencia_sql="UPDATE ".$this->TABLA." SET 
                                                                tipo_doc = '$tipo_doc',
                                                                documento = '$documento',
                                                                lugar_exp = '$lugar_exp',
                                                                pri_apellido = '$pri_apellido',
                                                                seg_apellido = '$seg_apellido',
                                                                pri_nombre = '$pri_nombre',
                                                                seg_nombre = '$seg_nombre',
                                                                dep_nacimiento = '$dep_nacimiento',
                                                                ciud_nacimiento = '$ciud_nacimiento',
                                                                vereda_nacimiento = '$vereda_nacimiento',
                                                                fecha_nac = '$fecha_nac',
                                                                edad = '$edad',
                                                                genero = '$genero',
                                                                sub_genero = '$genero_otro',
                                                                cap_dife = '$cap_dife',
                                                                etnia = '$etnia',
                                                                sub_etnia = '$sub_etnia',
                                                                zona = '$zona',
                                                                departamento_ubi = '$departamento_ubi',
                                                                municipio = '$municipio',
                                                                vereda_ubi = '$vereda_ubi',
                                                                celular = '$celular',
                                                                email = '$email',
                                                                escolaridad = '$escolaridad',
                                                                titulo_obt = '$titulo_obt',
                                                                state = '1',
                                                                updated_at = '$created_at',
                                                                cargo_poblador = '$cargo_poblador',
                                                                anio_ingreso_pdp = '$anio_ingreso_pdp'
        
                                                                WHERE id = '$id'";
                    $RR=$this->actualizar_registro();                                                        
                                                                          
                    if($RR){
                        //var_dump($procesos);  
                        
                            
                         return array("mensaje"=> $this->mensajeDepuracion,
                                "respuesta"=>TRUE);   
                        
                    }else{
                        return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
                    }
                }else{
                  return array("mensaje"=>  "Este participante no tiene la edad suficiente para registrarse en el evento","respuesta"=>FALSE);
                }
            }else{
                  return array("mensaje"=>  "Debes ingresar un número valido para el documento, por favor no uses puntos o letras en el documento","respuesta"=>FALSE);
            }
    }

    function actualizar_recurso_estado($id,$estado){
      
          $this->sentencia_sql="UPDATE ".$this->TABLA." SET 
                                                        
                                                        estado_registro = '$estado'
                                                        WHERE id = '$id'";
        if($this->actualizar_registro()){
            return array("mensaje"=> $this->mensajeDepuracion,
                "respuesta"=>TRUE);
        }else{
            return array("mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }

    function obtener_todos_procesos(){
        $this->sentencia_sql="SELECT * FROM detalle_procesos";

       
        if($this->consultar_registros()){
            //var_dump($this->filas);
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas);
        }else{
            return array("mensaje"=>  "No hay registros de procesos","respuesta"=> FALSE,"valores_consultados"=>NULL);
        }
    }
    function obtener_procesos_por_usuario($doc){
        $this->sentencia_sql="SELECT detalle_procesos.id as id_detalle_proceso,detalle_procesos.id_usuario,detalle_procesos.id_proceso,proceso.nombre_proceso,proceso.id FROM detalle_procesos INNER JOIN proceso ON proceso.id = detalle_procesos.id_proceso
                              WHERE id_usuario = '$doc' ";

       
        if($this->consultar_registros()){
            //var_dump($this->filas);
            return array("mensaje"=>$this->mensajeDepuracion,
                "respuesta"=>TRUE,
                "valores_consultados"=>$this->filas);
        }else{
            return array("mensaje"=>  "No hay registros de procesos","respuesta"=> FALSE,"valores_consultados"=>NULL);
        }
    }
    
    function actualizar_detalle_proceso($proceso,$documento,$created_at){
         
            $this->sentencia_sql="SELECT * FROM detalle_procesos WHERE id_usuario = '$documento' 
                                AND id_proceso = '$proceso' ";
            if(TRUE!=$this->consultar_registros()){
                $this->sentencia_sql="INSERT INTO  detalle_procesos (id_usuario,id_proceso,created_at) VALUES ('$documento','$proceso','$created_at')";
                $this->insertar_registro();
            }                            
                                
                            
                         
    }
}
