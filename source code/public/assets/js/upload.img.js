jQuery(function () {
    jQuery('#avatar').fileinput({
        theme: 'fa',
        dropZoneEnabled: false,
        allowedFileExtensions: ['png', 'jpg', 'gif'],
        uploadUrl: '/upload/avatar',
        uploadAsync: false,
    })
    jQuery('#avatar').on('fileloaded', function(event, file, previewId, index, reader) {
        jQuery('#imgPath').val(file.name)
    });
})