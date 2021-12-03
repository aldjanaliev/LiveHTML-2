$(document).ready(function() {

  $('.slider').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
			
    ]
		
  });
	

	// ширина одного слайда
	let elWidth = $('.slick-slide').width()
	// ширина всего слайдера
	let slickWidth = $('.slick-track').width()
	// кол-во слайдов показано
	let slidesToShow = $('.slider').slick('slickGetOption', 'slidesToShow')


	$('.slider-wrap').on('click', '.slick-slide', function() {

		$( window ).resize()

		if(!$(this).hasClass('locked') && slidesToShow > 1) {	
			$('.slide-clone').remove()
			$('.locked').css('opacity', '1').removeClass('locked').addClass('slick-active')
			$(this).clone().addClass('slide-clone locked').appendTo('.slick-list')
			$(this).addClass('locked').css('opacity', '0.1')

			// индекс выбранного слайда из активных слайдов
			let slideActiveIndex = $(this).index('.slick-active')
			// сдвиг клонированного элемента относительно левого края слайдера
			let slideCloneTransform = elWidth * slideActiveIndex
			$('.slide-clone').css({'left': slideCloneTransform + 'px', 'opacity': '1'})

			$('.slider').on('click', '.slick-arrow', function() {		

				if($(this).hasClass('slick-next') && $('.locked').position().left < (slickWidth - (elWidth * (slidesToShow - slideActiveIndex)))) {
					$('.slick-slide').css({'transition' : '0.3s cubic-bezier(.47, .46, .48, .71)'})
					$('.slick-track > .locked').next().css({'transform' : 'translateX( ' + (- elWidth) + 'px )'})
					setTimeout(function() { 
						$('.slick-slide').css({'transition' : '0s', 'transform' : 'translateX(0px)'})
						$('.slick-track > .locked').insertAfter($('.slick-track > .locked').next())
					}, 300);
				}
		
				else if($(this).hasClass('slick-prev') && $('.locked').position().left > (elWidth * slideActiveIndex)){
					$('.slick-slide').css({'transition' : '0.3s cubic-bezier(.47, .46, .48, .71)'})
					$('.slick-track > .locked').prev().css({'transform' : 'translateX( ' + elWidth + 'px )'})
					setTimeout(function() { 
						$('.slick-slide').css({'transition' : '0s','transform' : 'translateX(0px)'})
						$('.slick-track > .locked').insertBefore($('.slick-track > .locked').prev())
					}, 300);
				}

			})

		}

		else {
			$('.slide-clone').remove()
			$(this).removeClass('locked').css('opacity', '1')
			console.log("click")
		}

	});

});