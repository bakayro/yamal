function initialize() {

	var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"off"},{"color":"#8d9cff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#8d9cff"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"on"}]}];

	var styledMap = new google.maps.StyledMapType(styles,	{name: "Styled Map"});

	var mapOptions = {
		zoom: 18,
		center: new google.maps.LatLng(63.206422, 75.435384),
		disableDefaultUI: true,
		mapTypeControlOptions: {
		mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		}
	};
	var markerImage = new google.maps.MarkerImage(
		'../images/baloon.png',
		new google.maps.Size(34,56),
		new google.maps.Point(17,28),
		new google.maps.Point(17,56)
	);
	var map = new google.maps.Map(document.getElementById('map'),
		mapOptions);

	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

	var iconBase = '../images/';
		var marker = new google.maps.Marker({
		position: new google.maps.LatLng(63.206500, 75.435430),
		map: map,
		icon: iconBase + 'baloon.png'
	});
}

$(document).ready(function() {

	if ($('#map').length > 0)
		google.maps.event.addDomListener(window, 'load', initialize);

	windowWidth = function(){
	 var w = 0;
	 if (window.innerWidth > window.outerWidth){
		w = window.outerWidth;
	 } else {
		w = window.innerWidth;
	 }
	 return w;
	};

	if ($.fn.magnificPopup) {
		$('.gallery-item').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300,
				easing: 'ease-in-out'
			}
		});
	}

	/* открытие модального окна */
	$('.main-menu .btn').click( function(event){
			event.preventDefault();
		$('.overlay').fadeIn(400,
			function(){
				$('.modal_form')
					.css('display', 'block')
					.animate({opacity: 1, top: '25%'}, 200);
		});
			$("body").css('overflow', 'hidden')
			$(".overlay").css('overflow', 'auto')
	});

	/* закрытие модального окна */
	$('.modal_close').click( function(){
		$('.modal_form')
			.animate({opacity: 0, top: '20%'}, 200,
				function(){
					$(this).css('display', 'none');
					$('.overlay').fadeOut(400);
				}
			);
			$("body").css('overflow', 'auto');
	});


	/* появление POPUP элемента при наведении */
	$(".table").hover(function (e) {
		$(".popup", this).stop(true,true).fadeIn(300);
	}, function (e) {
		$(".popup", this).stop(true,true).fadeOut(300);
	});

	/* menu */
	$('.btn-menu').on('click', function(e)  {
		if (windowWidth() < 1024){
			$(".main-menu .main-nav").stop(true,true).slideToggle("300");
		}
		e.preventDefault();
	});

	$('.submenu').on('click', function(e)  {
		if (windowWidth() < 1024){
			$(this).siblings(".dropdown-menu").stop(true,true).slideToggle("300");
		}
		e.preventDefault();
	});
	$('.drop').hover(function(e)  {
		if (windowWidth() > 1024){
			var elem = $(".dropdown-menu", this);
			elem.stop(true,true).slideDown(300);
			elem.addClass('showed');
		}
	}, function(){
		if (windowWidth() > 1024){
			$(".dropdown-menu", this).removeClass('showed');
			$(".dropdown-menu", this).stop(true,true).slideUp(200);
		}
	});

	/*--- Табы на странице Партнеры ---*/
	$('.tabs li').on('click', function(e)  {
		$(this).siblings().removeClass("active");
		$(this).addClass("active");

		tab  = $('a', this).attr('href');
		$(tab).siblings().hide(400);
		$(tab).show(400);

		e.preventDefault();
	});

	(setColls = function(){
		$('.table .i-right').each(function(i, cell){
			windowWidth() <= 1024 ? $(cell).prependTo($(cell).parent()) : $(cell).appendTo($(cell).parent());
		});
		$('.table .right-row .with-popup').each(function(i, cell){
			windowWidth() <= 1024 ? $(cell).appendTo($(cell).parent()) : $(cell).prependTo($(cell).parent());
		});
	})();

	$(window).resize(function(){
		if (windowWidth() < 1024) {
			$(".dropdown-menu").stop(true,true).hide(300);
		}
		setColls();
	});

	$('.overlay').on('click', function(e){
		if ($(e.target).closest('.modal_form').length === 0){
			$('.modal_form')
				.animate({opacity: 0, top: '20%'}, 200,
					function(){
						$(this).css('display', 'none');
						$('.overlay').fadeOut(400);
					}
				);
				$("body").css('overflow', 'auto');
		}
	});

});
