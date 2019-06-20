jQuery(document).ready(function() {

    var table = document.getElementById("bangketqua");

    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = function (row) {
            return function () {
        var v = jQuery(this).closest('tr').children('td:first').text();

                console.log(v);
                jQuery('#trandau').val(v);
            };
        };
        currentRow.onclick = createClickHandler(currentRow);
    }
});