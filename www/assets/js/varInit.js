

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





