jQuery(document).ready(function() {

    var table = document.getElementById("bootstrap-data-table-export");

    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = function (row) {
            return function () {
                window.location.href = "/player/edit"
            };
        };
        currentRow.onclick = createClickHandler(currentRow);
    }
});