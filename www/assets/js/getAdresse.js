//function de recupération des infos ratp
function getAdresse(latitude,longitude){
    console.log('http://maps.googleapis.com/maps/api/geocode/json?latlng='+ latitude +','+ longitude +'&sensor=true&language=fr');
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng='+ latitude +','+ longitude +'&sensor=true&language=fr', function(data){
        console.log('toto');
        adresseDepart = data.results[0].address_components[0].long_name+' '+data.results[0].address_components[1].long_name+', '+ data.results[0].address_components[6].long_name+' '+data.results[0].address_components[3].long_name;
                getMetro(); 
    })
    .done(function(e){
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
}
