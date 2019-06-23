jQuery(function () {
    jQuery('#logo').fileinput({
        theme: 'fa',
        dropZoneEnabled: false,
        allowedFileExtensions: ['png', 'jpg', 'gif'],
        uploadUrl: '/upload/logo',
        uploadAsync: false,
    })
    jQuery('#logo').on('fileloaded', function(event, file, previewId, index, reader) {
        jQuery('#imgPath').val(file.name)
    });
})