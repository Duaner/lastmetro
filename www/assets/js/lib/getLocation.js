    function getLocation(){

        //Gestion style
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

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log(position);
            getAdresse(latitude,longitude);

         };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
            console.log(error);
        }


        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }
