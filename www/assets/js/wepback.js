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

	function main(){

	    console.log(scrolls.myScroll);
	    
	    ////////////////////////////////////
	    //           Require JS           //
	    ////////////////////////////////////
	    __webpack_require__(4);
	    __webpack_require__(2);

	    $(document).on("click",".station",function(e){
	        //Appel de la fonction de récup des itinéraires
	        console.log($(this).attr("class"));
	        console.log('---------------------');
	        console.log('Click');
	        console.log('---------------------');
	        if($(this).hasClass('dragging')){
	            e.preventDefault;
	            console.log('toto');
	        }
	        else{
	            stationArrivee = $(this).html() + " (METRO), "+$(this).data("ville");
	            saveDestination(stationArrivee);
	            //Faire réapparaitre les éléments.
	            myScroll2.enable();
	            getLocation().done(getMetro.bind(null, stationArrivee));
	        }
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
	        getLocation();
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
	})


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
	var getListStation = __webpack_require__(5)

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
	    $('.station').addClass("dragging");
	});
	myScroll3.on('scrollEnd',function(){
	    setTimeout(function(){$('.station').removeClass("dragging")},500);
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

	    alert('Latitude: '          + position.coords.latitude          + '\n' +
	      'Longitude: '         + position.coords.longitude         + '\n' +
	      'Altitude: '          + position.coords.altitude          + '\n' +
	      'Accuracy: '          + position.coords.accuracy          + '\n' +
	      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	      'Heading: '           + position.coords.heading           + '\n' +
	      'Speed: '             + position.coords.speed             + '\n' +
	      'Timestamp: '         + position.timestamp                + '\n');

	      var currentLocation = {
	        latitude : position.coords.latitude,
	        longitude : position.coords.longitude
	      }
	      var latitude = position.coords.latitude;
	      var longitude = position.coords.longitude;

	      //console.log(currentLocation);
	      return getAdresse(latitude,longitude);
	      //return(currentLocation);
	  };

	  // onError Callback receives a PositionError object
	  function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	    'message: ' + error.message + '\n');
	    console.log(error);
	  }

	  navigator.geolocation.getCurrentPosition(onSuccess, onError);

	}

	//function de recupération des infos ratp
	function getAdresse(latitude,longitude){
	    console.log('http://maps.googleapis.com/maps/api/geocode/json?latlng='+ latitude +','+ longitude +'&sensor=true&language=fr');
	    return $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng='+ latitude +','+ longitude +'&sensor=true&language=fr')
	    .done(function(e){
	        console.log('toto');
	        var adresseDepart = data.results[0].address_components[0].long_name+' '+data.results[0].address_components[1].long_name+', '+ data.results[0].address_components[6].long_name+' '+data.results[0].address_components[3].long_name;
	        return adresseDepart;
	        $('.pin').addClass('mask-pin').delay(500).queue(function(next){
	            console.log('adresse start + '+adresseDepart);
	        });
	    })
	    .fail(function(e){
	        console.log("error");
	        alert(e);
	        console.log(e);
	        alert("erreur contact gmaps");
	        getAdresse(latitude,longitude);
	    })
	    console.log(lol);
	    return lol;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	    alert("ta soeur")

	    ///////////////////////
	    //Var géolocalisation//
	    ///////////////////////
	    var latitude,
	    longitude,
	    adresseDepart,
	    stationArrivee;


	    //Storage de la dernière station choisie
	    var storage = window.localStorage;


	    var counterError = 0;

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function getList(){
	        var scrolls = __webpack_require__(2);
	        var myScroll = scrolls.myScroll;
	        var myScroll2 = scrolls.myScroll2;
	        var myScroll3 = scrolls.myScroll3;
	        booleanStations = 0;

	        /////////////////////////
	        //  GESTION DES STYLES //
	        /////////////////////////
	        alert('toto');

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



/***/ }
/******/ ])