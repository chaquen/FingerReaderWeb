$(document).ready(function(){
	$('#btnGeneraReporte').click(function(){
		//$('.encabezado, #menuAdmin, .contenido').fadeOut('fast');
		//$('#reporteGenerado').show('scale');
	});
	$('.salir').click(function(){
		$('#reporteGenerado').fadeOut('fast');
		$('.encabezado, #menuAdmin, .contenido').show('scale');
	});
});