/*
 *Aqui se declaran las variables que van a ser tomadas como variables globales 
 */
//variable que almacena el usuario
// _dev => //si es true apuntara a las URL´s DE TEST
var globales={
	//producccion
	
	_URL_BE:"http://localhost/Biometrico/",
	_URL_ONLINE:"https://biometric.mohansoft.com/",

	//test
	_URL_BE_TEST:"http://localhost/FingerReaderWeb/",
	_URL_ONLINE_TEST:"https://apitestbiometrico.mohansoft.com/",
	//_URL_ONLINE_TEST:"https://biometric.mohansoft.com/",
	//_URL:"https://",
	_usuario:false,
	_cerrar_sesion:true,
	_recordarme:false,
	_eventos:false,
	_departamentos:false,
	_municipios:false,
	_dev:false

};

if(globales._dev){
	globales._URL_BE=globales._URL_BE_TEST;
	globales._URL_ONLINE=globales._URL_ONLINE_TEST;
}
