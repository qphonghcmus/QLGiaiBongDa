jQuery(function () {
    
    jQuery('#logo').fileinput({
        theme: 'fa',
        dropZoneEnabled: false,
        allowedFileExtensions: ['png', 'jpg', 'gif'],
        uploadUrl: '/upload/logo',
        uploadAsync: false,

        initialPreview: ["../../public/assets/img/logo/" + jQuery('#imgPath').val()],
        initialPreviewAsData: true,
        initialPreviewConfig: [
            {caption: jQuery('#imgPath').val() },
        ],
        deleteUrl: "/file-delete",
        overwriteInitial: false,
        initialCaption: jQuery('#imgPath').val(),
        maxFileCount: 1,
        minFileCount: 1,
        showUpload: false,
        showRemove: false,
    })
    jQuery('#logo').on('fileloaded', function(event, file, previewId, index, reader) {
        jQuery('#imgPath').val(file.name)
    });
})