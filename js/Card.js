function Card(id, stringified) {
	var self = this;
	var content;

	try {
		content = JSON.parse(stringified);

	} catch(err) {
		content = {
			"title": 'error',
			"desc": 'error',
			"priority": 'low'}
	}

	this.id = id;
	this.title = content.title;
	this.description = content.desc;
	this.priority = content.priority;

	this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card priority-' + self.priority);
		var $cardTitle = $('<p role="button" data-toggle="collapse" href="#desc' + self.id + '"  aria-expanded="false" aria-controls="collapseExample">').addClass('card-title').text(self.title);
		var $cardDescription = $('<p id="desc' + self.id + '">').addClass('card-description collapse').text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete  btn btn-warning').append('<i class="glyphicon glyphicon-remove"></i>');

		$cardDelete.click(function () {
			self.removeCard();
		});
		$card.append($cardDelete).append($cardTitle).append($cardDescription);

		return $card;
	}
}

Card.prototype = {
	removeCard: function () {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function () {
				self.$element.remove();
			}
		});
	}
};
