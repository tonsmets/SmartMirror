var getTrainData = function() {
	$.ajax({
		type: 'GET',
		url: "http://localhost:3000/data/ns",
		dataType: 'html',
		success: function (data) {
			$('div.travel_data').fadeOut(1000).html(data).fadeIn(1000);
		}.bind(this),
		error: function () {
			console.log("Error");
		}
	});
};

var getDateTime = function() {
	var days = ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'];
	var months = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
	var date = new Date();
	var dateString = days[ date.getDay() ] + ' ' + date.getDate() + ' ' + months[ date.getMonth() ] + ' ' + date.getFullYear();
	var timeString = date.getHours() + ':' + date.getMinutes();
	$('div.date_only').text(dateString);
	$('div.time_only').text(timeString);
}