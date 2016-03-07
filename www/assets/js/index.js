/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var saveDestination = __webpack_require__(1);

	var scrolls = __webpack_require__(2);

	var myScroll = scrolls.myScroll;
	var myScroll2 = scrolls.myScroll2;
	var myScroll3 = scrolls.myScroll3;

	var getLocation = __webpack_require__(3);
	var getMetro = __webpack_require__(4);


	function main(){

	    console.log(scrolls.myScroll);
	    
	    ////////////////////////////////////
	    //           Require JS           //
	    ////////////////////////////////////
	    __webpack_require__(5);
	    __webpack_require__(2);

	    $(document).on("click",".notdragging .station",function(e){
	        //Appel de la fonction de récup des itinéraires
	        console.log($(this).attr("class"));
	        console.log('---------------------');
	        console.log('Click');
	        console.log('---------------------');
	        $('#search_station').blur();
	        stationArrivee = $(this).html() + " (METRO), "+$(this).data("ville");
	        saveDestination(stationArrivee);
	        //Faire réapparaitre les éléments.
	        myScroll2.enable();
	        getLocation().then(
	                getMetro.bind(null, stationArrivee),
	                function(e){
	                    alert('nique ta race', e);
	                }
	            ).done();
	           
	        
	    });   

	    


	    ////////////////////////////////////
	    //   Création alarme Automatique  //
	    ////////////////////////////////////

	    //Detection si déja eu utilisation
	    console.log(window.localStorage.getItem("0"));

	    //Si on a sauvegardé un élément
	    if(window.localStorage.getItem("0")){
	        alert("Création d'une alarme vers votre derniere destination "+window.localStorage.getItem("0"));
	        //Lancer une fonction permettant de recalculer l'itinéraire jusqu'a l'ancienne station
	        stationArrivee = window.localStorage.getItem("0");
	        getLocation().then(
	                getMetro.bind(null, stationArrivee),
	                function(e){
	                   // alert('nique ta race', e);
	                }
	            ).done();
	    }
	    else{
	        $('#alarm_scroller').addClass('tour');
	    }
	}


	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	//document.addEventListener("deviceready", onDeviceReady, false);

	$(function onDeviceReady() {
	    console.log('device ready');
	    main();
	    if(navigator.splashscreen){
	        navigator.splashscreen.hide(); 
	    }
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	

	////////////////////////////////////
	//Création alarme Automatique     //
	////////////////////////////////////

	module.exports = function saveDestination(destination){
	        window.localStorage.removeItem("0");
	        window.localStorage.setItem("0", destination);

	        var valueDestination = window.localStorage.getItem("0");
	        console.log("Destination sauvegardée = "+valueDestination);
	}
	    



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/////////////////////////////////////
	//Function récupération de la liste//
	/////////////////////////////////////    
	var getListStation = __webpack_require__(8)

	var myScroll,
	pullDownEl,
	pullDownOffset,
	pullUpEl,
	pullUpOffset,
	generatedCount = 0,
	classActive,
	colorBg,
	booleanStations = 0;

	///////////////////////
	//      Couleur      //
	///////////////////////
	colorBg = $('.info_alarm:first-child').attr('alt');
	$('#alarm_view').addClass(colorBg);
	pullDownEl = $('#swipe_to_new img');
	pullDownOffset = pullDownEl.offset();


	//////////////////////////////////////////////////////////////
	      // SCROLL1 = Scroll horizontal correspondance//
	//////////////////////////////////////////////////////////////

	myScroll = new IScroll('#alarm_scroller', {
	    scrollX: true,
	    scrollY: false,
	    momentum: false,
	    snap: true,
	    snapSpeed: 400,
	    keyBindings: true,
	    indicators: {
	        el: document.getElementById('indicator'),
	        resize: false
	    }
	});

	//Evenement à l'arret du scroll carroussel
	myScroll.on("scrollEnd", function() {
	    var tourOut = $('.info_alarm.active').attr('data-tour');
	    $(tourOut).addClass('out');
	    //Gestion des puces indicateurs
	    //Detection alarme active
	    $('.info_alarm.active').removeClass('active');
	    $('#container_alarm > .info_alarm:nth-child(' + (this.currentPage.pageX+1) + ')').addClass('active');

	    var tourIn = $('.info_alarm.active').attr('data-tour');
	    $(tourIn).removeClass('out');

	    //Changement couleur fond
	    colorBg = $('.info_alarm.active').attr('alt');
	    $('#alarm_view').removeClass();
	    $('#alarm_view').addClass(colorBg);
	});

	//////////////////////////////////////////////////////////////
	// SCROLL2 = Scroll permettant de créer une nouvelle station//
	//////////////////////////////////////////////////////////////

	myScroll2 = new IScroll('#app', {
	    scrollY:true,
	    useTransition: true,
	    topOffset: pullDownOffset,
	    hScrollbar: false,
	    probeType: 2
	});

	myScroll2.on("scrollEnd",function(){
	    if(pullDownEl.hasClass('flip')){
	        //Si c'est bon récupérer la liste des stations et la position actuelle
	        getListStation();
	    }
	})

	myScroll2.on("scroll",function(){
	    console.log(this.distY);
	    if (this.distY > 140 && !pullDownEl.hasClass('flip')) {
	        pullDownEl.addClass('flip');
	        $('#pullDownLabel').hide();                
	    }
	    else if (this.distY < 140 && pullDownEl.hasClass('flip')) {
	        pullDownEl.removeClass('flip');
	        $('#pullDownLabel').show();
	        this.minScrollY = -pullDownOffset;
	    }
	})

	//////////////////////////////////////////////////////////
	        //SCROLL 3 = Scroll liste des stations//
	//////////////////////////////////////////////////////////

	myScroll3 = new IScroll('#list_stations_wrapper', {
	    scrollY:true,
	    click: true,
	});
	myScroll3.on('scrollStart',function(){
	    $('#list_stations').removeClass("notdragging");
	});
	myScroll3.on('scrollEnd',function(){
	    setTimeout(function(){$('#list_stations').addClass("notdragging")},500);
	})

	module.exports = {
	    'myScroll' : myScroll,
	    'myScroll2' : myScroll2,
	    'myScroll3' : myScroll3
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//////////////////////////////////////
	//Function récupération de l'adresse//
	//////////////////////////////////////

	module.exports = function getLocation(){

	  //Gestion style
	  console.log('entrée geoloc')
	  $('#geoloc_incoming').addClass('in');
	  $('#info_load').addClass('in');
	  $('#list_view').removeClass('visible');
	  $('#alarm_view').removeClass('out');
	  $('#alarm_scroller').addClass('loading');
	  $('#alarm_view').addClass('loading');
	  $('#swipe_to_new img').removeClass('flip');
	  $('#pullDownLabel').show();

	  console.log('Geolocation test');

	  function onSuccess(position) {
	    console.log('success')

	    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
	      'Longitude: '         + position.coords.longitude         + '\n' +
	      'Altitude: '          + position.coords.altitude          + '\n' +
	      'Accuracy: '          + position.coords.accuracy          + '\n' +
	      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	      'Heading: '           + position.coords.heading           + '\n' +
	      'Speed: '             + position.coords.speed             + '\n' +
	      'Timestamp: '         + position.timestamp                + '\n');*/

	      var currentLocation = {
	        latitude : position.coords.latitude,
	        longitude : position.coords.longitude
	      }
	      var latitude = position.coords.latitude;
	      var longitude = position.coords.longitude;

	      //console.log(currentLocation);
	      return currentLocation;
	      //return(currentLocation);
	  };

	  // onError Callback receives a PositionError object
	  function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	    'message: ' + error.message + '\n');
	    console.log(error);
	    return 'lol';
	  }

	  setTimeout(function() {
	    onError({ code: 'geolocalisation_desactivee', message: 'Veuillez activer la géolocalisation' });
	  }, 3000);

	  var defer = $.Deferred();
	  console.log('geoloc');
	  navigator.geolocation.getCurrentPosition(defer.resolve, defer.reject);

	  return defer.promise().then(onSuccess,onError);

	}

	//function de recupération des infos ratp
	/*function getAdresse(latitude,longitude){
	    console.log('http://maps.googleapis.com/maps/api/geocode/json?latlng='+ latitude +','+ longitude +'&sensor=true&language=fr');

	    return $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng='+ latitude +','+ longitude +'&sensor=true&language=fr')
	    .then(function(data){
	        console.log(data);
	        var adresseDepart = data.results[0].address_components[0].long_name+' '+data.results[0].address_components[1].long_name+', '+ data.results[0].address_components[6].long_name+' '+data.results[0].address_components[2].long_name;
	        console.log('adresse start + '+adresseDepart);
	        $('.pin').addClass('mask-pin').delay(500);
	        return adresseDepart;
	    },
	    function(e){
	        console.log("error");
	        alert(e);
	        console.log(e);
	        alert("erreur contact gmaps");
	        getAdresse(latitude,longitude);
	    })
	    //console.log(lol);
	    //return lol;
	}*/


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var createList = __webpack_require__(6);
	var timer = __webpack_require__(7);

	var cleanTimers = timer.cleanTimer;
	var counterError = 0;

	 module.exports = function getMetro(stationArrivee, coordDepart){
	    console.log('dataGetMetro' + coordDepart);
	    console.log(coordDepart);

	    var latitude = coordDepart.latitude;
	    var longitude = coordDepart.longitude;
	        //Gestion des styles
	        $('#wave_1').addClass('change-state');
	        $('#wave_1').addClass('rotate');
	        $('#geoloc_incoming').removeClass('in');
	        $('#geoloc_incoming').addClass('out');
	        $('#data_incoming').addClass('in');

	        //Suppression des timers et notifs
	        cleanTimers();


	        //Controler si il est moins de 4h du mat
	        var now = new Date();
	        var tommorowDateFormat;
	        var tommorowDate = now;


	        //récupérer la date de demain
	        if(now.getHours()>4){
	            //Récupérer la date d'ajd
	            tommorowDate = new Date();
	            tommorowDate.setDate(tommorowDate.getDate()+1);
	        }

	        if(tommorowDate.getDate()<10){
	            var dayDate = '0'+tommorowDate.getDate()
	        }
	        else{
	            var dayDate = tommorowDate.getDate()
	        }

	        if((tommorowDate.getMonth()+1)<10){
	            var MonthDate = "0" + (tommorowDate.getMonth()+1);
	        }
	        else{
	            var MonthDate = (tommorowDate.getMonth()+1)
	        }

	        tommorowDateFormat = tommorowDate.getFullYear() + "-" + MonthDate +"-" + dayDate;

	        console.log("date Demain");
	        console.log(tommorowDateFormat);
	        var parcours = [];
	        parcours.length = 0;



	        console.log(stationArrivee);

	        var urlToQuery = "http://localhost:5000/itinerary?geolocation_latitude="+'48.8593653'+"&geolocation_longitude="+'2.4333959'+"&arrival="+stationArrivee+"&mode=WAP";
	        
	        var scrapJson = $.getJSON(urlToQuery, function(data){
	            console.log(data);
	            console.log("heure");
	            $.each(data.connections,function(i, step){
	                console.log(step.start_time.substring(0, 2));

	                console.log('minutes');
	                console.log(step.start_time.substring(3, 5));
	                console.log(step.transport.line);
	                stepa = {};
	                stepa ["ligne"] = step.transport.line;
	                stepa ["depart"] = step.departure;
	                stepa ["direction"] = step.station_arrivée;
	                stepa ["heuredepart"] = step.start_time.substring(0, 2);
	                stepa ["minutedepart"] = step.start_time.substring(3, 5);
	                stepa ["destination"] = step.station_arrivée;
	                parcours.push(stepa);
	            });
	            console.log("parcours");
	            console.log(parcours);
	            $('#data_incoming').removeClass('in');
	            $('#data_incoming').addClass('out');
	            $('#alarm_incoming').addClass('in');
	            createList(parcours);
	        });

	        /*
	        
	        console.log(adresseDepart);
	        console.log(stationArrivee);

	        //Tentative de scrapper
	        var urlRatp = "http://www.ratp.fr/itineraires/fr/ratp/recherche-avancee?start="+encodeURIComponent(adresseDepart)+"&end="+encodeURIComponent(stationArrivee)+"&is_date_start="+tommorowDateFormat+"&time%5Bhour%5D=3&time%5Bminute%5D=40&mode=ferre_tram&route_type=1&avoid="

	        console.log(urlRatp);

	        var queryYQL = 'select * from html where url="'+urlRatp+'" and xpath="//div[@class=\'inside\']//tr[not(@class=\'even\' or @class=\'even end\')]"';

	        var queryApiUrl = "https://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent(queryYQL)+"&format=json&diagnostics=true";
	       console.log(queryApiUrl);



	        var ScrapJson = $.getJSON( queryApiUrl, function(data) {
	            //console.log(urlRatp);
	            console.log("data : ");
	                if (data.query.results==null) {
	                $('.label_load span.in').addClass('out');
	                $('.label_load span.in').removeClass('in');
	                counterError = counterError +1;
	                $('#data-error-'+counterError).addClass('in');
	                if(counterError==1){
	                    getMetro(stationArrivee, adresseDepart);
	                }
	            }
	            $.each(data.query.results.tr,function(i, step){
	                console.log(i);
	                if (i==null){
	                   // alert("tarace maudite");
	                }
	                else if(i==0){
	                   // console.log("trash");
	                }
	                else if(step.class == "attention"){
	                    //console.log("attention");
	                }
	                else{
	                    console.log("OBJETS A SCRAPPER :");
	                    console.log(step);
	                    console.log("------------------");
	                    console.log("Ligne : "+ step.td[0].img[1].title); 
	                    console.log("Départ : "+step.td[1].strong);
	                    console.log("Direction : "+step.td[1].span[0].strong); 
	                    console.log("Destination : "+step.td[1].span[1].strong);
	                    console.log("Heure décollage : "+step.td[2].span[0].content); 
	                    stepa = {}
	                    stepa ["ligne"] = step.td[0].img[1].title;
	                    stepa ["depart"] = step.td[1].strong;
	                    stepa ["direction"] = step.td[1].span[0].strong;
	                    stepa ["heuredepart"] = step.td[2].span[0].content;
	                    stepa ["destination"] = step.td[1].span[1].strong;
	                    parcours.push(stepa);
	                }
	            })
	            console.log(parcours);
	            $('#data_incoming').removeClass('in');
	            $('#data_incoming').addClass('out');
	            $('#alarm_incoming').addClass('in');
	            createList(parcours);

	        }).fail(function(e){
	            console.log(e);
	            alert('erreur recupération données');
	        })
	        */

	    }


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	

	    ///////////////////////
	    //Var géolocalisation//
	    ///////////////////////
	    var latitude,
	    longitude,
	    adresseDepart,
	    stationArrivee;


	    //Storage de la dernière station choisie
	    var storage = window.localStorage;



	    ///////////////////////
	    //        Date       //
	    ///////////////////////
	    var currentDate = new Date().getTime();
	    var tommorowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	    var day = ("0" + tommorowDate.getDate()).slice(-2);
	    var month = ("0" + (tommorowDate.getMonth() + 1)).slice(-2);
	    var year = tommorowDate.getFullYear();
	    var tommorowDateFormat = year + "-" + month +"-" + day;

	    //Heure pour la timer
	    var timers = [];

	    var parcours = [];



	    ////////////////////////////////////////
	    //Initialisation wrapper list_stations//
	    ////////////////////////////////////////

	    var heightviewport = $('body').height();
	    var heightsearch = $('#stations_header').height();
	    console.log(heightviewport);
	    $('#list_stations_wrapper').height(heightviewport-heightsearch);
	    $('#list_stations_wrapper').hide();


	    





	    //////////////////////////////////////////////////
	    // Récupération de l'itinéraire et dernier métro//
	    //////////////////////////////////////////////////


	    /////////////////////////////////////////////////
	    // SET TIMER POUR LES DIFFERENTS ELEMENTS    //
	    //////////////////////////////////////////////////







/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var timer = __webpack_require__(7);
	var initTimer = timer.initTimer;

	var scrolls = __webpack_require__(2);
	var myScroll = scrolls.myScroll;


	module.exports = function createListAlarm(parcours){
	        $('.info_alarm').remove();
	        $('#indicator li').remove();
	        $('#alarm_view').removeClass();
	        $.each(parcours,function(i2, step){

	            //Mapper les éléments avec le html
	            //SI un seul élément ne pas avoir de trait
	            if (i2==0&&i2==parcours.length-1){
	                $('#alarm_view').addClass('l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1));
	                var list_elementAlarm = '<div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+' '+i2+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1>00<span>:</span>00<span>:</span>00</h1><div class="ligne_container first"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.depart +'</h2><h3>'+ step.direction +'</h3></div><div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1></h1><div class="ligne_container last"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.destination +'</h2><h3>Chez toi</h3></div>';
	                    var indicator_Element = '<li class=""></li><li class="last"></li>';
	            }
	            //Premier élément = class first
	            else if(i2==0){
	                $('#alarm_view').addClass('l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1));
	                var list_elementAlarm = '<div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+' '+i2+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1>00<span>:</span>00<span>:</span>00</h1><div class="ligne_container first"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.depart +'</h2><h3>'+ step.direction +'</h3></div>';

	                var indicator_Element = '<li class=""></li>'; 

	            }
	            //Dernier element = class last et ajout du finish
	            else if(i2==parcours.length-1){
	                var list_elementAlarm = '<div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+' '+i2+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1>00<span>:</span>00<span>:</span>00</h1><div class="ligne_container middle"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.depart +'</h2><h3>'+ step.direction +'</h3></div><div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1></h1><div class="ligne_container last"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.destination +'</h2><h3>Chez toi</h3></div>';
	                    var indicator_Element = '<li class=""></li><li class="last"></li>'; 
	            }
	            else{
	                var list_elementAlarm = '<div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+' '+i2+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1>00<span>:</span>00<span>:</span>00</h1><div class="ligne_container middle"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.depart +'</h2><h3>'+ step.direction +'</h3></div>';
	                    var indicator_Element = '<li></li>'; 
	            }
	            $('#container_alarm').append(list_elementAlarm);
	            $('#indicator').append(indicator_Element);

	            //Création du timer pour chacun des éléments en cours d'ajout html 
	            $('#alarm_incoming').removeClass('in').addClass('out');
	            initTimer(i2, step.heuredepart, step.minutedepart, step.depart, step.direction);
	        });

	        //console.log('width:'+parcours.length* 100 +'%');
	        $('#container_alarm').css('width', (parcours.length+1)* 100 +'%');
	        console.log('Dimension alarm :'+ 100/(parcours.length+1)+'%');
	        $('.info_alarm').css('width', 100/(parcours.length+1)+'%');
	        console.log('Dimension vue :'+(parcours.length+1)* 100 +'%')
	        $('#alarm_scroller').removeClass('loading');
	        $('#indicator').css('width',11.75*$('#indicator li').size());
	        $('#indicator li').css('margin-right','5px');
	        $('#indicator li.last').css('margin-right','0px');
	        $('#info_load').removeClass('in');
	        myScroll.refresh();
	        myScroll.scrollTo(0,0);
	        myScroll.enable();
	    }

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	    /////////////////////////////
	    //  INITIATION DES TIMERS  //
	    /////////////////////////////

	var timers = [];


	 var initTimer = function initTimer(timerSelector, heureDepart, minuteDepart, depart, direction){

	    console.log('initTimer');
	    console.log(heureDepart);
	    console.log(minuteDepart);
	        var currentDate = new Date().getTime();

	        var tommorowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	        var day = ("0" + tommorowDate.getDate()).slice(-2);
	        var month = ("0" + (tommorowDate.getMonth() + 1)).slice(-2);
	        var year = tommorowDate.getFullYear();
	        var tommorowDateFormat = year + "-" + month +"-" + day;

	        var targetDate = new Date(year, month-1, day, heureDepart, minuteDepart);
	        
	        console.log(tommorowDateFormat);
	        console.log((targetDate-currentDate)/1000);
	        console.log("timeselector param = " + timerSelector);
	        console.log('.info_alarm '+timerSelector+ ' h1');

	        timers.push(setInterval(function(){
	            var selectorCountdown = $('.info_alarm.'+timerSelector+ ' h1');
	            secondsCountdown = (targetDate-currentDate)/1000;
	            currentDate = new Date();
	            hoursLeft = parseInt(secondsCountdown / 3600);
	            secondsCountdown = secondsCountdown % 3600;
	            minutesLeft = parseInt(secondsCountdown / 60);
	            secondsLeft = parseInt(secondsCountdown % 60);
	            $(selectorCountdown).html(hoursLeft+'<span>:</span>'+minutesLeft+'<span>:</span>'+secondsLeft);
	        },100));
	        console.log("notifTEST");
	        if(timerSelector==0){
	            console.log("notifTEST2");
	            dateDepartPied = new Date(targetDate - 1200000);
	            console.log("Date de départ du métro = "+targetDate);
	            console.log("Date de départ à pied = "+ dateDepartPied);
	            //setNotification(dateDepartPied, depart, direction);
	        }
	    }

	    ////////////////////////
	    //  CLEAN DES TIMERS  //
	    ////////////////////////

	     var cleanTimer = function cleanTimers(){
	        timers.forEach(function(timer){
	          window.clearInterval(timer);
	        })
	        timers = [];
	    }

	    ////////////////////////////////////////
	    //  Initialisation des notifications  //
	    ////////////////////////////////////////

	    function setNotification(dateNotif,depart,direction){
	        console.log('Je passe dans la fonction de notif');

	        var messageNotif = "Ton métro qui part de"+ depart+" en direction de "+direction+" décolle dans 20 minutes";

	        cordova.plugins.notification.local.schedule({
	            id:1,
	            title:   'LASTMETRO',
	            text : 'Une alarme a été créée, elle sonnera 20 minutes avant le départ de ton métro au départ de '+ depart +'! Rafale de bises!',
	            sound : 'file://sound/notif.mp3'
	        })

	        cordova.plugins.notification.local.schedule({
	            id:      2,
	            title:   'Lève ton cul et rentre chez toi',
	            text: messageNotif,
	            date:    dateNotif,
	            badge:     1,
	            autoCancel: 1
	        })
	    }

	    module.exports = {
	        'initTimer' : initTimer,
	        'cleanTimer' : cleanTimer,
	    }

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function getList(){
	        var scrolls = __webpack_require__(2);
	        var list_field = __webpack_require__(9);
	        var myScroll = scrolls.myScroll;
	        var myScroll2 = scrolls.myScroll2;
	        var myScroll3 = scrolls.myScroll3;
	        booleanStations = 0;

	        /////////////////////////
	        //  GESTION DES STYLES //
	        /////////////////////////
	       // alert('toto');

	        $('#alarm_view').addClass('out');
	        $('.label_load').removeClass('out');
	        $('.label_load span').removeClass();
	        $('#list_view').addClass('visible');
	        $('#tour').hide();
	        $('.label_load.in').removeClass('in');

	        $('.pin').removeClass('mask-pin');
	        $('.circle').removeClass('change-state');
	        $('.circle').removeClass('rotate');

	        /////////////////////////
	        //  GESTION DES SCROLL //
	        /////////////////////////
	       
	        myScroll.disable();
	        myScroll2.disable();

	        /////////////////////////
	        //    RECUP STATIONS   //
	        /////////////////////////        

	        counterError = 0;
	        if(booleanStations == 0){
	            var jqxhr = $.getJSON( "stations.json", function(data) {
	              $.each(data.stations,function(i, station){
	                $('#list_stations ul').append("<li class='station' data-ville='"+station.ville+"'>"+station.nom_stations+"</li>")
	              })
	              $('#list_stations_wrapper').show();
	              myScroll3.refresh();

	              //A voir la solution création d'un scroll avant le chargement de la liste / Puis chargement de la liste PUis refresh
	                booleanStations =1;
	            })
	          .done(function() {
	            console.log( "second success" );
	          })
	          .fail(function(e) {
	            console.log(e);
	          })
	          .always(function() {
	            console.log( "complete" );
	          });
	        }
	        else{
	            console.log('déja chargé');
	        }
	        window.plugin.notification.local.cancelAll(function () {
	            // All notifications have been canceled
	        });
	    }



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	    ////////////////////////////////////////
	    //  GESTION DU CHAMPS DES STATIONS    //
	    ////////////////////////////////////////
	    /*
	    $('#stations_header input').change( function () {
	        var filter = $(this).val();
	        console.log(filter);
	        if (filter) {
	          $('#list_stations ul').find(".station:not(:contains(" + filter + "))").hide();
	          $('#list_stations ul').find(".station:contains(" + filter + ")").show();
	        } else {
	          $('#list_stations ul').find(".station").show();
	        }
	        myScroll3.refresh();
	    })
	    .keyup( function () {
	        // fire the above change event after every letter
	        $(this).change();
	    })
	    //Fermeture fonction document ready


	    //Gestion JS Input focus
	    $('#search_station').val($('#search_station').attr('holder'));
	    $('#search_station').focus(function()
	      {
	        if($(this).attr('holder')==$(this).val())
	        {
	          $(this).val('');
	        }
	    });
	    $('#search_station').focusout(function()
	      {
	         if($.trim($(this).val())=='')
	         {
	           var holder = $(this).attr('holder');
	           $(this).val(holder);
	         }
	      });

	    $(document).keypress(function(e) {
	     if(e.which == 13) {
	        $('#search_station').blur();
	        return(false);
	     }  
	    });
	    */

	jQuery.expr[':'].contains = function(a, i, m) {
	    var rExps=[
	        {re: /[\xC0-\xC6]/g, ch: "A"},
	        {re: /[\xE0-\xE6]/g, ch: "a"},
	        {re: /[\xC8-\xCB]/g, ch: "E"},
	        {re: /[\xE8-\xEB]/g, ch: "e"},
	        {re: /[\xCC-\xCF]/g, ch: "I"},
	        {re: /[\xEC-\xEF]/g, ch: "i"},
	        {re: /[\xD2-\xD6]/g, ch: "O"},
	        {re: /[\xF2-\xF6]/g, ch: "o"},
	        {re: /[\xD9-\xDC]/g, ch: "U"},
	        {re: /[\xF9-\xFC]/g, ch: "u"},
	        {re: /[\xC7-\xE7]/g, ch: "c"},
	        {re: /[\xD1]/g, ch: "N"},
	        {re: /[\xF1]/g, ch: "n"}
	    ];
	 
	    var element = $(a).text();
	    var search  = m[3];
	 
	    $.each(rExps, function() {
	         element = element.replace(this.re, this.ch);
	         search = search.replace(this.re, this.ch);
	    });
	 
	    return element.toUpperCase().indexOf(search.toUpperCase()) >= 0;
	};

	var form = $('<form>').attr({'action': '#'});
	var input = $('<input>').attr({'id': 'search_station', 'type': 'text'});

	$(form).append(input).appendTo($('#stations_header'));

	$(input)
	  .change(function() {
	    var filter = $(this).val();

	    if (filter) {
	      $('#list_stations ul').find(".station:not(:contains(" + filter + "))").hide();
	      $('#list_stations ul').find(".station:contains(" + filter + ")").show();
	    } else {
	      $('#list_stations ul').find(".station").show();
	    }
	    myScroll3.refresh();
	    return false;
	  })
	.keyup(function() {
	  $(this).change();
	});

	$(document).keypress(function(e) {
	     if(e.which == 13) {
	        $('#search_station').blur();
	        return(false);
	      }
	});  


/***/ }
/******/ ])