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
