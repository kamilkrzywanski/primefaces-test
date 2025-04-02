function initializeTinyMCE(options, setupCallback) {
    if (options === undefined)
        options = {};
    tinyMCE.uploadFileErrorMessage = options.uploadFileErrorMessage;
    tinyMCE.baseURL = "resources/js/tinymce";
    tinyMCE.suffix = '.min';

    // ADDING PLUGINS? USE https://www.tinymce.com/download/custom-builds/ AND GET ONE .min.js FILE!!!

    var cfg = {
        toolbar: createToolbar(options.additionalToolbarItems),
        selector: '.rich-text-editor',
        width: '100%',
        remove_script_host: false,
        relative_urls: false,
        contextmenu: "link image table",
        plugins: [
            'advlist autolink link lists charmap preview hr anchor image',
            'searchreplace visualblocks visualchars code fullscreen insertdatetime nonbreaking',
            'save table directionality paste autoresize'
        ],
        menu: {
            insert   : {title : 'Insert'  , items : 'image insert_filemenager link inserttable | charmap hr | nonbreaking anchor | insertdatetime'}
        },
        setup: function(editor) {
            editor.on('change', function() {
                editor.save();
            });
            if (setupCallback)
                setupCallback(editor);
        },
        valid_elements : '+*[*], -*[script]',
        content_style: ``
    };
    Object.assign(cfg, options, imagesUploadingOptions());
    tinyMCE.init(cfg);
}

function imagesUploadingOptions() {
    return {
        images_upload_handler: imagesUploadHandler,
        images_upload_url: "/image",
        file_picker_callback: imageFilePicker,
        file_picker_types: 'image',
        paste_data_images: true,
        automatic_uploads: false
    }
}

function createToolbar(additionalToolbarItems) {
    var groups = [];
    groups.push("undo redo");
    groups.push("styleselect");
    groups.push("bold italic underline");
    groups.push("fontselect fontsizeselect");
    groups.push("alignleft aligncenter alignright alignjustify");
    groups.push("bullist numlist outdent indent");
    groups.push("link image filemanager");
    groups.push("preview media fullpage");
    groups.push("forecolor backcolor");
    if (additionalToolbarItems)
        groups.push(additionalToolbarItems);
    return groups.join(" | ");
}