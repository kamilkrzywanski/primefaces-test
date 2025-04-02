function imagesUploadHandler(imageInfo , onSuccess ,onFailure) {
    uploadImage( imageInfo.blob(), true, function(imageUrl, hash) {
        onSuccess(imageUrl);
        addNewImageInController(hash);
    }, onFailure);
}

function imageFilePicker(tinyMCECallback) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = function() {
        if (this.files && this.files.length > 0 && this.files[0]) {
            var file = this.files[0];
            uploadImage( file, true, function(imageUrl, hash) {
                hideErrorMessage();
                tinyMCECallback(imageUrl);
                addNewImageInController(hash);
                // set file name as image description
                $('div[aria-label="Insert/edit image"] .mce-formitem:nth-child(3) input').val(file.name);
            }, function(errorMessage) {
                showErrorMessage(errorMessage);
            });
        }
    };
    input.click();
};

function showErrorMessage(errorMessage) {
    if ($("#uploadFileErrorMessage").length === 0) {
        var message = tinyMCE.uploadFileErrorMessage || errorMessage;
        var messageElement = $('<div id="uploadFileErrorMessage"><span>' + message + '</span></div>')
        $('div[aria-label="Insert/edit image"] .mce-window-head').after(messageElement);
    }
}

function hideErrorMessage() {
    $("#uploadFileErrorMessage").remove();
}

function addNewImageInController(imageHash) {
    // add hash to newImagesHashes list in RichTextEditorController
    addNewImageHash([{ name : 'hash', value : imageHash }]);
}