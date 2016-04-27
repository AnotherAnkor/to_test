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

var getLocation, showPosition, checkChecked, reCheck, getNextPlace, 
		myGetBounds, strFirstArray, strSecondArray, data, myxhr;

var myPlacemark;  // метка на карте

var $$=Dom7;
var alreadyWatch = false;
var myPage = null;
var mainView = myApp.addView('.view-main',{'dynamicNavbar':'true'});

myApp.onPageInit('map', function(page) { // создание объекта карты. Этот метод можно закоментить и
	//раскоментить метод loadMap(). Но в этом случае объект будет создан не полностью.
	console.log('map page init!');
    loadMap();
});
$$(document).on('pageInit', function (e) {
	  // Page Data contains all required information about loaded and initialized page 
  myPage = e.detail.page;
});

//loadMap();
function loadMap()
{	
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
