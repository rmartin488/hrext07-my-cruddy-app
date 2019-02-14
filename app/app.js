$(document).ready(function(){
  var familiarOptions = ['None', 'Slightly', 'Somewhat', 'Moderately', 'Extremely'];
  var languageOptions = ['Chai', 'CSS', 'GitHub', 'HTML', 'JavaScript', 'jQuery', 'Mocha', 'Terminal', 'Underbar'];

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
      var keyData = event.currentTarget.id;
      var local = JSON.parse(localStorage.getItem(keyData));
      $('.input-key').val(keyData);
      $('.input-description').val(local['description']);
      $('.input-snippet').val(local['snippet']);
      $('.input-resources').val(local['resources']);
      $('.input-url').val(local['url']);
      for (var i = 0; i < familiarOptions.length; i++) {
        if (local['familiarity'] === familiarOptions[i]) {
          $('#' + familiarOptions[i]).prop("checked", true);
        }
      }
      _.each(local['language'], function(lang) {
        for (var i = 0; i < languageOptions.length; i++) {
          if (lang === languageOptions[i]) {
            $('#' + languageOptions[i]).prop("checked", true);
          }
        }
      });
    });
  };

  var displayAll = function() {
    var keys = Object.keys(localStorage);
    keys.sort();
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var valueData = JSON.parse(localStorage.getItem(key))['description'];
      var display = key + ' - ' + valueData;
      var item = $('<div class="container-item container" id="' + key + '">' + display + '</div>').appendTo('.container-data');
    }
    clicked();
  }

  var deleteItem = function(keyData) {
    $('#'+ keyData).remove();
  }

  displayAll();

  $('.btn-delete').on('click', function(event){
    var keyData = $('.input-key').val();
    deleteItem(keyData);
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
      deleteItem(keyData);
      var display = keyData + ' - ' + valueData['description'];
      $('<div class="container-item container" id="' + keyData + '">' + display + '</div>').appendTo('.container-data');
      clearForm();
      clicked();     
    }
  });

  $('.followURL').on('click', function(event){
    var url = $('.input-url').val();
    window.location.href=url;
  });
});