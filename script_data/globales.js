/*
 *Aqui se declaran las variables que van a ser tomadas como variables globales 
 */
//variable que almacena el usuario
// _dev => //si es true apuntara a las URL´s DE TEST
// _dev => //si es false apuntara a las URL´s DE PRODUCCION
var globales={
	_usuario:false,
	_cerrar_sesion:true,
	_recordarme:false,
	_eventos:false,
	_departamentos:false,
	_municipios:false,
	_dev:false,
	_URL_BE:"",
	_URL_ONLINE:"",

};

if(globales._dev){
	globales._URL_BE=url_globals._URL_BE_TEST;
	globales._URL_ONLINE=url_globals._URL_ONLINE_TEST;
}else{
	globales._URL_BE=url_globals._URL_BE;
	globales._URL_ONLINE=url_globals._URL_ONLINE;
}
