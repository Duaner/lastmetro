var createList = require('./createListAlarm.js');
var timer = require('./notifTimer.js');

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
