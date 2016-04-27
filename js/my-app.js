Template7.registerHelper('json_stringify', function (context) {
    return JSON.stringify(context);
});

console.log('my-app.js here!');

var myApp = new Framework7({ // объект интерфейса
    animateNavBackIcon: true,
    precompileTemplates: true,
    template7Pages: true,  
});

var myMap = null;

var x = 51.6716, y = 39.2105; // координаты центра Воронежа

var firstCenter, actualCenter = null;

var getLocation, showPosition, checkChecked, reCheck, 
		myGetBounds, strFirstArray, strSecondArray, data, myxhr;

var myPlacemark;  // метка на карте

var $$=Dom7;
var alreadyWatch = false;
var myPage = null;
var mainView = myApp.addView('.view-main',{'dynamicNavbar':'true'});
//loadMap();
function loadMap(){	
	if (!myMap) {
		ymaps.ready(function() { // когда API карт загрузилось
			console.log('x= ', x);	
			console.log('y= ', x);
			myMap = new ymaps.Map("map", {
			    center: [x,y], zoom: 15}, {
				searchControlProvider: "yandex#search"
		    });	
			firstCenter = myMap.getCenter(); // получаем центр карты
			console.log('myPlacemark = ', myPlacemark);
	    });
		if (!alreadyWatch) { // здесь спросим разрешение считать локацию, если раньше не спрашивали
			watchLocation();
		};	
	}	else
	{};
};
myApp.onPageInit('map', function(page) { // создание объекта карты. Этот метод можно закоментить и
	//раскоментить метод loadMap(). Но в этом случае объект будет создан не полностью.
	console.log('map page init!');
    loadMap();
});
$$(document).on('pageInit', function (e) {
	  // Page Data contains all required information about loaded and initialized page 
  myPage = e.detail.page;
});
/**
 *  Следим за изменением локации
 */
watchLocation = function() {
	console.log('watchLocation  here');
    if (navigator.geolocation) {
        alreadyWatch = true;
		return navigator.geolocation.watchPosition(showPosition);		
    } else {
        return alert('Геолокация не поддерживается этим браузером или устройством.');
    }
};

/**
 * Отображаем текущую позицию и обрабатываем событие смены локации
 * 
 * @param {type} position
 * @returns {undefined}
 */
showPosition = function(position) {
	
	console.log('here showPosition!');
    x = position.coords.latitude;
    y = position.coords.longitude;
	myMap.panTo([x,y]);
	setCentralPlacemark(x, y);
};

/**
 * Смещаем метку положения пользователя
 * 
 * @param {type} x
 * @param {type} y
 * @returns {undefined}
 */
function setCentralPlacemark(x, y) {
	if (myPlacemark) {
		myPlacemark.geometry.setCoordinates([x,y]);
		console.log('меняем положение метки');
	}
	else {
	myPlacemark = new ymaps.Placemark([x,y], { // метка на карте где мы есть
            hintContent: 'Это Вы!',
            // balloonContent: 'Ваше текущее местоположение'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/smile.gif',
            // Размеры метки.
            iconImageSize: [30, 30],
        });
		console.log('cоздаём метку');	
        myMap.geoObjects.add(myPlacemark);
       }; 
};
