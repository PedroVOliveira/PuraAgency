/*=========================================================================================
// INICIO MAIN JS
========================================================================================= */
jQuery(function($) {
  
  $(document).ready(function() {
    
    $(".pa-toggle").on("click", function() {
        
        
        if ( $( this ).hasClass( 'on' ) ) {
            
            $(this).removeClass('on');

            $(".pa-menu").stop().fadeOut();

        } else {

        	$(this).addClass('on');

            $(".pa-menu").stop().fadeIn();
        }
    });


    $(function () {
      $('a[href*="#"]:not([href="#"])').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000, 'linear');
      });
    });




    $("#pa-owl-team").owlCarousel({
        items: 1,
        mouseDrag: false,
        lazyLoad:true,
        nav: false,
        dots: true,
        loop: true,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 2500,
        autoplayHoverPause: true,
        navText: false,
        responsive: {
            0: {
              items: 1
            },
            600: {
              items: 2,
              nav: false,
              dots: true
            },
            1000: {
              items: 3,
              nav: false,
              dots: false
            }
      }
    });


    $('#pa-contact').submit(function () {

      var data = {

        'name':     $( '#name'    ).val(),
        'email':    $( '#email'   ).val(),
        'phone':    $( '#phone'   ).val(),
        'subject':  $( '#subject' ).val(),
        'message':  $( '#message' ).val(),

      }
      
      alert('Mensagem enviada com sucesso!');
      $('#pa-contact').trigger("reset");
      console.log(data);


    });


    $("#subject option:first").text('-- Select subject --').addClass('disabled');
    
    $("#phone").mask("(99)9999-9999?9");


  });

});
 
 
/*=========================================================================================
// CLOSE FUNCTION
=========================================================================================*/


