var saveDestination = require('./local_storage');

var scrolls = require('./scroll.js');

var myScroll = scrolls.myScroll;
var myScroll2 = scrolls.myScroll2;
var myScroll3 = scrolls.myScroll3;

var getLocation = require('./getLocation.js');
var getMetro = require('./getMetro.js');


function main(){

    console.log(scrolls.myScroll);
    
    ////////////////////////////////////
    //           Require JS           //
    ////////////////////////////////////
    require('./varInit.js');
    require('./scroll.js');

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
