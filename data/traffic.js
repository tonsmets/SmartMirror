var request = require('request');
var cheerio = require('cheerio');

var disruptionUrl = "http://vid.nl/VI/overzicht";

var travelHeading = '<span class="data_heading"><i class="fa fa-train fa-lg" aria-hidden="true"></i> Treindata</span>';

var functions = {
	getDisrupts: function(callback) {
		request(disruptionUrl, function(error, response, html){
			var data = false;
	        if(!error){
	            var $ = cheerio.load(html);
				var data = [];
				$('#overzicht-verkeer').children("dl").each(function(i, elem) {
					if (($(this).find(".vs-file-leeg").length > 0) || ($(this).find(".vs-file-up").length > 0) 
						|| ($(this).find(".vs-file-down").length > 0) || ($(this).find(".vs-file-same").length > 0))
					{
						var roadNumber = $(this).find(".vi-wegnr").text();
						var route = $(this).find(".vi-hoofdtraject").text().replace(roadNumber, "");
						var subRoute = $(this).find(".vi-traject").text();
						var description = $(this).find(".vi-bericht").text();
						var delay = $(this).find(".file-icoon").next().text().split("ongeveer ")[1];
						//if ($(this).find(".vi-langdurig").length > 0) delay = "~";
						
						var important = ((route.toLowerCase().indexOf("eindhoven") != -1) || (subRoute.toLowerCase().indexOf("eindhoven") != -1));
						
						var singleResult = { roadNumber: roadNumber, route: route, subRoute: subRoute, description: description, delay: delay, important: important }
						data.push(singleResult);
					}
				});
				var html = '<table>';
				for(var i = 0; i < data.length; i++) {
					html += '<tr '+ ( data[i].important ? 'class="important"' : '') +'><td class="traffic_data_item">'
					+ data[i].roadNumber + " - " + data[i].route + (data[i].delay != undefined ? " (" + data[i].delay + ")" : "") +'</td></tr>';
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
    var newLineStr = "\n"; done = false; res = '';
    do {                    
        found = false;
        // Inserts new line at first whitespace of the line
        for (i = maxWidth - 1; i >= 0; i--) {
            if (testWhite(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        // Inserts new line at maxWidth position, the word is too long to wrap
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }

        if (str.length < maxWidth)
            done = true;
    } while (!done);

    return res;
}

function testWhite(x) {
    var white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
};

module.exports = functions;