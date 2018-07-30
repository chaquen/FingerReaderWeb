/*
 *Aqui se declaran las variables que van a ser tomadas como variables globales 
 */
//variable que almacena el usuario

var globales={
	_URL_BE_TEST:"http://localhost/FingerReaderWeb/",
	_URL_ONLINE:"https://biometric.mohansoft.com/",
	_URL_BE:"http://localhost/Biometrico/",
	
	//_URL:"https://",
	_usuario:false,
	_cerrar_sesion:true,
	_recordarme:false,
	_eventos:false,
	_departamentos:false,
	_municipios:false,
	_dev:false//si es true apuntara a FingerReaderWeb

};

if(globales._dev){
	globales._URL_BE=globales._URL_BE_TEST;
}
