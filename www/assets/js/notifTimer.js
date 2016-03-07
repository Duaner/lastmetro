
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