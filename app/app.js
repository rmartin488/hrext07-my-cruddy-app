$(document).ready(function(){

  var clearForm = function() {
    // clear form
    $('.input-key').val('');
    document.getElementById("notAtAll").checked = false;
    document.getElementById("slightly").checked = false;
    document.getElementById("somewhat").checked = false;
    document.getElementById("moderately").checked = false;
    document.getElementById("extremely").checked = false;
    $('.input-description').val('');
    $('input[type=checkbox][name=language]:checked').val('');
    document.getElementById("chai").checked = false;
    document.getElementById("css").checked = false;
    document.getElementById("github").checked = false;
    document.getElementById("html").checked = false;
    document.getElementById("javascript").checked = false;
    document.getElementById("jquery").checked = false;
    document.getElementById("mocha").checked = false;
    document.getElementById("terminal").checked = false;
    document.getElementById("underbar").checked = false;
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
      if (local['familiarity'] === 'notAtAll') {
        $('#notAtAll').prop("checked", true);
      } else if (local['familiarity'] === 'slightly') {
        $('#slightly').prop("checked", true);
      } else if (local['familiarity'] === 'somewhat') {
        $('#somewhat').prop("checked", true);
      } else if (local['familiarity'] === 'moderately') {
        $('#moderately').prop("checked", true);
      } else if (local['familiarity'] === 'extremely') {
        $('#extremely').prop("checked", true);
      }
      _.each(local['language'], function(lang) {
        console.log(lang);
        if (lang === 'Chai') {
          $('#chai').prop("checked", true);
        } else if (lang === 'CSS') {
          $('#css').prop("checked", true);
        } else if (lang === 'GitHub') {
          $('#github').prop("checked", true);
        } else if (lang === 'HTML') {
          $('#html').prop("checked", true);
        } else if (lang === 'JavaScript') {
          $('#javascript').prop("checked", true);
        } else if (lang === 'jQuery') {
          $('#jquery').prop("checked", true);
        } else if (lang === 'Mocha') {
          $('#mocha').prop("checked", true);
        } else if (lang === 'Terminal') {
          $('#terminal').prop("checked", true);
        } else if (lang === 'Underbar') {
          $('#underbar').prop("checked", true);
        };
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
      var item = $('<div class="container-item container" id="' + keyData + '">' + display + '</div>').appendTo('.container-data');
      clearForm();
      clicked();     
    }
  });

  $('.followURL').on('click', function(event){
    var url = $('.input-url').val();
    window.location.href=url;
  });
});