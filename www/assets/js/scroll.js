/////////////////////////////////////
//Function récupération de la liste//
/////////////////////////////////////    
var getListStation = require('./getList')

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