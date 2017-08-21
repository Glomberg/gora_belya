/* ******************** */
$(document).ready(function() {
	SliderFlex('#slider', 125000, 1000, '#slider-nav');

	$('.ask-question').click(function(e){
        e.preventDefault();
        $('.ask-question-form').css('display', 'block');
        $(this).css('display', 'none');
    });
    $('.ask-question-form .order-button').click(function(e){
		e.preventDefault();
        $('.ask-question-success').css('display', 'flex');
        $('.ask-question-form').css('display', 'none');
    });
	$('.ask-question-success').click(function(){
        $('.ask-question').css('display', 'block');
        $(this).css('display', 'none');
    });
	$('.ask-close').click(function(){
		$('.ask-question-form').css('display', 'none');
		$('.ask-question').css('display', 'block');
	});
	$('.mobile-menu__button').click(function(){
		$('.mobile-menu__popup-menu').css('display', 'flex');
	});
	$('.mobile-menu__close').click(function(){
		$('.mobile-menu__popup-menu').css('display', 'none');
	});
	$('.rating > div').hover(
		//При наведении
		function(){
			var stars = $('.rating > div'), selected = $(this);
			//Если звезды были нажаты
			stars.each(function(){
				$(this).removeClass('active-star').addClass('inactive-star');
			})
			//Выделяем все звезды вплоть до нажатой
			stars.each(function(){
				if($(this).index() <= selected.index()) $(this).addClass('active-star');
			});
		},
		//Без наведения
		function(){
			var stars = $('.rating > div');
			//Снимаем выделение со всех звезд, кроме нажатых
			stars.each(function(){
				!$(this).hasClass('clicked') ? $(this).removeClass('active-star').addClass('inactive-star') : $(this).addClass('active-star').removeClass('inactive-star');
			});
		}
	);
	$('.rating > div').click(function(){
		var stars = $('.rating > div'), selected = $(this), selectedIndex = selected.index() + 1;
		stars.each(function(){
			$(this).removeClass('clicked active-star').addClass('inactive-star')
			$(this).index() <= selected.index() ? $(this).removeClass('inactive-star').addClass('active-star clicked') : '';
		});
		$('#star' + selectedIndex).click();
	});
	$('.answer-link').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active').hasClass('active') ? $(this).text('Свернуть ответ') : $(this).text('Посмотреть ответ');
		$(this).find('+ .answer').stop(false, false).slideToggle();
	});
	//Раскрытие списков в ценах
	$('.category-slider').click(function(){
		$(this).parent().toggleClass('underline-low');
		$(this).toggleClass('active').find('+ .category-wrapper').stop(false, false).slideToggle();
	});
	
	if ( $(window).width() > 320 || screen.width > 320 ) {
		if ( $('.owl-carousel').length >= 1) {
			$('.owl-carousel').owlCarousel({
				responsive:{
					0 : {
						items: 0
					},
					320 : {
						items: 3
					},
					480: {
						items: 5
					},
					768: {
						items: 5
					},
					970: {
						items: 6
					},
				},
				loop:      false,
				nav:       true,
				navText:   ["", ""],
				mouseDrag: false,
			});
		}
	} else {
		$('.owl-trigger').on('click', function(){
			if ( ! $('.owl-carousel').is(':visible') ) {
				$('.owl-carousel').slideDown();
			} else {
				$('.owl-carousel .carousel-item').on('click', function(){
					$('.owl-carousel').slideUp();
				});
				$('.owl-carousel').slideUp();
			}
		});
		$('.owl-carousel .carousel-item').on('click', function(){
			if ( $('.owl-carousel').is(':visible') ) {
				$('.owl-carousel').slideUp();
			}
		});
	}
	
	$('.owl-carousel .carousel-item').on('click', function(){
		$('.owl-carousel').find('.carousel-item').removeClass('selected');
		$(this).addClass('selected');
	})
	
	if ( $('.change-mode').length >= 1 ) {
		$('.change-mode a').on('click', function(){
			if ( ! $(this).hasClass('active') ) {
				$('.change-mode a').removeClass('active');
				$(this).addClass('active');
				if ( $(this).hasClass('list-view') ) {
					$('.subcategory-list').removeClass('table-view').addClass('list-view');
				}
				if ( $(this).hasClass('table-view') ) {
					$('.subcategory-list').removeClass('list-view').addClass('table-view');
				}
			}
		});
	}
	
	if ( $('.subcategory-item').length >= 1 ) {
		check_prices();
	}
	$('.controls > div').on('click', function(){
		if( $(this).hasClass('active') ) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});
	
	$('body').on('click', '.increment', function(){
		var count = $(this).siblings('input').val();
		if ( count == "" || count < 0 ) {
			$(this).siblings('input').val(0);
		} else {
			$(this).siblings('input').val( parseInt(count) + 1 );
		}
		calculate();
	});
	$('body').on('click', '.decrement', function(){
		var count = $(this).siblings('input').val();
		if ( count == "" || count < 0 ) {
			$(this).siblings('input').val(0);
		}
		if ( count > 0 ) {
			$(this).siblings('input').val( parseInt(count) - 1 );
		}
		calculate();
	});
	$('body').on('keyup', '.num input', function(){
		if ( $(this).val() < 0  ) {
			$(this).val(0);
		}			
		calculate();
	});
	function check_prices() {
		$('.subcategory-item').each(function(){
			var price = parseInt( $(this).attr('data-price') );
			$(this).find('.price').text( price );
		});
		calculate();
	}
	function calculate() {
		$('.subcategory-item').each(function(){
			var price = parseInt( $(this).attr('data-price'), 10 );
			if ( $(this).find('input').val() === "" ) {
				$(this).find('input').val(0);
				var count = 0;
				$(this).find('.price').removeClass('small-price');
			} else {
				var count = parseInt( $(this).find('input').val(), 10 );
			}
			if ( count == 0 ) {
				$(this).find('.bold-price').hide();
				$(this).find('.price').show().removeClass('small-price');
			}
			if ( count == 1 ) {
				$(this).find('.bold-price').show().text( count * price );
				$(this).find('.price').removeClass('small-price').hide();
			}
			if ( count > 1 ) {
				$(this).find('.bold-price').show().text( count * price );
				$(this).find('.price').show().addClass('small-price');
			}
		});
	}
	
	if ( $('.checkout-duration').length >= 1 ) {
		$('.duration-option label').on('click', function(){
			$('.duration-option input').removeAttr('checked');
			$(this).parent().siblings('input').attr('checked', 'checked');
		});
	}
	
	if ( $('.methods').length >= 1 ) {
		if ( $('input[id="delivery-variant-courier"]').is(':checked') ) {
			$('.delivery-form').slideDown();
		}
		$('.trigger-buttons input').on('change', function(e){
			if ( $(e.target).attr('name') == "delivery-variant" ) {
				if( $(this).attr('id') == "delivery-variant-courier" ) {
					$('.delivery-form').slideDown();
				} else {
					$('.delivery-form').slideUp();
				}
			}
		});
	}
	$('.profile-add-adress a').on('click', function(){
		if ( ! $('#add-adress').is(':visible') ) {
			$('#add-adress').slideDown();
		} else {
			$('#add-adress').slideUp();
		}
	});
	if ( $('.datepicker').length >= 1  ) {
		$('.datepicker').datepicker({
			dateFormat:   "dd.mm.yy",
		});
		$('.calendar-ico').on('click', function(){
			$(this).siblings('input').focus();
		});		
	}
		
	
});

//Хорошо бы это дело перенести в плагин
function SliderFlex(select, speedSlide = 1000, speedTransition = 200, sliderNav) {
	var slider = $(select);
	slider.find('.active_slide').removeClass('active_slide');
	var firstSlide = $(select).find('.slider_wrap > *').first();
	firstSlide.addClass('active_slide');
	var countSlides = $(select).find('.slider_wrap > *').length;
	var interval;
	//Создание динамических переключателей
	var str = '';
	for(i = 0; i < countSlides; i++){
		str += '<div></div>';
	}
	$(sliderNav).append(str).find('> *').first().addClass('active');
	
	//Выставляем новую ширину элемента
	var percente = 100 * (countSlides+1);
	slider.find('.slider_wrap').css('width', percente+'%');
	//Копируем первый слайд в конец списка
	slider.find('.slider_wrap').append(firstSlide.clone());
	
	interval = setInterval(SlideMove, speedSlide);
	
	//Навигация
	$(sliderNav).find('> *').click(function() {
		var index = $(this).index();
		var percent = -100 * index;
		
		slider.find('.slider_wrap').stop();
		slider.find('.slider_wrap').animate({left: percent+'%'}, speedTransition);
		//У всех элементов убираем активность
		$(sliderNav).find('> *').removeClass('active');
		slider.find('.slider_wrap > *').removeClass('active_slide');
		//Добавляем активность нажатому переключателю и слайду
        $(this).addClass('active');
		slider.find('.slider_slide').eq($(this).index()).addClass('active_slide');
		//Пересоздаём интервал, чтобы сбросить время
		clearInterval(interval);
		interval = setInterval(SlideMove, speedSlide);
	});
	
	function SlideMove()
	{
		var maxPercent = -100 * (countSlides-1);
		slider.find('.slider_wrap').animate({left: '-=100%'}, speedTransition);
		if (parseInt(slider.find('.slider_wrap')[0].style.left, 10) <= maxPercent)
			slider.find('.slider_wrap').animate({left: '0%'}, 0);
		//Сменяем активные слайды
		slider.find('.active_slide').removeClass('active_slide').next().addClass('active_slide');
		//У всех переключателей убираем класс
		$(sliderNav).find('> *').removeClass('active');
		//Переключателю под номером * добавляем класс
		$(sliderNav).find('> *').eq(slider.find('.active_slide').index()).addClass('active');
		//На последнем слайде делаем активными первый слайд и переключатель
		if(slider.find('.slider_slide').last().hasClass('active_slide')){
			$(sliderNav).find('> *').first().addClass('active');
			firstSlide.addClass('active_slide');
		} 
	}
}