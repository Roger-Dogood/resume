var $        = require("jquery"),
    Mustache = require('mustache');

// Get Header Object from JSON
$(function() {
  $.getJSON('../js/data.json', function(data) {
    var template = $('#headertpl').html();
    var html = Mustache.to_html(template, data);
    $('#header').html(html);
  });
});

// Get Resume Object from JSON
$(function() {
  $.getJSON('../js/data.json', function(data) {
    var template = $('#resumetpl').html();
    var html = Mustache.to_html(template, data);
    $('#resume').html(html);
  });
});
