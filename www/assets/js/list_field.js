
    ////////////////////////////////////////
    //  GESTION DU CHAMPS DES STATIONS    //
    ////////////////////////////////////////
    /*
    $('#stations_header input').change( function () {
        var filter = $(this).val();
        console.log(filter);
        if (filter) {
          $('#list_stations ul').find(".station:not(:contains(" + filter + "))").hide();
          $('#list_stations ul').find(".station:contains(" + filter + ")").show();
        } else {
          $('#list_stations ul').find(".station").show();
        }
        myScroll3.refresh();
    })
    .keyup( function () {
        // fire the above change event after every letter
        $(this).change();
    })
    //Fermeture fonction document ready


    //Gestion JS Input focus
    $('#search_station').val($('#search_station').attr('holder'));
    $('#search_station').focus(function()
      {
        if($(this).attr('holder')==$(this).val())
        {
          $(this).val('');
        }
    });
    $('#search_station').focusout(function()
      {
         if($.trim($(this).val())=='')
         {
           var holder = $(this).attr('holder');
           $(this).val(holder);
         }
      });

    $(document).keypress(function(e) {
     if(e.which == 13) {
        $('#search_station').blur();
        return(false);
     }  
    });
    */

jQuery.expr[':'].contains = function(a, i, m) {
    var rExps=[
        {re: /[\xC0-\xC6]/g, ch: "A"},
        {re: /[\xE0-\xE6]/g, ch: "a"},
        {re: /[\xC8-\xCB]/g, ch: "E"},
        {re: /[\xE8-\xEB]/g, ch: "e"},
        {re: /[\xCC-\xCF]/g, ch: "I"},
        {re: /[\xEC-\xEF]/g, ch: "i"},
        {re: /[\xD2-\xD6]/g, ch: "O"},
        {re: /[\xF2-\xF6]/g, ch: "o"},
        {re: /[\xD9-\xDC]/g, ch: "U"},
        {re: /[\xF9-\xFC]/g, ch: "u"},
        {re: /[\xC7-\xE7]/g, ch: "c"},
        {re: /[\xD1]/g, ch: "N"},
        {re: /[\xF1]/g, ch: "n"}
    ];
 
    var element = $(a).text();
    var search  = m[3];
 
    $.each(rExps, function() {
         element = element.replace(this.re, this.ch);
         search = search.replace(this.re, this.ch);
    });
 
    return element.toUpperCase().indexOf(search.toUpperCase()) >= 0;
};

var form = $('<form>').attr({'action': '#'});
var input = $('<input>').attr({'id': 'search_station', 'type': 'text'});

$(form).append(input).appendTo($('#stations_header'));

$(input)
  .change(function() {
    var filter = $(this).val();

    if (filter) {
      $('#list_stations ul').find(".station:not(:contains(" + filter + "))").hide();
      $('#list_stations ul').find(".station:contains(" + filter + ")").show();
    } else {
      $('#list_stations ul').find(".station").show();
    }
    myScroll3.refresh();
    return false;
  })
.keyup(function() {
  $(this).change();
});

$(document).keypress(function(e) {
     if(e.which == 13) {
        $('#search_station').blur();
        return(false);
      }
});  
