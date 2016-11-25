	var currentColumn;
	var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
	var myHeaders = {
		'X-Client-Id': 114,
		'X-Auth-Token' : '64ade12026dd1cf2043e88a8ee158cd8'
	};

	$.ajaxSetup({ headers: myHeaders });

	$.ajax({
		url: baseUrl + '/board', method: 'GET', success: function (response) {
			setupColumns(response.columns);
		}
	});

	function setupColumns(columns) {
		columns.forEach(function (column) {
			var col = new Column(column.id, column.name);
			board.addColumn(col);
			setupCards(col, column.cards);
		});
	}

	function setupCards(col, cards) {
		cards.forEach(function (card) {
			var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
			col.addCard(card);
		})
	}
