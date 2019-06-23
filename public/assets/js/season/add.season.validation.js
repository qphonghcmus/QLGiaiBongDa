jQuery(function(){
    jQuery('#dateStart').datetimepicker({
        format: 'd/m/Y',
        timepicker: false,
        mask: true,
        scrollInput : false
    });
    jQuery('#dateEnd').datetimepicker({
        format: 'd/m/Y',
        timepicker: false,
        mask: true,
        scrollInput : false
    });
})