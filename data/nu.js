var feed = require("feed-read");

var getArticles = function(callback) {
	feed("http://www.nu.nl/rss/Algemeen", function(err, articles) {
		if (err) return false;
		// Each article has the following properties:
		// 
		//   * "title"     - The article title (String).
		//   * "author"    - The author's name (String).
		//   * "link"      - The original article link (String).
		//   * "content"   - The HTML content of the article (String).
		//   * "published" - The date that the article was published (Date).
		//   * "feed"      - {name, source, link}
		callback(articles);
	});
}

var functions = {
	getHighlights: function(amount, callback) {
		var articles = getArticles( function(articles) {
			if(!articles) {
				callback({ success: false, data: "Failed to fetch nu.nl articles"});
				// Handle error
			}
			else {
				articles.sort(function(a,b){
					return new Date(b.published) - new Date(a.published);
				});
				if(articles.length <= amount) {
					callback({ success: true, data: articles});
				}
				else {
					callback({ success: true, data: articles.slice(0, amount)});
				}
			}
		});
	}
};

module.exports = functions;