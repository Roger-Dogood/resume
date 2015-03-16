var $ = require("jquery");

$(function() {
    var   Mustache = require('mustache');

  $.getJSON('../js/data.json', function(data) {
    var template = $('#resumetpl').html();
    var html = Mustache.to_html(template, data);
    $('#resume').html(html);
  }); //getJSON

}); //function

$(function() {
    var   Mustache = require('mustache');

  $.getJSON('../js/data.json', function(data) {
    var template = $('#headertpl').html();
    var html = Mustache.to_html(template, data);
    $('#header').html(html);
  }); //getJSON

}); //function
