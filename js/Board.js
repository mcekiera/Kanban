var board = {
	name: 'Tablica Kanban',
	addColumn: function (column) {
		this.$element.append(column.$element);
		initSortable();
	},

	$element: $('.column-container')

};

function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder',
		receive: function (event, ui) {
			modify(ui,$(this));
			console.log( ui.item);
			console.log($(this).parent().attr('id'));
		}
	}).disableSelection();
}



function modify(ui, receiver) {
	$.ajax({
		url: baseUrl + '/card/' + ui.item.attr('id'),
		method: 'PUT',
		data: {
			name: Card.stash[ui.item.attr('id')].name,
			bootcamp_kanban_column_id: receiver.parent().attr('id')
		},
		error: function (response) {
			ui.sender.sortable('cancel')
			confirm("Przeniesienie się nie udało")
		}

	});

}

$('.create-column').click(function () {

	var columnName = prompt('Wpisz nazwę kolumny');
	$.ajax({
		url: baseUrl + '/column',
		method: 'POST',
		data: {name: columnName},
		success: function (response) {
			var column = new Column(response.id, columnName);
			board.addColumn(column);
		}
	});
});
