jQuery(function () {
    jQuery('#cover').fileinput({
        theme: 'fa',
        dropZoneEnabled: false,
        allowedFileExtensions: ['png', 'jpg', 'gif'],
        uploadUrl: '/upload/season',
        uploadAsync: false,
    })
    jQuery('#cover').on('fileloaded', function(event, file, previewId, index, reader) {
        jQuery('#imgPath').val(file.name)
    });
})