var $        = require("jquery"),
    Mustache = require('mustache');

$(function() {
  $.getJSON('../js/data.json', function(data) {
    var template = $('#resumetpl').html();
    var html = Mustache.to_html(template, data);
    $('#resume').html(html);
  }); //getJSON

}); //function

$(function() {
  $.getJSON('../js/data.json', function(data) {
    var template = $('#headertpl').html();
    var html = Mustache.to_html(template, data);
    $('#header').html(html);
  }); //getJSON

}); //function
