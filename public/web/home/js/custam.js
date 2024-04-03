/* header active class jqury*/

$(".nav-link").on('click', function(){
    $(".nav-link").removeClass('active');
    $(this).addClass('active');
});

/* header scroll */

$(window).scroll(function () {
    // var sc = $('.navbar')
    scroll = $(window).scrollTop()

    if (scroll > 130) {
        $('.navbar').addClass('sticky')
        $('.top').fadeIn(1000)
    }
    else {
        $('.navbar').removeClass('sticky')
        $('.top').fadeOut(1000)
    }
})

 /*top*/

     $('.top').click(function(){
        $('html, body').animate({scrollTop:0},1000)
     })
    

 /*slider*/

    $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})