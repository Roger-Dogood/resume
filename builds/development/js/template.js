var $        = require("jquery"),
    Mustache = require('mustache');

// Get Header Object from data.json
$(function () {
    'use strict';
    $.getJSON('../js/data.json', function (data) {
        var template = $('#headertpl').html(),
            html = Mustache.to_html(template, data);
        $('#header').html(html);
    });
});

// Get Resume Object from data.json
$(function () {
    'use strict';
    $.getJSON('../js/data.json', function (data) {
        var template = $('#resumetpl').html(),
            html = Mustache.to_html(template, data);
        $('#resume').html(html);
    });
});
