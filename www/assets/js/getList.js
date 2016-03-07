module.exports = function getList(){
        var scrolls = require('./scroll.js');
        var list_field = require('./list_field.js');
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

