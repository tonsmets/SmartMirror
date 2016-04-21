var getTrainData = function() {
	$.ajax({
		type: 'GET',
		url: "http://localhost:3000/data/ns",
		dataType: 'html',
		success: function (data) {
			$('div.travel_data').fadeOut(1000, function() {
				$(this).html(data);
			}).fadeIn(1000);
		}.bind(this),
		error: function () {
			console.log("Error");
		}
	});
};

var GetTrafficData = function() {
	$.ajax({
		type: 'GET',
		url: "http://localhost:3000/data/traffic",
		dataType: 'html',
		success: function (data) {
			$('div.traffic_data').fadeOut(1000, function() {
				$(this).html(data).fadeIn(1000);
			});
		}.bind(this),
		error: function () {
			console.log("Error");
		}
	});
};

var getDateTime = function() {
	var tempDate = $('div.date_only').text();
	var tempTime = $('div.time_only').text();
	var days = ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'];
	var months = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
	var date = new Date();
	var dateString = days[ date.getDay() ] + ' ' + pad(date.getDate(), 2) + ' ' + months[ date.getMonth() ] + ' ' + date.getFullYear();
	var timeString = pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2);
	if(tempDate != dateString) {
		$('div.date_only').fadeOut(1000, function() {
			$(this).text(dateString).fadeIn(1000);
		});
	}
	if(tempTime != timeString) {
		$('div.time_only').fadeOut(1000, function() {
			$(this).text(timeString).fadeIn(1000);
		});
	}
}

var getNewsData = function() {
	$.ajax({
		type: 'GET',
		url: "http://localhost:3000/data/nu",
		dataType: 'html',
		success: function (data) {
			$('div.news_heading').fadeOut(1000, function() {
			  $(this).html(data);
			}).fadeIn(1000);
		}.bind(this),
		error: function () {
			console.log("Error");
		}
	});
};

function pad(number, zeros) {
  if (number<=9999) { number = ("0000000000000000"+number).slice(-1*zeros); }
  return number;
}