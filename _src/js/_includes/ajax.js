/*=========================================================================================
// INICIO AJAX JS
========================================================================================= */

jQuery(function($) {
    $(document).ready(function() {

/*=========================================================================================
//AJAX GLOBAL VARS
=========================================================================================*/

var SITE_URL = $('.topo__img').attr('href');
var AJAX_URL = SITE_URL + '/wp-admin/admin-ajax.php';

/*=========================================================================================
// FORMS CURSOS PILAR
=========================================================================================*/

$('form#pilar').on('submit', function(){
  var $select = $('select[name=pilar]').val();
  console.log($select);
  if($select) {
    window.location.href = SITE_URL+'/pilar/'+$select;
  }
});


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

/*=========================================================================================
// MAILCHIMP
=========================================================================================*/

$('.form.newsletter').submit(function() {

    var $email  = $('#email').val(),
        $uf     = $('#estado :selected').text(),
        $cidade = $('#cidade :selected').val(),
        data    = {
            'action'  : 'newsletter',
            'email'   : $email,
            'uf'      : $uf,
            'cidade'  : $cidade,
        }

        ajax_call(data);
});

function ajax_call(data){
    $.ajax({
        type: "POST",
        url: AJAX_URL,
        data: data,
        dataType: 'json',
        beforeSend: function() {
            $('.newsletter__btn input').attr('value','');
            $('.newsletter__btn input').attr("disabled", "disabled");
            $('.newsletter__btn input').addClass("load");
        },
        success: function(response) {

            var rsp = response.error.add_list;

            switch(rsp) {
                case 0:
                    var msg = "Formato de e-mail incorreto.",
                        css = 'newsletter__msg--erro';
                        break;
                case 1:
                    var msg = "Seu e-mail foi cadastrado!",
                        css = 'newsletter__msg--sucesso';
                        break;
                case 2:
                    var msg = "O e-mail digitado já existe em nossa lista.",
                        css = 'newsletter__msg--erro';
                        break;
                case 3:
                    var msg = "Digite seu e-mail e tente novamente.",
                        css = 'newsletter__msg--erro';
                        break;
                case 4:
                    var msg = "Escolha seu estado e sua cidade.",
                        css = 'newsletter__msg--erro';
                        break;
                default:
                    var msg = "Nosso sistema está em manutenção. Favor tente novamente em alguns minutos.",
                        css = 'newsletter__msg--erro';
            }

                $('.newsletter__msg').delay(200).addClass(css).html(msg).fadeIn(500);
                $('.newsletter__msg').delay(1300).fadeOut(800);
                $('.newsletter__btn input').removeClass("load");
                $('.newsletter__btn input').attr('value','Enviar').removeAttr('disabled');
        },
        error: function() {
            var msg = 'Nosso sistema está com problemas. Favor tente novamente em alguns minutos.',
                css = 'newsletter__msg--erro';
                $('.newsletter__msg').delay(200).addClass(css).html(msg).fadeIn(500);
                $('.newsletter__msg').delay(1300).fadeOut(800);
                $('.newsletter__btn input').removeClass("load");
                $('.newsletter__btn input').attr('value','Enviar').removeAttr('disabled');
        }
    });
}

/*=========================================================================================
// CLOSE FUNCTION
=========================================================================================*/
    });
});