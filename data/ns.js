var request = require('request');
var cheerio = require('cheerio');

var disruptionUrl = "http://www.ns.nl/reisinformatie/actuele-situatie-op-het-spoor";

var travelHeading = '<span class="data_heading"><i class="fa fa-train fa-lg" aria-hidden="true"></i> Treindata</span>';

var functions = {
	getDisrupts: function(callback) {
		request(disruptionUrl, function(error, response, html){
			var data = false;
	        if(!error){
	            var $ = cheerio.load(html);
				var data = [];
				//var singleResult = { title: "Niet gepland iets met tekst", description: "Extra uitleg", planned: false, important: false };
				//data.push(singleResult);
				$('.container--section').children().first().children().each(function(i, elem) {
					var title = $(this).find('h3 a').text().replace(/^\s+|\s+$/g, '');
					var planned = $(this).hasClass('plannedDisruption');
					var important = (/.*(sittard|roermond|weert|eindhoven).*/gi.test(title)); // Add a red color when important words in titles
					if(planned) {
						var description = $(this).find('.overlayContent p').first().text();
						var singleResult = { title: title, description: description, planned: planned };
					}
					else {
						var description = $(this).find('.overlayContent p').text();
						var singleResult = { title: title, description: description, planned: planned, important: important };
					}
					if(!(/.*Alle\swerkzaamheden.*/i.test(title))) { // Ignore the text about all disruptions
						data.push(singleResult);
					}
				});
				var html = '<table>';
				for(var i = 0; i < data.length; i++) {
					html += '<tr '+ ( data[i].important ? 'class="important"' : '') +'><td '+ ( data[i].planned ? 'class="delay_planned"></i>' : '>')
					+ wordWrap(data[i].title, 20) + ( data[i].important ? '<br /><span class="important_meta">'+data[i].description+'</span>' : '' ) +'</td></tr>';
				}
				html += '</table>'
				callback(html);
	        }
	        else {
	        	var response = '';
	        	callback(data);
	        }
	    });
	}
};

function wordWrap(str, maxWidth) {
    var newLineStr = "rrrrr"; done = false; res = '';
    do {                    
        found = false;
        // Inserts new line at first whitespace of the line
        for (i = maxWidth - 1; i >= 0; i--) {
            if (testWhite(str.charAt(i))) {
                res = res + str.slice(0, i);
                found = true;
                done = true;
                break;
            }
        }
    } while (!done);

    return res;
}

function testWhite(x) {
    var white = new RegExp(/^(\s|\-)$/);
    return white.test(x.charAt(0));
};

module.exports = functions;