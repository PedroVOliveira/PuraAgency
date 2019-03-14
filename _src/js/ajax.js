/*=========================================================================================
// INICIO AJAX JS
========================================================================================= */

jQuery(function($) {
  
  $(document).ready(function() {
  	var SITE_URL = $('.cm-header__logo a').attr('href');
  	var AJAX_URL = SITE_URL + '/wp-admin/admin-ajax.php';
  	/*=========================================================================================
	// CIDADES/ESTADOS
	=========================================================================================*/

	$('#estado, #wpcf7_uf').on("change", function(){
	    var cod_est = $(this).val(),
	        id      =  $(this).attr('id');

	    if(id == "estado") {var palco = $('#cidade');} else {var palco = $('#wpcf7_cidade');}
	    getCidade(cod_est, palco);
	    //console.log(palco);
	});

	function getCidade(cod_est, palco) {
	    $.ajax({
	        url: AJAX_URL,
	        type:'POST',
	        data: "action=getcidades&estado="+ cod_est,
	        beforeSend: function() {
	            palco.html('<option value="">Carregando...</option>');
	            palco.addClass('disabled').attr('disabled','disabled');
	        },
	        success: function(html){

	            palco.html(html);

	            if(html == '<option value="">Cidade</option>')  {
	                $('#wpcf7_uf').removeClass('ativo');
	                palco.removeClass('ativo').attr('disabled','disabled');
	            }
	            else {
	                $('#wpcf7_uf').addClass('ativo');
	                palco.removeAttr('disabled');
	            }
	            // console.log(palco);

	        }
	    });
	   return false;
	}

  });
  
});
/*=========================================================================================
// CLOSE FUNCTION
=========================================================================================*/