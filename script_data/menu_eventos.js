function iniciar_menu_eventos(){
	/*agregarEvento("btnContactar","click",function(){
			var datos = $("#formContacto").serializarFormulario();
			datos.origen="info@jedidiassalud.com";
			console.log(datos);
			if(false!=datos){
				registrarDato("contactar_pg_construccion",datos,function(rs){
					mostrarMensaje(rs);
				},"formContacto");
			}else{
				mostrarMensaje("Por favor ingresa los campos requeridos");
			}
	});*/
	globales._usuario=obtener_local_storage("ssUsuario");
	if(globales._usuario==false){
		location.href="index.html";
	}

	
	console.log(globales);

	
	agregarEvento("btnRegistroUsuario","click",function(){

		registrarDatoOff(globales._URL_BE+"controlador/controlador_participantes.php","valida_registro",
						{usuario:globales._usuario},function(rs){

							if(rs.respuesta){
								location.href="registroUsuario.html?id="+rs.valores_consultados[0].id;		
							}else{
								mostrarMensaje("Por favor registra una huella");
							}
						});
		

	});
	agregarEvento("btnSalir","click",function(){

		if(confirm("¿Estas seguro de salir de la aplicación?")){
			eliminar_local_storage("ssUsuario");
			location.href="index.html";		
		}
	});
	agregarEvento("liInicio","click",function(){
		location.href="menuEventos.html";
	});
	agregarEvento("btnEventos","click",function(){
		location.href="eventos.html";
	});
	agregarEvento("btnReportes","click",function(){
		location.href="reportes.html";
	});
	
	consultar_db();

}

function consultar_db(){

	consultarDatosOff(globales._URL_BE+"controlador/controlador_usuario.php","validar_db",{},function(rs){
			    console.log(rs);
			    
			    if(rs.respuesta){
			    	 if(navigator.onLine) {
	                //goOnline();
	                
	                  $('#btnInstalar').fadeOut();
			    	  $('#btnPreparar').fadeIn();

	                } else {
	                   $('#btnPreparar').fadeOut();
                            $('#btnInstalar').fadeOut();
                            $('#btnOff').fadeIn();
	                }
	                if(rs.valores_consultados!=undefined){
	                	document.getElementById("pMsn").innerHTML=rs.mensaje+", ultima fecha y hora de preparacion "+eval(rs.valores_consultados)[0].fecha+"\n ¿Quieres prepararlo de nuevo?";	
	                }
			    	
			    	//document.getElementById("btnInstalar").style.display="none";
			    	//document.getElementById("btnPreparar").style.display="block";
			    	
				}else{
					  if(navigator.onLine) {
	                //goOnline();
	                
	                  $('#btnInstalar').fadeIn();
			    	  $('#btnPreparar').fadeOut();

	                } else {
	                   $('#btnPreparar').fadeOut();
                            $('#btnInstalar').fadeOut();
                            $('#btnOff').fadeIn();
	                }
					
			    	//document.getElementById("btnInstalar").style.display="block";
			    	//document.getElementById("btnPreparar").style.display="none";
			    	
			    	
			    }
	});
}

/*
function menu() {

            var menu_ul = $('.menu > li > ul'),
                menu_a  = $('.menu > li > a');

            menu_ul.hide();

            menu_a.click(function(e) {
                e.preventDefault();
                if(!$(this).hasClass('active')) {
                    menu_a.removeClass('active');
                    menu_ul.filter(':visible').slideUp('normal');
                    $(this).addClass('active').next().stop(true,true).slideDown('normal');
                } else {
                    $(this).removeClass('active');
                    $(this).next().stop(true,true).slideUp('normal');
                }
            });

}*/
/*
function menu_2(){
	
var changeClass = function (r,className1,className2) {
                    var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");
                    if( regex.test(r.className) ) {
                            r.className = r.className.replace(regex,' '+className2+' ');
                }
                else{
                            r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"),' '+className1+' ');
                }
                return r.className;
            };	

            //  Creating our button in JS for smaller screens
var menuElements = document.getElementById('menu');
menuElements.insertAdjacentHTML('afterBegin','<button type="button" id="menutoggle" class="navtoogle" aria-hidden="true"><i aria-hidden="true" class="icon-menu"> </i> Menu</button>');

            //  Toggle the class on click to show / hide the menu
            document.getElementById('menutoggle').onclick = function() {
                    changeClass(this, 'navtoogle active', 'navtoogle');
            }

            // http://tympanus.net/codrops/2013/05/08/responsive-retina-ready-menu/comment-page-2/#comment-438918
            document.onclick = function(e) {
                    var mobileButton = document.getElementById('menutoggle'),
                            buttonStyle =  mobileButton.currentStyle ? mobileButton.currentStyle.display : getComputedStyle(mobileButton, null).display;

                    if(buttonStyle === 'block' && e.target !== mobileButton && new RegExp(' ' + 'active' + ' ').test(' ' + mobileButton.className + ' ')) {
                            changeClass(mobileButton, 'navtoogle active', 'navtoogle');
                    }
            }
}
*/


agregarEventoLoad(iniciar_menu_eventos);
