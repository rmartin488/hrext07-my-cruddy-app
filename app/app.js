$(document).ready(function(){
  var familiarOptions = ['None', 'Slightly', 'Somewhat', 'Moderately', 'Extremely'];
  var languageOptions = ['Chai', 'CSS', 'GitHub', 'HTML', 'JavaScript', 'jQuery', 'Mocha', 'Terminal', 'Underscore'];

  var familiarity = function() {
    for (var i = 0; i < familiarOptions.length; i++) {
      $('<input type="radio" class="input-familiarity" name="familiarity" id="' + familiarOptions[i] + '" value="' + familiarOptions[i] + '">\n<label for="' + familiarOptions[i] +'">'+ familiarOptions[i] +'</label><br>').appendTo('.container-familiarity');
    }
  }();

  var languages = function() {
    for (var i = 0; i < languageOptions.length; i++) {
      $('<div>\n<input type="checkbox" id="'+languageOptions[i]+'" name="language" value="'+languageOptions[i]+'">\n<label for="'+languageOptions[i]+'">'+languageOptions[i]+'</label>\n</div>').appendTo('.container-language');
    }
  }();

  var clearForm = function() {
    // clear form
    $('.input-key').val('');
    for (var i = 0; i < familiarOptions.length; i++) {
      document.getElementById(familiarOptions[i]).checked = false;
    }
    $('.input-description').val('');
    $('input[type=checkbox][name=language]:checked').val('');
    for (var i = 0; i < languageOptions.length; i++) {
      document.getElementById(languageOptions[i]).checked = false;
    }
    $('.input-snippet').val('');
    $('.input-resources').val('');
    $('.input-url').val('');
  };

  var clicked = function() {
    $('.container-item').on('click', function(event){
      window.scrollTo(0, 0);
      var keyData = event.currentTarget.id;
      var localStrg = JSON.parse(localStorage.getItem(keyData));
      $('.input-key').val(keyData);
      $('.input-description').val(localStrg['description']);
      $('.input-snippet').val(localStrg['snippet']);
      $('.input-resources').val(localStrg['resources']);
      $('.input-url').val(localStrg['url']);
      for (var i = 0; i < familiarOptions.length; i++) {
        if (localStrg['familiarity'] === familiarOptions[i]) {
          $('#' + familiarOptions[i]).prop("checked", true);
        }
      }
      _.each(localStrg['language'], function(lang) {
        for (var i = 0; i < languageOptions.length; i++) {
          if (lang === languageOptions[i]) {
            $('#' + languageOptions[i]).prop("checked", true);
          }
        }
      });
    });
  };

  var displayAll = function() {
    $('.container-data').html('')
    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var valueData = JSON.parse(localStorage.getItem(key))['description'];
      $('<div class="container-item container" id="' + key + '"><strong>' + key + '</strong> - ' + valueData + '</div>').appendTo('.container-data');
    }
    clicked();
  };


  displayAll();

  $('.btn-delete').on('click', function(event){
    var keyData = $('.input-key').val();
    console.log(keyData);
    $('#'+ keyData).remove();
    localStorage.removeItem(keyData);
    clearForm();
  });

  $('.btn-add').on('click', function(event){
    var keyData = $('.input-key').val();
    if (keyData !== '') {
      var valueData = {};
      valueData['language'] = [];
      valueData['familiarity'] = $('input[name=familiarity]:checked').val();
      valueData['description'] = $('.input-description').val();
      valueData['language'] = $('input[type=checkbox][name=language]:checked').map(function(){
        return $(this).val();
      }).get();
      valueData['snippet'] =  $('.input-snippet').val();
      valueData['resources'] =  $('.input-resources').val();
      valueData['url'] =  $('.input-url').val();

      // write to db
      localStorage.setItem(keyData, JSON.stringify(valueData));
      // add to container-data
      displayAll();
      clearForm();
      clicked();     
    }
  });

  $('.followURL').on('click', function(event){
    var url = $('.input-url').val();
    window.location.href=url;
  });
});