jQuery(function () {
    
    jQuery('#cover').fileinput({
        theme: 'fa',
        dropZoneEnabled: false,
        allowedFileExtensions: ['png', 'jpg', 'gif'],
        uploadUrl: '/upload/season',
        uploadAsync: false,

        initialPreview: ["../../public/assets/img/season/" + jQuery('#imgPath').val()],
        initialPreviewAsData: true,
        initialPreviewConfig: [
            {caption: jQuery('#imgPath').val() },
        ],
        deleteUrl: "/file-delete",
        overwriteInitial: false,
        initialCaption: jQuery('#imgPath').val()
        
    })
    jQuery('#cover').on('fileloaded', function(event, file, previewId, index, reader) {
        jQuery('#imgPath').val(file.name)
    });
})