var timer = require('./notifTimer.js');
var initTimer = timer.initTimer;

var scrolls = require('./scroll.js');
var myScroll = scrolls.myScroll;


module.exports = function createListAlarm(parcours){
        $('.info_alarm').remove();
        $('#indicator li').remove();
        $('#alarm_view').removeClass();
        $.each(parcours,function(i2, step){

            //Mapper les éléments avec le html
            //SI un seul élément ne pas avoir de trait
            if (i2==0&&i2==parcours.length-1){
                $('#alarm_view').addClass('l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1));
                var list_elementAlarm = '<div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+' '+i2+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1>00<span>:</span>00<span>:</span>00</h1><div class="ligne_container first"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.depart +'</h2><h3>'+ step.direction +'</h3></div><div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1></h1><div class="ligne_container last"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.destination +'</h2><h3>Chez toi</h3></div>';
                    var indicator_Element = '<li class=""></li><li class="last"></li>';
            }
            //Premier élément = class first
            else if(i2==0){
                $('#alarm_view').addClass('l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1));
                var list_elementAlarm = '<div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+' '+i2+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1>00<span>:</span>00<span>:</span>00</h1><div class="ligne_container first"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.depart +'</h2><h3>'+ step.direction +'</h3></div>';

                var indicator_Element = '<li class=""></li>'; 

            }
            //Dernier element = class last et ajout du finish
            else if(i2==parcours.length-1){
                var list_elementAlarm = '<div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+' '+i2+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1>00<span>:</span>00<span>:</span>00</h1><div class="ligne_container middle"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.depart +'</h2><h3>'+ step.direction +'</h3></div><div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1></h1><div class="ligne_container last"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.destination +'</h2><h3>Chez toi</h3></div>';
                    var indicator_Element = '<li class=""></li><li class="last"></li>'; 
            }
            else{
                var list_elementAlarm = '<div class="info_alarm l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+' '+i2+'" alt="l'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'"><h1>00<span>:</span>00<span>:</span>00</h1><div class="ligne_container middle"><span class="num_ligne">'+step.ligne.substring(step.ligne.lastIndexOf(" ")+1)+'</span></div><h2>'+ step.depart +'</h2><h3>'+ step.direction +'</h3></div>';
                    var indicator_Element = '<li></li>'; 
            }
            $('#container_alarm').append(list_elementAlarm);
            $('#indicator').append(indicator_Element);

            //Création du timer pour chacun des éléments en cours d'ajout html 
            $('#alarm_incoming').removeClass('in').addClass('out');
            initTimer(i2, step.heuredepart, step.minutedepart, step.depart, step.direction);
        });

        //console.log('width:'+parcours.length* 100 +'%');
        $('#container_alarm').css('width', (parcours.length+1)* 100 +'%');
        console.log('Dimension alarm :'+ 100/(parcours.length+1)+'%');
        $('.info_alarm').css('width', 100/(parcours.length+1)+'%');
        console.log('Dimension vue :'+(parcours.length+1)* 100 +'%')
        $('#alarm_scroller').removeClass('loading');
        $('#indicator').css('width',11.75*$('#indicator li').size());
        $('#indicator li').css('margin-right','5px');
        $('#indicator li.last').css('margin-right','0px');
        $('#info_load').removeClass('in');
        myScroll.refresh();
        myScroll.scrollTo(0,0);
        myScroll.enable();
    }