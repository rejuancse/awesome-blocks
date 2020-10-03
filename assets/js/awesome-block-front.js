
jQuery(document).ready(function($){'use strict';

	$('.cloud-zoom').magnificPopup({
		type: 'image',
		mainClass: 'product-img-zoomin',
		gallery: { enabled: true },
		zoom: {
			enabled: true, // By default it's false, so don't forget to enable it
			duration: 400, // duration of the effect, in milliseconds
			easing: 'ease-in-out', // CSS transition easing function
			opener: function(openerElement) {
				return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
		}
	});

});


document.addEventListener('DOMContentLoaded', () => {
	let timer = [];
	Array.prototype.slice
	.call(document.getElementsByClassName('awesome-blocks-wrapper'))
	.forEach( (instance, i) => {
		timer[i] = setInterval(function() {
			const timeLeft = parseInt(instance.getAttribute('data-enddate')) - Math.floor(Date.now() / 1000);
			const seconds   = timeLeft % 60;
			const minutes   = ((timeLeft - seconds) % 3600) / 60;
			const hours     = ((timeLeft - minutes * 60 - seconds) % 86400) / 3600;
			const days 		= parseInt((timeLeft - hours / 3600 / minutes * 60 - seconds) / 86400 );

			console.log('Days', days);
            
            instance.querySelector( '.days' ).innerHTML = days;
            instance.querySelector( '.hours' ).innerHTML = hours;
            instance.querySelector( '.minutes' ).innerHTML = minutes;
            instance.querySelector( '.second' ).innerHTML = seconds;
            
		}, 1000);
    });
    
});
