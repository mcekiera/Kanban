function Column(id, name) {
	var self = this;
	this.id = id;
	this.name = name || "Unnamed";
	this.$element = createColumn();



	function createColumn() {
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete btn btn-warning').append('<i class="glyphicon glyphicon-remove"></i>');
		var $columnAddCard = $('<button>').addClass('add-card btn btn-default').text('Dodaj kartę');

		$columnDelete.click(function () {
			self.removeColumn();
		});

		$columnAddCard.click(function () {
			var title = $("#bs-modal-title");
			var comment = $("#bs-modal-comment");
			title.val('');
			comment.val('');
			currentColumn = self;
			$('#myModal').modal('show');
		});

		$column.append($columnTitle).append($columnDelete).append($columnAddCard).append($columnCardList);
		return $column;
	}

}

$('#bs-modal-addCard').click(function () {
	var title = $("#bs-modal-title");
	var comment = $("#bs-modal-comment");
	var select = $("#bs-modal-select");
	var content = JSON.stringify({
		"title": title.val(),
		"desc": comment.val(),
		"priority": readPriority(select.val())
	});

	$.ajax({
		url: baseUrl + '/card',
		method: 'POST',
		data: {
			name: content,
			bootcamp_kanban_column_id: currentColumn.id
		},
		success: function (response) {
			var card = new Card(response.id, content);
			currentColumn.addCard(card);
		}
	});

	$('#myModal').modal('hide');

	function readPriority(selection) {
		console.log(selection);
		switch (selection) {

			case 'Niski' :
				return 'low';
			case 'Średni' :
				return 'middle';
			case 'Wysoki' :
				return 'high';
			case 'ASAP' :
				return 'asap';
			default :
				return 'low';
		}
	}
});

Column.prototype = {
	addCard: function (card) {
		this.$element.children('ul').append(card.$element);
	},

	removeColumn: function () {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function (response) {
				self.$element.remove();
			}
		});
	}
};
